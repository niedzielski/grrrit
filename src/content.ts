import {setBackgroundColor, getBackgroundColor, HOST} from './common'

function saveBackgroundColor(url: string, color: string) {
  chrome.storage.sync.set({[url]: color})
}

document.addEventListener('DOMContentLoaded', () => {
  getBackgroundColor(HOST).then(color => {
    const dropDown = <HTMLSelectElement>document.getElementById('dropDown')
    if (color) {
      setBackgroundColor(color)
      dropDown.value = color
    }

    dropDown.addEventListener('change', () => {
      setBackgroundColor(dropDown.value)
      saveBackgroundColor(HOST, dropDown.value)
    })
  })
})
