import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { globalService } from '../../globalsrv';


@Injectable({
  providedIn: 'root'
})

export class loginService {
  constructor(
    private http: HttpClient,
    private global:globalService
    ) {  }


  count401 = 0

  authorization(login:string, pas:string):any {   
    const body = {
      name: login,
      password: pas
    }

    return this.http.post(this.global.host + "/User/login", body, 
      {observe: 'response'})  
  }

  
}


