import { Component, inject } from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';

import {FormsModule} from '@angular/forms';
import { orgService } from '../org.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-orgitem',
  standalone: true,
  imports: [MatInputModule, MatFormFieldModule, FormsModule],
  templateUrl: './orgitem.component.html',
  styleUrl: './orgitem.component.css'
})
export class OrgitemComponent {
  readonly dialogRef = inject(MatDialogRef<OrgitemComponent>);
  ds:any = inject(MAT_DIALOG_DATA);
  constructor(
    private srv: orgService,
  ) { 
    if (this.ds==null) {
     this.ds =  {
                  id:"",
                  bin: "",
                  nameKaz: "",
                  nameRus: ""
                }
    }
  }


  save() {
    if (this.ds.id=='') {
      this.srv.saveorgitem(this.ds).subscribe(
        (value:any)=>{
          console.log(value)
          this.dialogRef.close(true)
        },
        (error:any)=>{
          console.log(error);
        }
      )
    } else {
      this.srv.editorgitem(this.ds.id, this.ds).subscribe(
        (value:any)=>{
          console.log(value)
          this.dialogRef.close(true)
        },
        (error:any)=>{
          console.log(error);  
          // this.dialogRef.close(false) 
        }
      )
    }
    
  }

  cancel() {
    this.dialogRef.close(false)
  }

}
