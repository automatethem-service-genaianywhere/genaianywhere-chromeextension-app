const populateAiList = (aiServices, more) => {
  let aiListDiv = document.getElementById("ai-list");
  if (more) {
    aiListDiv = document.getElementById("more-ai-list");
    aiListDiv.style = "display: flex; flex-wrap: wrap;"
  }
  aiServices.forEach(service => {
    // Create checkbox
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.id = `${service.id}-ai-checkbox`;
    
    // Create link
    const link = document.createElement("a");
    const urls = service.urls;
    link.href = urls[0];
    link.id = `${service.id}AiLink`;
    link.style = "margin: 2px; color: blue; text-decoration: underline; cursor: pointer";
    let languageCode = chrome.i18n.getUILanguage();
    //console.log(languageCode); //en //ko //en-US 
    if (languageCode.includes("-")) {
      languageCode = languageCode.split("-")[0]
    }
    if(languageCode == "ko") {  
      link.textContent = service.name;
    }
    else {
      link.textContent = service.en;
    }

    // Append elements to the div
    if(service.simple) {
      aiListDiv.appendChild(link);
    }
    else {
      aiListDiv.appendChild(checkbox);
      aiListDiv.appendChild(link);
    }
  });
};

(async () => {
  const { attachCheckboxChecked } = await chrome.storage.local.get("attachCheckboxChecked");
  if (attachCheckboxChecked !== undefined) {
    document.querySelector("#attach-checkbox").checked = attachCheckboxChecked;
  }
  
  const aiServices = await chrome.runtime.sendMessage({ action: "getAiServices" });
  populateAiList(aiServices, false);

  for (let i = 0; i < aiServices.length; i++) {
    const id = aiServices[i].id;
    const simple = aiServices[i].simple;
    
    if(simple) {
      document.querySelector("#" + id + "AiLink").addEventListener("click", async () => {
        chrome.runtime.sendMessage({ action: "openAiTab", id: id });
      });  
    }
    else {
      const obj = await chrome.storage.local.get(id + "AiCheckboxChecked");
      const keys = Object.keys(obj);
      const checkboxChecked = obj[keys[0]];
      if (checkboxChecked !== undefined) {
        document.querySelector("#" + id + "-ai-checkbox").checked = checkboxChecked;
      }    

      document.querySelector("#" + id + "-ai-checkbox").addEventListener("change", async () => {
        const checked = document.querySelector("#" + id + "-ai-checkbox").checked;
        await chrome.storage.local.set({ [id + "AiCheckboxChecked"]: checked });
      });    

      document.querySelector("#" + id + "AiLink").addEventListener("click", async () => {
        chrome.runtime.sendMessage({ action: "openAiTab", id: id });
      });  
    }  
  }

  //

  const moreAiServices = await chrome.runtime.sendMessage({ action: "getMoreAiServices" });
  populateAiList(moreAiServices, true);

  for (let i = 0; i < moreAiServices.length; i++) {
    const id = moreAiServices[i].id;
    const simple = moreAiServices[i].simple;
    
    if(simple) {
      document.querySelector("#" + id + "AiLink").addEventListener("click", async () => {
        chrome.runtime.sendMessage({ action: "openAiTab", id: id });
      });  
    }
    else {
      const obj = await chrome.storage.local.get(id + "AiCheckboxChecked");
      const keys = Object.keys(obj);
      const checkboxChecked = obj[keys[0]];
      if (checkboxChecked !== undefined) {
        document.querySelector("#" + id + "-ai-checkbox").checked = checkboxChecked;
      }    

      document.querySelector("#" + id + "-ai-checkbox").addEventListener("change", async () => {
        const checked = document.querySelector("#" + id + "-ai-checkbox").checked;
        await chrome.storage.local.set({ [id + "AiCheckboxChecked"]: checked });
      });    

      document.querySelector("#" + id + "AiLink").addEventListener("click", async () => {
        chrome.runtime.sendMessage({ action: "openAiTab", id: id });
      });  
    }  
  }
})();

document.querySelector("#attach-checkbox").addEventListener("change", async () => {
  const checked = document.querySelector("#attach-checkbox").checked;
  await chrome.storage.local.set({ attachCheckboxChecked: checked });
});

//

const sendToAi = async (text) => {
  const urlParams = new URLSearchParams(window.location.search);
  const ui = urlParams.get("ui") ? urlParams.get("ui") : "sidePanel";

  if (ui == "sidePanel") {
    const result = await chrome.storage.local.get(["speechRecognitionTabId"]);
    const speechRecognitionTabId = result.speechRecognitionTabId;

    if (speechRecognitionTabId) {
      await chrome.tabs.sendMessage(speechRecognitionTabId, { action: "stopSpeechRecognition" });
    }
  } else if (ui == "tab") {
    stopSpeechRecognition();
  }

  const attach = document.querySelector("#attach-checkbox").checked;

  //await sleep(1000);
  
  const aiServices = [...await chrome.runtime.sendMessage({ action: "getAiServices" }), ...await chrome.runtime.sendMessage({ action: "getMoreAiServices" })];

  // 체크된 AI 서비스를 찾아 메시지 보내기
  for (let i = 0; i < aiServices.length; i++) {
    const checkbox = document.querySelector("#" + aiServices[i].id + "-ai-checkbox");

    if (checkbox && checkbox.checked) {
      await chrome.runtime.sendMessage({
        action: "sendToAi",
        id: aiServices[i].id,
        text: text,
        attach
      });

      // 남은 AI 서비스 중에서 체크된 것이 있으면 대기
      if (aiServices.slice(i + 1).some((service) => document.querySelector("#" + aiServices[i].id + "-ai-checkbox").checked)) {
        await sleep(3000);
      }
    }
  }
};

// "Ai에게 보내기" 버튼 클릭 시
document.querySelector("#send-to-ai-button").addEventListener("click", async () => {
  const text = `${document.querySelector("#prompt").value}\n\n----------\n\n${document.querySelector("#input-text").value}`;
  await sendToAi(text);
});

document.querySelector("#more-ai-show").addEventListener("click", async () => {
  if (
    document.querySelector("#more-ai").style.display === "none" ||
    document.querySelector("#more-ai").style.display === ""
  ) {
    document.querySelector("#more-ai").style.display = "block";
  } else {
    document.querySelector("#more-ai").style.display = "none";
  }
});
