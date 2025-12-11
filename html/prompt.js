let promptList = [];

const fetchPrompts = async () => {
  let { userId } = await chrome.storage.local.get(["userId"]);
  userId = userId ? userId : "";
  //if (userId) {
    let languageCode = chrome.i18n.getUILanguage();
    //console.log(languageCode); //en //ko //en-US 
    if (languageCode.includes("-")) {
      languageCode = languageCode.split("-")[0]
    }
    const url = `https://ko.ai.genaianywhere.com/api/prompt?userId=${userId}&languageCode=${languageCode}`;
    try {
      const response = await fetch(url);
      //console.log(response);
      promptList = await response.json();
      //console.log(promptList);
    } catch (error) {
      console.error(error);
    }
  //} else {
  //  promptList = [];
  //}
};

const updatePromptInputTextCharacterCount = () => {
  const key = "prompt_input_text_character_count";
  const label = chrome.i18n.getMessage(key);

  const text = `${document.querySelector("#prompt").value}\n\n----------\n\n${document.querySelector("#input-text").value}`;
  document.querySelector("#prompt-input-text-character-count").textContent =
    `${label}: ${text.length}`;
};

(async () => {
  let id = 0;
  const urlParams = new URLSearchParams(window.location.search);
  id = urlParams.get("id"); // id 값을 추출
  if (id == null) {
    const { id: temp } = await chrome.storage.local.get("id");
    id = temp;

    if (id == null) {
      id = 0;
    }

    //console.log(id);
  }

  if (id == 0) {
    document.querySelector("#prompt").addEventListener("input", async () => {
      const promptValue = document.querySelector("#prompt").value;
      await chrome.storage.local.set({ promptValue });
      updatePromptInputTextCharacterCount();
    });

    const { promptValue } = await chrome.storage.local.get(["promptValue"]);
    document.querySelector("#prompt").value = promptValue ? promptValue : "";
    document.querySelector("#prompt").dispatchEvent(new Event("input")); // input 이벤트 발생
  }

  await fetchPrompts();

  let key = "prompt_direct_input_option";
  //const { email } = await chrome.storage.local.get(["email"]);
  //if (email) {
    key = "prompt_direct_input_option_after_login";
  //}
  const label = chrome.i18n.getMessage(key);  

  document.querySelector("#prompts").innerHTML =
    `<option data-i18n="prompt_direct_input_option" value="0">${label}</option>` +
    promptList.map((prompt) => `<option value="${prompt.id}">${prompt.name}</option>`).join("");

  if (id == 0) {
    const key = "help_box";
    const label = chrome.i18n.getMessage(key);
    document.querySelector("#help-box").innerHTML = label;
  } else {
    document.querySelector("#prompts").value = id;
    // change 이벤트 트리거
    const event = new Event("change", { bubbles: true });
    document.querySelector("#prompts").dispatchEvent(event);

    for (const promptElement of promptList) {
      if (promptElement.id == id) {
        const key = "help_box";
        const label = chrome.i18n.getMessage(key);
        document.querySelector("#help-box").innerHTML = promptElement.help ? promptElement.help : label;
        document.querySelector("#prompt").value = promptElement.prompt;
        document.querySelector("#prompt").dispatchEvent(new Event("input")); // input 이벤트 발생
        break;
      }
    }
  }
})();

//

// 링크 클릭 시 프롬프트 직접 입력 선택
document.querySelector("#prompt-direct-input").addEventListener("click", async (event) => {
  document.querySelector("#prompts").value = "0"; // "프롬프트 직접 입력" 옵션 선택
  document.querySelector("#prompts").dispatchEvent(new Event("change", { bubbles: true }));
});

document.querySelector("#add-prompt").addEventListener("click", async (event) => {
  const url = "https://ko.ai.genaianywhere.com/prompt.html";
  await chrome.runtime.sendMessage({ action: "openLinkTab", url: url });
});

// document.querySelector('#prompt').value 내용을 클립보드로 복사하는 copy-prompt 이벤트 리스너
document.querySelector("#copy-prompt").addEventListener("click", async (event) => {
  try {
    // 선택된 텍스트가 있으면 그 부분을 복사, 없으면 전체 복사
    const selectedText = document
      .querySelector("#prompt")
      .value.substring(
        document.querySelector("#prompt").selectionStart,
        document.querySelector("#prompt").selectionEnd
      );
    const textToCopy = selectedText || document.querySelector("#prompt").value; // 선택된 부분이 없으면 전체 복사

    await navigator.clipboard.writeText(textToCopy); // 텍스트 클립보드에 복사
    console.log("텍스트가 클립보드로 복사되었습니다.");
  } catch (err) {
    console.error("클립보드에 복사하는 중 오류 발생: ", err);
  }
});

document.querySelector("#clear-prompt").addEventListener("click", async () => {
  document.querySelector("#prompt").value = "";
  document.querySelector("#prompt").dispatchEvent(new Event("input")); // input 이벤트 발생
});

document.querySelector("#clear-all").addEventListener("click", async () => {
  document.querySelector("#prompt").value = "";
  document.querySelector("#prompt").dispatchEvent(new Event("input")); // input 이벤트 발생

  document.querySelector("#input-text").value = "";
  document.querySelector("#input-text").dispatchEvent(new Event("input")); // input 이벤트 발생
});

document.querySelector("#paste-prompt").addEventListener("click", async (event) => {
  const text = await navigator.clipboard.readText(); // 클립보드에서 텍스트 읽기
  //document.querySelector('#inputText').value = text; 
  const start = document.querySelector('#prompt').selectionStart;  // 선택 시작점
  const end = document.querySelector('#prompt').selectionEnd;      // 선택 종료점

  // 선택된 부분을 클립보드 텍스트로 대체
  document.querySelector('#prompt').value = document.querySelector('#prompt').value.substring(0, start) + 
                    text + 
                    document.querySelector('#prompt').value.substring(end);
  document.querySelector('#prompt').dispatchEvent(new Event('input')); // input 이벤트 발생

  // 커서를 클립보드 텍스트 끝에 위치시킴
  document.querySelector('#prompt').selectionStart = start + text.length;
  document.querySelector('#prompt').selectionEnd = start + text.length;    
});

//

document.querySelector("#prompts").addEventListener("change", async (event) => {
  const value = event.target.value;
  await chrome.storage.local.set({ id: value });
  if (value == 0) {
    document.querySelector("#help-box").innerHTML = "도움말 없음";
    const { promptValue } = await chrome.storage.local.get(["promptValue"]);
    document.querySelector("#prompt").value = promptValue ? promptValue : "";
    document.querySelector("#prompt").dispatchEvent(new Event("input")); // input 이벤트 발생
  }
  for (const promptElement of promptList) {
    //document.querySelector('#prompt').id
    //document.querySelector('#prompt').name
    if (value == promptElement.id) {
      //console.log(document.querySelector('#prompt').name);
      document.querySelector("#help-box").innerHTML = promptElement.help ? promptElement.help : "도움말 없음"; // innerHTML로 HTML 적용
      document.querySelector("#prompt").value = promptElement.prompt;
      document.querySelector("#prompt").dispatchEvent(new Event("input")); // input 이벤트 발생
      break;
    }
  }
});
