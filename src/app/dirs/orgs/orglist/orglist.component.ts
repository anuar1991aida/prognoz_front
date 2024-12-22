import { Component, Inject, inject, Optional, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatTable, MatTableModule } from '@angular/material/table';
import { MatDialog,  MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { orgService } from '../org.service';
import { OrgitemComponent } from '../orgitem/orgitem.component';
import { CommonModule } from '@angular/common';
import {PageEvent, MatPaginatorModule} from '@angular/material/paginator';

@Component({
  selector: 'app-orglist',
  standalone: true,
  imports: [
    MatTableModule, MatIconModule, FormsModule, CommonModule, MatPaginatorModule
  ],
  providers:[
    { provide: MAT_DIALOG_DATA, useValue: null },
  ],
  templateUrl: './orglist.component.html',
  styleUrl: './orglist.component.css'
})


export class OrglistComponent {
  data:any = inject(MAT_DIALOG_DATA); //параметры при модальном открытии
  dialog = inject(MatDialog); //переменная для открытия нового модального окна
  dialogRef:any//ссылка на текущее модальное окно

  displayCols: string[] = ['nomer', '_organization_namekaz', '_organization_namerus', 'action'];
  @ViewChild(MatTable) table: MatTable<any> | undefined;
  ds:any
  search = ''
  length = 50;
  pageSize = 10;
  pageIndex = 0;
  pageSizeOptions = [25];
  pageEvent: PageEvent | undefined;

  constructor(
    private srv: orgService,
    @Inject(MAT_DIALOG_DATA) public dialogData: any
    ) {  }


  handlePageEvent(e: PageEvent) {
    this.pageEvent = e;
    this.length = e.length;
    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex;
  }

  setPageSizeOptions(setPageSizeOptionsInput: string) {
    if (setPageSizeOptionsInput) {
      this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
    }
  }


  
  ngOnInit() {   
    this.srv.getorglist(this.search).subscribe(
      (value:any) => {
        this.ds = value
      }
    )
  }

  onSearchClick(clear:boolean) { }


  openItem(elem:any) {
    if (this.data==='modal') {
      this.dialogRef.close(elem)
      return
    }

    this.dialog.open(OrgitemComponent, {
      data: elem,
      width:'35vw',
      maxWidth:'35vw'
    });
  }


  delete(id:string) {
    this.srv.delorgitem(id).subscribe(
      (value:any)=>{
        console.log(value);
        this.ngOnInit()
      }
    )
  }
}
