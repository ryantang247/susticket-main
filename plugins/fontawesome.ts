// plugins/fontawesome.ts
import { defineNuxtPlugin } from '#app'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faUserSecret } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

export default defineNuxtPlugin((nuxtApp) => {
  library.add(faUserSecret)
  
  // Register FontAwesomeIcon as a global component
  nuxtApp.vueApp.component('FontAwesomeIcon', FontAwesomeIcon)
})
