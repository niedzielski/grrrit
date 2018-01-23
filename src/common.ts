export function getBackgroundColor(url: string): Promise<string | undefined> {
  return new Promise(resolve => {
    chrome.storage.sync.get(url, items =>
      resolve(chrome.runtime.lastError ? undefined : items[url])
    )
  })
}

export function setBackgroundColor(color: string) {
  const code = `
    document.body.style.setProperty('background-color', '${color}', 'important')
  `
  chrome.tabs.executeScript({code})
}
