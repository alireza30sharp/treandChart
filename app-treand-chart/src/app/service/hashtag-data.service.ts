
import { Injectable } from '@angular/core';

import { compareLocation, OrderByHashtag } from '../enum/compareType';
import { HttpClient } from '@angular/common/http';


@Injectable()
//سرویس هشتگ ها
export class HashTagDataService  {
  public _hashTagData: Array<any>;

  constructor(private http: HttpClient) {
    

  }

  /**
   * دریافت پارمتر ها فیلتر سازی
   * لیست هشتگ ها
   * @param model
   */
  getApiDataHashtag(model: any) {
    const rdsUrl = "";
    return this.http.post<Array<any>>(rdsUrl, model);
  }

  /**
   * دریافت اطلاعات مجموع هشتگ ها بر اساس ساعت
   * صفحه ترند نمودار هشتگ ها
   * @param model
   */
  getApiSelectHashTagForChart(model: any) {
    const rdsUrl = "";
    return this.http.post<Array<any>>(rdsUrl, model);
  }

  /**
 * جستجوی هشتگ
 * 
 * @param model
 */
  searchGetTopHashtags(model: any) {
    const rdsUrl = "";
    return this.http.post<Array<any>>(rdsUrl, model);
  }



  /**
   * نمودار روند تکرار کلمات
   * صفحه مقایسه
   * @param model
   */
  getRepeatWordProcess(model: any) {
    const rdsUrl = "";
    return this.http.post<Array<any>>(rdsUrl, model);
  }


  /**
 * دریافت نام هشتگ و نام مسئله
 * صفحه مقایسه
 * @param model
 */
  getConceptHashTagSelectNames(model: any) {
    const rdsUrl = "";
    return this.http.post<Array<any>>(rdsUrl, model);
  }


  //دریافت هشتگ بر اساس ای دی
  getByIdHashtagData(id: string): any {
    return this._hashTagData.find(f => f.Fk_HashTagID == id);

  }
  //دریافت لیست هشتگ ها
  getListHashtagById(ids: string[]): Array<any> {
    let list = this._hashTagData.filter(f => ids.some(s => s == f.Fk_HashTagID));

    return list;
  }

  getKeywordsTrendPageByTelegram(model: any) {
    const rdsUrl = "";
    return this.http.post<any[]>(rdsUrl, model);
  }
  getKeywordsTrendPageByTwitter(model: any) {
    const rdsUrl = "";
    return this.http.post<any[]>(rdsUrl, model);
  }
  getKeywordsTrendPageByInstagram(model: any) {
    const rdsUrl = "";
        return this.http.post<any[]>(rdsUrl, model);
  }
}
