import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { globalService } from '../../globalsrv';


@Injectable({
  providedIn: 'root'
})

export class pkfolistService {
  constructor(
    private http: HttpClient,
    private global:globalService
    ) {  }



  getlist(search:string, url:string):any {   
    if (url=='') {

      return this.http.get(this.global.host + "/inc/incdoclist?search="+ search) 
    } else {
      return this.http.get(url)
    } 
  }

  getTypedoclist(search?:string):any {
    return this.http.get(this.global.host + "/dirs/typedoclist?search="+search)   
  }


  getitem(id:number):any {
    return this.http.get(this.global.host + "/inc/incdocitem/"+id)   
  }


  delitem(id:number):any {
    return this.http.delete(this.global.host + "/inc/incdel/"+id)   
  }

  saveitem(data:any):any {
    return this.http.post(this.global.host + "/inc/incdocsave", data, 
      {observe: 'response'})   
  }

  
}
