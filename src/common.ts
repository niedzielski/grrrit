export function getSavedBackgroundColor(
  url: string,
  callback: (color: string) => void
) {
  chrome.storage.sync.get(url, items => {
    callback(chrome.runtime.lastError ? undefined : items[url])
  })
}

export function changeBackgroundColor(color: string) {
  const code =
    'document.body.style.setProperty("background-color", "' +
    color +
    '", "important");'
  chrome.tabs.executeScript({code})
}
