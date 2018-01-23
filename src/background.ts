import {changeBackgroundColor, getSavedBackgroundColor} from './common'

chrome.webNavigation.onCompleted.addListener(
  ({url}) => {
    getSavedBackgroundColor(new URL(url).host, color => {
      if (color) {
        changeBackgroundColor(color)
      }
    })
  },
  // this should be kept in sync with the manifest
  {url: [{hostContains: 'gerrit'}]}
)
