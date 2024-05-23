
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
            reccPublicKey: process.env.reccPublicKey
        } ,

    },
    modules: [
        '@element-plus/nuxt',
        '@nuxt/test-utils/module'
        // 'nuxt-icon'
    ],
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
