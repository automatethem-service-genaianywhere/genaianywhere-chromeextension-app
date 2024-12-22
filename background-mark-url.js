let markUrls = [];
let fetchedInitialMarkUrls = false;

//컨텍스트 메뉴 - 검색 - 검색 하위 메뉴

const fetchMarkUrls = async () => {
  let { userId } = await chrome.storage.local.get(["userId"]);
  userId = userId ? userId : "";
  //
  let languageCode = chrome.i18n.getUILanguage();
  //console.log(languageCode); //en //ko //en-US 
  if (languageCode.includes("-")) {
    languageCode = languageCode.split("-")[0]
  }
  //
  const apiUrl = `https://www.marketinganywhere.ai/api/mark-url?userId=${userId}&languageCode=${languageCode}`;

  try {
    const response = await fetch(apiUrl);
    markUrls = await response.json();
  } catch (error) {
    console.error("Error fetching mark urls:", error);
  }
  //console.log(searchEngines);
};

/*
(async () => {
  //Uncaught (in promise) Error: Cannot access a chrome:// URL
  await fetchMarkUrls();      
})();
*/
///*
chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
  if (!fetchedInitialMarkUrls) { // 초기 마크 주소 가져오기
    // 탭이 업데이트될 때마다 실행
    if (changeInfo.status === "complete" && tab.active) {
      const urlPattern = /^chrome-extension:\/\//; // chrome-extension://로 시작

      if (!urlPattern.test(tab.url)) {
        let { userId } = await chrome.storage.local.get(["userId"]);
        userId = userId ? userId : "";
        let languageCode = chrome.i18n.getUILanguage();
        //console.log(languageCode); //en //ko //en-US 
        if (languageCode.includes("-")) {
          languageCode = languageCode.split("-")[0]
        }   
        //
        const url = `https://www.marketinganywhere.ai/api/mark-url?userId=${userId}&languageCode=${languageCode}`;
        //console.log(url);

        try {
          const response = await fetch(url);
          markUrls = await response.json();
          //console.log(markUrls);

          fetchedInitialMarkUrls = true;
        } catch (error) {
          console.error("Error fetching mark urls:", error);
        }
        //console.log(searchEngines);
      }
    }
  }
});
//*/

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "fetchMarkUrls") {
    (async () => {
      await fetchMarkUrls();
      sendResponse("fetchMarkUrls response");
    })();
    return true;
  } else if (message.action === "getMarkUrls") {
    sendResponse(markUrls);
  }
});
