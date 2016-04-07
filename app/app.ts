import 'es6-shim';
import {App, Platform} from 'ionic-angular';
import {StatusBar} from 'ionic-native';
import {LoginPage} from './pages/login/login.page';
import {AuthService} from './lib/auth.service';
import {AuthTokenRequest} from './lib/auth-token-request.service';
import {HTTP_PROVIDERS} from 'angular2/http';
import 'rxjs/Rx';   // Import all RxJS Observable operators


@App({
  template: '<ion-nav [root]="rootPage"></ion-nav>',
  config: {}, // http://ionicframework.com/docs/v2/api/config/Config/
  providers: [
    HTTP_PROVIDERS,
    AuthTokenRequest,
    AuthService
  ]
})
export class MyApp {
  rootPage: any = LoginPage;

  constructor(platform: Platform) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
    });
  }
}
