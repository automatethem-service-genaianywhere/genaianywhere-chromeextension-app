let searchEngines = [];
let menuIds = [];

//컨텍스트 메뉴 - 검색 - 검색 하위 메뉴

const fetchSearchEngines = async () => {
  let { userId } = await chrome.storage.local.get(["userId"]);
  userId = userId ? userId : "";
  //
  let languageCode = chrome.i18n.getUILanguage();
  //console.log(languageCode); //en //ko //en-US 
  if (languageCode.includes("-")) {
    languageCode = languageCode.split("-")[0]
  }
  //
  const url = `http://www.marketinganywhere.info/api/search-engine?userId=${userId}&languageCode=${languageCode}`;

  try {
    const response = await fetch(url);
    searchEngines = await response.json();
  } catch (error) {
    console.error("Error fetching search engines:", error);
  }
  //console.log(searchEngines);
};

// Listen for messages from content scripts to create search sub-menus
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "fetchSearchEngines") {
    (async () => {
      await fetchSearchEngines();
      sendResponse("fetchSearchEngines response");
    })();
    return true;
  } else if (message.action === "getSearchEngines") {
    sendResponse(searchEngines);
  }
});
