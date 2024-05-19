// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
    routeRules: {
        '/': { prerender: true },
    },
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
  devtools: { enabled: true }
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



