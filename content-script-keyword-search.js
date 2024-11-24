const startSearch = async () => {
  const keywords = document.querySelector("#keywords").value;
  const searchEngines = Array.from(document.querySelectorAll('input[type="checkbox"]:checked')).map((cb) => cb.value);
  const priority = document.querySelector('input[name="priority"]:checked').value; //engine, keyword
  const delay = parseInt(document.querySelector("#delay").value);

  // 선택된 엔진이 없으면 경고
  if (searchEngines.length === 0) {
    //alert("검색 엔진을 선택하세요.");
    alert(chrome.i18n.getMessage("empty_alert"));
    return;
  }

  // 검색어가 입력되지 않은 경우 경고
  if (!keywords.length || keywords.trim() === "") {
    //alert("키워드를 입력하세요.");
    alert(chrome.i18n.getMessage("empty_alert"));
    return;
  }

  // 크롬 확장 프로그램에 검색 요청 전송
  await chrome.runtime.sendMessage({
    action: "startSearch",
    keywords,
    searchEngines,
    priority,
    delay
  });
};

document.querySelector("#keywords").addEventListener("keyup", async (event) => {
  if (event.key === "Enter") {
    await startSearch(); // 검색 시작 함수 호출
  }
});

document.querySelector("#start-search").addEventListener("click", async (event) => {
  await startSearch();
});
