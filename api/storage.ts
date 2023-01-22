import { StorageConfig } from "@keystone-6/core/types";

// TODO adjust next line
const baseUrl = 'http://localhost:3000'
export const storage: Record<string, StorageConfig> = {
    'local': {
        // Images that use this store will be stored on the local machine
        kind: 'local',
        // This store is used for the image field type
        type: 'image',
        // The URL that is returned in the Keystone GraphQL API
        generateUrl: (path: string) => `${baseUrl}/images${path}`,
        // The route that will be created in Keystone's backend to serve the images
        serverRoute: {
            path: '/images',
        },
        storagePath: 'public/images',
    }
} 