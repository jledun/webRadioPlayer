import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-web-radio-editor',
  templateUrl: './web-radio-editor.component.html',
  styleUrls: ['./web-radio-editor.component.css']
})
export class WebRadioEditorComponent {

  constructor(
    public dialogRef: MatDialogRef<WebRadioEditorComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any 
  ) { }

  cancel(): void {
    this.dialogRef.close();
  }

}
