import {setBackgroundColor, getBackgroundColor, HOST} from './common'

interface Comments {
  [filename: string]: Comment[]
}

interface Comment {
  author: {
    _account_id: number
    name: string
    email: string
    username: string
  }
  patch_set: number
  id: string
  line: number
  range: {
    start_line: number
    start_character: number
    end_line: number
    end_character: number
  }
  in_reply_to: string
  updated: string
  message: string
}

chrome.webNavigation.onCompleted.addListener(
  ({url}) => {
    // Match review pages only
    if (url.match(/r\/#\/c\/[0-9]+/)) {
      getBackgroundColor(new URL(url).host).then(color => {
        if (color) {
          setBackgroundColor(color)
        }
      })
      const matches = new URL(url).hash.match(/([0-9]+)/)
      if (matches) {
        const id = matches[0]
        const headers = [
          ['accept', 'application/json'],
          ['accept-encoding', 'gzip']
        ]
        fetch(`https://gerrit.wikimedia.org/r/changes/${id}/comments`, {
          headers
        })
          .then(response => response.text())
          .then(text => JSON.parse(text.substring(4))) // Strip XSSI prefix.
          .then((json: Comments) => {
            const filenames = Object.keys(json)
            for (const filename of filenames) {
              const comments = json[filename]
              for (const comment of comments) {
                const line = comment.line
                const patchset = comment.patch_set
                const message = comment.message
                const html = `${patchset} ${filename}:${line} ${message}`
                  .replace(/'/g, "\\'")
                  .replace(/\n/g, '&nbsp;<br />')
                const code = `(() => {
                  const div = document.createElement('div')
                  div.innerHTML = '${html}'
                  document.body.appendChild(div)
                })()`
                chrome.tabs.executeScript({code})
              }
            }
          })
      }
    }
  },
  // this should be kept in sync with the manifest
  {url: [{hostPrefix: HOST}]}
)
