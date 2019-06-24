/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { BlogTestModule } from '../../../test.module';
import { BlogComponent } from 'app/entities/blog/blog.component';
import { BlogService } from 'app/entities/blog/blog.service';
import { Blog } from 'app/shared/model/blog.model';

describe('Component Tests', () => {
  describe('Blog Management Component', () => {
    let comp: BlogComponent;
    let fixture: ComponentFixture<BlogComponent>;
    let service: BlogService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [BlogTestModule],
        declarations: [BlogComponent],
        providers: []
      })
        .overrideTemplate(BlogComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(BlogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(BlogService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Blog(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.blogs[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
