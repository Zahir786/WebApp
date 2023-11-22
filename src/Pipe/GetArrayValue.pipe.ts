import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe, DecimalPipe } from '@angular/common';

@Pipe({
  name: 'GetArrayValue'
})
export class GetArrayValuePipe implements PipeTransform {

  transform(value: any, Columnname: any): any {
    if (Columnname.field.split(".").length == 1) {
      return this.Formatdata(value[Columnname.field], Columnname["type"], Columnname["format"]);
    }
    else if (Columnname.field.split(".").length == 2) {
      let data = value[Columnname.field.split(".")[0]];
      if (data != null) {
        return this.Formatdata(data[Columnname.field.split(".")[1]], Columnname["type"], Columnname["format"]);
      }
    }
    else {
      let data = value[Columnname.field.split(".")[0]];
      data = data[Columnname.field.split(".")[1]];
      return this.Formatdata(data[Columnname.field.split(".")[2]], Columnname["type"], Columnname["format"]);
    }
  }
  Formatdata(value, type, format) {
    if (type == '' || type == null || type == undefined) {
      if (value == null || value == undefined)
        return '';
      else
        return value;
    }
    else if (type == 'date') {

      let data: DatePipe = new DatePipe('en-US');
      if (format == undefined || format == null) {
        let valuee = data.transform(value, "dd-MMM-yyyy");
        return valuee;
      }
      else {
        let valuee = data.transform(value, format);
        return valuee;
      }

    }
    else if (type == 'number') {
      let data: DecimalPipe = new DecimalPipe('en-US');
      let valuee = data.transform(value, "1.0-0");
      return valuee;
    }
    else if (type == 'decimal') {
      let data: DecimalPipe = new DecimalPipe('en-US');
      let valuee = data.transform(value, "1.2-2");
      return valuee;
    }
    else if (type == 'decimal6') {
      let data: DecimalPipe = new DecimalPipe('en-US');
      let valuee = data.transform(value, "1.6-6");
      return valuee;
    }
    else {
      return value;
    }
  }
}