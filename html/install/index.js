let languageCode = chrome.i18n.getUILanguage();
//console.log(languageCode); //en //ko //en-US 
if (languageCode.includes("-")) {
  languageCode = languageCode.split("-")[0]
}
if(languageCode == "ko") {  
  const text = "<img src='\../../images/pin.png' width='25px' height='25px'>를 클릭해 \"생성형 Ai 애니웨어\"를 빠르게 접근할 수 있도록 고정하세요.";
  document.querySelector('#pin-instruction').innerHTML = text + "<br/>" + '<video src="pin-instruction-ko.mp4" autoplay loop muted controls style="width: 100%; height: 100%;"></video>';
}
else {
  const text = "Click <img src='\../../images/pin.png' width='25px' height='25px'>to pin \"Generative Ai Anywhere\" for quick access.";
  document.querySelector('#pin-instruction').innerHTML = text + "<br/>" + '<video src="pin-instruction-en.mp4" autoplay loop muted controls style="width: 100%; height: 100%;"></video>';
}
