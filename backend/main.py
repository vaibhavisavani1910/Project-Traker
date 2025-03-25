import bson
from flask import Flask, request, jsonify, render_template, send_from_directory
from pymongo import MongoClient
from flask_cors import CORS
from bson import json_util
from bson.json_util import dumps
import itertools
from bson.objectid import ObjectId

app = Flask(__name__)

@app.route("/")
def loadindex():
    return send_from_directory('../dist/project_tracker', 'index.html')
    # return render_template("./dist/project_tracker/index.html")
@app.route('/<path:path>')
def static_files(path):
    return send_from_directory('../dist/project_tracker', path)
#use this for production
# client = MongoClient("mongodb+srv://divijayuvraj30:RE83t9Q20gCaVaVO@alteregocluster.nusigg5.mongodb.net/?authSource=AlterEgoCluster&authMechanism=SCRAM-SHA-1")

# use this for local mongoDB
client = MongoClient("mongodb://localhost:27017/")  
db = client["mydatabase"]  
CORS(app)  

@app.route('/api/getTask/<project>', methods=['GET'])
def lists(project):
    data = list(db.taskDeatils.find({'project': project}))
    resp = dumps(data)
    return resp

@app.route('/api/getIssue/<project>', methods=['GET'])
def getIssue(project):
    data = list(db.issueDetails.find({'project': project}))
    resp = dumps(data)
    return resp

@app.route('/api/getUsers/<project>', methods=['GET'])
def getUsers(project):
    data = list(db.users.find({'project': project}))
    resp = dumps(data)
    return resp


@app.route('/api/getProjectInfo/<project>', methods=['GET'])
def getProjectInfo(project):
    data = list(db.projects.find({'projectname': project}))
    resp = dumps(data)
    return resp

@app.route('/api/updateTask/<id>/<new_status>', methods=['PUT'])
def update_task_status(id,new_status):
    try:
        document_id = ObjectId(id)
        db.taskDeatils.update_one({'_id': document_id}, {'$set': {'status': new_status}})
        return jsonify({'message': 'Task updated successfully'})
    except Exception as e:
        return jsonify({'error': str(e)})
    

@app.route('/api/register', methods=['POST'])
def register():
    user_data = request.get_json()
    username = user_data['username']
    password = user_data['password']
    
    user = db.users.find_one({'username': username})
    if user:
        return jsonify({'message': 'Username already exists'}), 409
    
    db.users.insert_one({'username': username, 'password': password})
    return jsonify({'message': 'Registration successful'})

@app.route('/api/login', methods=['POST'])
def login():    
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    user = db.users.find_one({'username': username})

    if user and user['password'] == password:
        return jsonify({'message': 'Login successful'}),200
    else:
        return jsonify({'message': 'Login failed'}),400
    
@app.route('/api/createBacklog', methods=['POST'])
def createBacklog():
    task_data = request.get_json()
    print(task_data)
    project = task_data.get('project')
    issuetype = task_data.get('issuetype')
    status = task_data.get('status')
    summary = task_data.get('summary')
    description = task_data.get('description')
    assignee = task_data.get('assignee')
    reporter = task_data.get('reporter')
    tags = task_data.get('tags')
    priority = task_data.get('priority')
    
    db.issueDetails.insert_one({'project': project, 'issuetype': issuetype,'status':status,'summary':summary,'description':description,'assignee':assignee,'reporter':reporter,'tags':tags,'priority':priority})
    return jsonify({'message': 'Created task successfully'})    

    
@app.route('/api/deleteBacklog/<id>', methods=['DELETE'])
def deleteBacklog(id):
    try:
        # Get the _id of the issue to be deleted from the request
        # # Check if the issue_id is a valid ObjectId
        # if not ObjectId.is_valid(id):
        #     return jsonify({"error": "Invalid id format"}), 400

        # Convert the string _id to ObjectId
        doc_id = ObjectId(id)

        # Find and delete the issue by _id
        result = db.issueDetails.delete_one({"_id": doc_id})

        # Check if the issue was found and deleted
        if result.deleted_count == 1:
            return jsonify({"message": "Issue deleted successfully"})
        else:
            return jsonify({"error": "Issue not found"}), 404

    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/editBacklog/<id>', methods=['PUT'])
def edit_backlog(id):
    try:
        data = request.get_json()

        # Update the issue by _id
        result = db.issueDetails.update_one(
            {"_id": ObjectId(id)},
            {"$set": data}
        )

        # Check if the issue was found and updated
        if result.modified_count == 1:
            return jsonify({"message": "Issue updated successfully"})
        else:
            return jsonify({"error": "Issue not found"}), 404

    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/getBacklog/<id>', methods=['GET'])
