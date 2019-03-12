import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientModule} from '@angular/common/http';
import {HttpLinkModule} from 'apollo-angular-link-http';
import {ApolloModule} from 'apollo-angular';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {JwtModule} from '@auth0/angular-jwt';
import {AccordionModule} from 'ngx-bootstrap/accordion';
import {AlertModule} from 'ngx-bootstrap/alert';
import {BsDropdownModule} from 'ngx-bootstrap/dropdown';
import {PaginationModule} from 'ngx-bootstrap/pagination';
import {TabsModule} from 'ngx-bootstrap/tabs';
import {TooltipModule} from 'ngx-bootstrap/tooltip';
import {SortableModule} from 'ngx-bootstrap/sortable';
import {ModalModule} from 'ngx-bootstrap/modal';
import {TrumbowygModule} from 'ng2-lazy-trumbowyg';
import {Angulartics2Module} from 'angulartics2';
import {Angulartics2GoogleAnalytics} from 'angulartics2/ga';

import {environment} from '../environments/environment';
import {HttpInterceptorService} from './http-interceptor/http-interceptor.service';
import {ReqeustCounterService} from './http-interceptor/request-counter.service';
import {
  tokenGetter,
  whitelistedDomains,
  blacklistedRoutes,
} from './config/jwt.config';
import {IndexModule} from './index/index.module';
import {LoaderModule} from './loader/loader.module';
import {MonstersModule} from './monsters/monsters.module';
import {FeatsModule} from './feats/feats.module';
import {SpellsModule} from './spells/spells.module';
import {SharedModule} from './shared/shared.module';
import {PolicyComponent} from './policy/policy.component';
import {AppComponent} from './app.component';
import {routing, appRoutingProviders} from './app.routing';
import {ChangelogModule} from './changelog/changelog.module';
import {NavbarModule} from './navbar/navbar.module';
import {ActivateModule} from './activate/activate.module';
import {PopoverModule, TypeaheadModule} from 'ngx-bootstrap';
import {BreadcrumbsModule} from './breadcrumbs/breadcrumbs.module';
import {DashboardModule} from './dashboard/dashboard.module';
import {LoginModule} from './login/login.module';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    HttpLinkModule,
    ApolloModule,
    JwtModule.forRoot({
      config: {
        tokenGetter,
        whitelistedDomains,
        blacklistedRoutes,
      },
    }),
    AccordionModule.forRoot(),
    AlertModule.forRoot(),
    BsDropdownModule.forRoot(),
    PaginationModule.forRoot(),
    TabsModule.forRoot(),
    TooltipModule.forRoot(),
    ModalModule.forRoot(),
    PopoverModule.forRoot(),
    SortableModule.forRoot(),
    TypeaheadModule.forRoot(),
    TrumbowygModule.forRoot({plugins: ['table']}),
    Angulartics2Module.forRoot([Angulartics2GoogleAnalytics]),
    IndexModule,
    ChangelogModule,
    ActivateModule,
    LoaderModule,
    routing,
    NavbarModule,
    MonstersModule,
    FeatsModule,
    SpellsModule,
    LoginModule,
    BreadcrumbsModule,
    DashboardModule,
    SharedModule.forRoot(),
  ],
  declarations: [AppComponent, PolicyComponent],
  providers: [
    appRoutingProviders,
    {provide: 'API_ENDPOINT', useValue: environment.endpoint},
    {provide: 'GRAPHQL_ENDPOINT', useValue: environment.graphQlEndpoint},
    {
      provide: 'GRAPHQL_AUTH_ENDPOINT',
      useValue: environment.graphQlAuthEndpoint,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpInterceptorService,
      multi: true,
    },
    ReqeustCounterService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
