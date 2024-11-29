// document.querySelector('#memo').value 내용을 클립보드로 복사하는 copy-prompt 이벤트 리스너
document.querySelector("#copy-memo").addEventListener("click", async (event) => {
  try {
    // 선택된 텍스트가 있으면 그 부분을 복사, 없으면 전체 복사
    const selectedText = document
      .querySelector("#memo")
      .value.substring(document.querySelector("#memo").selectionStart, document.querySelector("#memo").selectionEnd);
    const textToCopy = selectedText || document.querySelector("#memo").value; // 선택된 부분이 없으면 전체 복사

    await navigator.clipboard.writeText(textToCopy); // 텍스트 클립보드에 복사
    console.log("텍스트가 클립보드로 복사되었습니다.");
  } catch (err) {
    console.error("클립보드에 복사하는 중 오류 발생: ", err);
  }
});

document.querySelector("#clear-memo").addEventListener("click", async () => {
  document.querySelector("#memo").value = "";
  document.querySelector("#memo").dispatchEvent(new Event("input")); // input 이벤트 발생
  //    await chrome.storage.local.set({ memoValue: '' });
});

document.querySelector("#paste-memo").addEventListener("click", async (event) => {
  const text = await navigator.clipboard.readText(); // 클립보드에서 텍스트 읽기
  //document.querySelector('#inputText').value = text; 
  const start = document.querySelector('#memo').selectionStart;  // 선택 시작점
  const end = document.querySelector('#memo').selectionEnd;      // 선택 종료점

  // 선택된 부분을 클립보드 텍스트로 대체
  document.querySelector('#memo').value = document.querySelector('#memo').value.substring(0, start) + 
                    text + 
                    document.querySelector('#memo').value.substring(end);
  document.querySelector('#memo').dispatchEvent(new Event('input')); // input 이벤트 발생

  // 커서를 클립보드 텍스트 끝에 위치시킴
  document.querySelector('#memo').selectionStart = start + text.length;
  document.querySelector('#memo').selectionEnd = start + text.length;    
});

// 팝업에서 다운로드 요청을 백그라운드로 보냄
const downloadTextAsFile = (text, fileName) => {
  const blob = new Blob([text], { type: "text/plain" });
  const url = URL.createObjectURL(blob);

  // 백그라운드 스크립트로 메시지 전송
  chrome.runtime.sendMessage({
    action: "download",
    url: url,
    filename: fileName || "download.txt"
  });
};

document.querySelector("#download-memo").addEventListener("click", async () => {
  // 예시: 함수 호출 시 텍스트와 파일명을 인수로 전달
  downloadTextAsFile(document.querySelector("#memo").value, "text.txt");
});

//

//document.querySelector("#add-selected-text-to-memo").addEventListener("click", async (event) => { //not work
document.querySelector("#add-selected-text-to-memo").addEventListener("click", async function() {
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
      await add("memo-tab", text);
    }
  });
});

document.querySelector("#add-page-url-to-memo").addEventListener("click", async (event) => {
  const text = await chrome.runtime.sendMessage({ action: "getTabTitleUrl" });
  const previousMemoValue = document.querySelector("#memo").value;
  document.querySelector("#memo").value = previousMemoValue + "\n" + text + "\n";
  document.querySelector("#memo").dispatchEvent(new Event("input")); // input 이벤트 발생
});

document.querySelector("#add-page-text-to-memo").addEventListener("click", async (event) => {
  const text = await chrome.runtime.sendMessage({ action: "getTabTitleUrlText" });
  const previousMemoValue = document.querySelector("#memo").value;
  document.querySelector("#memo").value = previousMemoValue + "\n" + text + "\n";
  document.querySelector("#memo").dispatchEvent(new Event("input")); // input 이벤트 발생
});

document.querySelector("#add-page-source-to-memo").addEventListener("click", async (event) => {
  const text = await chrome.runtime.sendMessage({ action: "getTabTitleUrlSource" });
  const previousMemoValue = document.querySelector("#memo").value;
  document.querySelector("#memo").value = previousMemoValue + "\n" + text + "\n";
  document.querySelector("#memo").dispatchEvent(new Event("input")); // input 이벤트 발생
});

document.querySelector("#add-movie-script-to-memo").addEventListener("click", async (event) => {
  const text = await chrome.runtime.sendMessage({ action: "getTabTitleUrlYoutubeScript" });
  const previousMemoValue = document.querySelector("#memo").value;
  document.querySelector("#memo").value = previousMemoValue + "\n" + text + "\n";
  document.querySelector("#memo").dispatchEvent(new Event("input")); // input 이벤트 발생
});

//

(async () => {
  let { memoValue } = await chrome.storage.local.get("memoValue");
  memoValue = memoValue ? memoValue : "";

  document.querySelector("#memo").value = memoValue;
  document.querySelector("#memo").dispatchEvent(new Event("input")); // input 이벤트 발생
})();

const updateMemoCharacterCount = () => {
  const key = "memo_character_count";
  const label = chrome.i18n.getMessage(key);

  const memoValue = document.querySelector("#memo").value ? document.querySelector("#memo").value : "";
  document.querySelector("#memo-character-count").textContent = `${label}: ${memoValue.length}`;
};

document.querySelector("#memo").addEventListener("input", async () => {
  const memoValue = document.querySelector("#memo").value ? document.querySelector("#memo").value : "";
  await chrome.storage.local.set({ memoValue: memoValue });

  updateMemoCharacterCount();
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "inputMemo") {
    (async () => {
      const memoValue = message.selectedText + "\n";
      document.querySelector("#memo").value = memoValue;
      document.querySelector("#memo").dispatchEvent(new Event("input")); // input 이벤트 발생
      document.querySelector("#memo").scrollTop = document.querySelector("#memo").scrollHeight;

      sendResponse("inputMemo response");
    })();
    return true;
  } else if (message.action === "addMemo") {
    (async () => {
      const memoValue =
        document.querySelector("#memo").value +
        (document.querySelector("#memo").value == "" ? "" : "\n") +
        message.selectedText +
        "\n";
      await chrome.storage.local.set({ memoValue: memoValue });
      document.querySelector("#memo").scrollTop = document.querySelector("#memo").scrollHeight;

      document.querySelector("#memo").value = memoValue;
      document.querySelector("#memo").dispatchEvent(new Event("input")); // input 이벤트 발생

      sendResponse("addMemo response");
    })();
    return true;
  }
});
