import { EventEmitter, HostListener } from '@angular/core';
import { Component, OnInit, Output } from '@angular/core';
import { Router } from "@angular/router";
import { UntypedFormControl, UntypedFormGroup, Validators } from "@angular/forms";
import { LoginService } from 'app/utils/login.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  constructor(private loginService:LoginService, private router:Router){

  }

  form: UntypedFormGroup = new UntypedFormGroup({
    username: new UntypedFormControl('', [Validators.required]),
    password: new UntypedFormControl('', [Validators.required])
  });
  
  /*
  username: 'admin',
  password: 'admin123',
  */

  

  login() {
      this.loginService.login(this.form.value.username, this.form.value.password).subscribe(msg => {
        console.log(msg);
        localStorage.setItem('user', this.form.value.username)
        this.router.navigate(['/home/trackSearch'])

        if(this.form.value.username=='admin'){
          localStorage.setItem('isAdmin','true')
        }else{
          localStorage.setItem('isAdmin','false')
        }
        

      }, error => {
        console.log(error)
      })  
  }
  goToRegister(){
    this.router.navigate(['/register'])
  }

  ngOnInit(): void {
    if (localStorage.getItem('user')) {
      localStorage.removeItem('user');
      this.loginService.logout().subscribe(msg => {
        console.log(msg);
      }, error => {
        console.log(error)
      })
    }
  }

  alertMessage = '';
  alertsList: any = {
    user: () => 'Wrong E-mail or password.',
    server: () => 'Services are offline.',
    false: () => ''
  };
   @HostListener('document:keydown.enter')onKeydownHandler(){
     this.login();
   }



}
