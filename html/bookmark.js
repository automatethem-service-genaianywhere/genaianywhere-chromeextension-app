let linkList = [];

// Function to dynamically create buttons for each link
const createLinks = (links) => {
  const linkList = document.querySelector("#link-list");
  while (linkList.firstChild) {
    linkList.removeChild(linkList.firstChild);
  }
  links.forEach((link, index) => {
    const aTag = document.createElement("a");
    aTag.innerHTML = link.name; // Set the button name to link's name
    //aTag.setAttribute("href", "#");
    aTag.style.cssText = `
          margin: 2px;
          color: blue;                /* 파란색 글자 */
          text-decoration: underline; /* 기본적으로 언더라인 표시 */
          cursor: pointer;            /* 호버 시 손 모양 커서 */
        `;

    aTag.addEventListener("click", () => {
      chrome.runtime.sendMessage({ action: "openLinkTab", url: link.url });
    });
    linkList.appendChild(aTag); // Add button to the container

    /*
    // Add '|' between links except the last one
    if (index < links.length - 1) {
      linkList.append(" | ");
    }
    */
    ///*
    linkList.append(" | ");
    //*/
  });

  //

  const aTagLast = document.createElement("a");
  aTagLast.innerHTML = chrome.i18n.getMessage("add_bookmark")
  aTagLast.style.cssText = `
        margin: 2px;
        color: blue;                /* 파란색 글자 */
        text-decoration: underline; /* 기본적으로 언더라인 표시 */
        cursor: pointer;            /* 호버 시 손 모양 커서 */
      `;
  aTagLast.addEventListener("click", () => {
    chrome.runtime.sendMessage({ action: "openLinkTab", url: "https://ko.ai.genaianywhere.com/bookmark.html" });
  });
  linkList.appendChild(aTagLast); 
};

const fetchLinks = async () => {
  let { userId } = await chrome.storage.local.get(["userId"]);
  userId = userId ? userId : "";
  //if (userId) {
    let languageCode = chrome.i18n.getUILanguage();
    //console.log(languageCode); //en //ko //en-US 
    if (languageCode.includes("-")) {
      languageCode = languageCode.split("-")[0]
    }
    const url = `https://ko.ai.genaianywhere.com/api/link?userId=${userId}&languageCode=${languageCode}`;
    try {
      const response = await fetch(url);
      linkList = await response.json(); // Get the list of links
      createLinks(linkList); // Dynamically create buttons based on the linkList
    } catch (error) {
      console.error(error);
    }
  //} else {
  //  const linkList = document.querySelector("#link-list");
  //  while (linkList.firstChild) {
  //    linkList.removeChild(linkList.firstChild);
  //  }
  //  linkList.textContent = chrome.i18n.getMessage("must_log_in_to_use_bookmarks");
  //}
};

(async () => {
  // Initialize the fetch and render process
  await fetchLinks();
})();
