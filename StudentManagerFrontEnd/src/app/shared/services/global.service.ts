import { Injectable } from '@angular/core';
import { Subscriber } from 'rxjs';
import { EnvironmentTypesEnum } from '../enums/environment.types.enum';

@Injectable()
export class GlobalService {
  public appName = 'Student Manager';

  public baseUrl: any;
  public baseApiUrl: any;

  public isLoading = false;
  public isPageLoading = false;

  public url = new URL(decodeURIComponent(window.location.href));
  public urlParameters: any = this.url.pathname.substring(1).split('/');

  public constructor() {
    this.baseUrl = this.url.href;
    this.baseApiUrl = 'http://localhost:33752/api';
  }

}
