import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WebRadioLibraryComponent } from './web-radio-library/web-radio-library.component';
import { SoundcloudComponent } from './soundcloud/soundcloud.component';
import { CommunityRadioBrowserComponent } from './community-radio-browser/community-radio-browser.component';

const routes: Routes = [
  {path: 'library', component: WebRadioLibraryComponent},
  {path: 'radiobrowser', component: CommunityRadioBrowserComponent},
  {path: 'soundcloud', component: SoundcloudComponent},
  {path: '', redirectTo: 'library', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
