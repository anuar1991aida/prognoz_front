import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { globalService } from '../../globalsrv';


@Injectable({
  providedIn: 'root'
})

export class svodService {
  constructor(
    private http: HttpClient,
    private global:globalService
    ) {  }



  getlist():any {   
      return this.http.get(this.global.host + "/Svod") 
  }

 
  getitem(id:number):any {
    return this.http.get(this.global.host + "/Svod/"+id)   
  }


  delitem(id:number):any {
    return this.http.delete(this.global.host + "/Svod/"+id)   
  }

  savedoc(data:any):any {
    return this.http.post(this.global.host + "/Svod/" + data.id, data, 
      {observe: 'response'})   
  }


  zapolnit(id_svod:number):any {
    return this.http.get(this.global.host + "/TableSvod/" + id_svod)
  }


  deleteItemTableSvod(id:number) {
    return this.http.delete(this.global.host + "/TableSvod/" + id, {observe: 'response'})
  }

  exportxls(id_doc:number) {
    return this.http.get(this.global.host + `/Svod/excel/xls/${id_doc}`,{ responseType: 'blob' }) 
  }

  viewxlsx(id_doc:number) {
    return this.http.get(this.global.host + `/Svod/excel/html/${id_doc}`,{ responseType: 'text' }) 
  }

  
}


