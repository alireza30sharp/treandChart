import { Component, AfterViewInit, Input, OnInit } from '@angular/core';
//import * as  Highcharts from 'highcharts';
import { StockChart } from 'angular-highcharts';
import { PlatformType, SelectTimePastDayesChart, SelectTimePastDayesChartHour } from '../enum/global.enums';
import { InputGenerateDateModel, OutPutDateModel } from '../models/GenerateDateModel';
import { repeatWhen } from 'rxjs/operators';
import { HashTagDataService } from '../service/hashtag-data.service';
import { GenerateDateService } from '../service/generateDate.service';
declare var Highcharts: any;
@Component({
  selector: 'app-time-bar-chart',
  templateUrl: './time-bar-chart.component.html',
  styleUrls: ['./time-bar-chart.component.scss']
})
export class TimeBarChartComponent implements AfterViewInit, OnInit {

  stock: StockChart;
  listSumCountStatus = [];
  listSumCountUserID = [];
  SelectTimePastDayesChart = SelectTimePastDayesChart;
  OutPutDate = new OutPutDateModel();
  InputHashTagForChartModel = new InputHashTagForChartModel();
  SelectTimePastDayesChartSelect = SelectTimePastDayesChart.Past2Week;
  SelectTimePastDayesChartHour = SelectTimePastDayesChartHour;
  SelectTimePastDayesChartHourSelect = SelectTimePastDayesChartHour.Past24;
  dailyChartModel: IDailyChart = {
    type: DailyChartType.UserCount,
    data: {
      userCountList: [],
      repeatCountList: []
    }
  }

  dailyChartType = DailyChartType;

  ///////////////////////////////////////////////////////////////////////////////////

  constructor(private _hashTagDataService: HashTagDataService,
    private _generateDateService: GenerateDateService
  ) { }

  ngAfterViewInit() {
    //this.generateDateFromDate(this.SelectTimePastDayesChartSelect);
  }

  ngOnInit() {
    this.InputHashTagForChartModel.IsHourSelect = true;
    this.IsHourChsnge();
  }

  getDataChart() {
    let fromDate, toDate;
    //اگر ساعتی باشد باید 48 ساعت گذشته باشد
    if (this.InputHashTagForChartModel.IsHourSelect) {
      fromDate = this.OutPutDate.FromDate;
      toDate = this.OutPutDate.ToDate;

    }
    else {
      fromDate = this.OutPutDate.FromDate.split("T")[0];
      toDate = this.OutPutDate.ToDate.split("T")[0];

    }
    let model: InputHashTagForChartModel = {
      fromDate: fromDate,
      toDate: toDate,
      Type: PlatformType.Twitter,
      Hour: null,
      IsHour: this.InputHashTagForChartModel.IsHour,
      IsHourSelect: null
    }
    this.listSumCountStatus = [];
    this.listSumCountUserID = [];
    this._hashTagDataService.getApiSelectHashTagForChart(model).subscribe(list => {
      this.listSumCountStatus = list.map(s => [new Date(s.InsertDate).getTime(), s.SumCount_Status]);
      this.listSumCountUserID = list.map(f => [new Date(f.InsertDate).getTime(), f.SumCount_UserID]);
      this.renderChart();

    })
  }

  selectTimeChart(timeSelect: SelectTimePastDayesChartHour) {
    this.SelectTimePastDayesChartHourSelect = timeSelect;
    //اگر ساعتی باشد باید 48 ساعت گذشته باشد
    if (this.InputHashTagForChartModel.IsHourSelect) {
      this.InputHashTagForChartModel.IsHour = 2;
      this.generateDateFromDateHouer(this.SelectTimePastDayesChartHourSelect);
    }



  }

  generateDateFromDate(SelectTimePastDayesChart: SelectTimePastDayesChart) {
    let model = new InputGenerateDateModel();
    switch (SelectTimePastDayesChart) {
      case this.SelectTimePastDayesChart.Past2Daye:
      case this.SelectTimePastDayesChart.Past2Week:
        model.Days = SelectTimePastDayesChart;
        break;
      default:
    }

    this._generateDateService.generateDateFromDate(model).subscribe((time: OutPutDateModel) => {
      this.OutPutDate = time;
      this.getDataChart();
    })

  }

  generateDateFromDateHouer(SelectTimePastDayesChartHover: SelectTimePastDayesChartHour) {
    let model = new InputGenerateDateModel();
    model.Hour = SelectTimePastDayesChartHover;
    this._generateDateService.generateDateFromDate(model).subscribe((time: OutPutDateModel) => {
      this.OutPutDate = time;
      this.getDataChart();
    })

  }

