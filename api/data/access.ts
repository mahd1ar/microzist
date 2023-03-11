import { BaseAccessArgs } from '@keystone-6/core/dist/declarations/src/types/config/access-control';
import { BaseListTypeInfo } from '@keystone-6/core/types';
import { Roles } from './enums';
import { Session } from './types';
import { kickout } from './utils';

export function isLoggedIn(args: BaseAccessArgs<BaseListTypeInfo>) {
    const { session }: Partial<{ session: Session }> = args;

    if (!!session === false) {
        kickout(args.context.req);
        return false;
    }
    // console. log('....session >', args.context.session?.data.name);

    if (session?.data.status === 'disabled') return false;

    return !!args.session;
}

export function isAdmin(args: BaseAccessArgs<BaseListTypeInfo>) {
    return isLoggedIn(args) && args.context.session!.data.role === Roles.admin;
}
