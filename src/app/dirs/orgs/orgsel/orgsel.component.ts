import { Component, inject, Inject, ViewChild } from '@angular/core';
import { orgService } from '../org.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatTable, MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-orgsel',
  standalone: true,
  imports: [MatTableModule, MatIconModule, FormsModule, CommonModule],
  templateUrl: './orgsel.component.html',
  styleUrl: './orgsel.component.css'
})
export class OrgselComponent {
  ds:any
  search = ''
  readonly dialogRef = inject(MatDialogRef<OrgselComponent>);
  displayCols: string[] = ['nomer', '_organization_namekaz', '_organization_namerus', 'action'];
  @ViewChild(MatTable) table: MatTable<any> | undefined;
  
  constructor(
    private srv: orgService,
    @Inject(MAT_DIALOG_DATA) public dialogData: any
    ) {}


  ngOnInit() {   
    this.srv.getorglist(this.search).subscribe(
      (value:any) => {
        this.ds = value
      }
    )
  }


  openItem(elem:any) {
    this.dialogRef.close(elem)
  }

}
