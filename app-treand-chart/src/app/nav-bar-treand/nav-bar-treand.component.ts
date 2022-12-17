import { Component, OnInit, ViewChild,AfterViewInit } from '@angular/core';
import { NgSelectComponent } from '@ng-select/ng-select';
import { compareLocation } from '../enum/compareType';
import { compareEdit, compareNavBarTop, ImportantEventsModelView } from '../model/model';
import { EventAreaDataService } from '../service/event-area-data-service';
import { ManageDataCompareService } from '../service/manage-data.service';

@Component({
  selector: 'app-nav-bar-treand',
  templateUrl: './nav-bar-treand.component.html',
  styleUrls: ['./nav-bar-treand.component.scss']
})
export class NavBarTreandComponent implements AfterViewInit {
  page: number = 0;
  rowPage: number = 10;
  selectedIssue: string;
  editList = [];
  loading: boolean = false;
  isShowAdd: boolean = false;
  listImportantEvents = new Array<ImportantEventsModelView>();
  @ViewChild('selectComponent') selectComponent: NgSelectComponent;

  constructor(
    public manageData: ManageDataCompareService,
    private _eventAreaDataService: EventAreaDataService
  ) {

  }
  ngAfterViewInit() {
    this.getlistImportantEvents();
  }

  getlistImportantEvents(page: number = 0) {
    this.loading = true;

    if (!page) {
      this.listImportantEvents = new Array<ImportantEventsModelView>();
    }
    let model: any = {
      orderBy:1,
      skip: this.rowPage * page,
      top: this.rowPage
    }
    this._eventAreaDataService.SelectConceptList(model).subscribe(list => {
      this.mapingData(list);
      this.loading = false;

    })
  }

  mapingData(list: any) {
    list = list.map(f => {
      f.text = f.name;
      f.isEdit = false;
      return f;
    })

    this.listImportantEvents = this.listImportantEvents.concat(list);
    this.removeFromList();
  }

  onScrollToEnd() {
    this.page++;
    this.getlistImportantEvents(this.page);
  }

  editIssueSelect(item: any) {
    this.isShowAdd = false;
    item.isEdit = true;
    this.selectedIssue = item.id;
  }

  //فراخوانی شود
  addIssue(node: ImportantEventsModelView, nodeEdit?: any) {
   
    if (!nodeEdit) {

      let item: compareNavBarTop = {
        compareType: compareLocation.issues,
        id: node.id,
        text: node.text,
      }
      this.manageData.setItemCompare(item);
   
      this.isShowAdd = false;
    }
    else {
      let action = { oldItem: nodeEdit, newItem: node}
      this.editIssue(action);
      
    }

  }

  addItemToMenu() {
    this.manageData.listcompare.forEach(f => f.isEdit = false);
    this.isShowAdd = true;
    this.removeFromList();
    setTimeout(() => { this.selectComponent.focus(); }, 10);
  }

  removeIssue(item: any) {
    this.manageData.removeItemCompare(item);
  }

  editIssue(item: compareEdit) {
    item.oldItem.isEdit = false;
    this.manageData.editItemCompare(item);

   
  }

  removeFromList() {
    this.listImportantEvents = this.listImportantEvents.filter(f => this.manageData.listcompare.every(s => s.id != f.id));
  }

}

