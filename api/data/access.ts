import { BaseAccessArgs } from "@keystone-6/core/dist/declarations/src/types/config/access-control";
import { BaseListTypeInfo } from "@keystone-6/core/types";
import { Roles } from "./enums";
import { kickout } from "./utils";

export function isLoggedIn(args: BaseAccessArgs<BaseListTypeInfo>) {
    if (!!args.session === false)
        kickout(args.context.req)


    return !!args.session;
}


export function isAdmin(args: BaseAccessArgs<BaseListTypeInfo>) {

    return isLoggedIn(args) && args.context.session!.data.role === Roles.admin
}



// export class Is {
//     static loggedIn(session: GeneralSession): boolean {
//         return Boolean(session)
//     }

//     static admin(session: GeneralSession): boolean {

//         return (Is.loggedIn(session)) && session!.data.role === Roles.admin
//     }

// }
