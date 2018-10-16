import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HttpClientJsonpModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {
  MatButtonModule,
  MatCardModule,
  MatDialogModule,
  MatDividerModule,
  MatExpansionModule,
  MatIconModule,
  MatInputModule,
  MatGridListModule,
  MatListModule,
  MatMenuModule,
  MatRadioModule,
  MatSidenavModule,
  MatSliderModule,
  MatSnackBarModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule
} from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

// web radio library
import { WebRadioLibraryComponent } from './web-radio-library/web-radio-library.component';
import { WebRadioItemComponent } from './web-radio-item/web-radio-item.component';
import { WebRadioEditorComponent } from './web-radio-editor/web-radio-editor.component';
import { WebRadioBrowserPlayerComponent } from './web-radio-browser-player/web-radio-browser-player.component';
import { WebRadioBrowserPlayerButtonComponent } from './web-radio-browser-player-button/web-radio-browser-player-button.component';

// radio time browser
import { RadioTimeComponent } from './radio-time/radio-time.component';
import { RadioTimeBrowserComponent } from './radio-time-browser/radio-time-browser.component';
import { RadioTimeSearchEngineComponent } from './radio-time-search-engine/radio-time-search-engine.component';

import { StatusComponent } from './status/status.component';
import { RadioTimeBrowserItemComponent } from './radio-time-browser-item/radio-time-browser-item.component';
import { SoundcloudComponent } from './soundcloud/soundcloud.component';
import { SoundcloudBrowserComponent } from './soundcloud-browser/soundcloud-browser.component';
import { SoundcloudSearchComponent } from './soundcloud-search/soundcloud-search.component';
import { WebRadioServerPlayButtonComponent } from './web-radio-server-play-button/web-radio-server-play-button.component';
import { SoundcloudItemComponent } from './soundcloud-item/soundcloud-item.component';
import { RadioTimeChildElementComponent } from './radio-time-child-element/radio-time-child-element.component';

@NgModule({
  declarations: [
    AppComponent,
    WebRadioItemComponent,
    StatusComponent,
    WebRadioEditorComponent,
    WebRadioBrowserPlayerComponent,
    WebRadioBrowserPlayerButtonComponent,
    WebRadioLibraryComponent,
    RadioTimeComponent,
    RadioTimeBrowserComponent,
    RadioTimeSearchEngineComponent,
    RadioTimeBrowserItemComponent,
    SoundcloudComponent,
    SoundcloudBrowserComponent,
    SoundcloudSearchComponent,
    WebRadioServerPlayButtonComponent,
    SoundcloudItemComponent,
    RadioTimeChildElementComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    HttpClientJsonpModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    AppRoutingModule,
    MatButtonModule,
    MatCardModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatIconModule,
    MatInputModule,
    MatGridListModule,
    MatListModule,
    MatMenuModule,
    MatRadioModule,
    MatSidenavModule,
    MatSliderModule,
    MatSnackBarModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule
  ],
  entryComponents: [
    WebRadioEditorComponent,
    WebRadioBrowserPlayerComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
