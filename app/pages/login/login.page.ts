import {Page} from 'ionic-angular';
import {FormBuilder, Validators} from 'angular2/common';
import {AuthService} from '../../lib/auth.service';


@Page({
  templateUrl: 'build/pages/login/login.page.html',
})
export class LoginPage {
  public loginForm:any;

  constructor(private _authService: AuthService, fb: FormBuilder) {
    this.loginForm = fb.group({
      email: ["", Validators.required],
      password: ["", Validators.required]
    });
  }

  public doLogin(event) {
    console.log(this.loginForm.value);

    event.preventDefault();

    let username = this.loginForm.controls.email.value,
        password = this.loginForm.controls.password.value;
        
    this._authService.login(username, password).subscribe(
      user => console.log(`Logged in ${user}`),
      error => console.error(error)
    );
  }
}
