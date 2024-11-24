let recognition;
let speechRecognitionOn = false;

// 음성 인식 시작 시 마이크 권한 요청
const requestMicrophoneAccess = () => {
  return navigator.mediaDevices.getUserMedia({ audio: true });
};

// Start speech recognition function
const startSpeechRecognition = () => {
  recognition = new webkitSpeechRecognition();
  let languageCode = chrome.i18n.getUILanguage();
  //console.log(languageCode); //en //ko //en-US 
  if (languageCode.includes("-")) {
    languageCode = languageCode.split("-")[0]
  }
  recognition.lang = languageCode;
  recognition.continuous = true;
  recognition.interimResults = true;

  let finalTranscript = "";

  recognition.onresult = (event) => {
    let interimTranscript = "";
    for (let i = event.resultIndex; i < event.results.length; i++) {
      if (event.results[i].isFinal) {
        finalTranscript += event.results[i][0].transcript;
      } else {
        interimTranscript += event.results[i][0].transcript;
      }
    }

    let transcript = finalTranscript + interimTranscript;

    // Send the recognized text back to the popup
    chrome.runtime.sendMessage({
      action: "updateSpeechRecognitionResult",
      transcript: transcript
    });
  };

  recognition.onerror = (event) => {
    console.error("Speech recognition error:", event.error);
  };

  //https://developer.mozilla.org/en-US/docs/Web/API/SpeechRecognition
  //https://developer.mozilla.org/en-US/docs/Web/API/SpeechRecognition/end_event
  recognition.addEventListener("speechend", () => {
    speechRecognitionOn = false;
    chrome.storage.local.set({ speechRecognitionOn });
    console.log("Speech recognition stopped");
  });

  recognition.start();
  speechRecognitionOn = true;
  chrome.storage.local.set({ speechRecognitionOn });
};

// Stop speech recognition function
const stopSpeechRecognition = () => {
  if (recognition) {
    recognition.stop();
    recognition = null;
    console.log("Speech recognition stopped.");
  }
};

window.addEventListener("beforeunload", (event) => {
  stopSpeechRecognition();
});

// Listen for messages from the popup to start or stop recognition
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "startSpeechRecognition") {
    if (!speechRecognitionOn) {
      //startSpeechRecognition();
      requestMicrophoneAccess()
        .then(() => {
          startSpeechRecognition();
        })
        .catch((error) => {
          console.error("Microphone access denied:", error);
        });
    }
  } else if (message.action === "stopSpeechRecognition") {
    if (speechRecognitionOn) {
      stopSpeechRecognition();
    }
  }
});
