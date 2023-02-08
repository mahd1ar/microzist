import { StorageConfig } from "@keystone-6/core/types";

// TODO adjust next line
const baseUrl = 'http://localhost:3030'
export const storage: Record<string, StorageConfig> = {
    'local': {
        // Images that use this store will be stored on the local machine
        kind: 'local',
        // This store is used for the image field type
        type: 'file',
        // The URL that is returned in the Keystone GraphQL API
        generateUrl: (path: string) => `${baseUrl}/file${path}`,
        // The route that will be created in Keystone's backend to serve the images
        serverRoute: {
            path: '/files',
        },
        storagePath: 'public/files',
    },
} 