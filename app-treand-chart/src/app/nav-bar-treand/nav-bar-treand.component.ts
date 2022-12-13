import { Component, OnInit, ViewChild } from '@angular/core';
import { NgSelectComponent } from '@ng-select/ng-select';
import { compareNavBarTop } from '../model/model';

@Component({
  selector: 'app-nav-bar-treand',
  templateUrl: './nav-bar-treand.component.html',
  styleUrls: ['./nav-bar-treand.component.scss']
})
export class NavBarTreandComponent implements OnInit {
  @ViewChild('selectComponent') selectComponent: NgSelectComponent;
  @ViewChild('hashtagSelector') hashtagSelector: NgSelectComponent;
  public listcompare = new Array<compareNavBarTop>();
  isShowAdd: boolean = false;
  selectedHashtag: string;
  constructor( private location: Location) { }

  ngOnInit(): void {
  }
  editHasstag(item: compareNavBarTop) {
    item.isEdit = true;
    this.isShowAdd = false;
    this.selectedHashtag = item.id;

    setTimeout(() => {
      this.hashtagSelector.focus();
    }, 100);
  }

  removeIssue(item: compareNavBarTop) {
    let find = this.listcompare.find(f => f.id == item.id);
    if (find) {
      let index = this.listcompare.indexOf(find);

      let item = this.listcompare.splice(index, 1);
     // this.removeCompare$.next(item);
      //this.changeRemoveAndEditCompare$.next(this.listcompare);
      
    }


  }
}
//this.location.replaceState('/compare?q=' + queryParams.q);
