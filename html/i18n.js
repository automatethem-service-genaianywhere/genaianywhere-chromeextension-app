const translate = () => {
  document.querySelectorAll('[data-i18n]').forEach(element => {
    const key = element.getAttribute('data-i18n');
    if (key.endsWith("_placeholder")) {
      element.placeholder = chrome.i18n.getMessage(key);
    } else {
      element.textContent = chrome.i18n.getMessage(key);
    }
  });
};

translate();

const tr = (key) => {  
  return chrome.i18n.getMessage(key);
};

const getLanguageCode = () => {
  let languageCode = chrome.i18n.getUILanguage();
  //console.log(languageCode); //en //ko //en-US 
  if (languageCode.includes("-")) {
    languageCode = languageCode.split("-")[0]
  }

  return languageCode;
};