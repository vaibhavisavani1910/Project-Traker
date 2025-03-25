import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateIssueComponent } from './create-task-modal.component';

describe('CreateTaskModalComponent', () => {
  let component: CreateIssueComponent;
  let fixture: ComponentFixture<CreateIssueComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateIssueComponent]
    });
    fixture = TestBed.createComponent(CreateIssueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
