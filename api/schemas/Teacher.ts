import {
    integer,
    select,
    text,
    relationship,
    virtual,
    image,
} from '@keystone-6/core/fields';
import { list } from '@keystone-6/core';
import { allOperations, allowAll } from '@keystone-6/core/access';
import { isAdmin, isLoggedIn } from '../data/access';
import { graphql } from '@graphql-ts/schema';
import { BaseKeystoneTypeInfo, KeystoneContext } from '@keystone-6/core/types';
import { formatMoney } from '../data/utils';
import { GeneralSession } from '../data/types';

export const Teacher = list({
    access: {
        operation: {
            ...allOperations(isAdmin),
            query: () => true,
        },
    },
    fields: {
        name: text({ validation: { isRequired: true } }),
        description: text(),
        image: image({
            storage: 'images',
        }),
        courses: relationship({ ref: 'Course.teacher', many: true })
    },
});
