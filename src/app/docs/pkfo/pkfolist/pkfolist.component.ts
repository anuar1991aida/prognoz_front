import { Component, inject, ViewChild } from '@angular/core';
import {FormsModule} from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import {MatTable, MatTableModule} from '@angular/material/table';
import { pkfoService } from '../pkfo.service';
import { provideNativeDateAdapter } from '@angular/material/core';
import { globalService, MY_FORMATS } from '../../../globalsrv';
import { MatDialog } from '@angular/material/dialog';
import { PkfoComponent } from '../pkfoitem/pkfo.component';
import { YesnodialogComponent } from '../../../dirs/yesnodialog/yesnodialog.component';


@Component({
  selector: 'app-pkfolist',
  standalone: true,
  imports: [
    MatTableModule, MatIconModule, FormsModule
  ],
  providers: [provideNativeDateAdapter(MY_FORMATS)],
  templateUrl: './pkfolist.component.html',
  styleUrl: './pkfolist.component.css'
})
export class PkfolistComponent {
  dialog = inject(MatDialog);
  displayCols: string[] = ['nomer', '_date', '_organization', 'action'];
  @ViewChild(MatTable) table: MatTable<any> | undefined;
  ds:any
  search = ''

  constructor(
    private srv: pkfoService,
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
      this.global.addTab({ label: 'dsgsdgsdgsd', component: PkfoComponent,inputs:{data:0}, paramlabel:'Документ ПКФО' });
    } else {
      this.global.addTab({ label: 'dsgsdgsdgsd', component: PkfoComponent,inputs:{data:elem.id}, paramlabel:'Документ ПКФО' });
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
