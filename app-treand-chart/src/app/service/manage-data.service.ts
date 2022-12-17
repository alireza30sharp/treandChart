
import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { Subject } from 'rxjs';


import { compareLocation } from '../enum/compareType';
import { compareEdit, compareNavBarTop, dataAllForCompareModel, StyleColorChartAndTopMenuBullet } from '../model/model';


@Injectable({providedIn:"root"})

export class ManageDataCompareService {
  constructor(private route: ActivatedRoute,
    private Route: Router,
    private location: Location,
  
  ) {
    this.Route.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };
  }
  public removeCompare$ = new Subject<compareNavBarTop[]>();
  public changeRemoveAndEditCompare$ = new Subject<compareNavBarTop[]>();
  public addCompare$ = new Subject<compareNavBarTop>();
  public addListCompare$ = new Subject < Array<compareNavBarTop>> ();
  public editCompare$ = new Subject<compareEdit>();
  public compareSelectItemNavBar = new dataAllForCompareModel();
  public listcompare = new Array<compareNavBarTop>();

  private _colorInItem: Array<StyleColorChartAndTopMenuBullet> = [
    {
    colorClass: 'test',
    colorCod:'#05c70b'
    },
    {
      colorClass: 'test1',
      colorCod: '#cb8100'
    },
    {
      colorClass: 'test2',
      colorCod: '#3773ec'
    },
    {
      colorClass: 'test3',
      colorCod: '#c3b223'
    },
    {
      colorClass: 'test4',
      colorCod: '#E91E63'
    },
  ]
    
  
  /**
   * زمان انتخاب یک ایتم و افزودن ان به لیست مقایسه
   * ایتم انتخابی به لیست ایتم های مقایسه
   * @param item
   */
  setItemCompare(item: compareNavBarTop): boolean {
    if (this.listcompare.length < this._colorInItem.length) {
      //  item.setColorItem = this._colorInItem[this.listcompare.length]
      this.compareSelectItemNavBar.compareType = item.compareType;
      this.listcompare = this.listcompare.concat(item).map((item, index) => {
        item.setColorItem = this._colorInItem[index];
        return item;

      });
      this.addCompare$.next(item);
      this.updateQueyString();
      return true;
    }
    else {
     
      return false;
    }
  }


  /**
 * افزودن یک لیست مقایسه به یک لیست مقایسه
 * لیست مقایسه
 * @param itemes
 * نوع مقایسه
  * @param _compareType
 */
  setListItemCompare(itemes: Array<compareNavBarTop>, _compareType: compareLocation) {
    this.compareSelectItemNavBar.compareType = _compareType;
    this.listcompare = this.listcompare.concat(itemes).map((item, index) => {
      item.setColorItem = this._colorInItem[index];
      return item;

    });
    this.addListCompare$.next(itemes);
    //this.updateQueyString(_compareType);

  }


  /**
   * حذف یک ایتم از لیست مقایسه
   * @param item
   */
  removeItemCompare(item: compareNavBarTop) {
    let find = this.listcompare.find(f => f.id == item.id);
    if (find) {
      let index = this.listcompare.indexOf(find);

      let item = this.listcompare.splice(index, 1);
      this.removeCompare$.next(item);
      this.changeRemoveAndEditCompare$.next(this.listcompare);
      this.updateQueyString();
      
    }


  }

  /**
   * ویرایش یک ایتم در لیست مقایسه
   * @param item
   */
  editItemCompare(item: compareEdit) {
    let index = this.listcompare.indexOf(item.oldItem);
    if (index != -1) {

      let edit = Object.assign({}, item);
      this.editCompare$.next(edit);

      this.listcompare[index].id = item.newItem.id;
      this.listcompare[index].text = item.newItem.text;

      this.listcompare = Object.assign([], this.listcompare);
      this.changeRemoveAndEditCompare$.next(this.listcompare);
      this.updateQueyString();
    }
  }


  updateQueyString() {
    let query = this.listcompare.map(item => {
      return {
        id: item.id,
        title: item.text,
        type: item.compareType,
        image: item.setColorItem.colorCod,
        query: item.text,
      }
    });
    //this._navigateByUrlCompareTypeService.updateQueyString(query)   
  }

}
