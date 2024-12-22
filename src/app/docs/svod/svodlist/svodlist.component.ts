import { Component, inject, ViewChild } from '@angular/core';
import {FormsModule} from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import {MatTable, MatTableModule} from '@angular/material/table';
import { svodService } from '../svod.service';
import { provideNativeDateAdapter } from '@angular/material/core';
import { globalService, MY_FORMATS } from '../../../globalsrv';
import { MatDialog } from '@angular/material/dialog';
// import { PkfoComponent } from '../pkfoitem/pkfo.component';
import { YesnodialogComponent } from '../../../dirs/yesnodialog/yesnodialog.component';
import { SvodItemComponent } from '../svoditem/svoditem.component';


@Component({
  selector: 'app-svodlist',
  standalone: true,
  imports: [
    MatTableModule, MatIconModule, FormsModule
  ],
  providers: [provideNativeDateAdapter(MY_FORMATS)],
  templateUrl: './svodlist.component.html',
  styleUrl: './svodlist.component.css'
})
export class SvodlistComponent {
  dialog = inject(MatDialog);
  displayCols: string[] = ['nomer', '_date', '_organization', 'action'];
  @ViewChild(MatTable) table: MatTable<any> | undefined;
  ds:any
  search = ''

  constructor(
    private srv: svodService,
    private global:globalService
    ) {}

  ngOnInit() {
    this.srv.getlist().subscribe(
      (value:any)=>{
        this.ds = value
      }
    )
  }



  openItem(elem:any) {
    if (elem===null) {
      this.global.addTab({ label: 'dsgsdgsdgsd', component: SvodItemComponent,inputs:{data:0}, paramlabel:'Свод №1' });
    } else {
      this.global.addTab({ label: 'dsgsdgsdgsd', component: SvodItemComponent,inputs:{data:elem.id}, paramlabel:'Свод №1' });
    }
  }


  delete(id:number) {
    const dial = this.dialog.open(YesnodialogComponent, {
      data:'Удалить документ?'
    })

    dial.afterClosed().subscribe(
      (value:boolean) => {
        if (!value) {return}
        this.srv.delitem(id).subscribe(
          (value:any)=>{
            this.ds = value
          }
        )
      }
    )

    
  }
  
}
