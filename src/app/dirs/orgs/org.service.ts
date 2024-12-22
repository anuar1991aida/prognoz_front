import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { globalService } from '../../globalsrv';



@Injectable({
  providedIn: 'root'
})

export class orgService {
  constructor(
    private http: HttpClient,
    private gl:globalService
  ) { }


  getorglist(search:string):any {   
      return this.http.get(this.gl.host + "/Organization?search=" + search)
  }


  getorgitem(id:string):any {
    return this.http.get(this.gl.host + "/Organization/"+id)   
  }


  delorgitem(id:string):any {
    return this.http.delete(this.gl.host + "/Organization/"+ id)   
  }


  saveorgitem(data:any):any {
    return this.http.post(this.gl.host + "/Organization/", data, 
      {observe: 'response'})   
  }

  editorgitem(id:string, data:any) {
    return this.http.put(this.gl.host + "/Organization/"  + id, data, 
      {observe: 'response'})  
  }

  
}
