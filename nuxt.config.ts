export default defineNuxtConfig({
    routeRules: {
        '/': { prerender: true },
    },
    build:{
        transpile: ['veaury'],
    },
    runtimeConfig:{

        public:{
            workspaceKey: process.env.workspaceKey,
            chatProjectId: process.env.chatProjectId,
            chatPrivateKey: process.env.chatPrivateKey,
            reccPublicKey: process.env.reccPublicKey,
            seatsioKey: process.env.seatsioKey
        } ,

    },
    modules: [// 'nuxt-icon'
    '@element-plus/nuxt', '@nuxt/test-utils/module', "@nuxt/content"],
    devtools: { enabled: true },
    vite: {
        // plugins: [
        //     veaury
        // ]
        build: {
            commonjsOptions: {
                transformMixedEsModules: true,
            },
        }
    }
})