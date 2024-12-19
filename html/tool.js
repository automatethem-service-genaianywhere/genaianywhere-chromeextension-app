(async () => {
  let { generalSearchTargetValue, generalSearchWordValue } = await chrome.storage.local.get(["generalSearchTargetValue", "generalSearchWordValue"]);

  // Set the initial checked state for the radio buttons
  document.querySelector(`input[name="general-search-target"][value="${generalSearchTargetValue || "search-word-input"}"]`).checked = true;
  // Trigger an input event to update related states
  document.querySelector(`input[name="general-search-target"][value="${generalSearchTargetValue || "search-word-input"}"]`).dispatchEvent(new Event("input"));

  document.querySelector("#general-search-word").value = generalSearchWordValue ? generalSearchWordValue : "";
})();

// Event listener for radio button changes
document.querySelectorAll('input[name="general-search-target"]').forEach((radio) => {
  radio.addEventListener("input", async (event) => {
    const generalSearchTargetValue = event.target.value;
    await chrome.storage.local.set({ generalSearchTargetValue });
  });
});

// Event listener for input box changes
document.querySelector("#general-search-word").addEventListener("input", async () => {
  // Store the current input box value
  const generalSearchWordValue = document.querySelector("#general-search-word").value;
  await chrome.storage.local.set({ generalSearchWordValue });
});

const fetchSearchEngines = async () => {
 // Populate the search engines list
 document.querySelector("#engine-list").innerHTML = ""; // Clear loading text
  let { userId } = await chrome.storage.local.get(["userId"]);
  userId = userId ? userId : "";
  if (userId) {
    // Select the element
    const searchPart = document.getElementById('search-part');
    // Method 1: Show by updating the style
    searchPart.style.display = 'block';

    // Fetch available search engines
    /*
    let searchEngines = await chrome.runtime.sendMessage({ action: "getSearchEngines" });
    if (searchEngines.length === 0) {
      await chrome.runtime.sendMessage({ action: "fetchSearchEngines" });
      searchEngines = await chrome.runtime.sendMessage({ action: "getSearchEngines" });
    }
    */
    await chrome.runtime.sendMessage({ action: "fetchSearchEngines" });
    searchEngines = await chrome.runtime.sendMessage({ action: "getSearchEngines" });

    searchEngines.forEach((engine, index) => {
      const engineLink = document.createElement("a");
      engineLink.innerHTML = engine.name;
      //engineLink.style.cssText = "margin: 0 5px; color: blue; cursor: pointer; text-decoration: underline;";
      engineLink.style.cssText = "color: blue; cursor: pointer; text-decoration: underline; margin: 2px;";

      engineLink.addEventListener("click", async () => {
        const searchTarget = document.querySelector('input[name="general-search-target"]:checked').value;
        //console.log(searchTarget);

        let query = "";

        if (searchTarget === "selected-text") {
          query = await chrome.runtime.sendMessage({ action: "getSelectedText" });
          if (!query) {
            //alert("선택된 텍스트가 없습니다.");
            let searchUrl = '';
            if (engine.homeUrl) {
              searchUrl = engine.homeUrl;
            }
            else {
              searchUrl = engine.url.replace("{query}", "");
            }
            await chrome.runtime.sendMessage({ action: "openLinkTab", url: searchUrl });
            return;
          }
        } else if (searchTarget === "search-word-input") {
          query = document.querySelector("#general-search-word").value.trim();
          if (!query) {
            //alert("검색어를 입력하세요.");
            let searchUrl = '';
            if (engine.homeUrl) {
              searchUrl = engine.homeUrl;
            }
            else {
              searchUrl = engine.url.replace("{query}", "");
            }
            await chrome.runtime.sendMessage({ action: "openLinkTab", url: searchUrl });
            return;
          }
        }

        if (query.includes(",")) {
          const splitQueries = query.split(",").map(q => q.trim()); // Split and trim each part
          let i = 0;
          for (const splitQuery of splitQueries) {
            const searchUrl = engine.url.replace("{query}", encodeURIComponent(splitQuery));
            await chrome.runtime.sendMessage({ action: "openLinkTab", url: searchUrl });
            if (i != splitQueries.length - 1) {
              await sleep(1000);
            }
            i++;
          }
        } else {
          const searchUrl = engine.url.replace("{query}", encodeURIComponent(query));
          await chrome.runtime.sendMessage({ action: "openLinkTab", url: searchUrl });
        }        
      });  

      document.querySelector("#engine-list").appendChild(engineLink);

      // Add comma between links except the last one
      if (index < searchEngines.length - 1) {
        //document.querySelector("#engine-list").append(", ");
        document.querySelector("#engine-list").append(" | ");
      }
    });
  }
  else {
    const searchPart = document.getElementById('search-part');
    searchPart.style.display = 'none';
  }
};

