import { isEqual } from "lodash"
import { GeneralApiResponse } from '../../api/data/types'
import axios, { AxiosError } from 'axios'

export function emptyArray<T>(arr: T[]) {
  arr.splice(0, arr.length)
}

export function stripHtml(html: string) {
  return html.replace(/<[^>]*>?/gm, '');
}

export const validateEmail = (email: string) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

export const chunk = <T>(arr: T[], chunkSize = 10) => {
  const res: T[][] = [];
  for (let i = 0; i < arr.length; i += chunkSize) {
    const chunk = arr.slice(i, i + chunkSize);
    res.push(chunk)
  }
  return res
}


export function showGeneralApiMessage(res: GeneralApiResponse, ctx: any) {



  if (res.ok === false) {
    ctx.$izitoast.error({ title: res.message })

  } else {

    if (res.type) {

      if (res.type === 'error')
        ctx.$izitoast.error({ title: res.message })
      else if (res.type === 'success')
        ctx.$izitoast.success({ title: res.message })
      else
        ctx.$izitoast.info({ title: res.message })

    } else {
      ctx.$izitoast.info({ title: res.message })

    }
  }

}

export function showGeneralError(err: any, ctx: any) {
  console.log(err)

  if (axios.isAxiosError(err)) {

    if (err.response && err.response.data)
      if (isEqual(Object.keys(err.response.data), ['ok', 'message'])) {
        ctx.$izitoast.error({
          title: "fa:: general error axios",
          message: err.response.data.message,
        })

      }
  } else {
    ctx.$izitoast.error({
      title: "fa:: general error",
      message: String(err),
    })

  }

}


/**  Gregorian & Jalali (Hijri_Shamsi,Solar) Date Converter Functions
Author: JDF.SCR.IR =>> Download Full Version :  http://jdf.scr.ir/jdf
License: GNU/LGPL _ Open Source & Free :: Version: 2.81 : [2020=1399]
---------------------------------------------------------------------
355746=361590-5844 & 361590=(30*33*365)+(30*8) & 5844=(16*365)+(16/4)
355666=355746-79-1 & 355668=355746-79+1 &  1595=605+990 &  605=621-16
990=30*33 & 12053=(365*33)+(32/4) & 36524=(365*100)+(100/4)-(100/100)
1461=(365*4)+(4/4) & 146097=(365*400)+(400/4)-(400/100)+(400/400)  */

function gregorian_to_jalali(gy: number, gm: number, gd: number) {
  var g_d_m, jy, jm, jd, gy2, days;
  g_d_m = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334];
  gy2 = (gm > 2) ? (gy + 1) : gy;
  days = 355666 + (365 * gy) + ~~((gy2 + 3) / 4) - ~~((gy2 + 99) / 100) + ~~((gy2 + 399) / 400) + gd + g_d_m[gm - 1];
  jy = -1595 + (33 * ~~(days / 12053));
  days %= 12053;
  jy += 4 * ~~(days / 1461);
  days %= 1461;
  if (days > 365) {
    jy += ~~((days - 1) / 365);
    days = (days - 1) % 365;
  }
  if (days < 186) {
    jm = 1 + ~~(days / 31);
    jd = 1 + (days % 31);
  } else {
    jm = 7 + ~~((days - 186) / 30);
    jd = 1 + ((days - 186) % 30);
  }
  return [jy, jm, jd];
}

function jalali_to_gregorian(jy: number, jm: number, jd: number) {
  var sal_a, gy, gm, gd, days;
  jy += 1595;
  days = -355668 + (365 * jy) + (~~(jy / 33) * 8) + ~~(((jy % 33) + 3) / 4) + jd + ((jm < 7) ? (jm - 1) * 31 : ((jm - 7) * 30) + 186);
  gy = 400 * ~~(days / 146097);
  days %= 146097;
  if (days > 36524) {
    gy += 100 * ~~(--days / 36524);
    days %= 36524;
    if (days >= 365) days++;
  }
  gy += 4 * ~~(days / 1461);
  days %= 1461;
  if (days > 365) {
    gy += ~~((days - 1) / 365);
    days = (days - 1) % 365;
  }
  gd = days + 1;
  sal_a = [0, 31, ((gy % 4 === 0 && gy % 100 !== 0) || (gy % 400 === 0)) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  for (gm = 0; gm < 13 && gd > sal_a[gm]; gm++) gd -= sal_a[gm];
  return [gy, gm, gd];
}

export function reactDatePickerToJalali(input: string) {


  const enDate = input.split('-').map(i => parseInt(i))

  return gregorian_to_jalali(enDate[0], enDate[1], enDate[2])


}

export class PersianCalander {

  private rawDate: number[] = []

  constructor(private initalValue: string) {
    this.rawDate = this.brakeDown()
  }

  public setInitalValue(input: string) {
    this.initalValue = input;
    return this
  }

  public toLetterMounth(): [number, string, number] {
    const months = [
      'فروردین',
      'اردیبهشت',
      'خرداد',
      'تیر',
      'مرداد',
      'شهریور',
      'مهر',
      'آبان',
      'آذر',
      'دی',
      'بهمن',
      'اسفند',
    ]

    const [y, m, d] = this.rawDate

    return [y, months[m - 1], d

    ]
  }

  public toSimpleArray() {
    return this.rawDate
  }


  private brakeDown() {
    return this.initalValue.split("-").map(i => parseInt(i))
  }

}