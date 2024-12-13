const sleep = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

const input = async (tab, selectedText) => {
  await chrome.storage.local.set({ activeTab: tab });

  let { activeTab } = await chrome.storage.local.get("activeTab");
  if (activeTab == "memo-tab") {
    await chrome.runtime.sendMessage({ action: "inputMemo", selectedText: selectedText });
  } else if (activeTab == "chat-tab") {
    await chrome.runtime.sendMessage({ action: "inputInputText", selectedText: selectedText });
  }
};

const add = async (tab, selectedText) => {
  await chrome.storage.local.set({ activeTab: tab });

  let { activeTab } = await chrome.storage.local.get("activeTab");
  if (activeTab == "memo-tab") {
    await chrome.runtime.sendMessage({ action: "addMemo", selectedText: selectedText });
  } else if (activeTab == "chat-tab") {
    await chrome.runtime.sendMessage({ action: "addInputText", selectedText: selectedText });
  }
};

const mark = () => {
  const selectedText = window.getSelection().toString().trim();
  if (selectedText.length > 0) {
    const selection = window.getSelection();
    const range = selection.getRangeAt(0);

    // 이미 마크된 텍스트 제거 함수
    const unwrapHighlight = (element) => {
      const parent = element.parentNode;
      while (element.firstChild) {
        parent.insertBefore(element.firstChild, element);
      }
      parent.removeChild(element);
    };

    // 이미 마크된 텍스트가 있는지 확인
    const markElements = Array.from(document.querySelectorAll('span[style*="background-color: yellow"]'));
    let isHighlighted = false;

    markElements.forEach((span) => {
      const spanRange = document.createRange();
      spanRange.selectNodeContents(span);

      // 선택한 텍스트가 이미 마크된 경우, 마크 제거
      if (
        range.compareBoundaryPoints(Range.END_TO_START, spanRange) < 0 &&
        range.compareBoundaryPoints(Range.START_TO_END, spanRange) > 0
      ) {
        unwrapHighlight(span);
        isHighlighted = true;
      }
    });

    // 마크가 없을 경우 새로 추가
    if (!isHighlighted) {
      const span = document.createElement("span");
      span.style.backgroundColor = "yellow";

      const clonedContent = range.cloneContents();
      span.appendChild(clonedContent);

      range.deleteContents();
      range.insertNode(span);
    }
  }
};

//

let floatingIconUseInThisPage = true;

