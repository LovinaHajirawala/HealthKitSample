import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HealthKit } from '@ionic-native/health-kit/ngx';
import { OpenNativeSettings } from '@awesome-cordova-plugins/open-native-settings/ngx';
import { BackgroundFetch } from '@awesome-cordova-plugins/background-fetch/ngx';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, HealthKit,OpenNativeSettings,BackgroundFetch],
  bootstrap: [AppComponent],
})
export class AppModule {}
