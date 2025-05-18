import { EventEmitter, HostListener } from '@angular/core';
import { Component, OnInit, Output } from '@angular/core';
import { Router } from "@angular/router";
import { UntypedFormControl, UntypedFormGroup, Validators } from "@angular/forms";
import { RegistrationService } from 'app/utils/registration.service';


@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit{

  alertMessage='';

  constructor(private registrationService:RegistrationService, private router:Router){

  }

  form: UntypedFormGroup = new UntypedFormGroup({
    username: new UntypedFormControl('', [Validators.required]),
    password1: new UntypedFormControl('', [Validators.required]),
    password2: new UntypedFormControl('', [Validators.required])
  });
  

  

  register() {
      console.log('registraiton function called')
      if(this.form.value.password1==this.form.value.password2){
        this.alertMessage="";
        this.registrationService.register(this.form.value.username, this.form.value.password1).subscribe(msg => {
          console.log(msg);
          localStorage.setItem('user', this.form.value.username)
          this.router.navigate(['/login'])
          
  
        }, error => {
          console.log(error)
        })
      }else{
        console.log("The two password doesn't match!")
        this.alertMessage="The two password doesn't match!";
      }
  }
  ngOnInit(): void {
   
  }

  
   @HostListener('document:keydown.enter')onKeydownHandler(){
     this.register();
   }



}
