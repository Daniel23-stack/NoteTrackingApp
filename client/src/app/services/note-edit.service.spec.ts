import { TestBed } from '@angular/core/testing';

import { NoteEditService } from './note-edit.service';

describe('NoteEditService', () => {
  let service: NoteEditService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NoteEditService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
