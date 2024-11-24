//사이드 패널이 열릴 때 백그라운드 스크립트와 연결 설정
const port = chrome.runtime.connect({ name: "sidePanel" });