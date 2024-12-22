import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatExpansionModule} from '@angular/material/expansion';
import {FormsModule} from '@angular/forms';
import { userService } from '../user.service';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { OrglistComponent } from '../../orgs/orglist/orglist.component';
import { OrgselComponent } from '../../orgs/orgsel/orgsel.component';
import { globalService } from '../../../globalsrv';


@Component({
  selector: 'app-useritem',
  standalone: true,
  imports: [MatInputModule, MatFormFieldModule, FormsModule, MatExpansionModule, MatIconModule],
  templateUrl: './useritem.component.html',
  styleUrl: './useritem.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UseritemComponent {
  pas1 = ''
  pas2 = ''
  dialog = inject(MatDialog);
  readonly dialogRef = inject(MatDialogRef<UseritemComponent>);
  ds:any = inject(MAT_DIALOG_DATA);
  readonly panelOpenState = signal(false);
  
  constructor(
    private gl:globalService,
    private srv: userService,
  ) {       
        if (this.ds==null) 
          {      
            this.ds =  {
              id:"",
              name: "",
              organizationId: "",
              password:'12345678',
              organization: ""
            }
          }  
    }


  selOrg() {   
    const dial = this.dialog.open(OrgselComponent, {
      data: 'modal',
      width:'50vw',
      maxWidth:'50vw',
      maxHeight:'75vh'
    });

    dial.afterClosed().subscribe(
      (value:any)=>{
        let a = this.ds
        a.organization = value
        a.organizationId= value.id
        this.ds = a
        console.log(this.ds);
        console.log(value);
        
        
      }
    )
  }


  save() {
    if (this.ds.id=='') {
      this.srv.saveitem(this.ds).subscribe(
        (value:any)=>{
          console.log(value)
          this.dialogRef.close(true)
          this.gl.sms("Пароль по умолчанию: 123456789!","Ok")
        },
        (error:any)=>{
          console.log(error);
        }
      )
    } else {
      this.srv.edititem(this.ds.id, this.ds).subscribe(
        (value:any)=>{
          this.dialogRef.close(true)
        },
        (error:any)=>{
        }
      )
    }
    
  }


  changepassword() {

    if (this.ds.id==='') {
      this.gl.sms("Сначала сохраните пользователя!","Ok")
      return
    }

    if (this.pas1===this.pas2) {
      const body = {
        name: this.ds.name,
        password: this.pas1
      }
      console.log(body);
      

      this.srv.changepas(body).subscribe(
        (value:any)=>{
          this.gl.sms("Пароль успешно сменился!","Ok")
        },
        (error:any)=>{
        }
      )
    } else {
      this.gl.sms("Введенные пароли не совпадают!","Ok")
    }
    
  }

  cancel() {
    this.dialogRef.close(false)
  }

}
