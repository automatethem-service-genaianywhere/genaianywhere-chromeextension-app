// https://www.marketinganywhere.ai/index.html에서 메시지 수신
window.addEventListener("message", (event) => {
  // event.source !== window 이면 다른 origin에서 온 메시지를 무시
  if (event.source !== window) return;

  if (event.data.action === "loginOrLogout") {
    const userId = event.data.userId;
    const email = event.data.email;
    if (userId) {
      chrome.runtime.sendMessage({ action: "login", userId: userId, email: email });
    } else {
      chrome.runtime.sendMessage({ action: "logout" });
    }
  }
});
