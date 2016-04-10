import {Page, NavController} from 'ionic-angular';
import {FormBuilder, Validators} from 'angular2/common';
import {AuthService} from '../../lib/auth.service';
import {AuthTokenRequest} from '../../lib/auth-token-request.service';
import {RequestMethod} from 'angular2/http';
import {ContactDetailsPage} from '../contact-details/contact-details.page';


@Page({
  templateUrl: 'build/pages/login/login.page.html',
})
export class LoginPage {
  public loginForm:any;

  constructor(private _authService:AuthService, private _authTokenRequest:AuthTokenRequest, private _nav:NavController, fb:FormBuilder) {
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
      (user) => {
        console.log(`Logged in ${user}`);

        this._nav.push(ContactDetailsPage);
      },
      error => console.error(error)
    );
  }

  public testAuthentication() {
    this._authService.validateAuth().subscribe(
      res => console.log(`Auth test result: ${res}`),
      error => console.error(error)
    );
  }

  public testAuthTokenRequest() {
    this._authTokenRequest.request(RequestMethod.Get, 'http://localhost:3000/item_types', undefined).subscribe(
      items => console.log(items),
      error => console.error(error)
    );
  }
}