  renderChart() {
    Highcharts.setOptions({
      lang: {
        months: ['بهمن', 'اسفند', 'فروردين', 'ارديبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور', 'مهر', 'آبان', 'آذر', 'دی'],
        shortMonths: ['بهمن', 'اسفند', 'فروردين', 'ارديبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور', 'مهر', 'آبان', 'آذر', 'دی'],
        weekdays: ["یکشنبه", "دوشنبه", "سه شنبه", "چهارشنبه", "پنج‌شنبه", "جمعه", "شنبه"],
        rangeSelectorZoom: 'انتخاب بازه : ',
      },
    })


    setTimeout(() => {
      Highcharts.stockChart("ChartTime", <any>{
        title: {
          text: ""
        },
        lang: {
          downloadCSV: "دانلود csv",
          downloadJPEG: "دانلود jpeg",
          downloadPDF: "دانلود pdf",
          downloadPNG: "دانلود png",
          downloadSVG: "دانلود svg",
          downloadXLS: "دانلود xls",
          viewFullscreen: "نمایش تمام صفحه",
          printChart: "چاپ نمودار",
          loading: "بارگذاری...",
          exitFullscreen: "خروج از تمام صفحه"
        },
        rangeSelector: {
          enabled: false,
          inputEnabled: false,
          selected: 3,
          buttons: [
            {
              type: "hour",
              count: 6,
              text: '6h'
            },
            {
              type: "hour",
              count: 12,
              text: '12h'
            },
            {
              type: "hour",
              count: 24,
              text: '24h'
            },
            {
              type: "all",
              text: 'All'
            }
          ]
        },
        //xAxis: {
        //  labels: {
        //    formatter: (data) => {

        //      let date = new Date(data.value);
        //      if (this.InputHashTagForChartModel.IsHourSelect) {
        //        return date.toLocaleString("fa").split("،")[1];
        //      }
        //      else {
        //        return date.toLocaleString("fa").split("،")[0];
        //      }

        //    }
        //  },
        //},
        legend: {
          enabled: true,
        },
        tooltip: {
          formatter: function () {
            return ['<b>' +

              new Date(this.x).toLocaleString("fa").split("،")[0] +
              '</b>'].concat(
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
        navigator: {
         
          xAxis: {
            title: {
              text: "تاریخ و ساعت"
            },
           
          
            labels: {
             
              formatter: (data) => {
              
                let date = new Date(data.value);
                if (this.InputHashTagForChartModel.IsHourSelect) {
                  return date.toLocaleString("fa").split("،")[1];
                }
                else {
                  return date.toLocaleString("fa").split("،")[0];
                }
              }
            },
          }
        },
        series: [
          
          {
            type: "column",
            name: "تعداد تکرار",
            color: "#bce0fd",
            data: this.listSumCountStatus,

          },
          {
            type: "column",
            name: "تعداد کاربر",
            color: "#5145c1",
            data: this.listSumCountUserID,

          }
        ],
        exporting: {
          csv: {
            dateFormat: '%Y-%m-%d  %H:%M:%S'
          }
        }

      }, null);
      //this.stock = new StockChart({

      //  tooltip: {
      //    formatter: function () {
      //      return ['<b>' + new Date(this.x).toLocaleString("fa") + '</b>'].concat(
      //        this.points ?
      //          this.points.map(function (point) {
      //            return `<span >${point.series.name}</span>: <b>${point.y}</b>`
      //          }) : []
      //      );
      //    },
      //    split: true
      //  },
      //  chart: {
      //    type: 'column',
      //    alignTicks: false
      //  },
      //  credits: {
      //    enabled: false
      //  },
      //  rangeSelector: {
      //    inputEnabled: false,
      //    selected: 3,
      //    buttons: [
      //      {
      //        type: "hour",
      //        count: 6,
      //        text: '6h'
      //      },
      //      {
      //        type: "hour",
      //        count: 12,
      //        text: '12h'
      //      },
      //      {
      //        type: "hour",
      //        count: 24,
      //        text: '24h'
      //      },
      //      {
      //        type: "day",
      //        count: 2,
      //        text: '2day'
      //      },
      //      {
      //        type: "all",
      //        text: 'All'
      //      }
      //    ]
      //  },
      //  title: {
      //    text: ''
      //  },
      //  xAxis: {
      //    labels: {
      //      formatter: function () {

      //        let date = new Date(this.value);
      //        return date.toLocaleString("fa").split("،")[0];
      //      }
      //    },
      //  },
      //  navigator: {
      //    xAxis: {
      //      labels: {
      //        formatter: function (v) {
      //          var date = new Date(this.value);
      //          return date.toLocaleString("fa");
      //        }
      //      },
      //    }
      //  },
      //  series: [
      //    {
      //      type: "column",
      //      name: "تعداد تکرار",
      //      color:"#bce0fd",
      //      data: this.listSumCountStatus,

      //    },
      //    {
      //      type: "column",
      //      name: "تعداد کاربر",
      //      color:"#5145c1",
      //      data: this.listSumCountUserID,

      //    }
      //   ]
      //});


    }, 1000)
  }

  IsHourChsnge() {
    //اگر ساعتی باشد باید 48 ساعت گذشته باشد
    if (this.InputHashTagForChartModel.IsHourSelect) {

      this.InputHashTagForChartModel.Hour = 0;
      this.InputHashTagForChartModel.IsHour = 2;
      this.SelectTimePastDayesChartHourSelect = SelectTimePastDayesChartHour.Past24;
      this.generateDateFromDateHouer(this.SelectTimePastDayesChartHourSelect);
    }
    else {
      this.InputHashTagForChartModel.Hour = 0;
      this.InputHashTagForChartModel.IsHour = 0;
      //this.generateDateFromDate(this.SelectTimePastDayesChart.Past2Week);

      this.dailyChartDraw();
    }
  }

  dailyChartDraw() {
    let modelDate = new InputGenerateDateModel();
    modelDate.Days = SelectTimePastDayesChart.Past1Week;
    this._generateDateService.generateDateFromDate(modelDate).subscribe((time: OutPutDateModel) => {
      this.OutPutDate = time;
      this.getDailyChartData();
    })
  }

  getDailyChartData() {
    let model: InputHashTagForChartModel = {
      fromDate: this.OutPutDate.FromDate.split("T")[0],
      toDate: this.OutPutDate.ToDate.split("T")[0],
      Type: PlatformType.Twitter,
      Hour: null,
      IsHour: 2,
      IsHourSelect: false
    }
    this._hashTagDataService.getApiSelectHashTagForChart(model).subscribe(response => {
      
      let weekDaysList = this.getChartWeekDay(this.OutPutDate.ToDate);
      this.convertResponeDataToChartData(response, weekDaysList);

      if (this.dailyChartModel.type === DailyChartType.UserCount)
        this.drawDailyChart(this.dailyChartModel.data.userCountList, weekDaysList, "userCountChart");
      else if (this.dailyChartModel.type === DailyChartType.RepeatCount)
        this.drawDailyChart(this.dailyChartModel.data.repeatCountList, weekDaysList, "repeatCountChart");      
    })
  }

  showChart(type: DailyChartType) {
    this.dailyChartModel.type = type;
    let weekDaysList = this.getChartWeekDay(this.OutPutDate.ToDate);

    if (type === DailyChartType.RepeatCount && this.dailyChartModel.data.repeatCountList.length) {
      this.drawDailyChart(this.dailyChartModel.data.repeatCountList, weekDaysList, "repeatCountChart");
    }
    else if (type === DailyChartType.UserCount && this.dailyChartModel.data.userCountList.length) {
      this.drawDailyChart(this.dailyChartModel.data.userCountList, weekDaysList, "userCountChart");
    }
  }

  getWeekDayNameByDate(date: Date) {
    switch (date.getDay()) {
      case 0:
        return "یکشنبه";
      case 1:
        return "دوشنبه";
      case 2:
        return "سه شنبه";
      case 3:
        return "چهارشنبه";
      case 4:
        return "پنج شنبه";
      case 5:
        return "جمعه";
      case 6:
        return "شنبه";
        default:
          return null
    }
  }
  getChartWeekDay(date: any) {
    let result: string[] = [];
    var today = new Date(date);
    var lastWeek = new Date();
    for (var i = 0; i <= 7; i++) {
      lastWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() - i);
      result = result.concat(lastWeek.toLocaleDateString());
    }
    return result;
  }
  convertResponeDataToChartData(data: any[], dateList: string[]) {
    let repeatCountList = [];
    let userCountList = [];

    for (var i = 0; i < data.length; i++) {

      // ساخت داده های نمودار تعداد تکرار
      repeatCountList.push({
        id: data[i],
        x: new Date(data[i].InsertDate).getHours(), // hour
        y: dateList.indexOf(new Date(data[i].InsertDate).toLocaleDateString()), //day
        value: data[i]["SumCount_Status"] // value
      });

      // ساخت داده های نمودار تعداد کاربر
      userCountList.push({
        id: data[i],
        x: new Date(data[i].InsertDate).getHours(), // hour
        y: dateList.indexOf(new Date(data[i].InsertDate).toLocaleDateString()), //day
        value: data[i]["SumCount_UserID"] // value
      });
    }

    this.dailyChartModel.data = {
      repeatCountList: repeatCountList,
      userCountList: userCountList
    }
  }
  createChartOption(data: any, weekDayList: string[]) {
    let chartOption = {
      chart: {
        type: 'heatmap',
      },
      title: {
        text: null
      },
      lang: {
        downloadCSV: "دانلود csv",
        downloadJPEG: "دانلود jpeg",
        downloadPDF: "دانلود pdf",
        downloadPNG: "دانلود png",
        downloadSVG: "دانلود svg",
        downloadXLS: "دانلود xls",
        viewFullscreen: "نمایش تمام صفحه",
        printChart: "چاپ نمودار",
        loading: "بارگذاری...",
        exitFullscreen: "خروج از تمام صفحه"
      },
      xAxis: {
        categories: ["00:00", '01:00', "02:00", "03:00", "04:00", "05:00", "06:00", "07:00", "08:00", "09:00", "10:00", "11:00", "12:00",
          "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00", "22:00", "23:00"],
        min: 0,
        title: {
          text: "ساعت"
        },
        max: 23,
      },
      yAxis: {
        categories: weekDayList.map(f => this.getWeekDayNameByDate(new Date(f)) + new Date(f).toLocaleDateString("fa")),
       // useHTML: true,
        title: {
          text: "تاریخ"
        },
        min: 0,
        max: 7
      },
      colorAxis: {
        min: 0,
        minColor: '#FFFFFF',
        maxColor: Highcharts.getOptions().colors[0]
      },
      legend: {
        enabled: false,
        align: 'right',
        layout: 'vertical',
        margin: 0,
        verticalAlign: 'top',
        y: 25,
        symbolHeight: 280
      },
      plotOptions: {        
        series: {
          events: {
            click: (event) => {
              //this.selectDate.emit(event.point.id.Trenddate);
            }
          }
        }
      },
      tooltip: {
        useHTML: true,
        formatter: function () {
         
          return `<b>تعداد پیام: ${this.point.value}</b>`;

          //if (type == AlmasEntityType.User_Twitter) {
          //  return `<b>توئیت: </b><b>` + this.point.id.TweetCnt + `</b><br>` +
          //    `<b>ریتوئیت: </b><b>` + this.point.id.RetweetCnt + `</b><br>` +
          //    `<b>کوت: </b><b>` + this.point.id.QuoteCnt + `</b><br>` +
          //    `<b>پاسخ: </b><b>` + this.point.id.ReplyCnt + `</b><br>`;
          //}
          //else {
          //  return `<b>` + this.series.yAxis.categories[this.point.y].split("<hr/>")[0] + `</b> - <b>` +
          //    this.series.yAxis.categories[this.point.y].split("<hr/>")[1] + `</b><hr/><b>تعداد پیام: ` + this.point.value + `</b>`;

          //  //  return '<b>' + this.series.xAxis.categories[this.point.x] + '</b> ساعت <br><b>' +
          //  //    this.point.value + '</b> پیام <br><b>' + this.series.yAxis.categories[this.point.y] + '</b>';
          //}
        }
      },
      credits: {
        enabled: false
      },
      series: [{
       // name: '',
        type: "heatmap",
        borderWidth: 1,
        data: data,
        dataLabels: {
          enabled: false,
          color: '#000000'
        }
      }]
    }

    return chartOption;
  }
  drawDailyChart(data: any[], weekDayList: string[] = [], chartContainerName: string) {
    let chartOption = this.createChartOption(data, weekDayList);
    setTimeout(() => {
      Highcharts.chart(chartContainerName, chartOption);
      //this.ref.markForCheck();
    }, 200);
  }
}

enum DailyChartType {
  UserCount = 1,
  RepeatCount = 2
}

interface IDailyChart {
  type: DailyChartType;
  data: {
    userCountList: any[],
    repeatCountList: any[]
  }
}
export class InputHashTagForChartModel {
  fromDate: any;
  toDate: any;
  Type: PlatformType;
  IsHour: number = 0;
  IsHourSelect: boolean = false;
  Hour: number;
}