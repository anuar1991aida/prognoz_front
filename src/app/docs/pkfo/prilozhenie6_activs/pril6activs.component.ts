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
  selector: 'app-pril6-activs',
  standalone: true,
  imports: [FormsModule, MatTableModule, MatFormFieldModule, CommonModule, MatTabsModule, MatInputModule, MatMenuModule],
  templateUrl: './pril6.component.html',
  styleUrl: './pril6.component.css'
})

export class Pril6_activsComponent {
  @Input() data:any;

  tbs:any = []
  tbs_zag = ['100', '200','300', '400', '500']
  tbs_cols = ['specCode', 'nameRus', 'rowCode', 'fact', 'estimate', 'prediction1', 'prediction2', 'prediction3']

  constructor(
    private srv: pkfoService, 
    private gl:globalService,
    public dialog: MatDialog 
    ) { 
  
     }





  ngOnInit() {     
    this.tbs = [] 
    for (let index = 1; index < 18; index++) {
      this.srv.getPril6(this.data, index).subscribe(
        (value:any)=>{
          if (value.length===0) {
            this.srv.getPril6(0, index).subscribe(
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
    for (let index = 1; index < 18; index++) {

      for (let bbb = 0; bbb < this.tbs[index-1].length; bbb++) {
        let element = this.tbs[index-1][bbb];
        element.docId = this.data
      }

      this.srv.savePril6(this.tbs[index-1], index).subscribe(
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
    if (index !=16) {
      const a = [
        { //табл 1
          row:'100',
          mas:['010', '011', '012', '013', '014', '015', '016', '017', '018', '019']
        },
        {//табл 2
          row:'',
          mas:[]
        },
        { //табл 3
          row:'100',
          mas:['010', '011', '012', '013', '014']
        },
        {//табл 4
          row:'',
          mas:[]
        },
        { //табл 5
          row:'100',
          mas:['010', '011', '012', '013', '014', '015', '016', '017', '018', '019', '020']
        },
        {//табл 6
          row:'',
          mas:[]
        },
        { //табл 7
          row:'100',
          mas:['010', '011', '012', '013', '014', '015', '016', '017']
        },
        {//табл 8
          row:'100',
          mas:['011', '012', '013', '014', '015', '016', '017']
        },
        {//табл 9
          row:'100',
          mas:['010', '011', '012', '013', '014', '015', '016', '017']
        },
        {//табл 10
          row:'',
          mas:[]
        },
        {//табл 11
          row:'100',
          mas:['010', '011', '012']
        },
        {//табл 12
          row:'',
          mas:[]
        },
        {//табл 13
          row:'',
          mas:[]
        },
        {//табл 14
          row:'',
          mas:[]
        },
        {//табл 15
          row:'100',
          mas:['010', '011']
        },
        {//табл 16
          row:'',
          mas:[]
        },
        {//табл 17
          row:'',
          mas:[]
        }
      ]

      let js = {
        fact:0,
        estimate:0,
        prediction1:0,
        prediction2:0,
        prediction3:0}

  
      this.tbs[index].forEach((element:any) => {
          if (a[index].mas.includes(element.rowCode)) {
            js.fact += element.fact   
            js.estimate += element.estimate  
            js.prediction1 += element.prediction1  
            js.prediction2 += element.prediction2  
            js.prediction3 += element.prediction3  
          }

          let foundItem = this.tbs[index].find((item:any) => item.rowCode === a[index].row);
          if (foundItem === undefined) {
            return
          }
          foundItem.fact = js.fact
          foundItem.estimate = js.estimate
          foundItem.prediction1 = js.prediction1     
          foundItem.prediction2 = js.prediction2   
          foundItem.prediction3 = js.prediction3       
      });
    } else {
      const a = [
        { 
          row:'100',
          mas:['200', '300', '400']
        },
        {
          row:'200',
          mas:['201', '202', '203', '204', '205', '206', '207']
        },
        {
          row:'300',
          mas:['301', '302']
        },
        {
          row:'400',
          mas:['401', '402', '403']
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
  
        this.tbs[index].forEach((element:any) => {
          if (b.mas.includes(element.rowCode)) {
              js.fact += element.fact   
              js.estimate += element.estimate  
              js.prediction1 += element.prediction1  
              js.prediction2 += element.prediction2  
              js.prediction3 += element.prediction3            
          }
  
          let foundItem = this.tbs[index].find((item:any) => item.rowCode === b.row);
          foundItem.fact = js.fact
          foundItem.estimate = js.estimate
          foundItem.prediction1 = js.prediction1     
          foundItem.prediction2 = js.prediction2   
          foundItem.prediction3 = js.prediction3    
        });        
      });
    }
    

    
    
    
    

  }

  raschetItog(i:number) {
    for (let index = 0; index < 3; index++) {
      this.itogs(i)
    }
  }


}
