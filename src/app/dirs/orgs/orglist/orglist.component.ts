import { Component, inject, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatTable, MatTableModule } from '@angular/material/table';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogTitle,
  MatDialogContent,
} from '@angular/material/dialog';

import { orgService } from '../org.service';
import { OrgitemComponent } from '../orgitem/orgitem.component';

@Component({
  selector: 'app-orglist',
  standalone: true,
  imports: [
    MatTableModule, MatIconModule, FormsModule
  ],
  templateUrl: './orglist.component.html',
  styleUrl: './orglist.component.css'
})


export class OrglistComponent {
  dialog = inject(MatDialog);
  displayCols: string[] = ['nomer', '_organization_namekaz', '_organization_namerus', 'action'];
  @ViewChild(MatTable) table: MatTable<any> | undefined;
  ds:any
  search = ''

  constructor(
    private srv: orgService,
  ) { }

  ngOnInit() {
    this.srv.getorglist('').subscribe(
      (value:any) => {
        this.ds = value
      }
    )
  }

  onSearchClick(clear:boolean) { }


  openItem(elem:any) {
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
