import "./background-mark-url.js";
import "./background-search-engine.js";
import "./background-keyword-search.js";
import "./background-login.js";
import { toggleSidePanel } from "./background-sidepanel.js";
import "./background-ai.js";
import "./background-tool.js";

// 확장 프로그램 설치 또는 업데이트 시 실행
// 다른 곳은 브라우저를 시작하거나 확장이 리로드될 때마다 실행
chrome.runtime.onInstalled.addListener(async (details) => {
  await chrome.storage.local.set({ floatingIconCheckboxChecked: true });
  await chrome.storage.local.set({ attachChecked: false });
  await chrome.storage.local.set({ chatgptAiCheckboxChecked: true });

  chrome.tabs.create({ url: "html/install/index.html" });

  // 확장 프로그램이 제거될 때 특정 URL로 이동
  chrome.runtime.setUninstallURL("https://docs.google.com/forms/d/e/1FAIpQLSeK13vZbukS5N8OAdNe4j4JgotbloUYvVLA94rjYOU9d1kBIA/viewform?usp=sf_link");

  const parentId = chrome.contextMenus.create({
    id: "ai",
    //title: "Ai에게 보내기",
    title: chrome.i18n.getMessage("extensionName"),
    contexts: ["all"]
  });
  
  chrome.contextMenus.create({
    id: "openPanel",
    parentId: parentId,
    //title: "패널 열기",
    title: chrome.i18n.getMessage("open_panel"),
    contexts: ["all"]
  });
  
  chrome.contextMenus.create({
    id: "separator1",
    parentId: parentId,
    type: "separator",
    contexts: ["selection"]
  });
  
  chrome.contextMenus.create({
    id: "separator2-1",
    parentId: parentId,
    type: "separator",
    contexts: ["page"]
  });
  
  chrome.contextMenus.create({
    id: "add",
    parentId: parentId,
    //title: "추가",
    title: chrome.i18n.getMessage("add"),
    contexts: ["selection"]
  });
  
  chrome.contextMenus.create({
    id: "separator2-2",
    parentId: parentId,
    type: "separator",
    contexts: ["selection"]
  });

  chrome.contextMenus.create({
    id: "add-to-memo",
    parentId: parentId,
    //title: "메모에 추가",
    title: chrome.i18n.getMessage("add_to_memo"),
    contexts: ["selection"]
  });

  chrome.contextMenus.create({
    id: "separator2-3",
    parentId: parentId,
    type: "separator",
    contexts: ["selection"]
  });

  chrome.contextMenus.create({
    id: "add-to-search",
    parentId: parentId,
    //title: "검색에 추가",
    title: chrome.i18n.getMessage("add_to_search"),
    contexts: ["selection"]
  });

  chrome.contextMenus.create({
    id: "separator2-4",
    parentId: parentId,
    type: "separator",
    contexts: ["selection"]
  });

  //
  
  chrome.contextMenus.create({
    id: "title-url-add",
    parentId: parentId,
    //title: "제목 + 주소 추가",
    title: chrome.i18n.getMessage("add_page_url"),
    contexts: ["page"]
  });
  
  chrome.contextMenus.create({
    id: "title-url-text-add",
    parentId: parentId,
    //title: "제목 + 주소 + 텍스트 추가",
    title: chrome.i18n.getMessage("add_page_text"),
    contexts: ["page"]
  });
  
  chrome.contextMenus.create({
    id: "title-url-source-add",
    parentId: parentId,
    //title: "제목 + 주소 + 소스 추가",
    title: chrome.i18n.getMessage("add_page_source"),
    contexts: ["page"]
  });
  
  chrome.contextMenus.create({
    id: "movie-script-add",
    parentId: parentId,
    //title: "제목 + 주소 + 동영상 스크립트 추가",
    title: chrome.i18n.getMessage("add_movie_script"),
    contexts: ["page"],
    documentUrlPatterns: ["*://www.youtube.com/watch?v=*"] // 유튜브 동영상 URL 패턴
  });
  
  //
  
  chrome.contextMenus.create({
    id: "separator3",
    parentId: parentId,
    type: "separator",
    contexts: ["page"]
  });
  
  //
  
  chrome.contextMenus.create({
    id: "title-url-add-to-memo",
    parentId: parentId,
    //title: "메모에 제목 + 주소 추가",
    title: chrome.i18n.getMessage("add_page_url_to_memo"),
    contexts: ["page"]
  });
  
  chrome.contextMenus.create({
    id: "title-url-text-add-to-memo",
    parentId: parentId,
    //title: "메모에 제목 + 주소 + 텍스트 추가",
    title: chrome.i18n.getMessage("add_page_text_to_memo"),
    contexts: ["page"]
  });
  
  chrome.contextMenus.create({
    id: "title-url-source-add-to-memo",
    parentId: parentId,
    //title: "메모에 제목 + 주소 + 소스 추가",
    title: chrome.i18n.getMessage("add_page_source_to_memo"),
    contexts: ["page"]
  });
  
  chrome.contextMenus.create({
    id: "movie-script-add-to-memo",
    parentId: parentId,
    //title: "메모에 제목 + 주소 + 동영상 스크립트 추가",
    title: chrome.i18n.getMessage("add_movie_script_to_memo"),
    contexts: ["page"],
    documentUrlPatterns: ["*://www.youtube.com/watch?v=*"] // 유튜브 동영상 URL 패턴
  }); 
});

