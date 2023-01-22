import { list } from '@keystone-6/core';
import { allowAll } from '@keystone-6/core/access';
import {
    text,
    relationship,
    image,
    timestamp,
} from '@keystone-6/core/fields';

export const Image = list({
    access: allowAll,
    ui: {
        label: 'media',

        // listView : {
        //   defaultFieldMode : 'hidden'
        // }
    },

    fields: {
        altText: text({ validation: { isRequired: false } }),

        image: image({
            storage: 'local',
            hooks: {
                // afterOperation: (a) => {
                // if (a.operation === 'create') {
                // TODO reduse image size ( probebly with squoosh )
                //   console.log(a)
                // }
                // }
            },


        }),
        uploadedBy: relationship({
            ref: 'User.images',
            many: false,
        }),

        createdAt: timestamp({
            defaultValue: { kind: 'now' },
        }),

    },
    // hooks: {

    //   validateInput: ({ resolvedData, addValidationError }) => {

    //     if (resolvedData.uploadedBy === undefined) {
    //       addValidationError('Uploaded By is not defined')
    //     }
    //   }
    // }
})