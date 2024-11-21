import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Router } from '@angular/router';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FormControl } from '@angular/forms';
import { MatTabsModule } from '@angular/material/tabs';
import { CommonModule } from '@angular/common';
import { globalService } from './globalsrv';
import { PkfoComponent } from './docs/pkfo/pkfo.component';
import { PkfolistComponent } from './docs/pkfolist/pkfolist.component';
import { OrglistComponent } from './dirs/orgs/orglist/orglist.component';
import { SpecComponent } from './dirs/spec/spec.component';
import { FkrComponent } from './dirs/fkr/fkr.component';
import { UserlistComponent } from './dirs/users/userlist/userlist.component';


export interface tabinterface {
  label:string;
  component:any;
  inputs?:any;
  paramlabel?:any
}


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, MatToolbarModule, MatMenuModule, MatButtonModule, MatIconModule, MatTabsModule, MatIconModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'pkfo';
  selected = new FormControl(0);
  inputs:any
  tabs:tabinterface[] = [
  ];

  constructor(
    private tabService: globalService,
  ) {}


  ngOnInit() {
    // Подписываемся на изменение табс, чтобы при добавлении сразу прорисовывать
    this.tabService.tabs$.subscribe(tabs => {
      this.tabs = tabs; 
      this.selected.setValue(this.tabs.length - 1);
    });

    if (this.tabs.length>0) {
      return
    }
  }

  navigate(key:string) {   
    switch (key) {
      case 'app-pkfo':
        this.tabService.addTab({ label: 'dsgsdgsdgsd', component: PkfolistComponent, paramlabel:'Документы ПКФО' });
        break;
      case 'app-orglist':
        this.tabService.addTab({ label: 'dsgsdgsdgsd', component: OrglistComponent, paramlabel:'Организации' });
        break;
      case 'app-spec':
        this.tabService.addTab({ label: 'dsgsdgsdgsd', component: SpecComponent, paramlabel:'Специфики' });
        break;
      case 'app-fkr':
        this.tabService.addTab({ label: 'dsgsdgsdgsd', component: FkrComponent, paramlabel:'Программы' });
        break;
      case 'app-userlist':
        this.tabService.addTab({ label: 'dsgsdgsdgsd', component: UserlistComponent, paramlabel:'Пользователи' });
        break;
    }
   }


  tabchange(event:any) {
    this.selected.setValue(event)
    // console.log(event);
    this.tabService.currentIndex = event
  }


  removeTab(index: number): void {
    this.tabService.removeTab(index)
  }
}
