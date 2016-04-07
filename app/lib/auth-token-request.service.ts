import {Injectable} from 'angular2/core';
import {Headers, Http, Request, RequestMethod, RequestOptions} from 'angular2/http';
import {AuthService} from './auth.service';


@Injectable()
export class AuthTokenRequest {
  constructor(private _http:Http, private _authService:AuthService) { }

  request(requestMethod:RequestMethod, url:string, body:string) {
    let headers:Headers = new Headers({
      'Content-Type': 'application/json'
    });

    this._authService.authHeaders.forEach((value, key) => {
      headers.set(key, value);
    });

    let request:Request = new Request({
      method: requestMethod,
      url: url,
      body,
      headers
    });

    return this._http.request(request).do((res) => {
      console.log(res);
    });
  }
}