//

// 브라우저 시작 시 다국어 리소스 변경을 위해 크롬 확장 리로드
chrome.runtime.onStartup.addListener(() => {
  chrome.runtime.reload();
});

//

(() => {
 
})();

//

chrome.contextMenus.onClicked.addListener(async (info, tab) => {
  if (info.menuItemId === "add") {
    let selectedText = info.selectionText;
    // 예시: 문장 끝 구두점 뒤에 개행 추가
    // . 또는 ! 또는 ? 뒤에 개행 문자 추가
    selectedText = selectedText.replace(/([.!?])\s*/g, "$1\n");
    // 인위적으로 개행이 추가된 텍스트를 저장하거나 패널로 전송
    await chrome.storage.local.set({ selectedText });

    const currentTabs = await chrome.tabs.query({ active: true, currentWindow: true });
    const currentTab = currentTabs[0];

    await chrome.scripting.executeScript({
      target: { tabId: currentTab.id },
      args: [selectedText],
      function: async (selectedText) => {
        await add("chat-tab", selectedText);
      }
    });
  } else if (info.menuItemId === "add-to-memo") {
    let selectedText = info.selectionText;
    // 예시: 문장 끝 구두점 뒤에 개행 추가
    // . 또는 ! 또는 ? 뒤에 개행 문자 추가
    selectedText = selectedText.replace(/([.!?])\s*/g, "$1\n");
    // 인위적으로 개행이 추가된 텍스트를 저장하거나 패널로 전송
    await chrome.storage.local.set({ selectedText });

    const currentTabs = await chrome.tabs.query({ active: true, currentWindow: true });
    const currentTab = currentTabs[0];

    await chrome.scripting.executeScript({
      target: { tabId: currentTab.id },
      args: [selectedText],
      function: async (selectedText) => {
        await add("memo-tab", selectedText);
      }
    });
  } else if (info.menuItemId === "add-to-search") {
    let selectedText = info.selectionText;
    // 예시: 문장 끝 구두점 뒤에 개행 추가
    // . 또는 ! 또는 ? 뒤에 개행 문자 추가
    selectedText = selectedText.replace(/([.!?])\s*/g, "$1\n");
    // 인위적으로 개행이 추가된 텍스트를 저장하거나 패널로 전송
    await chrome.storage.local.set({ selectedText });

    const currentTabs = await chrome.tabs.query({ active: true, currentWindow: true });
    const currentTab = currentTabs[0];

    await chrome.scripting.executeScript({
      target: { tabId: currentTab.id },
      args: [selectedText],
      function: async (selectedText) => {
        await addSearch(selectedText);
      }
    });
  } else if (info.menuItemId === "title-url-add") {
    const currentTabs = await chrome.tabs.query({ active: true, currentWindow: true });
    const currentTab = currentTabs[0];

    const text = await getTabTitleUrl();

    await chrome.scripting.executeScript({
      target: { tabId: currentTab.id },
      args: [text],
      function: async (text) => {
        await add("chat-tab", text);
      }
    });
  } else if (info.menuItemId === "title-url-text-add") {
    const currentTabs = await chrome.tabs.query({ active: true, currentWindow: true });
    const currentTab = currentTabs[0];

    const text = await getTabTitleUrlText();

    await chrome.scripting.executeScript({
      target: { tabId: currentTab.id },
      args: [text],
      function: async (text) => {
        await add("chat-tab", text);
      }
    });
  } else if (info.menuItemId === "title-url-source-add") {
    const currentTabs = await chrome.tabs.query({ active: true, currentWindow: true });
    const currentTab = currentTabs[0];

    const text = await getTabTitleUrlSource();

    await chrome.scripting.executeScript({
      target: { tabId: currentTab.id },
      args: [text],
      function: async (text) => {
        await add("chat-tab", text);
      }
    });
  } else if (info.menuItemId === "title-url-source-add") {
    const currentTabs = await chrome.tabs.query({ active: true, currentWindow: true });
    const currentTab = currentTabs[0];

    const text = await getTabTitleUrlSource();

    await chrome.scripting.executeScript({
      target: { tabId: currentTab.id },
      args: [text],
      function: async (text) => {
        await add("chat-tab", text);
      }
    });
  } else if (info.menuItemId === "movie-script-add") {
    const currentTabs = await chrome.tabs.query({ active: true, currentWindow: true });
    const currentTab = currentTabs[0];

    const text = await getTabTitleUrlYoutubeScript();

    await chrome.scripting.executeScript({
      target: { tabId: currentTab.id },
      args: [text],
      function: async (text) => {
        await add("chat-tab", text);
      }
    });
  //
  } else if (info.menuItemId === "title-url-add-to-memo") {
    const currentTabs = await chrome.tabs.query({ active: true, currentWindow: true });
    const currentTab = currentTabs[0];

    const text = await getTabTitleUrl();

    await chrome.scripting.executeScript({
      target: { tabId: currentTab.id },
      args: [text],
      function: async (text) => {
        await add("memo-tab", text);
      }
    });
  } else if (info.menuItemId === "title-url-text-add-to-memo") {
    const currentTabs = await chrome.tabs.query({ active: true, currentWindow: true });
    const currentTab = currentTabs[0];

    const text = await getTabTitleUrlText();

    await chrome.scripting.executeScript({
      target: { tabId: currentTab.id },
      args: [text],
      function: async (text) => {
        await add("memo-tab", text);
      }
    });
  } else if (info.menuItemId === "title-url-source-add-to-memo") {
    const currentTabs = await chrome.tabs.query({ active: true, currentWindow: true });
    const currentTab = currentTabs[0];

    const text = await getTabTitleUrlSource();

    await chrome.scripting.executeScript({
      target: { tabId: currentTab.id },
      args: [text],
      function: async (text) => {
        await add("memo-tab", text);
      }
    });
  } else if (info.menuItemId === "title-url-source-add-to-memo") {
    const currentTabs = await chrome.tabs.query({ active: true, currentWindow: true });
    const currentTab = currentTabs[0];

    const text = await getTabTitleUrlSource();

    await chrome.scripting.executeScript({
      target: { tabId: currentTab.id },
      args: [text],
      function: async (text) => {
        await add("memo-tab", text);
      }
    });
  } else if (info.menuItemId === "movie-script-add-to-memo") {
    const currentTabs = await chrome.tabs.query({ active: true, currentWindow: true });
    const currentTab = currentTabs[0];

    const text = await getTabTitleUrlYoutubeScript();

    await chrome.scripting.executeScript({
      target: { tabId: currentTab.id },
      args: [text],
      function: async (text) => {
        await add("memo-tab", text);
      }
    });
  }
});

