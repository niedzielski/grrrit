import {setBackgroundColor, getBackgroundColor} from './common'

chrome.webNavigation.onCompleted.addListener(
  ({url}) => {
    getBackgroundColor(new URL(url).host).then(color => {
      if (color) {
        setBackgroundColor(color)
      }
    })
  },
  // this should be kept in sync with the manifest
  {url: [{hostContains: 'gerrit'}]}
)
