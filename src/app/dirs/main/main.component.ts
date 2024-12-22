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
import { globalService } from '../../globalsrv';
import { PkfolistComponent } from '../../docs/pkfo/pkfolist/pkfolist.component';
import { SvodlistComponent } from '../../docs/svod/svodlist/svodlist.component';
import { OrglistComponent } from '../orgs/orglist/orglist.component';
import { SpecComponent } from '../spec/spec.component';
import { FkrComponent } from '../fkr/fkr.component';
import { UserlistComponent } from '../users/userlist/userlist.component';


export interface tabinterface {
  label:string;
  component:any;
  inputs?:any;
  paramlabel?:any
}

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [CommonModule, RouterOutlet, MatToolbarModule, MatMenuModule, MatButtonModule, MatIconModule, MatTabsModule, MatIconModule],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent {
  title = 'pkfo';
  role = 'user'
  selected = new FormControl(0);
  inputs:any
  tabs:tabinterface[] = [];

  constructor(
    private tabService: globalService,
    private router:Router
  ) {}

  ngOnInit() {
    if (localStorage.getItem('auth_token')==='') {
      this.router.navigate(['/'])
    }

    this.role = localStorage.getItem('role') || 'user'

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
        this.tabService.addTab({ label: 'dsgsdgsdgsd', component: PkfolistComponent, paramlabel:'Список ПКФО' });
        break;
      case 'app-svod':
        this.tabService.addTab({ label: 'dsgsdgsdgsd', component: SvodlistComponent, paramlabel:'Свод ПКФО' });
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

  exit() {
    this.router.navigate(['/'])
  }

}
