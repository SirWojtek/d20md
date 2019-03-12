import {NgModule, ModuleWithProviders} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {AccordionModule, ButtonsModule} from 'ngx-bootstrap';
import {ElementsModule} from './elements/elements.module';
import {GraphQLService} from './graphql.service';
import {UserService} from './user/user.service';
import {EnumService} from './enum.service';
import {UploadService} from './upload.service';
import {AuthGuard} from './user/auth-guard';

@NgModule({
  imports: [
    ElementsModule,
    AccordionModule,
    ButtonsModule,
    ReactiveFormsModule,
    RouterModule,
  ],
  providers: [AuthGuard],
  exports: [ElementsModule],
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [GraphQLService, UserService, EnumService, UploadService],
    };
  }
}
