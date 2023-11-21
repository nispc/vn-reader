import { Component, Inject, OnInit, inject } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { Observable, interval, from } from 'rxjs';
import { take, concatWith, mergeWith, zipWith } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  template: `
    <ion-header [translucent]="true">
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-menu-button></ion-menu-button>
        </ion-buttons>
        <ion-title>
          Login
        </ion-title>
        <ion-buttons slot="end">
          Hello, {{ user }}
          <ion-button (click)="logout($event)">
            Logout
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <div class="flex-center">
        <ion-card>
          <ion-card-header>
            <ion-card-title color="success">Login Page</ion-card-title>
          </ion-card-header>

          <form [formGroup]="form">
            <ion-card-content>
              <ion-item>
                <ion-label position="floating">Email</ion-label>
                <ion-input type="email" formControlName="email" aria-autocomplete="none" autocomplete="false"></ion-input>
              </ion-item>

              <ion-item>
                <ion-label position="floating">Password</ion-label>
                <ion-input type="password" formControlName="password"></ion-input>
              </ion-item>

              <ion-button color="dark" fill="clear" size="full" (click)="login($event)">
                Login
              </ion-button>
            </ion-card-content>
          </form>
        </ion-card>
      </div>
    </ion-content>
  `,
  styles: [],
})

export class LoginComponent  implements OnInit {
  private authService = inject(AuthService);
  private formBuilder = inject(FormBuilder);

  constructor() {}

  public user: string = '';
  public form: FormGroup = new FormGroup({});
  public items: Array<any> = [];

  ngOnInit() {
    this.form = this.formBuilder.group({
        email: ['', [Validators.required]] ,
        password: ['', [Validators.required]]
    });

    this.authService.user$.subscribe((data) => {
      this.user = data.username.sub;
    });
  }

  login($event: Event){
    var email = this.form.value.email;
    var password = this.form.value.password;
    console.log(email);
    this.authService.login(email, password).subscribe((data) => {
      console.log(data);
    });
  }

  logout($event: Event){
    this.authService.logout();
  }
}
