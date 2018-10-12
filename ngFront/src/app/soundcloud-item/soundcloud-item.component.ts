import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-soundcloud-item',
  templateUrl: './soundcloud-item.component.html',
  styleUrls: ['./soundcloud-item.component.css']
})
export class SoundcloudItemComponent {
  @Input() soundcloudItem: any = {}

  constructor() { }

}
