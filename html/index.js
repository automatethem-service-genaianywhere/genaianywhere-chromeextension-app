//document.querySelector('#title').textContent = chrome.i18n.getMessage('extensionName');
//document.querySelector('#description').textContent = chrome.i18n.getMessage('extensionDescription');

const sleep = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};
