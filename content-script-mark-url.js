/*
document.querySelectorAll("a").forEach(async (link) => {
  //console.log(link.href);
  //console.log(link.innerText);

  const markUrls = await chrome.runtime.sendMessage({ action: "getMarkUrls" });

  // 키워드 배열을 순회하면서 각 키워드가 링크의 href 또는 텍스트에 포함되는지 확인
  markUrls.forEach((markUrl) => {
    //if (link.href.includes(markUrl.url) || link.innerText.includes(markUrl.url)) {
    if (link.href == markUrl.url || link.innerText == markUrl.url) {
      link.style.backgroundColor = "yellow"; // 노란색 배경으로 마크
    }
  });
});
*/