import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm! : FormGroup;
  emailRegx = /^(([^<>+()\[\]\\.,;:\s@"-#$%&=]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,3}))$/;
  sticky = false;
  constructor(
    private formBuilder: FormBuilder,
    private authServive: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: [null, [Validators.required,Validators.pattern(this.emailRegx)]],
      password: [null, Validators.required]
    });
  }
  async submit() {
    if(!this.loginForm.invalid){
      const user = await this.authServive.login(this.loginForm.value.email,this.loginForm.value.password);
      if(user.user){
        this.authServive.setUser(user.user.email);
        this.router.navigate(['/home']);
      }else{
        Swal.fire(
          'No se pudo iniciar sesión',
          user.message,
          'warning'
        )
      }
    }
  }
}
