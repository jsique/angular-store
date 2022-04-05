import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup ,Validators} from '@angular/forms';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {
  //Error message
  errorMessage = '';
  //object to validate user credentials
  usuario = {
    email:'',
    password:''
  }
  //irregular expression to validate mail
  private emailPattern: any = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  title = 'proyecto-angular';
  

  constructor(private authService : AuthService,  private router: Router,    public fb: FormBuilder
    ){  }  

  //login form to obtain the entered values ​​and validate them
  formularioContacto = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(5)])
  });

  //we get values ​​from the field    
  get email() { return this.formularioContacto.get('email'); }
  get password() { return this.formularioContacto.get('password'); }

  //login function to validate credentials 
  //through a service that connects to firebase
  LogIng(){
    //console.log(this.usuario);
    const {email,password} = this.usuario
    if (this.formularioContacto.valid) {
      this.authService.SignIn(email,password)  
    }
    else{
      this.errorMessage='Error en el inicio de sesión';
    }
  }

}
