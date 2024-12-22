import { Component, inject, ViewChild } from '@angular/core';
import { userService } from '../user.service';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatTable, MatTableModule } from '@angular/material/table';
import { UseritemComponent } from '../useritem/useritem.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-userlist',
  standalone: true,
  imports: [MatIconModule, MatTableModule, FormsModule],
  templateUrl: './userlist.component.html',
  styleUrl: './userlist.component.css'
})
export class UserlistComponent {
  dialog = inject(MatDialog);
  displayCols: string[] = ['username', '_organization_namekaz', '_organization_namerus', 'action'];
  @ViewChild(MatTable) table: MatTable<any> | undefined;
  ds:any
  search = ''

  constructor(
    private srv: userService,
  ) { }

  ngOnInit() {
    this.srv.getlist(this.search).subscribe(
      (value:any) => {
        this.ds = value
      }
    )
  }

  openItem(elem:any) {
    this.dialog.open(UseritemComponent, {
      data: elem,
      width:'35vw',
      maxWidth:'35vw'
    });
  }


  delete(id:string) {
    this.srv.delitem(id).subscribe(
      (value:any)=>{
        console.log(value);
        this.ngOnInit()
      }
    )
  }

}