const handleSelection = async (pageX, pageY, controlA) => {
  const { floatingIconCheckboxChecked } = await chrome.storage.local.get("floatingIconCheckboxChecked");
  if (!floatingIconCheckboxChecked) {
    return;
  }

  if (!floatingIconUseInThisPage) {
    return;
  }

  // 이미 레이어드 팝업(iconContainer)이 떠 있는지 확인
  if (document.querySelector("#text-selector-icon-container")) {
    return; // 이미 떠 있다면 새로운 팝업을 띄우지 않음
  }

  const selectedText = window.getSelection().toString().trim();
  if (selectedText.length > 0) {
    // 업데이트된 텍스트 저장
    await chrome.storage.local.set({ selectedText: selectedText }); //////////////////

    const iconContainerStyle = `
        position: absolute;
        display: flex; /* Arrange icons in a row */
        z-index: 10000000000000000000000000000000000;
        background-color: #f0f0f0; /* Background color of the container */
        border: 1px solid black; /* Border around the container */
        padding: 0; /* No padding to ensure tight fit around icons */
        cursor: default; /* Cursor indicates a non-interactive container */
        top: 0px;
        left: 0px;
    `;

    const iconContainer = document.createElement("div");
    iconContainer.id = "text-selector-icon-container";
    iconContainer.style.cssText = iconContainerStyle;

    const homeIcon = document.createElement("button");
    homeIcon.style.cssText = `
      width: 24px;
      height: 24px;
      margin-right: 2px;
      margin-bottom: 0px;
      background-size: contain;
      background-repeat: no-repeat;
      background-image: url(chrome-extension://${chrome.runtime.id}/images/icon.png);
      cursor: pointer;
      border: 1px solid black; 
    `;

    homeIcon.addEventListener("mouseover", () => {
      homeIcon.style.border = "2px solid black";
    });

    homeIcon.addEventListener("mouseout", () => {
      homeIcon.style.border = "1px solid black";
    });

    homeIcon.addEventListener("click", async () => {
      await chrome.runtime.sendMessage({ action: "toggleSidePanel" });

      //

      if (closeDropdown && closeDropdownCreated) {
        closeDropdown.style.display = "none";
        closeDropdownCreated = false; // Reset the flag so it can be recreated
      }
    });

    //

    const addIcon = document.createElement("button");
    addIcon.style.cssText = `
      width: 24px;
      height: 24px;
      margin-right: 2px;
      margin-bottom: 0px;
      background-size: contain;
      background-repeat: no-repeat;
      background-image: url(chrome-extension://${chrome.runtime.id}/images/add.png);
      cursor: pointer;
      border: 1px solid black; 
    `;

    addIcon.addEventListener("mouseover", () => {
      addIcon.style.border = "2px solid black";
    });

    addIcon.addEventListener("mouseout", () => {
      addIcon.style.border = "1px solid black";
    });

    addIcon.addEventListener("click", async () => {
      await add("chat-tab", selectedText);

      //

      if (closeDropdown && closeDropdownCreated) {
        closeDropdown.style.display = "none";
        closeDropdownCreated = false; // Reset the flag so it can be recreated
      }
    });

    //

    const memoAddIcon = document.createElement("button");
    memoAddIcon.style.cssText = `
      width: 24px;
      height: 24px;
      margin-right: 2px;
      margin-bottom: 0px;
      background-size: contain;
      background-repeat: no-repeat;
      background-image: url(chrome-extension://${chrome.runtime.id}/images/memo-add.png);
      cursor: pointer;
      border: 1px solid black; 
    `;

    memoAddIcon.addEventListener("mouseover", () => {
      memoAddIcon.style.border = "2px solid black";
    });

    memoAddIcon.addEventListener("mouseout", () => {
      memoAddIcon.style.border = "1px solid black";
    });

    memoAddIcon.addEventListener("click", async () => {
      await add("memo-tab", selectedText);

      //

      if (closeDropdown && closeDropdownCreated) {
        closeDropdown.style.display = "none";
        closeDropdownCreated = false; // Reset the flag so it can be recreated
      }
    });

    //

    const markIcon = document.createElement("button"); //다른데도 적용하기
    markIcon.style.cssText = `
      width: 24px;
      height: 24px;
      margin-right: 2px;
      margin-bottom: 0px;
      background-size: contain;
      background-repeat: no-repeat;
      background-image: url(chrome-extension://${chrome.runtime.id}/images/mark.png);
      cursor: pointer;
      border: 1px solid black; 
    `;

    markIcon.addEventListener("mouseover", () => {
      markIcon.style.border = "2px solid black";
    });

    markIcon.addEventListener("mouseout", () => {
      markIcon.style.border = "1px solid black";
    });

    markIcon.addEventListener("click", async () => {
      mark();

      //

      if (closeDropdown && closeDropdownCreated) {
        closeDropdown.style.display = "none";
        closeDropdownCreated = false; // Reset the flag so it can be recreated
      }
    });

    //

    const copyIcon = document.createElement("button");
    copyIcon.style.cssText = `
      width: 24px;
      height: 24px;
      margin-right: 2px;
      margin-bottom: 0px;
      background-size: contain;
      background-repeat: no-repeat;
      background-image: url(chrome-extension://${chrome.runtime.id}/images/copy.png);
      cursor: pointer;
      border: 1px solid black; 
    `;

    copyIcon.addEventListener("mouseover", () => {
      copyIcon.style.border = "2px solid black";
    });

    copyIcon.addEventListener("mouseout", () => {
      copyIcon.style.border = "1px solid black";
    });

    copyIcon.addEventListener("click", async () => {
      await navigator.clipboard.writeText(selectedText);

      //

      if (closeDropdown && closeDropdownCreated) {
        closeDropdown.style.display = "none";
        closeDropdownCreated = false; // Reset the flag so it can be recreated
      }
    });

    //

    const downloadIcon = document.createElement("button");
    downloadIcon.style.cssText = `
      width: 24px;
      height: 24px;
      margin-right: 2px;
      margin-bottom: 0px;
      background-size: contain;
      background-repeat: no-repeat;
      background-image: url(chrome-extension://${chrome.runtime.id}/images/download.png);
      cursor: pointer;
      border: 1px solid black; 
    `;

    downloadIcon.addEventListener("mouseover", () => {
      downloadIcon.style.border = "2px solid black";
    });

    downloadIcon.addEventListener("mouseout", () => {
      downloadIcon.style.border = "1px solid black";
    });

    downloadIcon.addEventListener("click", async () => {
      const blob = new Blob([selectedText], { type: "text/plain" });
      const url = URL.createObjectURL(blob);

      // 백그라운드 스크립트로 메시지 전송
      chrome.runtime.sendMessage({
        action: "download",
        url: url,
        filename: "text.txt"
      });

      //

      if (closeDropdown && closeDropdownCreated) {
        closeDropdown.style.display = "none";
        closeDropdownCreated = false; // Reset the flag so it can be recreated
      }
    });

    //

    const openUrlIcon = document.createElement("button");
    openUrlIcon.style.cssText = `
      width: 24px;
      height: 24px;
      margin-right: 2px;
      margin-bottom: 0px;
      background-size: contain;
      background-repeat: no-repeat;
      background-image: url(chrome-extension://${chrome.runtime.id}/images/open-url.png);
      cursor: pointer;
      border: 1px solid black; 
    `;

    openUrlIcon.addEventListener("mouseover", () => {
      openUrlIcon.style.border = "2px solid black";
    });

    openUrlIcon.addEventListener("mouseout", () => {
      openUrlIcon.style.border = "1px solid black";
    });

    openUrlIcon.addEventListener("click", async () => {
      let url = selectedText;
      if (!url.startsWith("http://") && !url.startsWith("https://")) {
        url = "https://www.google.com/search?q={query}";
        url = url.replace("{query}", encodeURIComponent(selectedText));
      }
      await chrome.runtime.sendMessage({ action: "openTab", url: url });

      if (closeDropdown && closeDropdownCreated) {
        closeDropdown.style.display = "none";
        closeDropdownCreated = false; // Reset the flag so it can be recreated
      }
    });

    //

    const closeIcon = document.createElement("button");
    closeIcon.style.cssText = `
      width: 24px;
      height: 24px;
      margin-right: 2px;
      margin-bottom: 0px;
      background-size: contain;
      background-repeat: no-repeat;
      background-image: url(chrome-extension://${chrome.runtime.id}/images/x.png);
      cursor: pointer;
      border: 1px solid black; 
    `;

    closeIcon.addEventListener("mouseover", () => {
      closeIcon.style.border = "2px solid black";
    });

    closeIcon.addEventListener("mouseout", () => {
      closeIcon.style.border = "1px solid black";
    });

    //

    // Track if dropdown is created and ensure it can be recreated
    let closeDropdownCreated = false;
    let closeDropdown = null;

    // Create dropdown for search when mouse enters (only once)
    closeIcon.addEventListener("click", async () => {
      if (!closeDropdownCreated) {
        closeDropdown = document.createElement("div");
        closeDropdown.style.cssText = `
          display: none;
          position: absolute;
          background-color: white;
          border: 1px solid #ccc;
          z-index: 1001;
          width: 120px;
          padding: 0;
          box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
        `;

        const option1 = document.createElement("button");
        option1.textContent = "다음 방문까지 메뉴 보이지 않기";
        option1.style.cssText = `
          padding: 10px;
          width: 100%;
          text-align: left;
          background-color: white;
          cursor: pointer;
          border: none;
          border-bottom: 1px solid #ccc;
        `;
        option1.addEventListener("mouseover", () => {
          option1.style.backgroundColor = "#f0f0f0";
        });
        option1.addEventListener("mouseout", () => {
          option1.style.backgroundColor = "#fff";
        });
        option1.addEventListener("click", async () => {
          // Hide dropdown after selection
          closeDropdown.style.display = "none";
          closeDropdownCreated = false;

          iconContainer.removeChild(homeIcon);
          //iconContainer.removeChild(inputIcon);
          iconContainer.removeChild(addIcon);
          iconContainer.removeChild(memoAddIcon);
          iconContainer.removeChild(markIcon);
          iconContainer.removeChild(copyIcon);
          iconContainer.removeChild(downloadIcon);
          iconContainer.removeChild(openUrlIcon);
          iconContainer.removeChild(closeIcon);
          document.body.removeChild(iconContainer);

          floatingIconUseInThisPage = false;
        });
        closeDropdown.appendChild(option1);

        const option2 = document.createElement("button");
        option2.textContent = "텍스트 선택시 메뉴 보이지 않기";
        option2.style.cssText = `
          padding: 10px;
          width: 100%;
          text-align: left;
          background-color: white;
          cursor: pointer;
          border: none;
          border-bottom: 1px solid #ccc;
        `;
        option2.addEventListener("mouseover", () => {
          option2.style.backgroundColor = "#f0f0f0";
        });
        option2.addEventListener("mouseout", () => {
          option2.style.backgroundColor = "#fff";
        });
        option2.addEventListener("click", async () => {
          // Hide dropdown after selection
          closeDropdown.style.display = "none";
          closeDropdownCreated = false;

          iconContainer.removeChild(homeIcon);
          //iconContainer.removeChild(inputIcon);
          iconContainer.removeChild(addIcon);
          iconContainer.removeChild(memoAddIcon);
          iconContainer.removeChild(markIcon);
          iconContainer.removeChild(copyIcon);
          iconContainer.removeChild(downloadIcon);
          iconContainer.removeChild(openUrlIcon);
          iconContainer.removeChild(closeIcon);
          document.body.removeChild(iconContainer);

          floatingIconUseInThisPage = false;
          const isChecked = false;
          await chrome.storage.local.set({ floatingIconCheckboxChecked: isChecked });
        });
        closeDropdown.appendChild(option2);

        closeIcon.appendChild(closeDropdown);

        // Show the dropdown when mouse is over the search icon
        closeDropdown.style.display = "block";

        // Hide dropdown when mouse leaves the search area and the dropdown
        const hideDropdown = (event) => {
          if (!closeIcon.contains(event.relatedTarget) && !closeDropdown.contains(event.relatedTarget)) {
            closeDropdown.style.display = "none";
            closeDropdownCreated = false; // Reset the flag so it can be recreated
          }
        };

        //closeIcon.addEventListener('mouseout', hideDropdown);
        //closeDropdown.addEventListener('mouseout', hideDropdown);

        // Position dropdown relative to the search icon
        closeIcon.style.position = "relative";
        closeDropdown.style.left = "0";
        closeDropdown.style.top = "22px"; // Space between icon and dropdown

        closeDropdownCreated = true; // Set flag to true once the dropdown is created
      } else {
        closeDropdown.style.display = "none";
        closeDropdownCreated = false; // Reset the flag so it can be recreated
      }
    });

    //

    iconContainer.appendChild(homeIcon);
    //iconContainer.appendChild(inputIcon);
    iconContainer.appendChild(addIcon);
    iconContainer.appendChild(memoAddIcon);
    iconContainer.appendChild(markIcon);
    iconContainer.appendChild(copyIcon);
    iconContainer.appendChild(downloadIcon);
    iconContainer.appendChild(openUrlIcon);
    iconContainer.appendChild(closeIcon);

    // Add container to the document body
    document.body.appendChild(iconContainer);

    if (controlA) {
      let containerLeft = pageX - iconContainer.offsetWidth / 2; // 아이콘의 수평 중앙을 마우스 X 좌표에 맞춤
      if (containerLeft < 0) {
        containerLeft = 0;
      }

      iconContainer.style.left = `${containerLeft + window.scrollX}px`;
      //iconContainer.style.top = `${pageY + 10 + window.scrollY}px`;
      iconContainer.style.top = `${pageY - 35 + window.scrollY}px`;
    } else {
      const containerWidth = iconContainer.offsetWidth; // 아이콘 컨테이너의 가로 너비 계산
      let containerLeft = pageX - containerWidth / 2; // 아이콘의 수평 중앙을 마우스 X 좌표에 맞춤
      if (containerLeft < 0) {
        containerLeft = 0;
      }

      iconContainer.style.left = `${containerLeft}px`;

      const selectionRange = window.getSelection().getRangeAt(0); // 선택된 텍스트의 범위 가져오기
      const selectionRect = selectionRange.getBoundingClientRect(); // 선택된 텍스트의 경계 계산
      //iconContainer.style.top = `${selectionRect.bottom + 10 + window.scrollY}px`; // 선택된 텍스트의 하단에 맞게 배치
      iconContainer.style.top = `${selectionRect.top - 35 + window.scrollY}px`; // 선택된 텍스트의 상단에 맞게 배치
    }

    // Close the container when clicking outside of it
    document.addEventListener("click", (event) => {
      if (!iconContainer.contains(event.target)) {
        if (iconContainer.contains(homeIcon)) iconContainer.removeChild(homeIcon);
        //if (iconContainer.contains(inputIcon))
        //  iconContainer.removeChild(inputIcon);
        if (iconContainer.contains(addIcon)) iconContainer.removeChild(addIcon);
        if (iconContainer.contains(memoAddIcon)) iconContainer.removeChild(memoAddIcon);
        if (iconContainer.contains(markIcon)) iconContainer.removeChild(markIcon);
        if (iconContainer.contains(copyIcon)) iconContainer.removeChild(copyIcon);
        if (iconContainer.contains(downloadIcon)) iconContainer.removeChild(downloadIcon);
        if (iconContainer.contains(openUrlIcon)) iconContainer.removeChild(openUrlIcon);
        if (iconContainer.contains(closeIcon)) iconContainer.removeChild(closeIcon);
        if (document.body.contains(iconContainer)) document.body.removeChild(iconContainer);
      }
    });
  }
};

