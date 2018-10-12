import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WebRadioLibraryComponent } from './web-radio-library/web-radio-library.component';
import { RadioTimeComponent } from './radio-time/radio-time.component';
import { SoundcloudComponent } from './soundcloud/soundcloud.component';

const routes: Routes = [
  {path: 'library', component: WebRadioLibraryComponent},
  {path: 'radiotime', component: RadioTimeComponent},
  {path: 'soundcloud', component: SoundcloudComponent},
  {path: '', redirectTo: 'library', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
