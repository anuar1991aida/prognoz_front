import { Component, inject } from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';

import {FormsModule} from '@angular/forms';
import { orgService } from '../org.service';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { OrgselComponent } from '../orgsel/orgsel.component';

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
    public dialog: MatDialog 
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


  openOrgSel() {
    const dial = this.dialog.open(OrgselComponent, {
      width:'65vw',
      maxWidth:'65vw',
      height:'75vh',
      maxHeight:'75vh',
      disableClose:true
    });

    dial.afterClosed().subscribe(
      (value:any)=>{
        this.ds.parent = value
        this.ds.parentId= value.id
        console.log(this.ds);
        
      }
    )
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
      this.srv.saveorgitem(this.ds).subscribe(
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