// Add keydown event listener to the input box for Enter key
document.querySelector("#general-search-word").addEventListener("keydown", async (event) => {
  if (event.key === "Enter") {
    const searchTarget = document.querySelector('input[name="general-search-target"]:checked').value;
    //console.log(searchTarget);

    let query = "";

    if (searchTarget === "selected-text") {
      query = await chrome.runtime.sendMessage({ action: "getSelectedText" });
      if (!query) {
        //alert("선택된 텍스트가 없습니다.");
        return;
      }
    } else if (searchTarget === "search-word-input") {
      query = document.querySelector("#general-search-word").value.trim();
      if (!query) {
        //alert("검색어를 입력하세요.");
        return;
      }
    }

    if (searchEngines.length > 0) {
      //const firstEngine = searchEngines[searchEngines.length -1]; // Get the first search engine
      const firstEngine = searchEngines[0]; // Get the first search engine
      if (firstEngine) {
        const searchUrl = firstEngine.url.replace("{query}", encodeURIComponent(query));
        await chrome.runtime.sendMessage({ action: "openTab", url: searchUrl });
      }
    }
  }
});

(async () => {
  const { splitCharacterCountValue } = await chrome.storage.local.get("splitCharacterCountValue");
  if (splitCharacterCountValue !== undefined) {
    document.querySelector("#split-character-count").value = splitCharacterCountValue;
  }

  await fetchSearchEngines();
})();

document.querySelector("#mark").addEventListener("click", async (event) => {
  const currentTabs = await chrome.tabs.query({ active: true, currentWindow: true });
  const currentTab = currentTabs[0];
  chrome.tabs.sendMessage(currentTab.id, { action: "mark" });
});

document.querySelector("#copy-selected-text").addEventListener("click", async (event) => {
  await chrome.runtime.sendMessage({ action: "copySelectedText" });
});

document.querySelector("#download-selected-text").addEventListener("click", async (event) => {
  const text = await chrome.runtime.sendMessage({ action: "getSelectedText" });
  downloadTextAsFile(text, "text.txt");
});

document.querySelector("#open-url-selected-text").addEventListener("click", async (event) => {
  const selectedText = await chrome.runtime.sendMessage({ action: "getSelectedText" });
  let url = selectedText;
  if (!url.startsWith("http://") && !url.startsWith("https://")) {
    url = "https://www.google.com/search?q={query}";
    url = url.replace("{query}", encodeURIComponent(selectedText));
  }
  await chrome.runtime.sendMessage({ action: 'openTab', url: url });
});

document.querySelector("#copy-page-url").addEventListener("click", async (event) => {
  await chrome.runtime.sendMessage({ action: "copyPageUrl" });
});

document.querySelector("#copy-page-referer").addEventListener("click", async (event) => {
  await chrome.runtime.sendMessage({ action: "copyPageReferer" });
});

document.querySelector("#disable-mouse-right-click-protection").addEventListener("click", async (event) => {
  await chrome.runtime.sendMessage({ action: "disableRightClickProtection" });
});

document.querySelector("#clipboard-download").addEventListener("click", async (event) => {
  const text = await navigator.clipboard.readText(); // 클립보드에서 텍스트 읽기
  downloadTextAsFile(text, "text.txt");
});

document.querySelector("#copy-prompt-division-input-text").addEventListener("click", async () => {
  const prompt = document.querySelector("#prompt");
  const text = prompt.value + "\n\n----------\n\n" + document.querySelector("#input-text").value;
  //console.log(text);

  await navigator.clipboard.writeText(text);
});

//split

const splitText = (text, splitCount) => {
  const parts = [];
  let currentPart = "";

  for (let i = 0; i < text.length; i++) {
    currentPart += text[i];

    // 현재 파트의 길이가 splitCount에 도달하면 parts에 추가하고 초기화
    if (currentPart.length >= splitCount) {
      parts.push(currentPart);
      currentPart = "";
    }
  }

  // 남아 있는 글자가 있으면 마지막 부분으로 추가
  if (currentPart !== "") {
    parts.push(currentPart);
  }

  return parts;
};

