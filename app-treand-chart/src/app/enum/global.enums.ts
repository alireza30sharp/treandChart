

export enum PlatformType {
  Twitter = 1,
  Instagram = 2,
  Telegram = 3,
  Facebook = 4,
}

export enum PlatformTypeTitle {
  Telegram = "تلگرام",
  Twitter = "توئیتر",
  Instagram = "اینستاگرام ",
  Facebook="فیسبوک"
}


//بخش برترین کاربران صفحه اصلی
export enum SearchType {
  //پر نفوذ ترین
  influential = -1,

  //فعالترین
  mostActive = 1,

  //بیشترین نظر دریافتی
  mostComments = 2,

  // بیشترین بازنشر
  mostRepublished = 3,

  // پربازدیدترین
  mostVisit = 4,

  // لایک شده ترین
  mostLike = 5
}



///بازی زمانی پیام های مهم
export enum IntervalOfImportantMessages {
  Past3 = 3,
  Past6 = 2,
  Past12 = 1,
  Past24=0
}

///بازی زمانی صفحه شناسنامه هشتگ
export enum SelectTimePastHours {
  Past3 = -3,
  Past6 = -6,
  Past12 = -12,
  Past24 = -24
}



///بازی زمانی صفحه شناسنامه هشتگ نمودار زمان
export enum SelectTimePastDayesChart {
  Past12 = -12,
  Past24 = -24,
  Past2Daye = -2,
  Past2Week=-14,
  Past1Week=-7,
}

export enum SelectTimePastDayesChartHour {
  Past3 = -3,
  Past6 = -6,
  Past12 =-12,
  Past24 = -24,
  Past48 = -48,
  Past72 = -72,
}




//نوع جستجوی پیام های مهم....باز نشر شده ترین..بیشترین لایک و...

export enum TypeSearchImportantMeessage {
  Important = 0,
  /*بیشترین بازنشر
   *TelegramSort=1
   *TwitterSort=1
   */
  MostRepublished = 1,

  /*بیشترین لایک
   *TwitterSort=3
   *InstagramSort=3
   */
  MostLikes = 3,
  /*بیشترین پاسخ
   *InstagramSort=2
   *TwitterSort=2
   */
  MostAnswers = 2,
  /*بیشترین بازدید
   *TelegramSort=3
   *InstagramSort1
   */
  MostVisited ="3,1",
  /*جدید‌ترین
   *FaceBookSort=4
   *InstagramSort=4
   *TelegramSort=4
   * TwitterSort=4
  */
  TheNewest = 4,
  /*قدیمی‌ترین
   *FaceBookSort=5
   *InstagramSort=5
   *TelegramSort=5
   * TwitterSort=5
   */
  Tholdest=5
}
