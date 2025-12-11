const createOpenerIcon = () => {
  const openerIcon = document.createElement("button");
  openerIcon.style.cssText = `
    position: fixed;
    bottom: 10px;
    right: 10px;
    width: 24px;
    height: 24px;
    margin-right: 2px;
    margin-bottom: 0px;
    background-size: contain;
    background-repeat: no-repeat;
    background-image: url(chrome-extension://${chrome.runtime.id}/images/icon-128x128.png);
    cursor: pointer;
    border: 1px solid black; 
    //
    transition: transform 0.3s ease; /* 애니메이션을 위한 추가 */
  `;

  openerIcon.id = "opener-icon";
  document.body.appendChild(openerIcon);

  openerIcon.addEventListener("mouseover", () => {
    openerIcon.style.border = "2px solid black";
  });

  openerIcon.addEventListener("mouseout", () => {
    openerIcon.style.border = "1px solid black";
  });

  openerIcon.addEventListener("click", async () => {
    await chrome.runtime.sendMessage({ action: "toggleSidePanel" });
  });

  //

  let textSelected = false;

  // 텍스트 선택 이벤트 추가
  document.addEventListener("selectionchange", () => {
    const selection = window.getSelection();
    if (selection && selection.toString().trim().length > 0) {
      if (!textSelected) {
        textSelected = true;
        openerIcon.style.transform = "scale(1.5)"; // 확대 애니메이션
      }
    } else {
      if (textSelected) {
        textSelected = false;
        openerIcon.style.transform = "scale(1)"; // 원래 크기로 복원
      }
    }
  });
}

//

//문서에 바로 하위 아이프레임이 하나만 있는 경우 그 아이프레임에 createOpenerIcon()이 호출되게, 그렇지 않으면 최상위 문서에서 호출되게
// 컨텐츠 스크립트 로직
if (window.self === window.top) {
  // 최상위 문서에서 실행 중
  const bodyIframes = document.body.getElementsByTagName("iframe");

  if (bodyIframes.length === 1) {
    // <body>에 아이프레임이 하나만 있는 경우
    const iframe = bodyIframes[0];
    console.log("Single iframe found in top-level document.");
    // 아이프레임의 스크립트가 실행되도록 허용
    iframe.onload = () => {
      console.log("Allowing iframe script execution.");
    };
  } else {
    // 아이프레임이 없거나 여러 개인 경우 최상위 문서에서 실행
    console.log("No single iframe found. Running script in top-level document.");
    createOpenerIcon();
  }
} else {
  // 최상위 문서가 아닌 경우
  const parentFrame = window.frameElement; // 현재 문서를 포함하는 <iframe>
  if (parentFrame && parentFrame.tagName === "IFRAME") {
    const parentIframes = parentFrame.ownerDocument.body.getElementsByTagName("iframe");
    if (parentIframes.length === 1 && parentIframes[0] === parentFrame) {
      console.log("This is the direct child iframe. Running script.");
      createOpenerIcon();
    } else {
      console.log("This is not the direct child iframe. Exiting script.");
    }
  } else {
    console.log("Not a direct child iframe. Exiting script.");
  }
}