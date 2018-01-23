import {changeBackgroundColor, getSavedBackgroundColor} from './common'

function getCurrentTabUrl(callback: (url: string) => void) {
  const queryInfo = {active: true, currentWindow: true}

  chrome.tabs.query(queryInfo, tabs => {
    const url = tabs[0].url
    // todo: filter url here.
    if (url) callback(url)
  })
}

function saveBackgroundColor(url: string, color: string) {
  chrome.storage.sync.set({[url]: color})
}

document.addEventListener('DOMContentLoaded', () => {
  getCurrentTabUrl(url => {
    const dropdown = <HTMLSelectElement>document.getElementById('dropdown')

    getSavedBackgroundColor(url, color => {
      if (color) {
        changeBackgroundColor(color)
        dropdown.value = color
      }
    })

    dropdown.addEventListener('change', () => {
      changeBackgroundColor(dropdown.value)
      saveBackgroundColor(url, dropdown.value)
    })
  })
})
