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
  selector: 'app-pril6-obligs',
  standalone: true,
  imports: [FormsModule, MatTableModule, MatFormFieldModule, CommonModule, MatTabsModule, MatInputModule, MatMenuModule],
  templateUrl: './pril6.component.html',
  styleUrl: './pril6.component.css'
})

export class Pril6_obligsComponent {
  @Input() data:any;

  tbs:any = []
  tbs_zag = [
    ['017', '021','100'],//tbl18
    ['200', '300'],//tbl19
    ['100'],   //tbl20
    ['100'],   //tbl21
    [],        //tbl22
    ['017', '100'],//tbl23
    ['100', '200', '300', '400'],//tbl24
    ['100'],//tbl25
    ['100'],//tbl26
    ['100', '400'],//tbl27
    ['100'],//tbl28
    ['100'],//tbl29
    ['100'],//tbl30
    ['100', '400'],//tbl31
    ['100'],//tbl32
    ['100'],//tbl33
    [''],//tbl33
  ]
  tbs_cols = [
    ['specCode', 'nameRus', 'rowCode', 'fact', 'estimate', 'prediction1', 'prediction2', 'prediction3'], //tbl18
    ['nameRus', 'rowCode', 'fact', 'estimate', 'prediction1', 'prediction2', 'prediction3'],//tbl19
    ['nameRus', 'rowCode', 'fact', 'estimate', 'prediction1', 'prediction2', 'prediction3'],//tbl20
    ['specCode', 'nameRus', 'rowCode', 'fact', 'estimate', 'prediction1', 'prediction2', 'prediction3'],//tbl21
    ['nameRus', 'rowCode', 'fact', 'estimate', 'prediction1', 'prediction2', 'prediction3'],//tbl22
    ['specCode', 'nameRus', 'rowCode', 'fact', 'estimate', 'prediction1', 'prediction2', 'prediction3'],//tbl23
    ['nameRus', 'rowCode', 'fact', 'estimate', 'prediction1', 'prediction2', 'prediction3'],//tbl24
    ['nameRus', 'rowCode', 'fact', 'estimate', 'prediction1', 'prediction2', 'prediction3'],//tbl25
    ['nameRus', 'rowCode', 'signDate', 'registerDate', 'paymentPeriod',  'fact', 'estimate', 'prediction1', 'prediction2', 'prediction3'],//tbl26
    ['nameRus', 'rowCode', 'fact', 'estimate', 'prediction1', 'prediction2', 'prediction3'],//tbl27
    ['nameRus', 'rowCode', 'signDate', 'registerDate', 'investmentCosts', 'operatingCosts', 'otherCosts', 'totalCosts',  'fact', 'estimate', 'prediction1', 'prediction2', 'prediction3'],//tbl28
    ['nameRus', 'rowCode', 'signDate', 'registerDate', 'investmentCosts', 'operatingCosts', 'otherCosts', 'totalCosts',  'totalRepaymentAmount', 'balance'],//tbl29
    ['nameRus', 'rowCode', 'signDate', 'registerDate', 'paymentPeriod',  'fact', 'estimate', 'prediction1', 'prediction2', 'prediction3'],//tbl30
    ['nameRus', 'rowCode', 'fact', 'estimate', 'prediction1', 'prediction2', 'prediction3'],//tbl31
    ['nameRus', 'rowCode', 'signDate', 'registerDate', 'totalCosts',  'fact', 'estimate', 'prediction1', 'prediction2', 'prediction3'],//tbl32
    ['nameRus', 'rowCode', 'signDate', 'registerDate', 'investmentCosts', 'operatingCosts', 'otherCosts', 'totalCosts',  'totalRepaymentAmount', 'balance'],//tbl33
    ['nameRus', 'rowCode', 'fact', 'estimate', 'prediction1', 'prediction2', 'prediction3'],//tbl34
  ]

  constructor(
    private srv: pkfoService, 
    private gl:globalService,
    public dialog: MatDialog 
    ) { 
  
     }





