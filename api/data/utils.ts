import {
    SessionStore,
    type KeystoneContextFromListTypeInfo,
    type BaseListTypeInfo,
} from '@keystone-6/core/types';
// import {} from "express"
import { Roles } from './enums';
import { Session } from './types';
import axios from 'axios';
import { PrismaClient } from '@prisma/client';

export const formatMoney = (money: number): string => {
    const formatter = new Intl.NumberFormat('fa-IR');
    return formatter.format(money);
};

export async function getAdminSessionParams() {
    const prisma = new PrismaClient();
    const user = await prisma.user.findFirst({
        where: {
            role: {
                equals: Roles.admin,
            },
            status: { equals: 'enable' },
        },
    });

    prisma.$disconnect();

    return {
        listKey: 'User',
        itemId: user?.id || '',
        data: {
            createdAt: user?.createdAt?.toString() || '',
            name: user?.name || '',
            role: Roles.admin,
            status: 'enable',
        },
    };
}

export async function kickout(
    req?: KeystoneContextFromListTypeInfo<BaseListTypeInfo>['req']
) {
    if (req?.headers?.userid) {
        const userid = Array.isArray(req.headers.userid)
            ? req.headers.userid.at(-1)
            : req.headers.userid;
        await axios.get('localhost:3030/kick?userid=' + userid);
    }
}
