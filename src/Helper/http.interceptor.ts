import { Injectable } from "@angular/core";
import { map } from "rxjs/operators";
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpResponse, } from "@angular/common/http";
import { Observable } from "rxjs";
import { CommonHelper } from "./CommonHelper";
import { DateFormat } from "./DateFormat";

@Injectable()
export class AlphaInterceptor implements HttpInterceptor {
  constructor(private helper: CommonHelper) { }
  private _isoDateFormat = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d*)?Z$/;
  private _DateFormat = /^\d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])$/;
  private _NumberReg = /^[0-9]*$/;
  private _DecimalReg = /^[0-9]\d*(\.\d+)?$/;

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    var token = this.helper.GetUserInfo()?.api_token;
    var company_id = this.helper.GetUserInfo()?.corporate_business_id;
    var user_id = this.helper.GetUserInfo()?.id;
    if (token == undefined) token = "";
    if (company_id == undefined) company_id = "";
    if (user_id == undefined) user_id = "";
    request = request.clone({
      setHeaders: {
        Authorization: token,
        company_id: this.helper.EncryptWithURL(company_id, token),
        user_id: this.helper.EncryptWithURL(user_id, token)
      },
    });
    if (request.method == "POST") {
      this.RequestConvert(request.body);
    }
    return next.handle(request).pipe(map((val: HttpEvent<any>) => {
      if (val instanceof HttpResponse) {
        const body = val.body;
        this.Responseconvert(body);
      }
      return val;
    }));
  }
  ResponseisIsoDateString(value: any): boolean {
    if (value === null || value === undefined) {
      return false;
    }
    if (typeof value === 'string') {
      return this._isoDateFormat.test(value);
    }
    return false;
  }
  ResponseisDateString(value: any): boolean {
    if (value === null || value === undefined) {
      return false;
    }
    if (typeof value === 'string') {
      return this._DateFormat.test(value);
    }
    return false;
  }
  ResponseisNumber(value: any): boolean {
    if (value === null || value === undefined) {
      return false;
    }
    if (typeof value === 'string') {
      return this._NumberReg.test(value);
    }
    return false;
  }
  ResponseisDecimal(value: any): boolean {
    if (value === null || value === undefined) {
      return false;
    }
    if (typeof value === 'string') {
      return this._DecimalReg.test(value);
    }
    return false;
  }
  Responseconvert(body: any) {
    if (body === null || body === undefined) {
      return body;
    }
    if (typeof body !== 'object') {
      return body;
    }
    for (const key of Object.keys(body)) {
      const value = body[key];
      if (this.ResponseisIsoDateString(value)) {
        body[key] = this.parseISOLocal(value);
      }
      else if (this.ResponseisDateString(value)) {
        body[key] = this.parseISOLocal(value);
      }
      // Dont Change Order
      // else if (this.ResponseisNumber(value)) {
      //   if (value != "") {
      //     body[key] = Number(value);
      //   }
      // }
      // else if (this.ResponseisDecimal(value)) {
      //   if (value != "") {
      //     body[key] = new DecimalPipe("en_us").transform(value, '1.2-2');
      //   }
      // }
      // Dont Change Order
      else if (typeof value === 'object') {
        this.Responseconvert(value);
      }
    }
  }

  RequestisDate(value: any): boolean {
    if (value === null || value === undefined) {
      return false;
    }
    if (value instanceof Date) {
      return true;
    }
    if (typeof value === 'object') {
      return false;
    }
    return false;
  }
  RequestisNumber(value: any): boolean {
    if (value === null || value === undefined) {
      return false;
    }
    if (typeof value === 'string') {
      return this._NumberReg.test(value);
    }
    return false;
  }
  RequestisDecimal(value: any): boolean {
    if (value === null || value === undefined) {
      return false;
    }
    if (typeof value === 'string') {
      return this._DecimalReg.test(value);
    }
    return false;
  }

  RequestConvert(body: any) {
    if (body === null || body === undefined) {
      return body;
    }
    if (typeof body !== 'object') {
      return body;
    }
    for (const key of Object.keys(body)) {
      const value = body[key];
      if (this.RequestisDate(value)) {
        body[key] = DateFormat.FormatDate(value);
      }
      // Dont Change Order
      // else if (this.RequestisNumber(value)) {
      //   if (value != "") {
      //     body[key] = Number(value);
      //   }
      // }
      // else if (this.RequestisDecimal(value)) {
      //   if (value != "") {
      //     body[key] = new DecimalPipe("en_us").transform(value, '1.2-2');
      //   }
      // }
      // Dont Change Order
      else if (typeof value === 'object') {
        this.RequestConvert(value);
      }
    }
  }
  parseISOLocal(s) {
    var b = s.split(/\D/);
    return new Date(b[0], (b[1] - 1), b[2], b[3], b[4], b[5]);
  }
}
