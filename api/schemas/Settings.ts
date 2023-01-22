import { list } from '@keystone-6/core';
import { allowAll } from '@keystone-6/core/access';
import { multiselect, relationship, text } from '@keystone-6/core/fields';


export const Settings = list({
    access: allowAll,
    isSingleton: true,
    fields: {
        websiteName: text(),
        copyrightText: text(),
        highlightedPosts: relationship({ ref: 'Post', many: true }),
        jobsList: multiselect({ options: [{ label: "1", value: "1" }, { label: "2", value: "2" }] })
    },
    graphql: {
        plural: 'ManySettings',
    },
})