def get_backlog(id):
    data = (db.issueDetails.find_one({"_id": ObjectId(id)}))
    resp = dumps(data)
    return resp


@app.route('/api/getUserRole', methods=['POST'])
def get_user_role():
    data = request.get_json()
    username = data.get('username')
    
    user_data = db.users.find_one({"username": username})

    if user_data:
        user_role = user_data.get('role', 'Role not found')

        response_data = {
            "username": username,
            "role": user_role
        }

        resp = dumps(response_data)
        print("getuserrole", resp)
        return resp, 200
    else:
        return jsonify({"error": "User not found"}), 404
    

@app.route('/api/editUser/<username>', methods=['PUT'])
def editUser(username):
    try:
        data = request.get_json()

        # Update the issue by _id
        result = db.users.update_one(
            {"username": username},
            {"$set": data}
        )
        print(data)

        # Check if the issue was found and updated
        if result.modified_count == 1:
            return jsonify({"message": "Issue updated successfully"})
        else:
            return jsonify({"error": "Issue not found"}), 404

    except Exception as e:
        return jsonify({"error": str(e)}), 500
    

@app.route('/api/changepwds', methods=['PUT'])
def changepwds():
    data = request.get_json()

    # Assuming you have the username, current password, and new password
    username = data.get('username')
    current_password = data.get('password')
    new_password = data.get('newpassword')

    # Fetch user from the database using the username (you might want to add additional security checks here)
    user = db.users.find_one({"username": username, "password": current_password})
    print(username)
    if user:
        # Update the user's password
        result = db.users.update_one(
            {"username": username},
            {"$set": {"password": new_password}}
        )

        # Check if the password was successfully updated
        if result.modified_count == 1:
            return jsonify({"message": "Password changed successfully"})
        else:
            return jsonify({"error": "Password change failed"}), 500
    else:
        return jsonify({"error": "Invalid username or current password"}), 401


@app.route('/api/createProject', methods=['POST'])
def createProject():
    task_data = request.get_json()
    project = task_data.get('project')
    description = task_data.get('description')
    ownername = task_data.get('ownername')
    gitname = task_data.get('gitname')
    
    db.projects.insert_one({'projectname': project,'projectdescription':description,'ownername':ownername,'gitname':gitname })
    return jsonify({'message': 'Created task successfully'})


@app.route('/api/createTask', methods=['POST'])
def createTask():
    task_data = request.get_json()
    print(task_data)
    project = task_data.get('project')
    issuetype = task_data.get('issuetype')
    status = task_data.get('status')
    summary = task_data.get('summary')
    description = task_data.get('description')
    assignee = task_data.get('assignee')
    reporter = task_data.get('reporter')
    priority = task_data.get('priority')
    
    db.taskDeatils.insert_one({'project': project, 'issuetype': issuetype,'status':status,'summary':summary,'description':description,'assignee':assignee,'reporter':reporter,'priority':priority})
    return jsonify({'message': 'Created task successfully'})

#done by me - update issue
@app.route('/api/updateTask/<task_id_str>', methods=['PUT'])
def updateTask(task_id_str):
    task_data = request.get_json()

    # Convert the string ID from the URL to a MongoDB ObjectId
    try:
        task_id = ObjectId(task_id_str)
    except bson.errors.InvalidId:
        return jsonify({'message': 'Invalid task ID format'}), 400

    # Check if the task exists
    existing_task = db.taskDeatils.find_one({'_id': task_id})
    if not existing_task:
        return jsonify({'message': 'Task not found'}), 404

    # Prepare the update dictionary
    update_data = {}
    for field in ['project', 'issuetype', 'status', 'summary', 'description', 'assignee', 'reporter']:
        if field in task_data:
            update_data[field] = task_data[field]

    # Perform the update
    db.taskDeatils.update_one({'_id': task_id}, {'$set': update_data})

    return jsonify({'message': 'Task updated successfully'})

# @app.route('/', methods=['GET'])
# def get_details():
#     done_data= list(db.taskDeatils.find({'status':'done'}))
#     todo_data= list(db.taskDeatils.find({'status':'to-do'}))
#     inprogress_data= list(db.taskDeatils.find({'status':'in-progress'}))
    
#     done_data = json_util.dumps(done_data)
#     todo_data = json_util.dumps(todo_data)
#     inprogress_data = json_util.dumps(inprogress_data)
    
#     return jsonify(done = done_data, todo = todo_data, inprogress = inprogress_data)

