import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { globalService } from '../../globalsrv';



@Injectable({
  providedIn: 'root'
})

export class userService {
  constructor(
    private http: HttpClient,
    private gl:globalService
  ) { }


  getlist(search:string):any {   
      return this.http.get(this.gl.host + "/User?search=" + search)
  }


  getitem(id:string):any {
    return this.http.get(this.gl.host + "/User/"+id)   
  }


  delitem(id:string):any {
    return this.http.delete(this.gl.host + "/User/"+ id)   
  }


  saveitem(data:any):any {
    return this.http.post(this.gl.host + "/User/register", data, 
      {observe: 'response'})   
  }

  edititem(id:string, data:any) {
    return this.http.post(this.gl.host + "/User/edit", data, 
      {observe: 'response'})  
  }

  changepas(data:any) {
    return this.http.post(this.gl.host + "/User/changepassword", data, {observe: 'response'}) 
  }

  
}
