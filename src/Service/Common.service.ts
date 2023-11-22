import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CommonHelper } from '../Helper/CommonHelper';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  constructor(private httpClient: HttpClient, private helper: CommonHelper) {

  }
  public GetAll(UrlName: string) {
    return this.httpClient.get<any>(`${this.helper.ApiURL}/${UrlName}`).toPromise();
  }
  public GetById(id: number, UrlName: string) {
    return this.httpClient.get<any>(`${this.helper.ApiURL}/${UrlName}/${id}`).toPromise();
  }
  // public InsertOrUpdate(model: any, UrlName: string) {
  //   if (model.id == 0) {
  //     return this.httpClient.post(`${this.helper.ApiURL}/${UrlName}Insert`, Object.assign({},model)).toPromise<any>();
  //   }
  //   else {
  //     return this.httpClient.post(`${this.helper.ApiURL}/${UrlName}Update/${model.id}`, Object.assign({},model)).toPromise<any>();
  //   }
  // }
  public CommonPost(model: any, UrlName: string) {
    return this.httpClient.post(`${this.helper.ApiURL}/${UrlName}`, Object.assign({}, model)).toPromise();
  }

  public Delete(id: number, UrlName: string) {
    return this.httpClient.get(`${this.helper.ApiURL}/${UrlName}/${id}`).toPromise();
  }

  public PostWithParameter(model: any, UrlName: string, params: any) {
    let url = `${this.helper.ApiURL}/${UrlName}`;
    params.forEach(e => {
      url = url + "/" + e.params;
    });
    return this.httpClient.post(url, Object.assign({}, model)).toPromise();
  }

  public GetWithParameter(UrlName: string, params: any) {
    let url = `${this.helper.ApiURL}/${UrlName}`;
    params.forEach(e => {
      url = url + "/" + e.params;
    });
    return this.httpClient.get<any>(url).toPromise();
  }

  public FullUrlGet(UrlName: string) {
    return this.httpClient.get<any>(UrlName).toPromise();
  }
  async GetExchangeRate(currency_code) {
    let res = await this.FullUrlGet(`https://cors-anywhere.herokuapp.com/https://api.exchangeratesapi.io/latest?symbols=${this.helper.GetCurrencyCode()}&base=${currency_code}`);
    return res.rates[this.helper.GetCurrencyCode()];
  }
  public FileUpload(urlName: string, data: any) {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    return this.httpClient.post<any>(`${this.helper.ApiURL}/${urlName}`, data, { headers: headers }).toPromise();
  }
}

