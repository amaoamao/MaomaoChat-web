import {Injectable} from "@angular/core";
import {Http, RequestOptions, URLSearchParams} from "@angular/http";
import "rxjs/add/operator/map";


@Injectable()
export class Api {
  url: string = 'maomaochat.tech/api';
  // url: string = 'http://localhost:8080/api';
  urlPrefix: string = 'https://';

  constructor(public http: Http) {
  }

  get(endpoint: string, params?: any, options?: RequestOptions) {
    if (!options) {
      options = new RequestOptions();
    }
    if (params) {
      let p = new URLSearchParams();
      for (let k in params) {
        p.set(k, params[k]);
      }
      options.search = !options.search && p || options.search;
    }

    return this.http.get(this.urlPrefix + this.url + '/' + endpoint, options);
  }

  post(endpoint: string, body: any, options?: RequestOptions) {
    return this.http.post(this.urlPrefix + this.url + '/' + endpoint, body, options);
  }

  put(endpoint: string, body: any, options?: RequestOptions) {
    return this.http.put(this.urlPrefix + this.url + '/' + endpoint, body, options);
  }

  delete(endpoint: string, body: any, options?: RequestOptions) {
    return this.http.post(this.urlPrefix + this.url + '/' + endpoint, body, options);
  }

  patch(endpoint: string, body: any, options?: RequestOptions) {
    return this.http.put(this.urlPrefix + this.url + '/' + endpoint, body, options);
  }
}
