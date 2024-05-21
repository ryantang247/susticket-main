// https://nuxt.com/docs/api/configuration/nuxt-config
import { defineConfig } from 'vite'
// import veauryVitePlugins from "veaury/vite/index.js"
// const veaury = veauryVitePlugins({
//     type: 'vue',
// });
// veaury.shift();
export default defineNuxtConfig({
    routeRules: {
        '/': { prerender: true },
    },
    // build:{
    //     transpile: ['veaury'],
    // },
  runtimeConfig:{

      public:{
          workspaceKey: process.env.workspaceKey,
          chatProjectId: process.env.chatProjectId,
          chatPrivateKey: process.env.chatPrivateKey,
          reccPublicKey: process.env.reccPublicKey
      } ,
      // workspaceKey: process.env.workspaceKey,
      // chatProjectId: process.env.chatProjectId,
      // chatPrivateKey: process.env.chatPrivateKey,
      // reccPublicKey: process.env.reccPublicKey

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
        // build: {
        //     commonjsOptions: {
        //         transformMixedEsModules: true,
        //     },
        // }
    }
})
// https://nuxt.com/docs/api/configuration/nuxt-config
// https://nuxt.com/docs/api/configuration/nuxt-config
// import { defineNuxtConfig } from 'nuxt'

// export default defineNuxtConfig({
//   modules: [
//     '@element-plus/nuxt'
//   ],
//   plugins: [
//     '~/plugins/fontawesome.ts'
//   ],
//   devtools: { enabled: true }
// })



