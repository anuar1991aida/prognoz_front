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
      return this.http.get(this.gl.host + "/Organization")
  }

//   getorgitem(id:number):any {
//     return this.http.get(host.apiUrl + "/dirs/orgitem/"+id)   
//   }


//   delorgitem(id:number):any {
//     return this.http.delete(host.apiUrl + "/dirs/orgmarkdel/"+id)   
//   }

//   saveorgitem(data:orgitem):any {
//     return this.http.post(host.apiUrl + "/dirs/orgsave", data, 
//       {observe: 'response'})   
//   }

  
}
