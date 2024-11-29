document.querySelector("#example-input-text").addEventListener("click", async (event) => {
  const value = document.querySelector("#prompts").value;
  for (const promptElement of promptList) {
    //document.querySelector('#prompt').id
    //document.querySelector('#prompt').name
    if (value == promptElement.id) {
      //console.log(document.querySelector('#prompt').name);
      document.querySelector("#input-text").value = promptElement.inputText;
      document.querySelector("#input-text").dispatchEvent(new Event("input")); // input 이벤트 발생;
      break;
    }
  }
});

// document.querySelector('#input-text').value 내용을 클립보드로 복사하는 copy-prompt 이벤트 리스너
document.querySelector("#copy-input-text").addEventListener("click", async (event) => {
  try {
    // 선택된 텍스트가 있으면 그 부분을 복사, 없으면 전체 복사
    const selectedText = document
      .querySelector("#input-text")
      .value.substring(
        document.querySelector("#input-text").selectionStart,
        document.querySelector("#input-text").selectionEnd
      );
    const textToCopy = selectedText || document.querySelector("#input-text").value; // 선택된 부분이 없으면 전체 복사

    await navigator.clipboard.writeText(textToCopy); // 텍스트 클립보드에 복사
    console.log("텍스트가 클립보드로 복사되었습니다.");
  } catch (error) {
    console.error("클립보드에 복사하는 중 오류 발생: ", error);
  }
});

document.querySelector("#clear-input-text").addEventListener("click", async () => {
  document.querySelector("#input-text").value = "";
  document.querySelector("#input-text").dispatchEvent(new Event("input")); // input 이벤트 발생
});

document.querySelector("#paste-input-text").addEventListener("click", async (event) => {
  const text = await navigator.clipboard.readText(); // 클립보드에서 텍스트 읽기
  //document.querySelector('#inputText').value = text; 
  const start = document.querySelector('#input-text').selectionStart;  // 선택 시작점
  const end = document.querySelector('#input-text').selectionEnd;      // 선택 종료점

  // 선택된 부분을 클립보드 텍스트로 대체
  document.querySelector('#input-text').value = document.querySelector('#input-text').value.substring(0, start) + 
                    text + 
                    document.querySelector('#input-text').value.substring(end);
  document.querySelector('#input-text').dispatchEvent(new Event('input')); // input 이벤트 발생

  // 커서를 클립보드 텍스트 끝에 위치시킴
  document.querySelector('#input-text').selectionStart = start + text.length;
  document.querySelector('#input-text').selectionEnd = start + text.length;     
});

//

//document.querySelector("#add-selected-text").addEventListener("click", async (event) => { //not work
document.querySelector("#add-selected-text").addEventListener("click", async function() {
    const currentTabs = await chrome.tabs.query({ active: true, currentWindow: true });
  const currentTab = currentTabs[0];

  let [{ result: text }] = await chrome.scripting.executeScript({
    target: { tabId: currentTab.id },
    function: () => {
      const selection = window.getSelection();
      return selection ? selection.toString() : "";
    },
  });

  await chrome.storage.local.set({ selectedText: text });

  await chrome.scripting.executeScript({
    target: { tabId: currentTab.id },
    args: [text],
    function: async (text) => {
      await add("chat-tab", text);
    }
  });
});

document.querySelector("#add-page-url").addEventListener("click", async (event) => {
  const text = await chrome.runtime.sendMessage({ action: "getTabTitleUrl" });
  const previousInputTextValue = document.querySelector("#input-text").value;
  document.querySelector("#input-text").value = previousInputTextValue + "\n" + text + "\n";
  document.querySelector("#input-text").dispatchEvent(new Event("input")); // input 이벤트 발생
});

document.querySelector("#add-page-text").addEventListener("click", async (event) => {
  const text = await chrome.runtime.sendMessage({ action: "getTabTitleUrlText" });
  const previousInputTextValue = document.querySelector("#input-text").value;
  document.querySelector("#input-text").value = previousInputTextValue + "\n" + text + "\n";
  document.querySelector("#input-text").dispatchEvent(new Event("input")); // input 이벤트 발생
});

document.querySelector("#add-page-source").addEventListener("click", async (event) => {
  const text = await chrome.runtime.sendMessage({ action: "getTabTitleUrlSource" });
  const previousInputTextValue = document.querySelector("#input-text").value;
  document.querySelector("#input-text").value = previousInputTextValue + "\n" + text + "\n";
  document.querySelector("#input-text").dispatchEvent(new Event("input")); // input 이벤트 발생
});

document.querySelector("#add-movie-script").addEventListener("click", async (event) => {
  const text = await chrome.runtime.sendMessage({ action: "getTabTitleUrlYoutubeScript" });
  const previousInputTextValue = document.querySelector("#input-text").value;
  document.querySelector("#input-text").value = previousInputTextValue + "\n" + text + "\n";
  document.querySelector("#input-text").dispatchEvent(new Event("input")); // input 이벤트 발생
});

//

(async () => {
  let { inputTextValue } = await chrome.storage.local.get("inputTextValue");
  document.querySelector("#input-text").value = inputTextValue ? inputTextValue + "\n" : "";
  document.querySelector("#input-text").dispatchEvent(new Event("input")); // input 이벤트 발생
})();

document.querySelector("#input-text").addEventListener("input", async () => {
  await chrome.storage.local.set({ inputTextValue: document.querySelector("#input-text").value });
  updatePromptInputTextCharacterCount();
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "addInputText") {
    (async () => {
      const selectedText = message.selectedText;
      const value =
        document.querySelector("#input-text").value +
        (document.querySelector("#input-text").value == "" ? "" : "\n") +
        selectedText +
        "\n";

      document.querySelector("#input-text").value = value;
      document.querySelector("#input-text").dispatchEvent(new Event("input")); // input 이벤트 발생

      // Scroll to the bottom of the textarea
      document.querySelector("#input-text").scrollTop = document.querySelector("#input-text").scrollHeight;

      sendResponse({ status: "addInputText added with received message" });
    })();
    return true;
  }
});
