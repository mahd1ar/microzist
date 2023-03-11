import { list } from '@keystone-6/core';
import { allowAll } from '@keystone-6/core/access';
import { text, timestamp, file, select } from '@keystone-6/core/fields';
import { FileTypes } from '../data/enums';

export const File = list({
    access: allowAll,
    ui: {
        label: 'media',

        listView: {
            defaultFieldMode: 'hidden',
        },
    },
    hooks: {
        async resolveInput({ resolvedData, operation }) {
            // if (operation === 'create')
            if (resolvedData.video && resolvedData.video.filename) {
                if (!resolvedData.type) {
                    if (
                        ['mp4', 'mpa', 'mov', 'avi', 'wmv'].includes(
                            resolvedData.video.filename
                                .split('.')
                                .at(-1)
                                .toLowerCase()
                        )
                    ) {
                        resolvedData.type = 'video';
                    }
                }
            }

            return resolvedData;
        },
    },

    fields: {
        altText: text({ validation: { isRequired: false } }),

        video: file({
            storage: 'local',
        }),
        type: select({
            options: Object.keys(FileTypes),
        }),
        // uploadedBy: relationship({
        //     ref: 'User.images',
        //     many: false,
        // }),

        createdAt: timestamp({
            defaultValue: { kind: 'now' },
            ui: {},
        }),
    },
    // hooks: {

    //   validateInput: ({ resolvedData, addValidationError }) => {

    //     if (resolvedData.uploadedBy === undefined) {
    //       addValidationError('Uploaded By is not defined')
    //     }
    //   }
    // }
});
