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

@Component({
  selector: 'app-pril6-incs',
  standalone: true,
  imports: [FormsModule, MatTableModule, MatFormFieldModule, CommonModule, MatTabsModule, MatInputModule, MatMenuModule],
  templateUrl: './pril6.component.html',
  styleUrl: './pril6.component.css'
})

export class Pril6_incsComponent {
  @Input() data:any;

  tbs:any = []
  tbs_zag = [
    ['100'],//tbl35
    ['100'],//tbl36
    ['100'],//tbl37
  ]
  tbs_cols = [
    ['nameEdited', 'rowCode', 'fact', 'estimate', 'prediction1', 'prediction2', 'prediction3'], //tbl35
    ['specCode', 'nameRus', 'rowCode', 'fact', 'estimate', 'prediction1', 'prediction2', 'prediction3'],//tbl36
    ['specCode', 'nameRus', 'rowCode', 'fact', 'estimate', 'prediction1', 'prediction2', 'prediction3'],//tbl37
  ]

  constructor(
    private srv: pkfoService, 
    private gl:globalService,
    public dialog: MatDialog 
    ) { 
  
     }





  ngOnInit() {         
    this.tbs = [] 
    for (let index = 1; index <= 3; index++) {
      this.srv.getPril6(this.data, index + 34).subscribe(
        (value:any)=>{
          if (value.length===0) {
            this.srv.getPril6(0, index + 34).subscribe(
              (data:any)=>{
                this.tbs[index-1] = data               
              }
            )
          } else {
            this.tbs[index-1] = value
          }
        }
      )            
    }
  }

 
  savedoc() {
    for (let index = 1; index <= 3; index++) {

      for (let bbb = 0; bbb < this.tbs[index-1].length; bbb++) {
        let element = this.tbs[index-1][bbb];
        element.docId = this.data
      }

      this.srv.savePril6(this.tbs[index-1], index + 17).subscribe(
          (value)=>{
              if ([200, 201, 202, 203, 204].includes(value.status)) {
                this.tbs[index-1] = value.body  
              }         
            }
      )
    }
    this.gl.removeTab(9999)
  }


  clodeDoc() {
    this.gl.removeTab(9999)
  }


  itogs(index:number) {
    let js = {
          fact:0,
          estimate:0,
          prediction1:0,
          prediction2:0,
          prediction3:0}


    console.log(this.tbs[index]);
    
  
 
    this.tbs[index].forEach((element:any) => {
          if (['010','011', '012', '013', '014', '015', '016', '017', '018', '019', '020', '021', '022', '023', '024', '025', '026', '027', '029'].includes(element.rowCode)) {
              js.fact += element.fact   
              js.estimate += element.estimate  
              js.prediction1 += element.prediction1  
              js.prediction2 += element.prediction2  
              js.prediction3 += element.prediction3            
          }
  
          let foundItem = this.tbs[index].find((item:any) => item.rowCode === '100');
          foundItem.fact = js.fact
          foundItem.estimate = js.estimate
          foundItem.prediction1 = js.prediction1     
          foundItem.prediction2 = js.prediction2   
          foundItem.prediction3 = js.prediction3    
        });        

    
  }

  raschetItog(i:number) {
    for (let index = 0; index < 3; index++) {
      this.itogs(i)
    }
  }


}
