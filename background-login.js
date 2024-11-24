chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "login") {
    (async () => {
      await chrome.storage.local.set({ userId: message.userId });
      await chrome.storage.local.set({ email: message.email });
      sendResponse("login response");
    })();
    return true;
  } else if (message.action === "logout") {
    (async () => {
      await chrome.storage.local.remove("userId");
      await chrome.storage.local.remove("email");
      sendResponse("logout response");
    })();
    return true;
  }
});
