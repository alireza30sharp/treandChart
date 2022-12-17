export enum compareLocation {
  //صفحه مقایسه هشتگ
  hashtag = 10,
  //مسائل
  issues = 12,
  KhonsaIssue = 18,
  MosbatIssue = 19,
  ManfiIssue = 20,
  //کلمات
  word = null
}

//نوع خروجی اس پی لیست هشتگ ها
export enum SocialTypeHashtag {
  twitter = 1,
  instagram,
}

//بر چه اساسی هشتگ ها مرتب سازی شود
export enum OrderByHashtag {
  /**
   *تعداد تکرار
   * */
  count_Status = 1,
  /**
   * تعداد کاربر*/
  count_UserID
}

//مقدار فراگیرترین در صفحه اول مسائل مهم
export enum InclusiveEnum {
  //تازه ترین
  Newest = 2,
  //فراگیرترین
  TheMostVisited = 3,
  //پرنفوذترین
  MostParticipation = 4,
  //در حال رشد
  Growing = 5,

}

//وضعیت هشتگ
export enum GrowthTypeHashtag {
  //نزولی
  desc = -1,
  //بدون تغییر
  unchanged=0,
  //رشد
  growth = 1,

}
