import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateBacklogComponent } from './create-backlog.component';

describe('CreateBacklogComponent', () => {
  let component: CreateBacklogComponent;
  let fixture: ComponentFixture<CreateBacklogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateBacklogComponent]
    });
    fixture = TestBed.createComponent(CreateBacklogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
