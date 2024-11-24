// 컨텍스트 메뉴에서 항목을 클릭했을 때 메시지를 content-script로 전송
chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "mark") {
    chrome.tabs.sendMessage(tab.id, { action: "mark" });
  }
});
