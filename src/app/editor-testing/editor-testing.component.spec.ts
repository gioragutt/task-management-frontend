import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditorTestingComponent } from './editor-testing.component';

describe('EditorTestingComponent', () => {
  let component: EditorTestingComponent;
  let fixture: ComponentFixture<EditorTestingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditorTestingComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditorTestingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
