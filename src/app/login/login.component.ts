import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { login } from '../store/auth/auth.action';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
    loginForm: FormGroup;

  constructor(private fb: FormBuilder, private store: Store, private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }
onLogin() {
  if (this.loginForm.valid) {
    const email = this.loginForm.value.email;
    this.store.dispatch(login({ email })); // update store
    this.router.navigate(['/tasks']); // ← navigation vers la page des tâches
  }
}


}
