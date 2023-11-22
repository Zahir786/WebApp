import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { UntypedFormGroup, UntypedFormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { environment } from '../environments/environment';
import * as CryptoJS from 'crypto-js';
import { ConfirmationService, MessageService } from 'primeng/api';
import { saveAs } from 'file-saver';
@Injectable({
  providedIn: 'root'
})
export class CommonHelper {
  constructor(
    private toastrService: ToastrService,
    private router: Router,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {
    this.ApiURL = environment.API_URL;
    this.StorageName = "RestaurantAdmin";
  }
  ApiURL: string;
  StorageName: string;
  RoleBasedMenu: any = [];
  GetCurrencySymbol() {
    return this.GetCurrentCompany().symbol;
  }
  GetCurrencyId() {
    return this.GetCurrentCompany().currency_id;
  }
  GetCurrencyCode() {
    return this.GetCurrentCompany().currency_code;
  }
  GetUserInfo(): any {
    let user = this.GetLocalStorage(this.StorageName, true);
    if (user == null) {
      return {};
    }
    else {
      return user;
    }
  }
  GetCurrentCompany(): any {
    let user = this.GetLocalStorage("CurrentCompany", true);
    if (user == null) {
      return {};
    }
    else {
      return user;
    }
  }
  ObjecToSelectItem(data: any, OptionaLable: string = "name", Optionalvalue: string = "id") {
    let datadropdown = [];
    data.forEach(element => {
      let dataOptionaLable = OptionaLable.split(".");
      if (OptionaLable.split(".").length > 1) {
        datadropdown.push({ label: element[dataOptionaLable[0]][dataOptionaLable[1]], value: element[Optionalvalue] });
      }
      else {
        datadropdown.push({ label: element[OptionaLable], value: element[Optionalvalue] });
      }
    });
    return datadropdown;
  }
  SetLocalStorage(name: string, data: any, jsonformat: boolean = true) {
    if (jsonformat) {
      window.localStorage.setItem(name, this.Encrypt(JSON.stringify(data)));
    }
    else {
      window.localStorage.setItem(name, this.Encrypt(data));
    }
  }
  GetLocalStorage(name: string, jsonformat: boolean = false) {
    if (jsonformat)
      return JSON.parse(this.Decrypt(window.localStorage.getItem(name)));
    else
      return this.Decrypt(window.localStorage.getItem(name));
  }
  DeleteAllLocalStorage() {
    if (document.getElementsByClassName("ui-dialog-titlebar-icon ui-dialog-titlebar-close ui-corner-all").length > 0) {
      document.getElementsByClassName("ui-dialog-titlebar-icon ui-dialog-titlebar-close ui-corner-all")[0].dispatchEvent(new Event("click"));
    }
    return window.localStorage.clear();
  }
  DeleteLocalStorage(name: string) {
    return window.localStorage.removeItem(name);
  }
  SucessToastr(message: string, title: string = "") {
    // this.toastrService.success(message, title, {
    //   closeButton: true,
    //   timeOut: 3000000000,
    // });
    this.messageService.add({ severity: 'success', detail: message });
  }
  ErrorToastr(message: string, title: string = "") {
    // this.toastrService.error(message, title, {
    //   closeButton: true,
    //   timeOut: 30000000000,
    // });
    this.messageService.add({ severity: 'error', detail: message });
  }
  ShowSpinner() {
    var x = document.getElementById("spinnerloading");
    x.style.display = "flex";
  }
  HideSpinner() {
    var x = document.getElementById("spinnerloading");
    x.style.display = "none";
  }


  validateAllFormFields(formGroup: UntypedFormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof UntypedFormControl) {
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof UntypedFormGroup) {
        this.validateAllFormFields(control);
      }
    });
  }

  redirectTo(uri: string) {
    //this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
    this.router.navigate([uri]);
  }
  RefreshredirectTo(uri: string) {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
      this.router.navigate([uri]));
  }
  Encrypt(text: string) {
    if (text == null) return text;
    var OriginalKey = CryptoJS.AES.encrypt(String(text), environment.API_URL).toString();
    var DuplicateKey = CryptoJS.enc.Base64.parse(OriginalKey);
    return DuplicateKey.toString(CryptoJS.enc.Hex);
  }
  Decrypt(text: string) {
    if (text == null)
      return text;
    var DuplicateKey = CryptoJS.enc.Hex.parse(text);
    var OriginalKey = DuplicateKey.toString(CryptoJS.enc.Base64);
    return CryptoJS.AES.decrypt(OriginalKey, environment.API_URL).toString(CryptoJS.enc.Utf8);
  }

  addValidClass(ip) {
    if (ip.valid && (ip.dirty || ip.touched)) {
      return true
    }
  }
  EncryptWithURL(text: string, url: string) {
    if (text == null)
      return text;
    var OriginalKey = CryptoJS.AES.encrypt(String(text), url).toString();
    var DuplicateKey = CryptoJS.enc.Base64.parse(OriginalKey);
    return DuplicateKey.toString(CryptoJS.enc.Hex);
  }

  // async ExportToExcel(data: any, filename: string = "excel", sheetname: string = "Sheet1") {
  //   let excelpromise = new Promise((resolve, reject) => {
  //     import("xlsx").then(xlsx => {
  //       const worksheet = xlsx.utils.table_to_sheet(data);
  //       const workbook = { Sheets: { 'Airport Summary': worksheet }, SheetNames: ["Airport Summary"] };
  //       const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
  //       import("file-saver").then(FileSaver => {
  //         let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
  //         let EXCEL_EXTENSION = '.xlsx';
  //         const data: Blob = new Blob([excelBuffer], {
  //           type: EXCEL_TYPE
  //         });
  //         FileSaver.saveAs(data, filename + EXCEL_EXTENSION);
  //         resolve(true);
  //       });
  //     });
  //   });
  //   await excelpromise;
  // }
  async ExportToExcel(data: any, filename: string = "excel", sheetname: string = "Sheet1") {
    let excelpromise = new Promise((resolve, reject) => {
      import("xlsx").then(xlsx => {
        const worksheet = xlsx.utils.table_to_sheet(data);
        const workbook = { Sheets: { 'Airport Summary': worksheet }, SheetNames: ["Airport Summary"] };
        const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
        let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
        let EXCEL_EXTENSION = '.xlsx';
        const blobData: Blob = new Blob([excelBuffer], {
          type: EXCEL_TYPE
        });
        saveAs(blobData, filename + EXCEL_EXTENSION);
        resolve(true);
      });
    });
    await excelpromise;
  }
}

