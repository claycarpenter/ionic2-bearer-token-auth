import {Page} from 'ionic-angular';
import {AuthTokenRequest} from '../../lib/auth-token-request.service';
import {RequestMethod} from 'angular2/http';
import {OnInit} from 'angular2/core';


@Page({
  templateUrl: 'build/pages/item-details/item-details.page.html',
})
export class ItemDetailsPage implements OnInit {
  public items:any;

  constructor(private _authTokenRequest: AuthTokenRequest) { }

  ngOnInit() {
    this.getItems();
  }

  private getItems() {
    this._authTokenRequest.request(RequestMethod.Get, 'http://localhost:3000/contacts', undefined).subscribe(
      items => this.items = Array.from(items.json()),
      error => console.error(error)
    );
  }
}
