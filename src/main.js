import './index.css'
import VueTippy from 'vue-tippy'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import 'tippy.js/dist/tippy.css'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(VueTippy, {
  directive: 'tippy',
  component: 'tippy',
  componentSingleton: 'tippy-singleton',
  defaultProps: {
    placement: 'top',
    allowHTML: true
  }
})
app.mount('#app')
