import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})


export class globalService {
  constructor(
    private _snackBar: MatSnackBar
  ) { }
  
  host:string = 'http://192.168.10.251:7056'
  // host:string = 'http://192.168.5.33:5000'
  // host:string = 'https://pkfoback.qazna24.kz'
  
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  private tabsSubject = new BehaviorSubject<{ label: string, component: any, inputs?:any, paramlabel?:any }[]>([]);
  tabs$ = this.tabsSubject.asObservable();
  currentIndex:number = 0;

  

  
  addTab(tab: { label: string, component: any, inputs?: any, paramlabel?:any}) {   
    const currentTabs = this.tabsSubject.value;
    this.tabsSubject.next([...currentTabs, tab]);
  }




  removeTab(index: number) {
    const currentTabs = this.tabsSubject.value;
    if (index==9999) {
      index = this.currentIndex
    }
    currentTabs.splice(index, 1);
    this.tabsSubject.next([...currentTabs]);
  }
  



  sms(text:string, action:string) {
    this._snackBar.open(text, action, {
      duration: 3000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }

}


export const MY_FORMATS = {
  parse: {
    dateInput: 'DD.MM.YYYY HH:SS',
  },
  display: {
    dateInput: 'DD.MM.YYYY HH:SS',
    monthYearLabel: 'DD MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'DD MMMM YYYY',
  },
};
