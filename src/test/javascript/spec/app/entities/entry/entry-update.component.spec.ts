/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { Observable, of } from 'rxjs';

import { BlogTestModule } from '../../../test.module';
import { EntryUpdateComponent } from 'app/entities/entry/entry-update.component';
import { EntryService } from 'app/entities/entry/entry.service';
import { Entry } from 'app/shared/model/entry.model';

describe('Component Tests', () => {
  describe('Entry Management Update Component', () => {
    let comp: EntryUpdateComponent;
    let fixture: ComponentFixture<EntryUpdateComponent>;
    let service: EntryService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [BlogTestModule],
        declarations: [EntryUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(EntryUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(EntryUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(EntryService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Entry(123);
        spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.update).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));

      it('Should call create service on save for new entity', fakeAsync(() => {
        // GIVEN
        const entity = new Entry();
        spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.create).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));
    });
  });
});
