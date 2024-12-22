import { Component, Inject, Input } from '@angular/core';
import { globalService } from '../../../globalsrv';
import { MatDialog } from '@angular/material/dialog';
import { pkfoService } from '../pkfo.service';
import { FormsModule } from '@angular/forms';
import { MatTable, MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';
import { MatInputModule } from '@angular/material/input';
import {MatMenuModule} from '@angular/material/menu';
import { Pril6_activsComponent } from '../prilozhenie6_activs/pril6activs.component';
import { Pril6_obligsComponent } from '../prilozhenie6_oblig/pril6obligs.component';

import { OrgselComponent } from '../../../dirs/orgs/orgsel/orgsel.component';
import { Pril6_incsComponent } from '../prilozhenie6_incs/pril6incs.component';


@Component({
  selector: 'app-pkfo',
  standalone: true,
  imports: [FormsModule, MatTableModule, MatFormFieldModule, CommonModule, MatTabsModule, MatInputModule, MatMenuModule],
  templateUrl: './pkfo.component.html',
  styleUrl: './pkfo.component.css'
})

export class PkfoComponent {
  @Input() data:any;

  zagolovs_pkfo1 = ['001', '101', '201', '301', '401']
  zagolovs_pkfo2 = ['010', '014', '030', '100', '110', '130', '140', '200', '300']
  zagolovs_pkfo3 = ['001', '100', '010', '200', '300', '400', '500', '600', '700', '800', '900', '910']
  zagolovs_pkfo4 = ['010', '030', '040', '060']

  ds:any
  pkfo1:any = []
  pkfo2:any = []
  pkfo3:any = []
  pkfo4:any = []
  pkfo1columns: string[] = ['specification_name', 'specification_code', 'fact', 'estimate', 'prediction1', 'prediction2', 'prediction3'];


  constructor(
    // @Inject('inputs') private inputs: any,
    private srv: pkfoService, 
    private gl:globalService,
    public dialog: MatDialog 
    ) { 
  
     }





  ngOnInit() {      
    this.srv.getitem(this.data).subscribe(
        (value:any)=>{
          this.ds = value
        }
      )


    this.srv.getPKFO(this.data, 1).subscribe(
      (value:any)=>{
        this.pkfo1 = value
        this.itogi_PKFO1()
      }
    )

    this.srv.getPKFO(this.data, 2).subscribe(
      (value)=>{
        this.pkfo2 = value
        this.itogi_PKFO2()
      }
    )

    this.srv.getPKFO(this.data, 3).subscribe(
      (value)=>{
        this.pkfo3 = value
        this.itogi_PKFO3()
      }
    )

    this.srv.getPKFO(this.data, 4).subscribe(
      (value)=>{
        this.pkfo4 = value
        this.itogi_PKFO4()
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


// Функция для получения новых данных типо очистка или перезаполнить
  newPKFO(num:number) {
    this.srv.getPKFO(0, num).subscribe(
      (value)=>{
        switch (num) {
          case 1:this.pkfo1 = value; break;
          case 2:this.pkfo2 = value; break;
          case 3:this.pkfo3 = value; break;
          case 4:this.pkfo4 = value; break;
        }
      }
    )
  }



  savedoc() {
    this.srv.savedoc(this.ds).subscribe(
      (value:any)=>{
        if ([200, 201, 202, 203, 204].includes(value.status)) {
          this.ds = value.body  
          this.gl.sms('Документ успешно сохранен', 'Ok')
          this.savePKFO(1)
          this.savePKFO(2)
          this.savePKFO(3)
          this.savePKFO(4)
        }      
      }
    )
  }

  
  openPril(tip:string) {
    if (tip==='activs') {
      this.gl.addTab({ label: 'dsgsdgsdgsd', component: Pril6_activsComponent, inputs:{data:this.ds.id}, paramlabel:'Активы' });
    } else if (tip === 'obligs') {
      this.gl.addTab({ label: 'dsgsdgsdgsd', component: Pril6_obligsComponent, inputs:{data:this.ds.id}, paramlabel:'Обязательства' });
    } else if (tip === 'incs') {
      this.gl.addTab({ label: 'dsgsdgsdgsd', component: Pril6_incsComponent, inputs:{data:this.ds.id}, paramlabel:'Доходы и расходы' });
    }
    
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


  savePKFO(num:number) {
    if (num===1) {
      this.pkfo1.forEach((element:any) => {
        element.docId = this.ds.id
      });
      
      this.srv.savepkfo(this.data, this.pkfo1).subscribe(
        (value)=>{
          if ([200, 201, 202, 203, 204].includes(value.status)) {
            this.pkfo1 = value.body  
            // this.gl.sms('Таблица ПКФО №1 успешно сохранен', 'Ok')
          }         
        }
      )
    } else if (num===2) {
      this.pkfo2.forEach((element:any) => {
        element.docId = this.ds.id
      });

      this.srv.savepkfo(this.data, this.pkfo2).subscribe(
        (value)=>{
          if ([200, 201, 202].includes(value.status)) {
            this.pkfo2 = value.body  
            // this.gl.sms('Таблица ПКФО №2 успешно сохранен', 'Ok')
          }         
        }
      )
    }  else if (num===3) {
      this.pkfo3.forEach((element:any) => {
        element.docId = this.ds.id
      });

      this.srv.savepkfo(this.data, this.pkfo3).subscribe(
        (value)=>{
          if ([200, 201, 202].includes(value.status)) {
            this.pkfo3 = value.body  
            // this.gl.sms('Таблица ПКФО №3 успешно сохранен', 'Ok')
          }         
        }
      )
    }  else if (num===4) {
      this.pkfo4.forEach((element:any) => {
        element.docId = this.ds.id
      });

      this.srv.savepkfo(this.data, this.pkfo4).subscribe(
        (value)=>{
          if ([200, 201, 202].includes(value.status)) {
            this.pkfo4 = value.body  
            // this.gl.sms('Таблица ПКФО №4 успешно сохранен', 'Ok')
          }         
        }
      )
    }
    
  }


  itogi_PKFO1() {
    const a = [
      { 
        row:'100',
        mas:['010', '011', '012', '013', '014', '015', '016', '017', '018', '019', '020', '021', '022', '023']
      },
      {
        row:'200',
        mas:['110', '111', '112', '113', '114', '115', '116', '117', '118', '119', '120']
      },
      {
        row:'300',
        mas:['210', '211', '212', '213', '214', '215', '216', '217', '218', '219', '220', '221', '222', '223', '224']
      },
      {
        row:'400',
        mas:['310', '311', '312', '313', '314', '315']
      },
      {
        row:'500',
        mas:['410', '411', '412']
      }
    ]

    a.forEach(b => {
      let js = {
          fact:0,
          estimate:0,
          prediction1:0,
          prediction2:0,
          prediction3:0  
      }

      this.pkfo1.forEach((element:any) => {
        if (b.mas.includes(element.rowCode)) {
          js.fact += element.fact   
          js.estimate += element.estimate  
          js.prediction1 += element.prediction1  
          js.prediction2 += element.prediction2  
          js.prediction3 += element.prediction3  
        }

        let foundItem = this.pkfo1.find((item:any) => item.rowCode === b.row);
        foundItem.fact = js.fact
        foundItem.estimate = js.estimate
        foundItem.prediction1 = js.prediction1     
        foundItem.prediction2 = js.prediction2   
        foundItem.prediction3 = js.prediction3    
      });
    });
    
    
    

  }


  itogi_PKFO2() {
    const a = [
      { 
        row:'010',
        mas:['011', '012', '013', '014']
      },
      {
        row:'014',
        mas:['015', '016', '017', '018', '019']
      },
      {
        row:'030',
        mas:['031', '032']
      },
      {
        row:'100',
        mas:['010', '020', '030', '040']
      },
      {
        row:'110',
        mas:['111', '112', '113', '114', '115', '116', '117', '118', '119', '120', '121', '122', '123']
      },
      {
        row:'130',
        mas:['131', '132', '133', '134', '135', '136', '137']
      },
      {
        row:'140',
        mas:['141', '142']
      },
      {
        row:'200',
        mas:['110', '130', '140', '150']
      },
      {
        row:'300',
        mas:['100', '200', '210', '220', '230', '240']
      }
    ]

    a.forEach(b => {
      let js = {
          fact:0,
          estimate:0,
          prediction1:0,
          prediction2:0,
          prediction3:0  
      }

      this.pkfo2.forEach((element:any) => {
        if (b.mas.includes(element.rowCode)) {
          if (b.row === '300' && element.rowCode === '200') {
            js.fact -= element.fact   
            js.estimate -= element.estimate  
            js.prediction1 -= element.prediction1  
            js.prediction2 -= element.prediction2  
            js.prediction3 -= element.prediction3 
          } else {
            js.fact += element.fact   
            js.estimate += element.estimate  
            js.prediction1 += element.prediction1  
            js.prediction2 += element.prediction2  
            js.prediction3 += element.prediction3 
          }
           
        }

        let foundItem = this.pkfo2.find((item:any) => item.rowCode === b.row);
        foundItem.fact = js.fact
        foundItem.estimate = js.estimate
        foundItem.prediction1 = js.prediction1     
        foundItem.prediction2 = js.prediction2   
        foundItem.prediction3 = js.prediction3    
      });
    });
    
    
    

  }


  itogi_PKFO3() {
    const a = [
      {
        row:'100',
        mas:['010', '017', '020', '030', '040', '050', '060']
      },
      {
        row:'010',
        mas:['011', '012', '013', '014', '015', '016', '017']
      },
      {
        row:'200',
        mas:['110', '120', '130', '140', '150', '160', '170', '180', '190']
      },
      {
        row:'300',
        mas:['100', '200']
      },
      {
        row:'400',
        mas:['310', '320', '330', '340', '350']
      },
      {
        row:'500',
        mas:['410', '420', '430', '440', '450', '460']
      },
      {
        row:'600',
        mas:['400', '500']
      },
      {
        row:'700',
        mas:['610', '620']
      },
      {
        row:'800',
        mas:['710', '720']
      },
      {
        row:'900',
        mas:['700', '800']
      },
      {
        row:'910',
        mas:['300', '600', '900']
      }
    ]

    a.forEach(b => {
      let js = {
          fact:0,
          estimate:0,
          prediction1:0,
          prediction2:0,
          prediction3:0  
      }

      this.pkfo3.forEach((element:any) => {
        if (b.mas.includes(element.rowCode)) {
          if (b.row === '300' && element.rowCode === '200') {
            js.fact -= element.fact   
            js.estimate -= element.estimate  
            js.prediction1 -= element.prediction1  
            js.prediction2 -= element.prediction2  
            js.prediction3 -= element.prediction3 
          } else if (b.row === '600' && element.rowCode === '500') {
            js.fact -= element.fact   
            js.estimate -= element.estimate  
            js.prediction1 -= element.prediction1  
            js.prediction2 -= element.prediction2  
            js.prediction3 -= element.prediction3 
          } else if (b.row === '900' && element.rowCode === '800') {
            js.fact -= element.fact   
            js.estimate -= element.estimate  
            js.prediction1 -= element.prediction1  
            js.prediction2 -= element.prediction2  
            js.prediction3 -= element.prediction3 
          } else {
            js.fact += element.fact   
            js.estimate += element.estimate  
            js.prediction1 += element.prediction1  
            js.prediction2 += element.prediction2  
            js.prediction3 += element.prediction3 
          }
           
        }

        let foundItem = this.pkfo3.find((item:any) => item.rowCode === b.row);
        foundItem.fact = js.fact
        foundItem.estimate = js.estimate
        foundItem.prediction1 = js.prediction1     
        foundItem.prediction2 = js.prediction2   
        foundItem.prediction3 = js.prediction3    
      });
    });
    
    
    

  }
  

  itogi_PKFO4() {
    const a = [
      { 
        row:'010',
        mas:['020', '030']
      },
      {
        row:'030',
        mas:['031']
      },
      {
        row:'040',
        mas:['050', '060']
      },
      {
        row:'060',
        mas:['061']
      }
    ]

    a.forEach(b => {
      let js = {
          fact:0,
          estimate:0,
          prediction1:0,
          prediction2:0,
          prediction3:0  
      }

      this.pkfo4.forEach((element:any) => {
        if (b.mas.includes(element.rowCode)) {
            js.fact += element.fact   
            js.estimate += element.estimate  
            js.prediction1 += element.prediction1  
            js.prediction2 += element.prediction2  
            js.prediction3 += element.prediction3            
        }

        let foundItem = this.pkfo4.find((item:any) => item.rowCode === b.row);
        foundItem.fact = js.fact
        foundItem.estimate = js.estimate
        foundItem.prediction1 = js.prediction1     
        foundItem.prediction2 = js.prediction2   
        foundItem.prediction3 = js.prediction3    
      });
    });

  }


  repeatitog(num:number){
    [1,2,3].forEach(element => {
      switch (num) {
        case 1:this.itogi_PKFO1(); break;
        case 2:this.itogi_PKFO2(); break;
        case 3:this.itogi_PKFO3(); break;
        case 4:this.itogi_PKFO4(); break;
      }
    });
  }


  clodeDoc() {
    this.gl.removeTab(9999)
  }

}
