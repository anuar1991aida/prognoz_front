import { Component, Inject, Input } from '@angular/core';
import { globalService } from '../../../globalsrv';
import { MatDialog } from '@angular/material/dialog';
import { svodService } from '../svod.service';
import { FormsModule } from '@angular/forms';
import { MatTable, MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';
import { MatInputModule } from '@angular/material/input';
import {MatMenuModule} from '@angular/material/menu';
import { OrgselComponent } from '../../../dirs/orgs/orgsel/orgsel.component';
import { MatIconModule } from '@angular/material/icon';
import { YesnodialogComponent } from '../../../dirs/yesnodialog/yesnodialog.component';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import {ProgressSpinnerMode, MatProgressSpinnerModule} from '@angular/material/progress-spinner';

@Component({
  selector: 'app-svoditem',
  standalone: true,
  imports: [FormsModule, MatTableModule, MatFormFieldModule, CommonModule, MatTabsModule, MatInputModule, MatMenuModule, MatIconModule,MatProgressSpinnerModule],
  templateUrl: './svoditem.component.html',
  styleUrl: './svoditem.component.css'
})

export class SvodItemComponent {
  @Input() data:any;
  ds:any
  tbl:any
  displayCols: string[] = ['nomer', '_organization', 'action'];
  public urlSafe: any = '';
  loading = false
  rotation = 0
  private timerId: any;
  
  constructor(
    public sanitizer: DomSanitizer,
    private srv: svodService, 
    private gl:globalService,
    public dialog: MatDialog 
    ) {  }


    startSpinner() {
      this.timerId = setInterval(() => {
        this.rotation = (this.rotation + 5) % 360; // Увеличиваем угол
      }, 16); // ~60 FPS (16ms)
    }
  
    stopSpinner() {
      if (this.timerId) {
        clearInterval(this.timerId); // Остановка таймера
      }
    }


  ngOnInit() {      
    this.srv.getitem(this.data).subscribe(
        (value:any)=>{
          this.ds = value.docSvod
          this.tbl = value.tableSvod
          // this.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(this.urlDoc);
        }
      )    
  }


  openOrgSel() {
    const dial = this.dialog.open(OrgselComponent, {
      width:'35vw',
      maxWidth:'35vw',
      height:'75vh',
      maxHeight:'75vh',
    });

    dial.afterClosed().subscribe(
      (value:any)=>{
        this.ds.organization = value
        this.ds.organizationId= value.id
        console.log(this.ds);
        
      }
    )
  }


  zapolnit() {
    this.srv.zapolnit(this.ds.id).subscribe(
      (value:any)=>{
        this.urlSafe = ''
        this.tbl = value
      }
    )
  }


  savedoc() {
    this.srv.savedoc(this.ds).subscribe(
      (value:any)=>{
        if ([200, 201, 202, 203, 204].includes(value.status)) {
          this.ds = value.body  
          this.gl.sms('Документ успешно сохранен', 'Ok')
        } 
      }
    )
  }

  
  delete(id:number) {
    const deleteDial = this.dialog.open(YesnodialogComponent, {
      data: 'Отклонить выбранный документ?', 
      width:'35vw',
      maxWidth:'35vw',
      height:'15vh',
      maxHeight:'15vh',
    });


    deleteDial.afterClosed().subscribe(
      (value:any)=>{
        if (value===true) {
          this.srv.deleteItemTableSvod(id).subscribe(
            (resp:any)=>{
              if ([200, 201, 202, 203, 204].includes(resp.status)) {
                this.tbl = this.tbl.filter((element: any) => element.id !== id);
                this.gl.sms('Документ успешно отклонен', 'Ok')
              } 
            }
          )     
        }        
      }
    )

  }


  exportxls() {
    this.srv.exportxls(this.data).subscribe(blob => {
      const a = document.createElement('a');
      const objectUrl = URL.createObjectURL(blob);
      a.href = objectUrl;
      a.download = 'ПКФО_УОР.xlsx';
      a.click();
      URL.revokeObjectURL(objectUrl);
    })  
  }


  viewXLSX() {
    if (this.loading) {
      this.gl.sms('На данный момент отчет формируется. Подождите...', 'Ок')
      return
    }

    if (this.urlSafe != '') {
      return
    }

    this.startSpinner()
    this.urlSafe = ''
    this.loading = true
    this.srv.viewxlsx(this.data).subscribe(
      (resp) => {
      this.urlSafe = this.sanitizer.bypassSecurityTrustHtml(resp);
      this.loading = false
      this.stopSpinner()
    },
    (error)=>{
      this.gl.sms('Ошибка на сервере. попробуйте позднее...', 'Ок')
      this.loading = false
      this.stopSpinner()
    })  
  }


  onTabChange(event: any): void {
    const selectedIndex = event.index; // Индекс активного таба
    if (selectedIndex === 1) {
      this.viewXLSX();
    }
  }





  clodeDoc() {
    this.gl.removeTab(9999)
  }

}
