// Welcome to your schema
//   Schema driven development is Keystone's modus operandi
//
// This file is where we define the lists, fields and hooks for our data.
// If you want to learn more about how lists are configured, please read
// - https://keystonejs.com/docs/config/lists

import { list } from '@keystone-6/core';
import { allowAll } from '@keystone-6/core/access';


// see https://keystonejs.com/docs/fields/overview for the full list of fields
//   this is a few common fields for an example
import {
    text,
    relationship,
} from '@keystone-6/core/fields';

export const Category = list({
    access: allowAll,
    fields: {
        name: text({
            validation: { isRequired: true }
        }),
        description: text(),
        parentId: relationship({
            ref: 'Category',
            many: true,
            isFilterable: true,
            label: 'parent categoury'
        })
    }
})