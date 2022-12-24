import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { compareNavBarTop } from '../model/model';
import { EventAreaDataService } from '../service/event-area-data-service';
import { ManageDataCompareService } from '../service/manage-data.service';
declare var Highcharts: any;

@Component({
  selector: 'app-compare-chart-issues',
  templateUrl: './compare-chart-issues.component.html',
  styleUrls: ['./compare-chart-issues.component.scss']
})
export class CompareChartIssuesComponent implements AfterViewInit, OnDestroy {

  itemes: Array<compareNavBarTop> = [];
  filterSocial = 1;
  data = [];
  filterType = 1;
  subscription = new Subscription();

  filter = {
    social: [
      {
        id: 1,
        name: 'تلگرام'
      }, {
        id: 2,
        name: 'توئیتر'
      }, {
        id: 3,
        name: 'اینستاگرام'
      }
    ],
    type: [
      {
        id: 1,
        name: 'فراگیری'
      }, {
        id: 2,
        name: 'نفوذ'
      }, {
        id: 3,
        name: 'توان رزم'
      }, {
        id: 4,
        name: 'نسبت با نظام'
      }
    ],
    status: [
      {
        id: 1,
        name: 'مثبت'
      }, {
        id: 2,
        name: 'منفی'
      }, {
        id: 3,
        name: 'خنثی'
      }
    ]
  }

  constructor(
    private route: ActivatedRoute,
    public manageData: ManageDataCompareService,
    private dataService: EventAreaDataService,
    ) { }

  ngAfterViewInit() {
    this.subscription.add(this.manageData.addCompare$.subscribe((item: compareNavBarTop) => {
      item.id="12970";
      if (item && item.id) {
        this.itemes.push(item);
        this.requestData();
      }
    }));

    this.subscription.add(this.manageData.changeRemoveAndEditCompare$.subscribe((itemes: Array<compareNavBarTop>) => {
      this.itemes = itemes;
      this.requestData();
    }));

    this.subscription.add(this.manageData.addListCompare$.subscribe((itemes: Array<compareNavBarTop>) => {
      this.itemes = itemes;
      this.requestData();
    }));
  }

  changeFilterSocial(type) {
    this.filterSocial = type;
    this.requestData();
  }

  changeFilterType(type) {
    this.filterType = +type;
    this.requestData();
  }

  changeStatusType(status) {
    let key;
    if (this.filterType === 3) {
      switch (+status) {
        case 1:
          key = "MosbatU";
          break;
        case 2:
          key = "ManfiU";
          break;
        case 3:
          key = "KhonsaU";
          break;
      }
    } else if (this.filterType === 4) {
      switch (+status) {
        case 1:
          key = "Mosbat";
          break;
        case 2:
          key = "Manfi";
          break;
      }
    }
    this.preProsseingData(this.data, key);
  }



  preProsseingData(data, key) {
    debugger
    this.data = data;
    const ids = [...new Set(data.map(f => f.SId))];
    const dates = [...new Set(data.map(f => f.d).sort((a: any, b: any) => b - a))];
    const _d: any = ids.map(item => ({ id: item, color: this.itemes.find(f => f.id == item).setColorItem.colorCod, name: this.itemes.find(f => f.id == item).text, data: new Array(dates.length).fill(0) }));

    dates.forEach((date, index) => {
      ids.forEach(id => {
        const item = data.find(f => f.SId === id && f.d === date);
        if (item) {
          _d.find(f => f.id === id).data[index] = [new Date(item.d).getTime() , +item[key]];
        }
      })
    });
    setTimeout(() => {
      this.renderChart(_d, dates.map((f: any) => new Date(f).getTime()))
    }, 1000)
  }

  requestData() {
    const ids = this.itemes.map(f => f.id).toString();

    switch (this.filterType) {
      case 1:
        this.dataService.getFaragiryTrends(ids, this.filterSocial).subscribe((data: []) => {
          this.preProsseingData(data, "Nofooz");
        })
        break;
      case 2:
        this.dataService.getFaragiryTrends(ids, this.filterSocial).subscribe((data: []) => {
          this.preProsseingData(data, "Nofooz");
        })
        break;
      case 3:
        this.dataService.getFaragiryTrends(ids, this.filterSocial).subscribe((data: []) => {
          this.preProsseingData(data, "MosbatU");
        })
        break;
      case 4:
        this.dataService.getFaragiryTrends(ids, this.filterSocial).subscribe((data: []) => {
          this.preProsseingData(data, "Mosbat");
        })
        break;
    }
  }

  renderChart(series, categories) {
    Highcharts.setOptions({
      lang: {
        downloadCSV: 'دانلود فایل CSV',
        downloadJPEG: 'دانلود فایل JPEG',
        downloadPDF: 'دانلود فایل PDF',
        downloadPNG: 'دانلود فایل PNG',
        downloadSVG: 'دانلود فایل SVG',
        downloadXLS: 'دانلود فایل اکسل',
        hideData: 'مخفی کردن داده ها',
        printChart: 'چاپ نمودار',
        viewFullscreen: 'نمایش تمام صفحه',
        viewData: 'نمایش داده ها'
      }
    });

    setTimeout(() => {
      Highcharts.stockChart('CompareChartIssuesContainer', {
        chart: {
          type: 'area'
        },
        title: { text: "" },
        xAxis: {
          type: 'datetime',
          categories: categories.map(f => new Date(f).toLocaleString('fa')),
          title: {
            enabled: false
          }
        },
        legend: {
          enabled: true,
        },
        tooltip: {
          formatter: function () {
            return ['<b>' + new Date(this.x).toLocaleString('fa') + '</b>'].concat(
              this.points ?
                this.points.map(function (point) {
                  return `<span style="color:${point.series.color}">${point.series.name}</span>: <b>${point.y}</b>`
                }) : []
            );
          },
          split: true
        },
        credits: {
          enabled: false
        },
        rangeSelector: {
          enabled: false
        },
        navigator: {
          xAxis: {
            labels: {
              formatter: function (v) {
                return new Date(this.value).toLocaleString('fa');//categories[this.value];
              }
            },
          }
        },

        series

      });
    }, 100)

  }

  renderChart2(series, categories) {
    debugger
    setTimeout(() => {
      debugger
      Highcharts.stockChart('CompareChartIssuesContainer', {
        chart: {
          type: 'area'
        },
        rangeSelector: {
          selected: 0
        },
        title: {
          text: 'AAPL Stock Price'
        },
        series: series
      });
    }, 100)
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
