import Vue from 'vue';
import {router} from '../../../router'
import component from '../components.vue'
import listening from './listening'

let $vm
let $watcher

export function createDOM () {
  if (typeof document === 'undefined') {
    return
  }
  const MyComponent = Vue.extend(component)
  const $vm = new MyComponent({
    el: document.createElement('div')
  })
  document.body.appendChild($vm.$el)
  return $vm
}

export function install () {
  if (!$vm) {
    $vm = createDOM()
    Vue.prototype.$plugin = obj
  }
}

export function show (options) {

  const { cb } = options
  if (cb) {
    $vm.cb = cb
  }
  listening(hide)
  const { path, query, params } = router.currentRoute
  router.push({
    path,
    query,
    params,
    hash: 'pluginHash'
  })

  $watcher && $watcher()
  $watcher = $vm.$watch('targetValue', (val) => {
    if (val === false) {
      hide()
      $watcher && $watcher()
    }
  })
  $vm.targetValue = true
}

export function hide () {
  $vm.targetValue = false
  $vm.$nextTick(() => {
    $watcher && $watcher()
    $watcher = null
    if (window.location.hash.indexOf('pluginHash') !== -1) {
      router.go(-1)
    }
  })
}

const obj = {
  install,
  show,
  hide
}

export default obj
