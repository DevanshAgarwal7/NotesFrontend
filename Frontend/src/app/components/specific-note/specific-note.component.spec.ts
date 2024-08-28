import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecificNoteComponent } from './specific-note.component';

describe('SpecificNoteComponent', () => {
  let component: SpecificNoteComponent;
  let fixture: ComponentFixture<SpecificNoteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SpecificNoteComponent]
    });
    fixture = TestBed.createComponent(SpecificNoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
