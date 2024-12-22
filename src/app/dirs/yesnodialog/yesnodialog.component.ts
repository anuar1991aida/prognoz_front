import {ChangeDetectionStrategy, Component, Inject, inject} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';




@Component({
  selector: 'app-yesnodialog',
  standalone: true,
  imports: [MatDialogContent, MatDialogActions],
  templateUrl: './yesnodialog.component.html',
  styleUrl: './yesnodialog.component.css'
})

export class YesnodialogComponent {
  readonly dialogRef = inject(MatDialogRef<YesnodialogComponent>);
  text = "Вы действительно хотите удалить?"
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any) { }
  

  ngOnInit() {
    if (this.data!=null) {
      this.text = this.data
    }
  }

  close(res:boolean) {
    this.dialogRef.close(res)
  }

  
}