const openPopup = async (url) => {
  await chrome.windows.create({
    url: chrome.runtime.getURL(url),
    type: "popup",
    width: 500 + 20,
    height: 620 + 20
  });
};

//

const openTab = async (url) => {
  const tab = await chrome.tabs.create({ url: url });
};

const openLinkTab = async (url, include = false) => {
  /*
  // 현재 열려 있는 모든 탭 검색
  const tabs = await chrome.tabs.query({});
  */
  ///*
  // 현재 활성 창의 모든 탭 검색
  const currentWindow = await chrome.windows.getCurrent();
  const tabs = await chrome.tabs.query({ windowId: currentWindow.id });
  //*/

  // 최근에 접근한 탭을 기준으로 정렬 (최근 탭이 첫 번째로 오도록)
  tabs.sort((a, b) => b.lastAccessed - a.lastAccessed);

  // 최근 탭 중 주어진 URL을 포함하는 탭을 찾음
  let foundTab = tabs.find((tab) => (include ? tab.url.includes(url) : tab.url == url));

  // URL을 포함하는 탭을 찾은 경우 해당 탭을 활성화
  if (foundTab) {
    // Activate the window where the ai tab is open
    await chrome.windows.update(foundTab.windowId, { focused: true });
    await chrome.tabs.update(foundTab.id, { active: true });
  } else {
    //console.log(url);
    // 동일한 URL이 열려 있지 않으면 새 탭을 열기

    await chrome.tabs.create({ url: url });
  }
};

