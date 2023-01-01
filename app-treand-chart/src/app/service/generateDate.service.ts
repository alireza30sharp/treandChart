
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
@Injectable()
  //سرویس ایجاد تاریخ سرور
export class GenerateDateService  {


  constructor(private http: HttpClient) {
    

  }

  /**
   * دریافت از تاریخ تا تاریخ
   * 
   * 
   * @param model
   */
  generateDateFromDate(model: any) {
    const rdsUrl ="";
    return of({ FromDate: new Date(),ToDate: new Date()})
   // return this.http.post<any>(rdsUrl, model);
  }


  /**
* دریافت زمان سرور با توجه به مدل دریافتی 
* 
* @param model
*/
  getGenerateDate(model: any) {
    const rdsUrl ="";
    return this.http.post<any>(rdsUrl, model);
  }

  /** دریافت تاریخ جاری از سرور */
  getCurrentDate() {
    const rdsUrl ="";
    return this.http.get(rdsUrl, {});
  }
}
