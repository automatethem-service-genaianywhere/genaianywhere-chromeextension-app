(async () => {
  const urlParams = new URLSearchParams(window.location.search);
  const ui = urlParams.get("ui") ? urlParams.get("ui") : "sidePanel";

  if (ui == "sidePanel") {
    document.querySelector("#left-tab").addEventListener("click", async (event) => {
      chrome.tabs.query({ currentWindow: true }, (tabs) => {
        chrome.tabs.query({ active: true, currentWindow: true }, async (activeTabs) => {
          let currentIndex = activeTabs[0].index;
          if(currentIndex === 0)
              return;
          let previousIndex = currentIndex === 0 ? tabs.length - 1 : currentIndex - 1;
          await chrome.tabs.update(tabs[previousIndex].id, { active: true });
        });
      });
    });
    document.querySelector("#right-tab").addEventListener("click", async (event) => {
      chrome.tabs.query({ currentWindow: true }, (tabs) => {
        chrome.tabs.query({ active: true, currentWindow: true }, async (activeTabs) => {
          let currentIndex = activeTabs[0].index;
          if(currentIndex === tabs.length - 1)
              return;
          let nextIndex = currentIndex === tabs.length - 1 ? 0 : currentIndex + 1;
          await chrome.tabs.update(tabs[nextIndex].id, { active: true });
        });
      });
    });
    document.querySelector("#full").addEventListener("click", async (event) => {
      chrome.runtime.sendMessage({ action: "openFullSidePanel" });
    });
  } else if (ui == "tab") {
    document.querySelector("#left-tab").remove();
    document.querySelector("#right-tab").remove();
    document.querySelector("#full").remove();

    await chrome.storage.local.set({ full: true });

    window.addEventListener("beforeunload", async (event) => {
      await chrome.storage.local.set({ full: false });
    });
  }
})();

//

document.querySelector("#home-menu").addEventListener("click", async () => {
  const url = "https://ko.sidepanel.genaianywhere.com/";
  await chrome.runtime.sendMessage({ action: "openLinkTab", url: url });
});

document.querySelector("#public-prompt-list-menu").addEventListener("click", async () => {
  const url = "https://ko.sidepanel.genaianywhere.com/public-prompt.html";
  chrome.runtime.sendMessage({ action: "openLinkTab", url: url });
});

document.querySelector("#private-shared-prompt-list-menu").addEventListener("click", async () => {
  const url = "https://ko.sidepanel.genaianywhere.com/private-shared-prompt.html";
  chrome.runtime.sendMessage({ action: "openLinkTab", url: url });
});

document.querySelector("#prompt-menu").addEventListener("click", async () => {
  const url = "https://ko.sidepanel.genaianywhere.com/prompt.html";
  chrome.runtime.sendMessage({ action: "openLinkTab", url: url });
});

/*
document.querySelector("#realtime-popular-search-word-menu").addEventListener("click", async () => {
  const url = "https://www.genaianywhere.com/realtime-popular-search-word.html";
  chrome.runtime.sendMessage({ action: "openLinkTab", url: url });
});

document.querySelector("#keyword-search-count-menu").addEventListener("click", async () => {
  const url = "https://www.genaianywhere.com/keyword-search-count.html";
  chrome.runtime.sendMessage({ action: "openLinkTab", url: url });
});

document.querySelector("#keyword-combination-menu").addEventListener("click", async () => {
  const url = "https://www.genaianywhere.com/keyword-combination.html";
  chrome.runtime.sendMessage({ action: "openLinkTab", url: url });
});

document.querySelector("#keyword-search-trend-menu").addEventListener("click", async () => {
  const url = "https://www.genaianywhere.com/keyword-search-trend.html";
  chrome.runtime.sendMessage({ action: "openLinkTab", url: url });
});

document.querySelector("#blog-index-menu").addEventListener("click", async () => {
  const url = "https://www.genaianywhere.com/blog-index.html";
  chrome.runtime.sendMessage({ action: "openLinkTab", url: url });
});

document.querySelector("#mark-url-menu").addEventListener("click", async () => {
  const url = "https://www.genaianywhere.com/mark-url.html";
  chrome.runtime.sendMessage({ action: "openLinkTab", url: url });
});

document.querySelector("#keyword-search-menu").addEventListener("click", async () => {
  const url = "https://www.genaianywhere.com/keyword-search.html";
  chrome.runtime.sendMessage({ action: "openLinkTab", url: url });
});

document.querySelector("#search-engine-menu").addEventListener("click", async () => {
  const url = "https://www.genaianywhere.com/search-engine.html";
  chrome.runtime.sendMessage({ action: "openLinkTab", url: url });
});
*/

document.querySelector("#bookmark-menu").addEventListener("click", async () => {
  const url = "https://ko.sidepanel.genaianywhere.com/bookmark.html";
  chrome.runtime.sendMessage({ action: "openLinkTab", url: url });
});

