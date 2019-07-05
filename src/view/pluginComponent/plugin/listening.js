let isListening = false
const currentHash = 'pluginHash'
let goBack = null

const hashchange = ({oldURL}) => {
  const locationHash = window.location.hash
  if (locationHash.indexOf(currentHash) !== -1) {
    // 调用
  }
  if (oldURL.indexOf(currentHash) !== -1 && locationHash.indexOf(currentHash) === -1) {
    // 退出调用
    goBack && goBack()
  }
}

const listening = (hide) => {
  if (!isListening) {
    goBack = hide
    if ('onhashchange' in window) {
      window.onhashchange = hashchange
    }
    isListening = true
  }
}

export default listening