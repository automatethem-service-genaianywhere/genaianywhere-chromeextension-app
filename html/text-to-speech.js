let isSpeaking = false; // Track whether TTS is currently active
const toggleSpeakButton = document.querySelector("#toggle-speak");

const speakText = (text) => {
  const utterance = new SpeechSynthesisUtterance(text);
  let languageCode = chrome.i18n.getUILanguage();
  //console.log(languageCode); //en //ko //en-US 
  if (languageCode.includes("-")) {
    languageCode = languageCode.split("-")[0]
  }
  utterance.lang = languageCode;
  //*/
  utterance.onend = () => {
    isSpeaking = false;
    updateSpeakIcon();
  };
  window.speechSynthesis.speak(utterance);
};

const stopSpeaking = () => {
  window.speechSynthesis.cancel();
  isSpeaking = false;
  updateSpeakIcon();
};

const updateSpeakIcon = () => {
  if (isSpeaking) {
    toggleSpeakButton.src = "../images/speak-on.png";
    toggleSpeakButton.alt = "말하기 중지";
  } else {
    toggleSpeakButton.src = "../images/speak-off.png";
    toggleSpeakButton.alt = "말하기 시작";
  }
};

toggleSpeakButton.addEventListener("click", () => {
  if (!isSpeaking) {
    const text = document.querySelector("#input-text").value.trim();
    if (text.length > 0) {
      isSpeaking = true;
      speakText(text);
    }
  } else {
    stopSpeaking();
  }
  updateSpeakIcon();
});