document.addEventListener("keydown", async (event) => {
  // Ctrl + A 키가 눌렸는지 확인
  if ((event.ctrlKey && event.key === "a") || (event.metaKey && event.key === "a")) {
    //mac
    await handleSelection(xForControlA, yForControlA, true);
  }
});

///*
document.addEventListener("mouseup", async (event) => {
  if (event.button === 0) {
    //왼쪽 마우스
    try {
      await handleSelection(event.pageX, event.pageY);      // Continue with your logic
    } catch (error) {
      console.error(error);
    }
  }
});
//*/
/*
document.addEventListener('selectionchange', async () => {
  const selectedText = window.getSelection().toString().trim();
  
  if (selectedText.length > 0 && floatingIconUseInThisPage) {
    // 선택된 텍스트가 있으면 아이콘 컨테이너 생성
    const selection = window.getSelection();
    const range = selection.getRangeAt(0);
    const selectionRect = range.getBoundingClientRect();

    // 화면 좌표 계산
    const pageX = window.scrollX + selectionRect.left + selectionRect.width / 2;
    const pageY = window.scrollY + selectionRect.bottom;

    await handleSelection(pageX, pageY);
  }
});
*/

let xForControlA = 0;
let yForControlA = 0;

document.addEventListener("mousemove", (event) => {
  xForControlA = event.clientX; // X 좌표 저장
  yForControlA = event.clientY; // Y 좌표 저장
});

//백그라운드에서 mark 메시지 받기
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "mark") {
    mark();
  }
});
