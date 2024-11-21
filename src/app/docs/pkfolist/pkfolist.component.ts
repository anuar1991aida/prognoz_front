import { Component, ViewChild } from '@angular/core';
import {FormsModule} from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import {MatTable, MatTableModule} from '@angular/material/table';


@Component({
  selector: 'app-pkfolist',
  standalone: true,
  imports: [
    MatTableModule, MatIconModule, FormsModule
  ],
  templateUrl: './pkfolist.component.html',
  styleUrl: './pkfolist.component.css'
})
export class PkfolistComponent {
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


  onSearchClick(clear:boolean) { }
  openItem(elem:any) {}
  delete(id:number) {}
}
