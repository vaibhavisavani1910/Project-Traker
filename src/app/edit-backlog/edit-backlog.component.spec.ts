import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditBacklogComponent } from './edit-backlog.component';

describe('EditBacklogComponent', () => {
  let component: EditBacklogComponent;
  let fixture: ComponentFixture<EditBacklogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditBacklogComponent]
    });
    fixture = TestBed.createComponent(EditBacklogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
