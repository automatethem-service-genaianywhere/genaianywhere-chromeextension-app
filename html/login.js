(async () => {
  const { email } = await chrome.storage.local.get(["email"]);
  if (email) {
    const key = "logout_menu";
    const label = chrome.i18n.getMessage(key);
    document.querySelector("#login-menu").textContent = `${email} (${label})`;

    if (email == "automatethem@gmail.com") {
      document.querySelector("#admin-menu-separator").style.display = "block";
      document.querySelector("#admin-menu").style.display = "block";
    } else {
      document.querySelector("#admin-menu-separator").style.display = "none";
      document.querySelector("#admin-menu").style.display = "none";
    }
  } else {
    const key = "login_menu";
    const label = chrome.i18n.getMessage(key);
    document.querySelector("#login-menu").textContent = label;

    document.querySelector("#admin-menu-separator").style.display = "none";
    document.querySelector("#admin-menu").style.display = "none";
  }
})();

// chrome.storage.local에서 변화 감지를 위한 리스너
chrome.storage.onChanged.addListener(async (changes, areaName) => {
  // 변화가 'local' 저장소에서 발생했는지 확인
  if (areaName === "local") {
    if (changes.email) {
      const oldEmail = changes.email.oldValue; // 이전 이메일 값
      const email = changes.email.newValue; // 새 이메일 값

      console.log("email changed from", oldEmail, "to", email);

      // 이메일의 새로운 값에 따라 로그인/로그아웃 감지 및 직접 UI 업데이트
      if (email) {
        const key = "logout_menu";
        const label = chrome.i18n.getMessage(key);
        // 이메일 값이 있으면 로그인 상태로 UI 업데이트
        console.log("User logged in with email:", email);
        document.querySelector("#login-menu").textContent = `${email} (${label})`;

        if (email == "automatethem@gmail.com") {
          document.querySelector("#admin-menu-separator").style.display = "block";
          document.querySelector("#admin-menu").style.display = "block";
        } else {
          document.querySelector("#admin-menu-separator").style.display = "none";
          document.querySelector("#admin-menu").style.display = "none";
        }
      } else {
        const key = "login_menu";
        const label = chrome.i18n.getMessage(key);
        // 이메일 값이 없으면 로그아웃 상태로 UI 업데이트
        console.log("User logged out.");
        document.querySelector("#login-menu").textContent = label;

        document.querySelector("#admin-menu-separator").style.display = "none";
        document.querySelector("#admin-menu").style.display = "none";
      }

      await fetchPrompts();

      let key = "prompt_direct_input";
      if (email) {
        key = "prompt_direct_input_after_login";
      }
      const label = chrome.i18n.getMessage(key);
      document.querySelector("#prompts").innerHTML =
        //'<option data-i18n="prompt_direct_input" value="0">프롬프트 직접 입력</option>' +
        `<option data-i18n="prompt_direct_input" value="0">${label}</option>` +
      promptList.map((prompt) => `<option value="${prompt.id}">${prompt.name}</option>`).join("");

      await fetchLinks();

      //

      await chrome.runtime.sendMessage({ action: "fetchMarkUrls" });

      //await chrome.runtime.sendMessage({ action: "fetchSearchEngines" });
      await fetchSearchEngines();
    }
  }
});
