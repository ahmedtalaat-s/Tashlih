import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminAuthService } from '../../../core/services/admin/admin.auth.service';

@Component({
  selector: 'app-auth',
  imports: [ReactiveFormsModule],
  templateUrl: './auth.html',
  styleUrl: './auth.css',
})
export class Auth {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private adminAuth = inject(AdminAuthService);
  adminLoginForm!: FormGroup;

  ngOnInit(): void {
    this.initForm();
  }
  // initialize the login form
  initForm() {
    this.adminLoginForm = this.fb.group({
      email: [
        '',
        [
          Validators.required,
          Validators.email, // Ensures standard email format
        ],
      ],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  submit() {
    if (this.adminLoginForm.valid) {
      const loginData = this.adminLoginForm.value;
      this.adminAuth.login(loginData.email, loginData.password).subscribe({
        next: () => {
          this.router.navigate(['/admin/dashboard']);
        },
      });
    } else {
      this.adminLoginForm.markAllAsTouched();
    }
  }

  // handle show password
  showPassword = signal(false);
  togglePassword() {
    this.showPassword.update((v) => !v);
  }
}
