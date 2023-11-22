
import { formatDate } from '@angular/common';

export class DateFormat {

  public static GetCurrentDate(): string {
    return formatDate(new Date(), 'yyyy-MM-dd', 'en-us');
  }
  public static GetCurrentYear(): string {
    return formatDate(new Date(), 'yyyy', 'en-us');
  }
  public static GetCurrentMonth(): string {
    return formatDate(new Date(), 'MM', 'en-us');
  }
  public static FormatDate(Datevalue: Date): string {
    return formatDate(Datevalue, 'yyyy-MM-dd', 'en-us');
  }
  public static FormatDateToDP(Datevalue: Date): string {
    return formatDate(Datevalue, 'dd-MMM-yyyy', 'en-us');
  }
  public static FormatDateToDateAndTime(Datevalue: Date): string {
    return formatDate(Datevalue, 'dd/MM/yyyy hh:mm a', 'en-us');
  }
  public static GetMonthStartDate() {
    var date = new Date();
    var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
    return firstDay;
  }
  public static GetMonthEndDate() {
    var date = new Date();
    var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    return lastDay;
  }
}
