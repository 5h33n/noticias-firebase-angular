import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm! : FormGroup;
  emailRegx = /^(([^<>+()\[\]\\.,;:\s@"-#$%&=]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,3}))$/;
  sticky = false;
  constructor(
    private formBuilder: FormBuilder,
    private authServive: AuthService,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      email: [null, [Validators.required,Validators.pattern(this.emailRegx)]],
      password: [null, Validators.required],
      passwordConfirm: [null, Validators.required]
    });
  }

  async submit() {
    if(!this.registerForm.invalid){
      const newUser = await this.authServive.register(this.registerForm.value.email,this.registerForm.value.password);
      if(newUser.user){
        this.authServive.setUser(newUser.user.email);
        this.router.navigate(['/home']);
      }else{
        Swal.fire(
          'No se pudo iniciar sesión',
          newUser.message,
          'warning'
        )
      }
    }
  }

}
