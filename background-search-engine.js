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
  const url = `https://www.generativeaianywhere.ai/api/search-engine?userId=${userId}&languageCode=${languageCode}`;
  
  try {
    const response = await fetch(url);
    searchEngines = await response.json();
  } catch (error) {
    console.error("Error fetching search engines:", error);
  }
  //console.log(searchEngines);
};

const createSearchSubMenus = async () => {
  const { email } = await chrome.storage.local.get(["email"]);
  if (!email) {
    for (const menuId of menuIds) {
      try {
        // 메뉴가 있으면 삭제 시도
        await chrome.contextMenus.remove(menuId);
        console.log(`Menu with ID ${menuId} removed.`);
      } catch (error) {
        console.log(error);
      }
    }
    menuIds = [];
    return;
  }

  if (searchEngines.length == 0) {
    await fetchSearchEngines();
  }

  //

  for (const menuId of menuIds) {
    try {
      // 메뉴가 있으면 삭제 시도
      await chrome.contextMenus.remove(menuId);
      console.log(`Menu with ID ${menuId} removed.`);
    } catch (error) {
      console.log(error);
    }
  }
  menuIds = [];

  //

  // Now dynamically create the search engine submenus
  for (const searchEngine of searchEngines) {
    const menuId = String(searchEngine.id);

    // 새로운 메뉴 생성
    chrome.contextMenus.create({
      id: menuId,
      parentId: "search",
      title: searchEngine.name,
      contexts: ["selection"]
    });
    console.log(`Menu with ID ${menuId} created.`);

    menuIds.push(menuId);
  }
};

// Listen for messages from content scripts to create search sub-menus
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "fetchSearchEngines") {
    (async () => {
      await fetchSearchEngines();
      sendResponse("fetchSearchEngines response");
    })();
    return true;
  } else if (message.action === "createSearchSubMenus") {
    (async () => {
      await createSearchSubMenus();
      sendResponse("createSearchSubMenus response");
    })();
    return true;
  } else if (message.action === "getSearchEngines") {
    sendResponse(searchEngines);
  }
});

// Handle context menu item click events
chrome.contextMenus.onClicked.addListener((info, tab) => {
  const selectedText = info.selectionText || "";

  // Find the search engine that matches the clicked item and perform the search
  searchEngines.forEach(async (searchEngine) => {
    if (info.menuItemId === String(searchEngine.id)) {
      const searchUrl = searchEngine.url.replace("{query}", encodeURIComponent(selectedText));
      await chrome.tabs.create({ url: searchUrl });
    }
  });
});