const createButtonForAi = async (parts) => {
  document.querySelector("#split-parts").innerHTML = "";

  const aiServices = await chrome.runtime.sendMessage({ action: "getAiServices" });

  const button = document.createElement("button");
  button.textContent = 1;
  button.style.backgroundColor = "";
  button.addEventListener("click", async () => {
    let languageCode = chrome.i18n.getUILanguage();
    //console.log(languageCode); //en //ko //en-US 
    if (languageCode.includes("-")) {
      languageCode = languageCode.split("-")[0]
    }
    let text = `I will submit you a long text divided in ${parts.length} parts.\nEach part will start by Part: X.\nAfter each part I submit, ask me for the next part.\nDon't do any analysis before all the parts are submitted.`;
    if (languageCode == "ko") {
      text = `지금부터 긴 글을 ${parts.length}부분으로 나눠서 제출하겠습니다.\n각 부분은 부분: X부터 시작됩니다.\n각 부분을 제출한 후 다음 부분을 요청하세요.\n모든 부분이 제출되기 전에 분석을 수행하지 마십시오.`;
    }
    let checked = false;
    for (let i = 0; i < aiServices.length; i++) {
      const checkbox = document.querySelector("#" + aiServices[i].id + "-ai-checkbox");
      if (checkbox && checkbox.checked) {
        checked = true;
      }
    }
    await navigator.clipboard.writeText(text);
    button.style.backgroundColor = "lightblue";
    if (checked) {
      await sendToAi(text);
    }
  });
  document.querySelector("#split-parts").appendChild(button);

  parts.forEach((part, index) => {
    const button = document.createElement("button");
    button.textContent = index + 1 + 1;
    button.style.backgroundColor = "";
    button.addEventListener("click", async () => {
      let languageCode = chrome.i18n.getUILanguage();
      //console.log(languageCode); //en //ko //en-US 
      if (languageCode.includes("-")) {
        languageCode = languageCode.split("-")[0]
      }
      let brefore = `Part : ${(index + 1)}\n\n`;
      if (languageCode == "ko") {
        brefore = `부분 : ${index + 1}\n\n`;
      }
      const after = "";
      const text = brefore + part + after;
      let checked = false;
      for (let i = 0; i < aiServices.length; i++) {
        const checkbox = document.querySelector("#" + aiServices[i].id + "-ai-checkbox")
        if (checkbox && checkbox.checked) {
          checked = true;
        }
      }
      await navigator.clipboard.writeText(text);
      button.style.backgroundColor = "lightblue";
      if (checked) {
        await sendToAi(text);
      }
    });
    document.querySelector("#split-parts").appendChild(button);
  });
};

document.querySelector("#split-prompt-division-input-text").addEventListener("click", async () => {
  const prompt = document.querySelector("#prompt");
  //const text = prompt.value + "\n\n----------\n\n" + document.querySelector("#input-text").value;
  const text = document.querySelector("#input-text").value;
  const parts = splitText(text, parseInt(document.querySelector("#split-character-count").value, 10));
  parts.push(prompt.value);
  console.log(parts);

  await createButtonForAi(parts);
});

document.querySelector("#split-character-count").addEventListener("change", async () => {
  const splitCharacterCountValue = document.querySelector("#split-character-count").value;
  await chrome.storage.local.set({ splitCharacterCountValue: splitCharacterCountValue });
});

//

document.getElementById("capture-full-screen").addEventListener("click", async function() {
  const response = await chrome.runtime.sendMessage({ action: "captureFullScreen" });
  console.log(response);
});

document.getElementById("capture-scroll-screen").addEventListener("click", async function() {
  const response = await chrome.runtime.sendMessage({ action: "captureScrollScreen" });
  console.log(response);
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "addSearch") {
    (async () => {
      const searchValue = message.selectedText
      await chrome.storage.local.set({ searchValue: searchValue });

      document.querySelector("#general-search-word").value = searchValue;
      document.querySelector("#general-search-word").dispatchEvent(new Event("input")); // input 이벤트 발생

      sendResponse("addSearch response");
    })();
    return true;
  }
});

//

(async () => {
  let { searchValue } = await chrome.storage.local.get("searchValue");
  searchValue = searchValue ? searchValue : "";

  document.querySelector("#general-search-word").value = searchValue;
  document.querySelector("#general-search-word").dispatchEvent(new Event("input")); // input 이벤트 발생
})();