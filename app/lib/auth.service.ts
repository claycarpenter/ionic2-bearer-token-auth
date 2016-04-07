import {Injectable} from 'angular2/core';
import {Http, Response, Headers, RequestOptions} from 'angular2/http';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class AuthService {
  private _serviceUrl:string = 'http://localhost:3000/auth';
  public authHeaders:any = new Map();

  constructor(private _http: Http) { }

  login(username:string, password: string) {
    let loginData = JSON.stringify({
      email: username,
      password: password
    });

    let headers = new Headers({
      'Content-Type': 'application/json'
    });
    let options = new RequestOptions({headers});

    console.log(`loginData: ${loginData}`);

    return this._http.post(`${this._serviceUrl}/sign_in`, loginData, options)
                .map((res) => {
                  console.log(res);

                  this.authHeaders.set('access-token', res.headers.get('access-token'));
                  this.authHeaders.set('client', res.headers.get('client'));
                  this.authHeaders.set('expiry', res.headers.get('expiry'));
                  this.authHeaders.set('uid', res.headers.get('uid'));
                  this.authHeaders.set('token-type', res.headers.get('token-type'));

                  return res.json();
                })
                .catch((error) => this.handleError(error));
  }

  validateAuth() {
    let headers = new Headers({
      'Content-Type': 'application/json'
    });
    this.authHeaders.forEach((value, key) => {
      headers.set(key, value);
    });
    let options = new RequestOptions({headers});

    return this._http.get(`${this._serviceUrl}/validate_token`, options)
                .map((res) => {
                  console.log(res);

                  this.authHeaders.set('access-token', res.headers.get('access-token'));
                  this.authHeaders.set('client', res.headers.get('client'));
                  this.authHeaders.set('expiry', res.headers.get('expiry'));
                  this.authHeaders.set('uid', res.headers.get('uid'));
                  this.authHeaders.set('token-type', res.headers.get('token-type'));

                  return res.json();
                })
                .catch((error) => this.handleError(error));
  }

  private handleError(error: Response) {
    console.error(error);

    // Clear auth tokens.
    this.authHeaders.clear();

    return Observable.throw(error.json().error || 'Server error');
  }
}
