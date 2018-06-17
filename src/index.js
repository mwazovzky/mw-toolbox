import Test from './components/Test.vue'
import Modal from './components/Modal.vue'
import Panel from './components/Panel.vue'
import Card from './components/Card.vue'

// Install the components
export function install (Vue) {
    Vue.component('test', Test)
    Vue.component('modal', Modal)
    Vue.component('panel', Panel)
    Vue.component('card', Card)
    /* -- Add more components here -- */
}

// Expose the components
export {
    Test,
    Modal,
    Panel,
    Card
    /* -- Add more components here -- */
}

/* -- Plugin definition & Auto-install -- */
/* You shouldn't have to modify the code below */

// Plugin
const plugin = {
    /* eslint-disable no-undef */
    version: VERSION,
    install,
}

export default plugin

// Auto-install
let GlobalVue = null
if (typeof window !== 'undefined') {
    GlobalVue = window.Vue
} else if (typeof global !== 'undefined') {
    GlobalVue = global.Vue
}
if (GlobalVue) {
    GlobalVue.use(plugin)
}
