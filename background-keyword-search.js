const sleep = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

chrome.runtime.onMessage.addListener(async (message, sender, sendResponse) => {
  if (message.action === "startSearch") {
    const keywords = message.keywords.split(",").map((term) => term.trim());
    const searchEngines = message.searchEngines;
    const priority = message.priority; // "engine" 또는 "keyword"
    const delay = message.delay;

    // 작업 시작 시 "작업중" 뱃지 표시
    chrome.action.setBadgeText({ text: "작업중" });
    chrome.action.setBadgeBackgroundColor({ color: "yellow" }); // 노란색 배경

    if (priority === "searchEngine") {
      // 각 선택된 엔진에서 검색어들에 대해 검색 수행
      for (let engineIndex = 0; engineIndex < searchEngines.length; engineIndex++) {
        const engineUrl = searchEngines[engineIndex];

        for (let termIndex = 0; termIndex < keywords.length; termIndex++) {
          const term = keywords[termIndex];
          const searchUrl = engineUrl.replace("{query}", encodeURIComponent(term));

          // 새로운 탭에서 검색 결과 열기
          await chrome.tabs.create({ url: searchUrl });

          // 마지막 엔진과 마지막 검색어가 아닌 경우에만 딜레이 적용
          const isLastEngine = engineIndex === searchEngines.length - 1;
          const isLastTerm = termIndex === keywords.length - 1;
          if (!isLastEngine || !isLastTerm) {
            await sleep(delay * 1000);
          }
        }
      }
    } else if (priority === "keyword") {
      // 각 검색어에서 선택된 엔진에 대해 검색 수행
      for (let termIndex = 0; termIndex < keywords.length; termIndex++) {
        const term = keywords[termIndex];

        for (let engineIndex = 0; engineIndex < searchEngines.length; engineIndex++) {
          const engineUrl = searchEngines[engineIndex];
          const searchUrl = engineUrl.replace("{query}", encodeURIComponent(term));

          // 새로운 탭에서 검색 결과 열기
          await chrome.tabs.create({ url: searchUrl });

          // 마지막 검색어와 마지막 엔진이 아닌 경우에만 딜레이 적용
          const isLastTerm = termIndex === keywords.length - 1;
          const isLastEngine = engineIndex === searchEngines.length - 1;
          if (!isLastTerm || !isLastEngine) {
            await sleep(delay * 1000);
          }
        }
      }
    }

    // 작업 완료 후 뱃지 제거
    chrome.action.setBadgeText({ text: "" });

    sendResponse("startSearch response");
  }
});
