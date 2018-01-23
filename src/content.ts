import {setBackgroundColor, getBackgroundColor} from './common'

function getCurrentTabUrl(): Promise<string | undefined> {
  return new Promise(resolve => {
    const queryInfo = {active: true, currentWindow: true}
    chrome.tabs.query(queryInfo, tabs => {
      const url = tabs[0].url
      // todo: filter url here.
      resolve(url && new URL(url).host)
    })
  })
}

function saveBackgroundColor(url: string, color: string) {
  chrome.storage.sync.set({[url]: color})
}

document.addEventListener('DOMContentLoaded', () => {
  getCurrentTabUrl()
    .then(
      url => (url ? getBackgroundColor(url).then(color => ({url, color})) : {})
    )
    .then(({url, color}: {url?: string; color?: string}) => {
      const dropDown = <HTMLSelectElement>document.getElementById('dropDown')
      if (color) {
        setBackgroundColor(color)
        dropDown.value = color
      }

      if (url) {
        dropDown.addEventListener('change', () => {
          setBackgroundColor(dropDown.value)
          saveBackgroundColor(url, dropDown.value)
        })
      }
    })
})
