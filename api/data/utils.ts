import { SessionStore, type KeystoneContextFromListTypeInfo, type BaseListTypeInfo } from "@keystone-6/core/types";
// import {} from "express"
import { Roles } from "./enums";
import { GeneralSession } from "./types";
import axios from 'axios';


export const formatMoney = (money: number): string => {
    const formatter = new Intl.NumberFormat("fa-IR");
    return formatter.format(money);
};



export async function kickout(req?: KeystoneContextFromListTypeInfo<BaseListTypeInfo>['req']) {
    if (req?.headers?.userid) {
        const userid = Array.isArray(req.headers.userid) ? req.headers.userid.at(-1) : req.headers.userid
        await axios.get("localhost:3030/kick?userid=" + userid)
    }

}

export function sendCommand(cmd: { action: 'show_message', type: 'success' | 'error' | 'alert', message: string } | { action: 'logout', message?: string }) {
    // TODO impel
    console.log(cmd)
}