import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { globalService } from '../../globalsrv';


@Injectable({
  providedIn: 'root'
})

export class pkfoService {
  constructor(
    private http: HttpClient,
    private global:globalService
    ) {  }



  getlist():any {   
      return this.http.get(this.global.host + "/Document") 
  }

 
  getitem(id:number):any {
    return this.http.get(this.global.host + "/Document/"+id)   
  }


  delitem(id:number):any {
    return this.http.delete(this.global.host + "/Document/"+id)   
  }

  savedoc(data:any):any {
    return this.http.post(this.global.host + "/Document/" + data.id, data, 
      {observe: 'response'})   
  }



  getPKFO(id_doc:number, id_pkfo:number) {
    return this.http.get(this.global.host + "/PKFO/" + id_doc + "/" + id_pkfo) 
  }

  savepkfo(id_doc:number, data:any) {
    return this.http.post(this.global.host + "/PKFO", data, 
      {observe: 'response'})   
  }


  getPril6(id_doc:number, data:any) {
    switch (data) {
      case 17:  return this.http.get(this.global.host + "/Table17/" + id_doc); 
      case 26:  return this.http.get(this.global.host + "/Table26/" + id_doc); 
      case 28:  return this.http.get(this.global.host + "/Table28/" + id_doc); 
      case 29:  return this.http.get(this.global.host + "/Table29/" + id_doc); 
      case 30:  return this.http.get(this.global.host + "/Table30/" + id_doc); 
      case 32:  return this.http.get(this.global.host + "/Table32/" + id_doc);
      case 33:  return this.http.get(this.global.host + "/Table33/" + id_doc);
      default:  return this.http.get(this.global.host + "/Table/" + id_doc + "/" + data);
    }
    
  }

  savePril6(data:any, id_table:number) {
      switch (id_table) {
        case 17:  return this.http.post(this.global.host + "/Table17", data, {observe: 'response'}); 
        case 26:  return this.http.post(this.global.host + "/Table26", data, {observe: 'response'}); 
        case 28:  return this.http.post(this.global.host + "/Table28", data, {observe: 'response'}); 
        case 29:  return this.http.post(this.global.host + "/Table29", data, {observe: 'response'}); 
        case 30:  return this.http.post(this.global.host + "/Table30", data, {observe: 'response'});  
        case 32:  return this.http.post(this.global.host + "/Table32", data, {observe: 'response'});
        case 33:  return this.http.post(this.global.host + "/Table33", data, {observe: 'response'}); 
        default:  return this.http.post(this.global.host + "/Table", data, {observe: 'response'}); 
      }
  }















  exportxls(id_doc:number) {
    return this.http.get(this.global.host + `/Document/excel/${id_doc}`,{ responseType: 'blob' }) 
  }

  
}