@app.route('/api/getProjects', methods=['GET','POST'])
def get_projects():
    projects_from_mongodb = list(db.projects.find())
    # db.projects.insert_one({'projectname': 'hi', 'projectdescription': 'hi'})
    
    # Transform the data into the desired format
    projects = []
    
    for project in projects_from_mongodb:
        project_data = {
            'id': str(project['_id']),  # Use the MongoDB ObjectId as the 'id'
            'name': project.get('projectname', ''),  # Use .get() to handle missing keys
            'description': project.get('projectdescription', '')  # Use .get() to handle missing keys
        }
        projects.append(project_data)

    return jsonify(projects)
# @app.route('/api/graph')
# def get_data():
#     # Return sample data for testing
#     data = {'labels': ['To-do', 'In Progress', 'Done'],
#             'values': [30, 50, 20]}
#     return jsonify(data)
@app.route('/api/graph/<string:project_name>', methods=['GET'])
def get_details(project_name):
    
  
    print("project",project_name)
    done_count = db.taskDeatils.count_documents({'status': 'done', 'project': project_name})
    todo_count = db.taskDeatils.count_documents({'status': 'to-do', 'project': project_name})
    inprogress_count = db.taskDeatils.count_documents({'status': 'in-progress', 'project': project_name})
    project_description = db.projects.find_one({'projectname': project_name}).get('projectdescription', '')
    print(done_count)
    print(todo_count)
    print(inprogress_count)
    data = {
        'project_name': project_name,
        'project_description': project_description,
        'labels': ['To-do', 'In Progress', 'Done'],
           'values': [todo_count, inprogress_count,done_count],
           }

    return jsonify(data)

@app.route('/api/project_users/<project_name>', methods=['GET'])
def get_project_users(project_name):
    # Query the users collection for users with access to the specified project
    project_users = db.users.find({'accessproject': project_name})

    # Prepare the response
    user_list = []
    for user in project_users:
        user_data = {
            '_id': str(user['_id']),
            'username': user['username'],
            'name': user['name'],
            'role': user['role'],
            'accessproject': user['accessproject']
        }
        user_list.append(user_data)
    
    print(user_list)

    return jsonify({'project_users': user_list})

@app.route('/api/new_users/<project_name>', methods=['GET'])
def get_new_users(project_name):

    new_project_users = db.users.find({'accessproject': {'$nin': [project_name],'$exists': True}})

    # Prepare the response
    user_list = []
    for user in new_project_users:
        user_data = {
            '_id': str(user['_id']),
            'username': user['username'],
            'name': user['name'],
            'role': user['role'],
            'accessproject': user['accessproject']
        }
        user_list.append(user_data)
    
    print(user_list)

    return jsonify({'new_project_users': user_list})

#added by me - to get taskdetails according to task id
@app.route('/api/tasks/<task_id>', methods=['GET'])
def get_task(task_id):
    try:
        # Convert string ID to MongoDB ObjectId
        obj_id = ObjectId(task_id)
    except:
        return jsonify({'error': 'Invalid task ID format'}), 400

    # Fetch task from the database
    task = db.taskDeatils.find_one({'_id': obj_id})  # Replace 'taskDeatils' if it's a typo

    if not task:
        return jsonify({'error': 'Task not found'}), 404

    # Convert the task document from MongoDB to a JSON-serializable format
    task['_id'] = str(task['_id'])

    return jsonify(task)

@app.route('/addusertoproject/<username>/<projectname>', methods=['GET'])
def update_project(username,projectname):
    # data = request.json
    # username = data.get('username')
    # projectname = data.get('projectname')
    print("usser in main",username)
    print(projectname)

    # Use pymongo to update the MongoDB collection
   
    db.users.update_one({'username': username}, {'$addToSet': {'accessproject': projectname}})

    
    return jsonify({'message': "success"})
@app.route('/deleteusertoproject/<username>/<projectname>', methods=['GET'])
def delete_project(username,projectname):
    # data = request.json
    # username = data.get('username')
    # projectname = data.get('projectname')
    print("usser in main",username)
    print(projectname)

    # Use pymongo to update the MongoDB collection
   
    db.users.update_one({'username': username}, {'$pull': {'accessproject': projectname}})

    
    return jsonify({'message': "success"})


@app.route('/api/getUser/<username>', methods=['GET'])
def getUser(username):
    try:
        # Assuming 'db' is your MongoDB database instance
        user = db.users.find_one({"username": username})
        if user:
            # Prepare the user data to return
            # Be cautious with sensitive data like passwords
            user_data = {
                "username": user.get("username"),
                "name": user.get("name"),
                "email": user.get("email"),
                "address": user.get("address"),
                "phone": user.get("phone"),
                "gender": user.get("gender"),
                "accessproject":user.get("accessproject")
                # Include other user fields as needed
            }
            return jsonify(user_data)
        else:
            return jsonify({"error": "User not found"}), 404
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port = 5000, debug=True)
