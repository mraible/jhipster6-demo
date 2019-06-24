/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { BlogTestModule } from '../../../test.module';
import { EntryDetailComponent } from 'app/entities/entry/entry-detail.component';
import { Entry } from 'app/shared/model/entry.model';

describe('Component Tests', () => {
  describe('Entry Management Detail Component', () => {
    let comp: EntryDetailComponent;
    let fixture: ComponentFixture<EntryDetailComponent>;
    const route = ({ data: of({ entry: new Entry(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [BlogTestModule],
        declarations: [EntryDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(EntryDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(EntryDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.entry).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
