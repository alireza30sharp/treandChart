import { compareLocation } from "../enum/compareType";

export class compareNavBarTop {
  compareType:any;
    id: string='12';
    text?: string;
    setColorItem?= new StyleColorChartAndTopMenuBullet();
    isEdit?: boolean = false;
  }

  export class StyleColorChartAndTopMenuBullet {
    colorCod: string;
    colorClass: string;
  }

  export class ImportantEventsModelView extends compareNavBarTop {
    orderBy:any;
    name: string;
    todate: any;
    PK_ParentConceptId: string;
    ParentName: string;
    Ghova: string;
    ImageUrl: string;
    FaragiryJson: string;
    CreateDate: string;
    Faragiry: string;
    speed: string;
    Nofooz: string;
    skip:number;
    top:number;
  }


  export class compareEdit {
    oldItem = new compareNavBarTop();
    newItem= new compareNavBarTop()
    
    }


    //مدل تجمیع داده های نمودار و ایتم انتخابی
export class dataAllForCompareModel {
  listItemsForCompare = new Array<compareNavBarTop>();
  compareType: compareLocation;
  id: string;
}