document.querySelector("#price-menu").addEventListener("click", async () => {
  const url = "https://ko.sidepanel.genaianywhere.com/price.html";
  chrome.runtime.sendMessage({ action: "openLinkTab", url: url });
});

document.querySelector("#genaianywhere-menu").addEventListener("click", async () => {
  const url = "https://www.genaianywhere.com/";
  chrome.runtime.sendMessage({ action: "openLinkTab", url: url });
});

document.querySelector("#github-menu").addEventListener("click", async () => {
  const url = "https://github.com/automatethem/genaianywhere-chromeextension-app";
  chrome.runtime.sendMessage({ action: "openLinkTab", url: url });
});

document.querySelector("#admin-menu").addEventListener("click", async () => {
  const url = "https://ko.sidepanel.genaianywhere.com/admin/";
  chrome.runtime.sendMessage({ action: "openLinkTab", url: url });
});

//

const openLoginLinkTab = async () => {
  const chatUrl = "https://ko.sidepanel.genaianywhere.com/";

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

  // 최근 탭 중 주어진 chatUrl을 포함하는 탭을 찾음
  //let foundTab = tabs.find(tab => tab.url.includes(chatUrl));
  let foundTab = tabs.find((tab) => tab.url == chatUrl || tab.url == chatUrl + "#");

  if (foundTab) {
    // 이미 열려 있는 탭을 찾으면 해당 탭을 활성화
    await chrome.windows.update(foundTab.windowId, { focused: true });
    await chrome.tabs.update(foundTab.id, { active: true });
    await chrome.tabs.reload(foundTab.id); // 현재 탭 리로드

    // 선택된 텍스트를 AI 탭에 삽입하는 스크립트 실행
    await chrome.scripting.executeScript({
      target: { tabId: foundTab.id },
      args: [],
      function: async () => {
        const button = document.querySelector("#auth-btn");
        button.click();
      }
    });
  } else {
    // If no ai tab is open, create a new tab
    let newTab = await chrome.tabs.create({ url: chatUrl });

    // Listen for the tab update to ensure it's fully loaded before interacting with it
    const onUpdated = (tabId, changeInfo) => {
      if (tabId === newTab.id && changeInfo.status === "complete") {
        chrome.scripting.executeScript({
          target: { tabId: newTab.id },
          args: [],
          function: async () => {
            const button = document.querySelector("#auth-btn");
            button.click();
          }
        });

        // Remove the listener after the tab is updated
        chrome.tabs.onUpdated.removeListener(onUpdated);
      }
    };
    chrome.tabs.onUpdated.addListener(onUpdated);
  }
};

const openLogoutLinkTab = async () => {
  const chatUrl = "https://ko.sidepanel.genaianywhere.com/";

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

  // 최근 탭 중 주어진 chatUrl을 포함하는 탭을 찾음
  //let foundTab = tabs.find(tab => tab.url.includes(chatUrl));
  let foundTab = tabs.find((tab) => tab.url == chatUrl || tab.url == chatUrl + "#");

  if (foundTab) {
    // 이미 열려 있는 탭을 찾으면 해당 탭을 활성화
    await chrome.windows.update(foundTab.windowId, { focused: true });
    await chrome.tabs.update(foundTab.id, { active: true });
    const url = "https://ko.sidepanel.genaianywhere.com/login/chromeextension/logout.html";
    await chrome.tabs.update(foundTab.id, { active: true, url: url }); //
  } else {
    // If no ai tab is open, create a new tab
    const url = "https://ko.sidepanel.genaianywhere.com/login/chromeextension/logout.html";
    let newTab = await chrome.tabs.create({ url: url });
  }
};

document.querySelector("#login-menu").addEventListener("click", async (event) => {
  const key = "login_menu";
  const label = chrome.i18n.getMessage(key);
  if (document.querySelector("#login-menu").textContent == label) {
    await openLoginLinkTab();
  } else {
    await openLogoutLinkTab();
  }
});

//

const tabLinks = document.querySelectorAll(".tab-link");
const tabContents = document.querySelectorAll(".tab-content");

chrome.storage.local.get("activeTab", (data) => {
  const activeTab = data.activeTab || "chat-tab";

  document.querySelector("#" + activeTab).classList.add("active");
  document.querySelector(`a[data-tab="${activeTab}"]`).style.background = "#d66e67";
});

tabLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    const tabId = event.target.getAttribute("data-tab");

    // 모든 탭 콘텐츠를 숨김
    tabContents.forEach((content) => {
      content.classList.remove("active");
      document.querySelector(`a[data-tab="${content.id}"]`).style.background = "";
    });

    // 클릭한 탭에 맞는 콘텐츠만 표시
    document.querySelector("#" + tabId).classList.add("active");
    document.querySelector(`a[data-tab="${tabId}"]`).style.background = "#d66e67";

    // 선택한 탭 정보를 Chrome storage에 저장
    chrome.storage.local.set({ activeTab: tabId });
  });
});
