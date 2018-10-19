import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HttpClientJsonpModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {
  MatAutocompleteModule,
  MatButtonModule,
  MatCardModule,
  MatChipsModule,
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
import { StatusComponent } from './status/status.component';

// web radio library
import { WebRadioLibraryComponent } from './web-radio-library/web-radio-library.component';
import { WebRadioItemComponent } from './web-radio-item/web-radio-item.component';
import { WebRadioEditorComponent } from './web-radio-editor/web-radio-editor.component';
import { WebRadioBrowserPlayerComponent } from './web-radio-browser-player/web-radio-browser-player.component';
import { WebRadioBrowserPlayerButtonComponent } from './web-radio-browser-player-button/web-radio-browser-player-button.component';
import { WebRadioServerPlayButtonComponent } from './web-radio-server-play-button/web-radio-server-play-button.component';

// SoundCloud library
import { SoundcloudComponent } from './soundcloud/soundcloud.component';
import { SoundcloudBrowserComponent } from './soundcloud-browser/soundcloud-browser.component';
import { SoundcloudSearchComponent } from './soundcloud-search/soundcloud-search.component';
import { SoundcloudItemComponent } from './soundcloud-item/soundcloud-item.component';

// Community Radio Browser
import { CommunityRadioBrowserComponent } from './community-radio-browser/community-radio-browser.component';
import { BrowserComponent } from './community-radio-browser/browser/browser.component';
import { SearchEngineComponent } from './community-radio-browser/search-engine/search-engine.component';
import { WebRadioItemListComponent } from './web-radio-item-list/web-radio-item-list.component';


@NgModule({
  declarations: [
    AppComponent,
    WebRadioItemComponent,
    StatusComponent,
    WebRadioEditorComponent,
    WebRadioBrowserPlayerComponent,
    WebRadioBrowserPlayerButtonComponent,
    WebRadioLibraryComponent,
    SoundcloudComponent,
    SoundcloudBrowserComponent,
    SoundcloudSearchComponent,
    WebRadioServerPlayButtonComponent,
    SoundcloudItemComponent,
    CommunityRadioBrowserComponent,
    BrowserComponent,
    SearchEngineComponent,
    WebRadioItemListComponent
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
    MatAutocompleteModule,
    MatButtonModule,
    MatCardModule,
    MatChipsModule,
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
