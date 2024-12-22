import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { globalService } from '../../globalsrv';
import { loginService } from './login.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MatInputModule, CommonModule, MatIconModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  login = ''
  pass = ''

  constructor(
    private gl:globalService,
    private srv:loginService,
    private router: Router
    ) {  }

  
  ngOnInit() {
    localStorage.setItem('auth_token', '')
    localStorage.setItem('role', '')
  }

  auth() {
    this.srv.authorization(this.login, this.pass).subscribe(
      (response:any) => {
        if (response.status == 200) {
          localStorage.setItem('auth_token', response.body.auth_token)
          localStorage.setItem('role', response.body.role)
          this.router.navigate(['/main']);
        }        
      },
      (error:any) => {
        this.gl.sms('Неверный логин или пароль! Попробуйте еще раз!', 'Ок')
        
      }
    )
  }
}
