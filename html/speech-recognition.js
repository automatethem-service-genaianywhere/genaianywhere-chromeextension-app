let previousPrompt = "";

document.querySelector("#toggle-recognition").addEventListener("click", async () => {
  const urlParams = new URLSearchParams(window.location.search);
  const ui = urlParams.get("ui") ? urlParams.get("ui") : "sidePanel";

  console.log(ui);
  if (ui == "sidePanel") {
    console.log("sidePanel");

    const result = await chrome.storage.local.get(["speechRecognitionOn"]);
    const speechRecognitionOn = result.speechRecognitionOn;
    console.log(speechRecognitionOn);

    if (!speechRecognitionOn) {
      // Save the existing prompt value before starting recognition
      previousPrompt = document.querySelector("#prompt").value.trim(); // Store the current prompt content

      chrome.tabs.query({ active: true, currentWindow: true }, async (tabs) => {
        // Start recognition
        await chrome.tabs.sendMessage(tabs[0].id, { action: "startSpeechRecognition" });

        await chrome.storage.local.set({ speechRecognitionTabId: tabs[0].id });
      });
    } else {
      const result = await chrome.storage.local.get(["speechRecognitionTabId"]);
      const speechRecognitionTabId = result.speechRecognitionTabId;

      await chrome.tabs.sendMessage(speechRecognitionTabId, { action: "stopSpeechRecognition" });
    }
  } else if (ui == "tab") {
    console.log("tab");

    const result = await chrome.storage.local.get(["speechRecognitionOn"]);
    const speechRecognitionOn = result.speechRecognitionOn;

    if (!speechRecognitionOn) {
      // Save the existing prompt value before starting recognition
      previousPrompt = document.querySelector("#prompt").value.trim(); // Store the current prompt content

      requestMicrophoneAccess()
        .then(() => {
          startSpeechRecognition();
        })
        .catch((error) => {
          console.error("Microphone access denied:", error);
        });
    } else {
      stopSpeechRecognition();
    }
  }
});

let recognition = null;

// 음성 인식 시작 시 마이크 권한 요청
const requestMicrophoneAccess = () => {
  return navigator.mediaDevices.getUserMedia({ audio: true });
};

// 음성 인식 시작 함수
const startSpeechRecognition = () => {
  recognition = new webkitSpeechRecognition();
  let languageCode = chrome.i18n.getUILanguage();
  //console.log(languageCode); //en //ko //en-US 
  if (languageCode.includes("-")) {
    languageCode = languageCode.split("-")[0]
  }
  recognition.lang = languageCode;
  //*/
  recognition.continuous = true;
  recognition.interimResults = true;

  let finalTranscript = "";

  recognition.onresult = async (event) => {
    let interimTranscript = "";
    for (let i = event.resultIndex; i < event.results.length; i++) {
      if (event.results[i].isFinal) {
        finalTranscript += event.results[i][0].transcript;
      } else {
        interimTranscript += event.results[i][0].transcript;
      }
    }

    let transcript = finalTranscript + interimTranscript;

    ///*
    // Combine the previous prompt with the recognized speech text
    if (previousPrompt) {
      transcript = previousPrompt + " " + transcript;
    }
    //*/

    document.querySelector("#prompt").value = transcript;

    await chrome.storage.local.set({ promptValue: transcript });
  };

  recognition.onerror = (event) => {
    console.error("Speech recognition error:", event.error);
  };

  //https://developer.mozilla.org/en-US/docs/Web/API/SpeechRecognition
  //https://developer.mozilla.org/en-US/docs/Web/API/SpeechRecognition/end_event
  recognition.addEventListener("speechend", () => {
    chrome.storage.local.set({ speechRecognitionOn: false });
    console.log("Speech recognition stopped");
  });

  recognition.start();
  chrome.storage.local.set({ speechRecognitionOn: true });
};

// 음성 인식 중지 함수
const stopSpeechRecognition = () => {
  if (recognition) {
    recognition.stop();
    recognition = null;
    console.log("Speech recognition stopped.");
  }
};

//

const updateButtonState = (speechRecognitionOn) => {
  if (speechRecognitionOn) {
    document.querySelector("#toggle-recognition").src = "../images/speech-recognition-on.png"; // Change to stop icon
    document.querySelector("#toggle-recognition").alt = "음성인식 중지";
  } else {
    document.querySelector("#toggle-recognition").src = "../images/speech-recognition-off.png"; // Change to start icon
    document.querySelector("#toggle-recognition").alt = "음성인식 시작";
  }
};

chrome.storage.local.get(["speechRecognitionOn"], (result) => {
  const speechRecognitionOn = result.speechRecognitionOn || false; // Default to false if no value is found
  updateButtonState(speechRecognitionOn); // Update the button UI based on the saved state
});

chrome.storage.onChanged.addListener((changes, areaName) => {
  if (areaName === "local" && changes.speechRecognitionOn) {
    const newValue = changes.speechRecognitionOn.newValue;
    const oldValue = changes.speechRecognitionOn.oldValue;

    console.log("speechRecognitionOn changed from", oldValue, "to", newValue);

    // Perform actions based on the new value
    if (newValue) {
      // Recognition started
      console.log("Speech recognition started.");
    } else {
      // Recognition stopped
      console.log("Speech recognition stopped.");
    }
    updateButtonState(newValue);
  }
});

//

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "updateSpeechRecognitionResult") {
    (async () => {
      let transcript = message.transcript;

      // Combine the previous prompt with the recognized speech text
      if (previousPrompt) {
        transcript = previousPrompt + " " + message.transcript;
      }

      document.querySelector("#prompt").value = transcript;

      await chrome.storage.local.set({ promptValue: transcript });

      sendResponse("updateSpeechRecognitionResult response");
    })();
    return true;
  }
});
