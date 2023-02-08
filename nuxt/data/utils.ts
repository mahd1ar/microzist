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