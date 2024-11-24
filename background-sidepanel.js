chrome.runtime.onInstalled.addListener(async (details) => {
  //chrome.sidePanel.setPanelBehavior({ openPanelOnActionClick: true });
});

chrome.action.onClicked.addListener(async () => {
  await toggleSidePanel();
});

export const openSidePanel = async () => {
  ////https://groups.google.com/a/chromium.org/g/chromium-extensions/c/WRGFOAHxoaY/m/QeNstplqAAAJ
  //await chrome.sidePanel.setOptions({ //Uncaught (in promise) Error: `sidePanel.open()` may only be called in response to a user gesture.
  chrome.sidePanel.setOptions({
    path: "html/index.html",
    enabled: true
  });
  chrome.windows.getCurrent(async (currentWindow) => {
    await chrome.sidePanel.open({
      windowId: currentWindow.id
    });
  });
};

const closeSidePanel = async () => {
  await chrome.sidePanel.setOptions({
    enabled: false
  });
};

let sidePanelOpened = false;

export const toggleSidePanel = async () => {
  if (sidePanelOpened) {
    await closeSidePanel();
    //sidePanelOpened = false;
  } else {
    await openSidePanel();
    //sidePanelOpened = true;
  }
};

//사이드 패널과의 연결을 감지하고, 닫힐 때 onDisconnect 이벤트를 통해 로그를 출력합니다.
chrome.runtime.onConnect.addListener((port) => {
  if (port.name === "sidePanel") {
    console.log("Side panel connected");
    sidePanelOpened = true;

    port.onDisconnect.addListener(() => {
      console.log("Side panel closed");
      sidePanelOpened = false;
    });
  }
});

const openFullSidePanel = async () => {
  await chrome.tabs.create({ url: "html/index.html?ui=tab" });
  //await closeSidePanel();
  await toggleSidePanel();
};

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "openSidePanel") {
    (async () => {
      await openSidePanel();
      sendResponse("openSidePanel response");
    })();
    return true;
  } else if (message.action === "closeSidePanel") {
    (async () => {
      await closeSidePanel();
      sendResponse("closeSidePanel response");
    })();
    return true;
  } else if (message.action === "toggleSidePanel") {
    (async () => {
      await toggleSidePanel();
      sendResponse("toggleSidePanel response");
    })();
    return true;
  } else if (message.action === "openFullSidePanel") {
    (async () => {
      await openFullSidePanel();
      sendResponse("openFullSidePanel response");
    })();
    return true;
  }
});
