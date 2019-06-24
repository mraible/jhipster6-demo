import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BlogSharedCommonModule, JhiLoginModalComponent, HasAnyAuthorityDirective } from './';

@NgModule({
  imports: [BlogSharedCommonModule],
  declarations: [JhiLoginModalComponent, HasAnyAuthorityDirective],
  entryComponents: [JhiLoginModalComponent],
  exports: [BlogSharedCommonModule, JhiLoginModalComponent, HasAnyAuthorityDirective],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class BlogSharedModule {
  static forRoot() {
    return {
      ngModule: BlogSharedModule
    };
  }
}
