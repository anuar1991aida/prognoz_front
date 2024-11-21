import { Component, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatTable, MatTableModule } from '@angular/material/table';
import { orgService } from '../org.service';

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
  displayCols: string[] = ['nomer', '_date', '_organization', 'action'];
  @ViewChild(MatTable) table: MatTable<any> | undefined;
  ds:any = {
    results:[
      {
        nom:'23465',
        _date:'21-05-2024',
        _organization:{
          name_rus:'jsoft'
        }
      },
      {
        nom:'56655',
        _date:'01-05-2024',
        _organization:{
          name_rus:'ip nurjan'
        }
      }
    ]
  }
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
  openItem(elem:any) {}
  delete(id:number) {}
}