const openIncludeLinkTab = async (url) => {
  await openLinkTab(url, true);
};

//

const getTabTitleUrl = async () => {
  try {
    // 현재 활성화된 탭을 가져옴
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

    // 타이틀과 URL을 반환
    return `${tab.title}\n${tab.url}`;
  } catch (error) {
    console.log(error);
    return null; // 오류가 발생하면 null 반환
  }
};

const getTabTitleUrlText = async () => {
  try {
    // 현재 활성화된 탭을 가져옴
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

    // 페이지의 텍스트를 가져옴
    const result = await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: () => {
        return document.body.innerText;
      }
    });

    return `${tab.title}\n${tab.url}\n\n${result[0].result}`;
  } catch (error) {
    console.log(error);
    return null; // 오류가 발생하면 null 반환
  }
};

const getTabTitleUrlSource = async () => {
  try {
    // 현재 활성화된 탭을 가져옴
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

    // 페이지의 텍스트를 가져옴
    const result = await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: () => {
        //return document.body.outerHTML; //body html
        return document.documentElement.outerHTML; //전체 html
      }
    });

    return `${tab.title}\n${tab.url}\n\n${result[0].result}`;
  } catch (error) {
    console.log(error);
    return null; // 오류가 발생하면 null 반환
  }
};

const getTabTitleUrlYoutubeScript = async () => {
  const currentTabs = await chrome.tabs.query({ active: true, currentWindow: true });
  const currentTab = currentTabs[0];

  const updatedUrl = currentTab.url.includes("youtube.com/shorts/")
  ? currentTab.url.replace("youtube.com/shorts/", "youtube.com/watch?v=")
  : currentTab.url;

  let targetTab = currentTab;

  if (updatedUrl !== currentTab.url) {
    // Open a new tab with the modified URL
    targetTab = await chrome.tabs.create({ url: updatedUrl });

    // Wait until the new tab finishes loading
    await new Promise(async (resolve) => {
      const onUpdated = (tabId, changeInfo) => {
        if (tabId === targetTab.id && changeInfo.status === "complete") {
          chrome.tabs.onUpdated.removeListener(onUpdated);
          resolve("완료");
        }
      };
      await chrome.tabs.onUpdated.addListener(onUpdated);
    });
  }

  const [{ result: result }] = await chrome.scripting.executeScript({
    target: { tabId: targetTab.id },
    args: [],
    function: async () => {
      console.log("aa");
      // YouTube Subtitle Extraction Code
      class YouTubeSubtitleExtractor {
        constructor(url) {
          this.url = url;
        }

        getParam(param) {
          param = param.replace(/[[]]/g, "$&");
          const regex = new RegExp("[?&]" + param + "(=([^&#]*)|&|#|$)").exec(this.url);
          if (!regex) throw new Error("URL query parameter does not contain videoid.");
          return regex[2] ? decodeURIComponent(regex[2].replace(/\+/g, " ")) : "";
        }

        async getVideoInformation(videoId) {
          const response = await fetch(`https://www.youtube.com/watch?v=${videoId}`);
          if (!response.ok) throw new Error(response.statusText);
          return response.text();
        }

        async getSubtitle(subtitleUrl) {
          const response = await fetch(subtitleUrl);
          if (!response.ok) throw new Error(response.statusText);
          return response.text();
        }

        //

        parseXmlSubtitle(xmlText) {
          const parser = new DOMParser();
          const xmlDoc = parser.parseFromString(xmlText, "text/xml");
          const textElements = xmlDoc.getElementsByTagName("text");
          let subtitle = "";

          for (let i = 0; i < textElements.length; i++) {
            const start = textElements[i].getAttribute("start");
            const duration = textElements[i].getAttribute("dur");
            const content = textElements[i].textContent;

            // Format the subtitle with time and content
            subtitle += `${start} (${duration}s): ${content}\n`;
          }
          return subtitle;
        }
      }

      // Extract YouTube Subtitles
      try {
        const extractor = new YouTubeSubtitleExtractor(document.URL);
        const videoId = extractor.getParam("v");

        const videoData = await extractor.getVideoInformation(videoId);
        const captionTrackList = videoData.match(/\{"captionTracks":(\[.*?\])/);

        if (captionTrackList) {
          const tracks = JSON.parse(captionTrackList[1]);
          const subtitleUrl = tracks[0].baseUrl; // Assuming the first track is the desired subtitle

          //const subtitleText = await extractor.getSubtitle(subtitleUrl);
          const subtitleXml = await extractor.getSubtitle(subtitleUrl);
          const subtitleText = extractor.parseXmlSubtitle(subtitleXml);
          //console.log("Subtitles:", subtitleText);

          return subtitleText;
        } else {
          console.log("No subtitles found.");
          return "No subtitles found.";
        }
      } catch (error) {
        console.error("Error fetching subtitles:", error);
        return error;
      }
    }
  });

  return `${currentTab.title}\n${currentTab.url}\n\n${result}`;
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "openTab") {
    (async () => {
      await openTab(message.url);
      sendResponse("openTab response");
    })();
    return true;
  } else if (message.action === "openLinkTab") {
    openLinkTab(message.url);
  } else if (message.action === "openIncludeLinkTab") {
    openIncludeLinkTab(message.url);
  } else if (message.action === "download") {
    chrome.downloads.download(
      {
        url: message.url,
        filename: message.filename,
        saveAs: true // 경로 선택 창 표시
      },
      (downloadId) => {
        console.log("Download started with ID: ", downloadId);
      }
    );
  }
  //
  else if (message.action === "getTabTitleUrl") {
    (async () => {
      const text = await getTabTitleUrl();
      sendResponse(text);
    })();
    return true;
  } else if (message.action === "getTabTitleUrlText") {
    (async () => {
      const text = await getTabTitleUrlText();
      sendResponse(text);
    })();
    return true;
  } else if (message.action === "getTabTitleUrlSource") {
    (async () => {
      const text = await getTabTitleUrlSource();
      sendResponse(text);
    })();
    return true;
  } else if (message.action === "getTabTitleUrlYoutubeScript") {
    (async () => {
      const text = await getTabTitleUrlYoutubeScript();
      sendResponse(text);
    })();
    return true;
  }
});