  ngOnInit() {         
    this.tbs = [] 
    for (let index = 1; index <= 17; index++) {
      this.srv.getPril6(this.data, index + 17).subscribe(
        (value:any)=>{
          if (value.length===0) {
            this.srv.getPril6(0, index + 17).subscribe(
              (data:any)=>{
                this.tbs[index-1] = data               
              }
            )
          } else {
            this.tbs[index-1] = value
          }

          this.raschetItog(index-1)
        }
      )            
    }
  }

 
  savedoc() {
    for (let index = 1; index <= 17; index++) {

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
    const a = [
        [ //18
          { 
            row:'017',
            mas:['010', '011', '012', '013', '014', '015', '016']
          },
          {
            row:'021',
            mas:['018', '019', '020']
          },
          {
            row:'100',
            mas:['010', '011', '012', '013', '014', '015', '016', '018', '019', '020']
          }
        ],
        [ //19
          { 
            row:'200',
            mas:['201']
          },
          {
            row:'300',
            mas:['301', '302']
          }
        ],
        [//20
          { 
            row:'100',
            mas:['010', '011', '012']
          }
        ],
        [//21
          { 
            row:'100',
            mas:['010', '011', '012', '013']
          }
        ],
        [//22
          { 
            row:'',
            mas:[]
          }
        ],
        [//23
          { 
            row:'017',
            mas:['010', '011', '012', '013', '014', '015', '016']
          },
          {
            row:'100',
            mas:['017', '018']
          }
        ],
        [//24
          { 
            row:'100',
            mas:['101', '102']
          },
          {
            row:'200',
            mas:['201']
          },
          {
            row:'300',
            mas:['301', '302']
          },
          {
            row:'400',
            mas:['401', '402']
          }
        ],
        [//25
          { 
            row:'100',
            mas:['010', '011', '012']
          }
        ],
        [//26
          { 
            row:'100',
            mas:['010', '020', '030', '040', '050', '060', '070', '080', '090']
          }
        ],
        [//27
          { 
            row:'100',
            mas:['101', '102']
          },
          {
            row:'400',
            mas:['401', '402']
          }
        ],
        [//28
          { 
            row:'100',
            mas:['010', '020', '030', '040', '050']
          }
        ],
        [//29
          { 
            row:'100',
            mas:['010', '011', '012', '013', '014', '015', '016', '018', '019']
          }
        ],
        [//30
          { 
            row:'100',
            mas:['010', '011', '012', '013', '014', '015', '016', '018', '019']
          }
        ],
        [//31
          { 
            row:'100',
            mas:['101', '102']
          },
          { 
            row:'400',
            mas:['401', '402']
          }
        ],
        [//32
          { 
            row:'100',
            mas:['010', '011', '012', '013', '014', '015', '016', '018', '019']
          }
        ],
        [//33
          { 
            row:'100',
            mas:['010', '011', '012', '013', '014', '015', '016', '018', '019']
          }
        ],
        [//34
          { 
            row:'',
            mas:[]
          }
        ],
    ]
  
    a[index].forEach(b => {
        let js = {
            fact:0,
            estimate:0,
            prediction1:0,
            prediction2:0,
            prediction3:0,
            totalRepaymentAmount:0,
            totalCosts:0,
            otherCosts:0,
            operatingCosts:0,
            investmentCosts:0
        }
  
        this.tbs[index].forEach((element:any) => {
          if (b.mas.includes(element.rowCode)) {
              js.fact += element.fact   
              js.estimate += element.estimate  
              js.prediction1 += element.prediction1  
              js.prediction2 += element.prediction2  
              js.prediction3 += element.prediction3
              js.totalRepaymentAmount += element.totalRepaymentAmount 
              js.totalCosts += element.totalCosts 
              js.otherCosts += element.otherCosts 
              js.operatingCosts += element.operatingCosts 
              js.investmentCosts += element.investmentCosts            
          }
  
          let foundItem = this.tbs[index].find((item:any) => item.rowCode === b.row);
          if (foundItem===undefined) {return}
          foundItem.fact = js.fact
          foundItem.estimate = js.estimate
          foundItem.prediction1 = js.prediction1     
          foundItem.prediction2 = js.prediction2   
          foundItem.prediction3 = js.prediction3  
          foundItem.totalRepaymentAmount = js.totalRepaymentAmount 
          foundItem.totalCosts = js.totalCosts 
          foundItem.otherCosts = js.otherCosts 
          foundItem.operatingCosts = js.operatingCosts 
          foundItem.investmentCosts = js.investmentCosts  
        });        
      });

  }

  raschetItog(i:number) {
    for (let index = 0; index < 3; index++) {
      this.itogs(i)
    }
  }


}
