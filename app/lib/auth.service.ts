import {Injectable} from 'angular2/core';
import {Http, Response, Headers, RequestOptions} from 'angular2/http';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class AuthService {
  private _serviceUrl:string = 'http://localhost:3000/auth';

  constructor(private _http: Http) { }

  login(username:string, password: string) {
    let loginData = JSON.stringify({
      email: username,
      password: password
    });

    let headers = new Headers({
      'Content-Type': 'application/json',
      'Accept': 'application/json, text/plain, */*'
    });
    let options = new RequestOptions({headers});

    console.log(`loginData: ${loginData}`);

    return this._http.post(`${this._serviceUrl}/sign_in`, loginData, options)
                .map(res => res.json())
                .catch(this.handleError);
  }

  private handleError(error: Response) {
    console.error(error);

    return Observable.throw(error.json().error || 'Server error');
  }
}
