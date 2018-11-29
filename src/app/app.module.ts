/**
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not
 * use this file except in compliance with the License. You may obtain a copy of
 * the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations under
 * the License.
 */

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { Routes, RouterModule } from '@angular/router';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

import { AppComponent } from './app.component';
import {
  HeaderComponent,
  CardComponent,
  RouteProxyComponent,
} from 'app/component';
import { HomeComponent } from 'app/scene';
import { ServicesModule } from 'app/service';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

const routePaths: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'house/:id',
    outlet: 'modal',
    component: RouteProxyComponent,
    children: [
      {
        path: '',
        loadChildren: 'app/scene/house/house.module#HouseModule',
      },
    ],
  },
];

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(routePaths),
    ServicesModule.forRoot(),
    InfiniteScrollModule,
    ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production }),
  ],
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    CardComponent,
    RouteProxyComponent,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
