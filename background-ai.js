const aiServices = [
  { id: "chatgpt", name: "챗지피티 (텍스트, 이미지)", en: "Chatgpt (text, image)", urls: ["https://chatgpt.com/", "https://chatgpt.com/c/*"], rootUrl: null, simple: false },
  { id: "wrtn", name: "뤼튼 (텍스트, 이미지)", en: "Wrtn (text, image)", urls: ["https://wrtn.ai/", "https://wrtn.ai/chat/u/*"], rootUrl: null, simple: false },
  { id: "copilot", name: "코파일럿 (텍스트, 이미지)", en: "Copilot (text, image)", urls: ["https://copilot.microsoft.com/", "https://copilot.microsoft.com/chats/*"], rootUrl: null, simple: false },
  { id: "gemini", name: "제미니 (텍스트, 이미지)", en: "Gemini (text, image)", urls: ["https://gemini.google.com/app", "https://gemini.google.com/app/*"], rootUrl: "https://gemini.google.com/", simple: false },
  { id: "claude", name: "클로드 (텍스트)", en: "Claude (text)", urls: ["https://claude.ai/new", "https://claude.ai/chat/*"], rootUrl: "https://claude.ai/", simple: false },
  { id: "perplexity", name: "퍼플렉시티 (텍스트)", en: "Perplexity (text)", urls: ["https://www.perplexity.ai/", "https://www.perplexity.ai/search/*"], rootUrl: null, simple: false },
  { id: "chathub", name: "챗허브 (텍스트, 이미지)", en: "ChatHub (text, image)", urls: ["https://app.chathub.gg/", "https://app.chathub.gg/chat/*"], rootUrl: null, simple: false },
  { id: "poe", name: "포우 (텍스트)", en: "Poe (text)", urls: ["https://poe.com/", "https://poe.com/chat/*"], rootUrl: null, simple: false },
  //https://www.imagine.art/?ref=nzcwymq
  { id: "imagineart", name: "이메진아트 (이미지)", en: "ImagineArt (image)", urls: ["https://www.imagine.art/dashboard/image?ref=nzcwymq", 
    "https://www.imagine.art/dashboard/image",
    "https://www.imagine.art/dashboard/image/tool/text-to-image",
    "https://www.imagine.art/dashboard/image/tool/text-to-image*"
  ], rootUrl: "https://www.imagine.art/", simple: false },  

  //https://mix.audio?fpr=sang-ki79
  { id: "mixaudio", name: "믹스오디오 (음악)", en: "Mixaudio (music)", urls: ["https://mix.audio?fpr=sang-ki79", 
    "https://mix.audio/home", 
    "https://mix.audio/bgm/*",
    "https://mix.audio/radio*", 
    "https://mix.audio/mix/*"
  ], rootUrl: "https://mix.audio/", simple: false },
  //https://mubert.com/?via=sang-ki
  { id: "mubert", name: "뮤버트 (음악, 영어 입력)", en: "Mubert (music, english input)", urls: ["https://mubert.com/render?via=sang-ki",
    "https://mubert.com/*/render",
    "https://mubert.com/*/render/*"
  ], rootUrl: "https://mubert.com/", simple: false },
  { id: "udio", name: "유디오 (음악)", en: "Udio (music)", urls: ["https://www.udio.com/", "https://www.udio.com/*"], rootUrl: "https://www.udio.com/", simple: false },
  { id: "suno", name: "수노 (음악)", en: "Suno (music)", urls: ["https://suno.com/create"], rootUrl: "https://suno.com/", simple: false },
  
  { id: "minerva", name: "미네르바 (텍스트, 이미지, 동영상)", en: "Minerva (text, image, video)", urls: ["https://shouter.ai/minerva"], rootUrl: null, simple: false },
  { id: "kling", name: "클링 (동영상)", en: "Kling (video)", urls: ["https://klingai.com/text-to-video/new", "https://klingai.com/text-to-image/new"], rootUrl: "https://klingai.com/", simple: false },
  { id: "invideo", name: "인비디오 (동영상)", en: "Invideo (video)", urls: ["https://ai.invideo.io/workspace/", "https://ai.invideo.io/workspace/*"], rootUrl: null, simple: false },
  { id: "krea", name: "크레아 (동영상)", en: "Krea (video)", urls: ["https://www.krea.ai/apps/video/v2"], rootUrl: "https://www.krea.ai/", simple: false },  

  { id: "gamma", name: "감마 (프리젠테이션)", en: "Gamma (presentation)", urls: ["https://gamma.app/create/generate"], rootUrl: "https://gamma.app/", simple: false },

];

const moreAiServices = [
  { id: "gazet", name: "가제트 (텍스트 (블로그 글쓰기))", en: "Gazet (text (blog writing))", urls: ["https://gazet.ai/"], rootUrl: null, simple: true },

  { id: "playground", name: "플레이그라운드 (이미지)", en: "Playground (image)", urls: ["https://playground.com/design"], rootUrl: "https://playground.com/", simple: true },
  { id: "fabric", name: "페브릭 (이미지, 영어 입력)", en: "Fabric (image, english input)", urls: ["https://huggingface.co/spaces/dvruette/fabric"], rootUrl: null, simple: true },  

  { id: "askup", name: "아숙업 (텍스트, 이미지, 안드로이드, iOs)", en: "Askup (text, image, android, iOs)", urls: ["https://pf.kakao.com/_BhxkWxj"], rootUrl: null, simple: true },  

  { id: "runwayml", name: "런웨이Gen-3 (동영상)", en: "RunwayGen-3 (video)", urls: ["https://app.runwayml.com/dashboard"], rootUrl: "https://app.runwayml.com/", simple: true },
  
  { id: "keeneat", name: "키닛 (음악)", en: "Keeneat (music)", urls: ["https://keeneat.com/partner/compose"], rootUrl: "https://keeneat.com/", simple: true },

  { id: "typecast", name: "타입캐스트 (음성)", en: "Typecast (music)", urls: ["https://typecast.ai/"], rootUrl: null, simple: true },

  { id: "beautiful", name: "뷰티플 (프리젠테이션)", en: "Beautiful (presentation)", urls: ["https://www.beautiful.ai/"], rootUrl: null, simple: true },

  { id: "cursor", name: "커서 (코드 에디터, 앱 제작)", en: "Cursor (code editor)", urls: ["https://www.cursor.com/"], rootUrl: null, simple: true },
  { id: "suggest", name: "추가할 생성형 Ai 를 제안해 주세요.", en: "Suggest additional Generative Ai.", urls: ["https://docs.google.com/forms/d/e/1FAIpQLScReSafo0K3E0LqRLEoe5aA6yBP_C9PrefBHMNk96YBVkdLHA/viewform"], rootUrl: null, simple: true }

  
];

//

const findAiServiceById = (id) => {
  return aiServices.find(service => service.id === id) || null;
};

const findMoreAiServiceById = (id) => {
  return moreAiServices.find(service => service.id === id) || null;
};

const openAiTab = async (id) => {
  let service = findAiServiceById(id);
  if (service == null) {
    service = findMoreAiServiceById(id);
  }
  const urls = service.urls;
  const url = urls[0];
  let rootUrl = service.rootUrl;
  if (rootUrl == null) {
    rootUrl = url;
  }
  
  /*
  // 현재 열려 있는 모든 탭 검색
  const tabs = await chrome.tabs.query({});
  */
  ///*
  // 현재 활성 창의 모든 탭 검색
  const currentWindow = await chrome.windows.getCurrent();
  const tabs = await chrome.tabs.query({ windowId: currentWindow.id });
  //*/

  // 최근에 접근한 탭을 기준으로 정렬 (최근 탭이 첫 번째로 오도록)
  tabs.sort((a, b) => b.lastAccessed - a.lastAccessed);

  // 최근 탭 중 주어진 URL을 포함하는 탭을 찾음
  const include = true;
  let foundTab = tabs.find((tab) => (include ? tab.url.includes(rootUrl) : tab.url == rootUrl));
  
  // URL을 포함하는 탭을 찾은 경우 해당 탭을 활성화
  if (foundTab) {
    // Activate the window where the ai tab is open
    await chrome.windows.update(foundTab.windowId, { focused: true });
    await chrome.tabs.update(foundTab.id, { active: true });
    // 현재 탭의 URL이 urls 배열의 어떤 URL과도 일치하지 않으면 첫 번째 URL로 리로드
    const currentTabUrl = foundTab.url;
    const urlMatches = urls.some(url => {
      if (url.includes('*')) {
        const parts = url.split('*');
        
        if (parts.length === 2) {
          // 기존 로직: 시작과 끝 체크
          const [start, end] = parts;
          return currentTabUrl.startsWith(start) && currentTabUrl.endsWith(end);
        } 
        else if (parts.length === 3) {
          // 첫부분 시작, 중간부분 포함, 마지막부분 끝 체크
          const [start, middle, end] = parts;
          return currentTabUrl.startsWith(start) && 
                 currentTabUrl.includes(middle) && 
                 currentTabUrl.endsWith(end);
        }
      } else {
        // Exact match check if there is no '*'
        return currentTabUrl === url;
      }
    });
    if (!urlMatches) {
      await chrome.tabs.update(foundTab.id, { url: urls[0] });
    }      
  } else {
    //console.log(url);
    // 동일한 URL이 열려 있지 않으면 새 탭을 열기
    await chrome.tabs.create({ url: url });
  }
};

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  const text = message.text;

  if (message.action === "getAiServices") {
    sendResponse(aiServices);
  }  
  if (message.action === "getMoreAiServices") {
    sendResponse(moreAiServices);
  }  
  else if (message.action == "sendToAi") {
    (async () => {
      await sendToAi(message.id, text, message.attach);
      sendResponse("sendToAi response");
    })();
    return true;
  } else if (message.action === "openAiTab") {
    (async () => {
      await openAiTab(message.id);
      sendResponse("openAiTab response");
    })();
    return true;
  }
});

const sendToAi = async (id, text, attach = false) => {
  let service = findAiServiceById(id);
  if (service == null) {
    service = findMoreAiServiceById(id);
  }
  
  const urls = service.urls;
  const url = urls[0];
  let rootUrl = service.rootUrl;
  if (rootUrl == null) {
    rootUrl = url;
  }
  
  const simple = service.simple;
  if (simple) {
    return;
  }
  
  /*
  // 현재 열려 있는 모든 탭 검색
  const tabs = await chrome.tabs.query({});
  */
  ///*
  // 현재 활성 창의 모든 탭 검색
  const currentWindow = await chrome.windows.getCurrent();
  const tabs = await chrome.tabs.query({ windowId: currentWindow.id });
  //*/

  // 최근에 접근한 탭을 기준으로 정렬 (최근 탭이 첫 번째로 오도록)
  tabs.sort((a, b) => b.lastAccessed - a.lastAccessed);

  // 최근 탭 중 주어진 url 포함하는 탭을 찾음
  let foundTab = tabs.find((tab) => tab.url.includes(rootUrl));

  if (id == "chatgpt") {
    if (foundTab) {
      // 이미 열려 있는 탭을 찾으면 해당 탭을 활성화하고 필요한 경우 리로드
      await chrome.windows.update(foundTab.windowId, { focused: true });
      await chrome.tabs.update(foundTab.id, { active: true }); 
      // 현재 탭의 URL이 urls 배열의 어떤 URL과도 일치하지 않으면 첫 번째 URL로 리로드
      const currentTabUrl = foundTab.url;
      const urlMatches = urls.some(url => {
        if (url.includes('*')) {
          const parts = url.split('*');
          
          if (parts.length === 2) {
            // 기존 로직: 시작과 끝 체크
            const [start, end] = parts;
            return currentTabUrl.startsWith(start) && currentTabUrl.endsWith(end);
          } 
          else if (parts.length === 3) {
            // 첫부분 시작, 중간부분 포함, 마지막부분 끝 체크
            const [start, middle, end] = parts;
            return currentTabUrl.startsWith(start) && 
                   currentTabUrl.includes(middle) && 
                   currentTabUrl.endsWith(end);
          }
        } else {
          // Exact match check if there is no '*'
          return currentTabUrl === url;
        }
      });
      if (!urlMatches) {
        await chrome.tabs.update(foundTab.id, { url: urls[0] });
      }           

      // 선택된 텍스트를 AI 탭에 삽입하는 스크립트 실행
      await chrome.scripting.executeScript({
        target: { tabId: foundTab.id },
        args: [text, attach],
        function: async (text, attach) => {
          await sleep(1000);

          const aTags = document.querySelectorAll("#radix-\\:r4\\: > div > div > a");
          if (aTags.length > 0) {
            aTags[0].click();
          }

          await sleep(1000);

          const contenteditable = document.querySelector("#prompt-textarea");
          if (contenteditable) {
            // 특수문자를 이스케이프하여 사용자가 HTML 태그를 볼 수 있도록 처리
            const escapeHTML = (str) => str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
            // 사용자가 입력한 텍스트를 <p> 태그로 감싸서 HTML로 삽입하되, HTML 태그는 이스케이프 처리
            contenteditable.innerHTML = text
              .split("\n")
              .map((line) => `<p>${escapeHTML(line)}</p>`)
              .join("");
            // 변경 이벤트를 수동으로 발생시킴 (bubbles 옵션을 true로 설정하여 이벤트가 버블링되도록)
            contenteditable.dispatchEvent(new Event("input", { bubbles: true }));
          }

          if (!attach) {
            await sleep(1000);

            const submitButton = document.querySelector('button[data-testid="send-button"]');
            if (submitButton) {
              submitButton.click();
            }
          }
        }
      });
    } else {
      // If no ai tab is open, create a new tab
      let newTab = await chrome.tabs.create({ url: url });

      // Listen for the tab update to ensure it's fully loaded before interacting with it
      const onUpdated = (tabId, changeInfo) => {
        if (tabId === newTab.id && changeInfo.status === "complete") {
          chrome.scripting.executeScript({
            target: { tabId: newTab.id },
            args: [text, attach],
            function: async (text, attach) => {
              await sleep(1000);

              const aTags = document.querySelectorAll("#radix-\\:r4\\: > div > div > a");
              if (aTags.length > 0) {
                aTags[0].click();
              }

              await sleep(1000);

              const contenteditable = document.querySelector("#prompt-textarea");
              if (contenteditable) {
                // 특수문자를 이스케이프하여 사용자가 HTML 태그를 볼 수 있도록 처리
                const escapeHTML = (str) => str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
                // 사용자가 입력한 텍스트를 <p> 태그로 감싸서 HTML로 삽입하되, HTML 태그는 이스케이프 처리
                contenteditable.innerHTML = text
                  .split("\n")
                  .map((line) => `<p>${escapeHTML(line)}</p>`)
                  .join("");
                // 변경 이벤트를 수동으로 발생시킴 (bubbles 옵션을 true로 설정하여 이벤트가 버블링되도록)
                contenteditable.dispatchEvent(new Event("input", { bubbles: true }));
              }

              if (!attach) {
                await sleep(1000);

                const submitButton = document.querySelector('button[data-testid="send-button"]');
                if (submitButton) {
                  submitButton.click();
                }
              }
            }
          });

          // Remove the listener after the tab is updated
          chrome.tabs.onUpdated.removeListener(onUpdated);
        }
      };
      chrome.tabs.onUpdated.addListener(onUpdated);
    }  
  }
  else if (id == "wrtn") {
    if (foundTab) {
      // 이미 열려 있는 탭을 찾으면 해당 탭을 활성화
      await chrome.windows.update(foundTab.windowId, { focused: true });
      await chrome.tabs.update(foundTab.id, { active: true });
      // 현재 탭의 URL이 urls 배열의 어떤 URL과도 일치하지 않으면 첫 번째 URL로 리로드
      const currentTabUrl = foundTab.url;
      const urlMatches = urls.some(url => {
        if (url.includes('*')) {
          const parts = url.split('*');
          
          if (parts.length === 2) {
            // 기존 로직: 시작과 끝 체크
            const [start, end] = parts;
            return currentTabUrl.startsWith(start) && currentTabUrl.endsWith(end);
          } 
          else if (parts.length === 3) {
            // 첫부분 시작, 중간부분 포함, 마지막부분 끝 체크
            const [start, middle, end] = parts;
            return currentTabUrl.startsWith(start) && 
                   currentTabUrl.includes(middle) && 
                   currentTabUrl.endsWith(end);
          }
        } else {
          // Exact match check if there is no '*'
          return currentTabUrl === url;
        }
      });
      if (!urlMatches) {
        await chrome.tabs.update(foundTab.id, { url: urls[0] });
      }        

      // 선택된 텍스트를 AI 탭에 삽입하는 스크립트 실행
      await chrome.scripting.executeScript({
        target: { tabId: foundTab.id },
        args: [text, attach],
        function: async (text, attach) => {
          await sleep(1000);

          const textarea = document.querySelector("textarea#rich-textarea");
          if (textarea) {
            textarea.value = text;
            textarea.dispatchEvent(new Event("input", { bubbles: true }));
          }
  
          if (!attach) {
            //await sleep(1000);
            await sleep(1500);
  
            const path1 = document.querySelector('button > div > svg[color="#ffffffff"] > path');
            const path2 = document.querySelector('div > div > svg[color="#ffffffff"] > path');
            const path = path1 ? path1 : path2;
            if (path) {
              const grandParentElement = path.parentElement.parentElement;
              grandParentElement.click();
            }
          }
        }
      });
    } else {
      // If no ai tab is open, create a new tab
      let newTab = await chrome.tabs.create({ url: url });
  
      // Listen for the tab update to ensure it's fully loaded before interacting with it
      const onUpdated = (tabId, changeInfo) => {
        if (tabId === newTab.id && changeInfo.status === "complete") {
          chrome.scripting.executeScript({
            target: { tabId: newTab.id },
            args: [text, attach],
            function: async (text, attach) => {
              await sleep(1000);

              const textarea = document.querySelector("textarea#rich-textarea");
              if (textarea) {
                textarea.value = text;
                textarea.dispatchEvent(new Event("input", { bubbles: true }));
              }
  
              if (!attach) {
                //await sleep(1000);
                await sleep(1500);
  
                const path1 = document.querySelector('button > div > svg[color="#ffffffff"] > path');
                const path2 = document.querySelector('div > div > svg[color="#ffffffff"] > path');
                const path = path1 ? path1 : path2;
                if (path) {
                  const grandParentElement = path.parentElement.parentElement;
                  grandParentElement.click();
                }
              }
            }
          });
  
          // Remove the listener after the tab is updated
          chrome.tabs.onUpdated.removeListener(onUpdated);
        }
      };
      chrome.tabs.onUpdated.addListener(onUpdated);
    }    
  }  
  else if (id == "copilot") {
    if (foundTab) {
      // 이미 열려 있는 탭을 찾으면 해당 탭을 활성화
      await chrome.windows.update(foundTab.windowId, { focused: true });
      await chrome.tabs.update(foundTab.id, { active: true });
      // 현재 탭의 URL이 urls 배열의 어떤 URL과도 일치하지 않으면 첫 번째 URL로 리로드
      const currentTabUrl = foundTab.url;
      const urlMatches = urls.some(url => {
        if (url.includes('*')) {
          const parts = url.split('*');
          
          if (parts.length === 2) {
            // 기존 로직: 시작과 끝 체크
            const [start, end] = parts;
            return currentTabUrl.startsWith(start) && currentTabUrl.endsWith(end);
          } 
          else if (parts.length === 3) {
            // 첫부분 시작, 중간부분 포함, 마지막부분 끝 체크
            const [start, middle, end] = parts;
            return currentTabUrl.startsWith(start) && 
                   currentTabUrl.includes(middle) && 
                   currentTabUrl.endsWith(end);
          }
        } else {
          // Exact match check if there is no '*'
          return currentTabUrl === url;
        }
      });
      if (!urlMatches) {
        await chrome.tabs.update(foundTab.id, { url: urls[0] });
      }      

      // 선택된 텍스트를 AI 탭에 삽입하는 스크립트 실행
      await chrome.scripting.executeScript({
        target: { tabId: foundTab.id },
        args: [text, attach],
        function: async (text, attach) => {
          await sleep(1000);

          const textarea = document.querySelector("textarea#userInput");
          if (textarea) {
            textarea.value = text;
            textarea.dispatchEvent(new Event("input", { bubbles: true }));
          }
  
          if (!attach) {
            await sleep(1000);
  
            const submitButton = document.querySelector("button.bg-spot-peach-300");
            if (submitButton) {
              submitButton.click();
            }
          }
        }
      });
    } else {
      // If no ai tab is open, create a new tab
      let newTab = await chrome.tabs.create({ url: url });
  
      // Listen for the tab update to ensure it's fully loaded before interacting with it
      const onUpdated = (tabId, changeInfo) => {
        if (tabId === newTab.id && changeInfo.status === "complete") {
          chrome.scripting.executeScript({
            target: { tabId: newTab.id },
            args: [text, attach],
            function: async (text, attach) => {
              await sleep(1000); 
  
              const textarea = document.querySelector("textarea#userInput");
              if (textarea) {
                textarea.value = text;
                textarea.dispatchEvent(new Event("input", { bubbles: true }));
              }
  
              if (!attach) {
                await sleep(1000);
  
                const submitButton = document.querySelector("button.bg-spot-peach-300");
                if (submitButton) {
                  submitButton.click();
                }
              }
            }
          });
  
          // Remove the listener after the tab is updated
          chrome.tabs.onUpdated.removeListener(onUpdated);
        }
      };
      chrome.tabs.onUpdated.addListener(onUpdated);
    }    
  }  
  else if (id == "gemini") {
    if (foundTab) {
      // 이미 열려 있는 탭을 찾으면 해당 탭을 활성화
      await chrome.windows.update(foundTab.windowId, { focused: true });
      await chrome.tabs.update(foundTab.id, { active: true });
      // 현재 탭의 URL이 urls 배열의 어떤 URL과도 일치하지 않으면 첫 번째 URL로 리로드
      const currentTabUrl = foundTab.url;
      const urlMatches = urls.some(url => {
        if (url.includes('*')) {
          const parts = url.split('*');
          
          if (parts.length === 2) {
            // 기존 로직: 시작과 끝 체크
            const [start, end] = parts;
            return currentTabUrl.startsWith(start) && currentTabUrl.endsWith(end);
          } 
          else if (parts.length === 3) {
            // 첫부분 시작, 중간부분 포함, 마지막부분 끝 체크
            const [start, middle, end] = parts;
            return currentTabUrl.startsWith(start) && 
                   currentTabUrl.includes(middle) && 
                   currentTabUrl.endsWith(end);
          }
        } else {
          // Exact match check if there is no '*'
          return currentTabUrl === url;
        }
      });
      if (!urlMatches) {
        await chrome.tabs.update(foundTab.id, { url: urls[0] });
      }     
      
      // 선택된 텍스트를 AI 탭에 삽입하는 스크립트 실행
      await chrome.scripting.executeScript({
        target: { tabId: foundTab.id },
        args: [text, attach],
        function: async (text, attach) => {
          await sleep(1000);

          const contenteditable = document.querySelector('.ql-editor[contenteditable="true"]');
          if (contenteditable) {
            // 특수문자를 이스케이프하여 사용자가 HTML 태그를 볼 수 있도록 처리
            const escapeHTML = (str) => str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
            // 사용자가 입력한 텍스트를 <p> 태그로 감싸서 HTML로 삽입하되, HTML 태그는 이스케이프 처리
            contenteditable.innerHTML = text
              .split("\n")
              .map((line) => `<p>${escapeHTML(line)}</p>`)
              .join("");
            // 변경 이벤트를 수동으로 발생시킴 (bubbles 옵션을 true로 설정하여 이벤트가 버블링되도록)
            contenteditable.dispatchEvent(new Event("input", { bubbles: true }));
          }
  
          if (!attach) {
            await sleep(1000);
  
            const submitButton = document.querySelector('button[aria-label="메시지 보내기"]');
            if (submitButton) {
              submitButton.click();
            }
          }
        }
      });
    } else {
      // If no ai tab is open, create a new tab
      let newTab = await chrome.tabs.create({ url: url });
  
      // Listen for the tab update to ensure it's fully loaded before interacting with it
      const onUpdated = (tabId, changeInfo) => {
        if (tabId === newTab.id && changeInfo.status === "complete") {
          chrome.scripting.executeScript({
            target: { tabId: newTab.id },
            args: [text, attach],
            function: async (text, attach) => {
              await sleep(1000);

              const contenteditable = document.querySelector('.ql-editor[contenteditable="true"]');
              if (contenteditable) {
                // 특수문자를 이스케이프하여 사용자가 HTML 태그를 볼 수 있도록 처리
                const escapeHTML = (str) => str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
                // 사용자가 입력한 텍스트를 <p> 태그로 감싸서 HTML로 삽입하되, HTML 태그는 이스케이프 처리
                contenteditable.innerHTML = text
                  .split("\n")
                  .map((line) => `<p>${escapeHTML(line)}</p>`)
                  .join("");
                // 변경 이벤트를 수동으로 발생시킴 (bubbles 옵션을 true로 설정하여 이벤트가 버블링되도록)
                contenteditable.dispatchEvent(new Event("input", { bubbles: true }));
              }
  
              if (!attach) {
                await sleep(1000);
  
                const submitButton = document.querySelector('button[aria-label="메시지 보내기"]');
                if (submitButton) {
                  submitButton.click();
                }
              }
            }
          });
  
          // Remove the listener after the tab is updated
          chrome.tabs.onUpdated.removeListener(onUpdated);
        }
      };
      chrome.tabs.onUpdated.addListener(onUpdated);
    }    
  }  
  else if (id == "claude") {
    if (foundTab) {
      // 이미 열려 있는 탭을 찾으면 해당 탭을 활성화
      await chrome.windows.update(foundTab.windowId, { focused: true });
      await chrome.tabs.update(foundTab.id, { active: true });
      // 현재 탭의 URL이 urls 배열의 어떤 URL과도 일치하지 않으면 첫 번째 URL로 리로드
      const currentTabUrl = foundTab.url;
      const urlMatches = urls.some(url => {
        if (url.includes('*')) {
          const parts = url.split('*');
          
          if (parts.length === 2) {
            // 기존 로직: 시작과 끝 체크
            const [start, end] = parts;
            return currentTabUrl.startsWith(start) && currentTabUrl.endsWith(end);
          } 
          else if (parts.length === 3) {
            // 첫부분 시작, 중간부분 포함, 마지막부분 끝 체크
            const [start, middle, end] = parts;
            return currentTabUrl.startsWith(start) && 
                   currentTabUrl.includes(middle) && 
                   currentTabUrl.endsWith(end);
          }
        } else {
          // Exact match check if there is no '*'
          return currentTabUrl === url;
        }
      });
      if (!urlMatches) {
        await chrome.tabs.update(foundTab.id, { url: urls[0] });
      }     

      // 선택된 텍스트를 AI 탭에 삽입하는 스크립트 실행
      await chrome.scripting.executeScript({
        target: { tabId: foundTab.id },
        args: [text, attach],
        function: async (text, attach) => {
          await sleep(1000);

          const contenteditable = document.querySelector('.ProseMirror[contenteditable="true"]');
          if (contenteditable) {
            // 특수문자를 이스케이프하여 사용자가 HTML 태그를 볼 수 있도록 처리
            const escapeHTML = (str) => str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
            // 사용자가 입력한 텍스트를 <p> 태그로 감싸서 HTML로 삽입하되, HTML 태그는 이스케이프 처리
            contenteditable.innerHTML = text
              .split("\n")
              .map((line) => `<p>${escapeHTML(line)}</p>`)
              .join("");
            // 변경 이벤트를 수동으로 발생시킴 (bubbles 옵션을 true로 설정하여 이벤트가 버블링되도록)
            contenteditable.dispatchEvent(new Event("input", { bubbles: true }));
          }
  
          if (!attach) {
            await sleep(1000);
  
            const submitButton = document.querySelector('button[aria-label="Send Message"]');
            if (submitButton) {
              submitButton.click();
            }
          }
        }
      });
    } else {
      // If no ai tab is open, create a new tab
      let newTab = await chrome.tabs.create({ url: url });
  
      // Listen for the tab update to ensure it's fully loaded before interacting with it
      const onUpdated = (tabId, changeInfo) => {
        if (tabId === newTab.id && changeInfo.status === "complete") {
          chrome.scripting.executeScript({
            target: { tabId: newTab.id },
            args: [text, attach],
            function: async (text, attach) => {
              await sleep(1000);
  
              const contenteditable = document.querySelector('.ProseMirror[contenteditable="true"]');
              if (contenteditable) {
                // 특수문자를 이스케이프하여 사용자가 HTML 태그를 볼 수 있도록 처리
                const escapeHTML = (str) => str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
                // 사용자가 입력한 텍스트를 <p> 태그로 감싸서 HTML로 삽입하되, HTML 태그는 이스케이프 처리
                contenteditable.innerHTML = text
                  .split("\n")
                  .map((line) => `<p>${escapeHTML(line)}</p>`)
                  .join("");
                // 변경 이벤트를 수동으로 발생시킴 (bubbles 옵션을 true로 설정하여 이벤트가 버블링되도록)
                contenteditable.dispatchEvent(new Event("input", { bubbles: true }));
              }
  
              if (!attach) {
                await sleep(1000);
  
                const submitButton = document.querySelector('button[aria-label="Send Message"]');
                if (submitButton) {
                  submitButton.click();
                }
              }
            }
          });
  
          // Remove the listener after the tab is updated
          chrome.tabs.onUpdated.removeListener(onUpdated);
        }
      };
      chrome.tabs.onUpdated.addListener(onUpdated);
    }    
  }  
  else if (id == "perplexity") {
    if (foundTab) {
      // 이미 열려 있는 탭을 찾으면 해당 탭을 활성화
      await chrome.windows.update(foundTab.windowId, { focused: true });
      await chrome.tabs.update(foundTab.id, { active: true });
      // 현재 탭의 URL이 urls 배열의 어떤 URL과도 일치하지 않으면 첫 번째 URL로 리로드
      const currentTabUrl = foundTab.url;
      const urlMatches = urls.some(url => {
        if (url.includes('*')) {
          const parts = url.split('*');
          
          if (parts.length === 2) {
            // 기존 로직: 시작과 끝 체크
            const [start, end] = parts;
            return currentTabUrl.startsWith(start) && currentTabUrl.endsWith(end);
          } 
          else if (parts.length === 3) {
            // 첫부분 시작, 중간부분 포함, 마지막부분 끝 체크
            const [start, middle, end] = parts;
            return currentTabUrl.startsWith(start) && 
                   currentTabUrl.includes(middle) && 
                   currentTabUrl.endsWith(end);
          }
        } else {
          // Exact match check if there is no '*'
          return currentTabUrl === url;
        }
      });
      if (!urlMatches) {
        await chrome.tabs.update(foundTab.id, { url: urls[0] });
      }     

      // 선택된 텍스트를 AI 탭에 삽입하는 스크립트 실행
      await chrome.scripting.executeScript({
        target: { tabId: foundTab.id },
        args: [text, attach],
        function: async (text, attach) => {
          await sleep(1000);

          const textarea = document.querySelector('textarea');
          if (textarea) {
            textarea.value = text;
            textarea.dispatchEvent(new Event("input", { bubbles: true }));
          }
  
          if (!attach) {
            await sleep(1000);
  
            const submitButton = document.querySelector('button[aria-label="Submit"]');
            if (submitButton) {
              submitButton.click();
            }
          }
        }
      });
    } else {
      // If no ai tab is open, create a new tab
      let newTab = await chrome.tabs.create({ url: url });
  
      // Listen for the tab update to ensure it's fully loaded before interacting with it
      const onUpdated = (tabId, changeInfo) => {
        if (tabId === newTab.id && changeInfo.status === "complete") {
          chrome.scripting.executeScript({
            target: { tabId: newTab.id },
            args: [text, attach],
            function: async (text, attach) => {
              await sleep(1000);
  
              const textarea = document.querySelector('textarea');
              if (textarea) {
                textarea.value = text;
                textarea.dispatchEvent(new Event("input", { bubbles: true }));
              }
  
              if (!attach) {
                await sleep(1000);
  
                const submitButton = document.querySelector('button[aria-label="Submit"]');
                if (submitButton) {
                  submitButton.click();
                }
              }
            }
          });
  
          // Remove the listener after the tab is updated
          chrome.tabs.onUpdated.removeListener(onUpdated);
        }
      };
      chrome.tabs.onUpdated.addListener(onUpdated);
    }    
  }  
  else if (id == "chathub") {
    if (foundTab) {
      // 이미 열려 있는 탭을 찾으면 해당 탭을 활성화
      await chrome.windows.update(foundTab.windowId, { focused: true });
      await chrome.tabs.update(foundTab.id, { active: true });
      // 현재 탭의 URL이 urls 배열의 어떤 URL과도 일치하지 않으면 첫 번째 URL로 리로드
      const currentTabUrl = foundTab.url;
      const urlMatches = urls.some(url => {
        if (url.includes('*')) {
          const parts = url.split('*');
          
          if (parts.length === 2) {
            // 기존 로직: 시작과 끝 체크
            const [start, end] = parts;
            return currentTabUrl.startsWith(start) && currentTabUrl.endsWith(end);
          } 
          else if (parts.length === 3) {
            // 첫부분 시작, 중간부분 포함, 마지막부분 끝 체크
            const [start, middle, end] = parts;
            return currentTabUrl.startsWith(start) && 
                   currentTabUrl.includes(middle) && 
                   currentTabUrl.endsWith(end);
          }
        } else {
          // Exact match check if there is no '*'
          return currentTabUrl === url;
        }
      });
      if (!urlMatches) {
        await chrome.tabs.update(foundTab.id, { url: urls[0] });
      }     

      // 선택된 텍스트를 AI 탭에 삽입하는 스크립트 실행
      await chrome.scripting.executeScript({
        target: { tabId: foundTab.id },
        args: [text, attach],
        function: async (text, attach) => {
          await sleep(1000);

          const textarea = document.querySelector('textarea[name="input"]');
          if (textarea) {
            textarea.value = text;
            textarea.dispatchEvent(new Event("input", { bubbles: true }));
          }
  
          if (!attach) {
            await sleep(1000);
  
            const submitButton = document.querySelector("form > button");
            if (submitButton) {
              submitButton.click();
            }
          }
        }
      });
    } else {
      // If no ai tab is open, create a new tab
      let newTab = await chrome.tabs.create({ url: url });
  
      // Listen for the tab update to ensure it's fully loaded before interacting with it
      const onUpdated = (tabId, changeInfo) => {
        if (tabId === newTab.id && changeInfo.status === "complete") {
          chrome.scripting.executeScript({
            target: { tabId: newTab.id },
            args: [text, attach],
            function: async (text, attach) => {
              await sleep(1000);
  
              const textarea = document.querySelector('textarea[name="input"]');
              if (textarea) {
                textarea.value = text;
                textarea.dispatchEvent(new Event("input", { bubbles: true }));
              }
  
              if (!attach) {
                await sleep(1000);
  
                const submitButton = document.querySelector("form > button");
                if (submitButton) {
                  submitButton.click();
                }
              }
            }
          });
  
          // Remove the listener after the tab is updated
          chrome.tabs.onUpdated.removeListener(onUpdated);
        }
      };
      chrome.tabs.onUpdated.addListener(onUpdated);
    }    
  }  
  else if (id == "poe") {
    if (foundTab) {
      // 이미 열려 있는 탭을 찾으면 해당 탭을 활성화
      await chrome.windows.update(foundTab.windowId, { focused: true });
      await chrome.tabs.update(foundTab.id, { active: true });
      // 현재 탭의 URL이 urls 배열의 어떤 URL과도 일치하지 않으면 첫 번째 URL로 리로드
      const currentTabUrl = foundTab.url;
      const urlMatches = urls.some(url => {
        if (url.includes('*')) {
          const parts = url.split('*');
          
          if (parts.length === 2) {
            // 기존 로직: 시작과 끝 체크
            const [start, end] = parts;
            return currentTabUrl.startsWith(start) && currentTabUrl.endsWith(end);
          } 
          else if (parts.length === 3) {
            // 첫부분 시작, 중간부분 포함, 마지막부분 끝 체크
            const [start, middle, end] = parts;
            return currentTabUrl.startsWith(start) && 
                   currentTabUrl.includes(middle) && 
                   currentTabUrl.endsWith(end);
          }
        } else {
          // Exact match check if there is no '*'
          return currentTabUrl === url;
        }
      });
      if (!urlMatches) {
        await chrome.tabs.update(foundTab.id, { url: urls[0] });
      }     

      // 선택된 텍스트를 AI 탭에 삽입하는 스크립트 실행
      await chrome.scripting.executeScript({
        target: { tabId: foundTab.id },
        args: [text, attach],
        function: async (text, attach) => {
          await sleep(1000);

          const textarea = document.querySelector("textarea");
          if (textarea) {
            textarea.value = text;
            textarea.dispatchEvent(new Event("input", { bubbles: true }));
          }
  
          if (!attach) {
            await sleep(1000);
  
            const buttons = document.querySelector("textarea").parentElement.parentElement.querySelectorAll("button");
            const submitButton = buttons[buttons.length - 1];
            if (submitButton) {
              submitButton.click();
            }
          }
        }
      });
    } else {
      // If no ai tab is open, create a new tab
      let newTab = await chrome.tabs.create({ url: url });
  
      // Listen for the tab update to ensure it's fully loaded before interacting with it
      const onUpdated = (tabId, changeInfo) => {
        if (tabId === newTab.id && changeInfo.status === "complete") {
          chrome.scripting.executeScript({
            target: { tabId: newTab.id },
            args: [text, attach],
            function: async (text, attach) => {
              await sleep(1000);

              const textarea = document.querySelector("textarea");
              if (textarea) {
                textarea.value = text;
                textarea.dispatchEvent(new Event("input", { bubbles: true }));
              }
  
              if (!attach) {
                await sleep(1000);
  
                const buttons = document.querySelector("textarea").parentElement.parentElement.querySelectorAll("button");
                const submitButton = buttons[buttons.length - 1];
                if (submitButton) {
                  submitButton.click();
                }
              }
            }
          });
  
          // Remove the listener after the tab is updated
          chrome.tabs.onUpdated.removeListener(onUpdated);
        }
      };
      chrome.tabs.onUpdated.addListener(onUpdated);
    }    
  }  
  else if (id == "imagineart") {
    if (foundTab) {
      // 이미 열려 있는 탭을 찾으면 해당 탭을 활성화
      await chrome.windows.update(foundTab.windowId, { focused: true });
      await chrome.tabs.update(foundTab.id, { active: true });
      // 현재 탭의 URL이 urls 배열의 어떤 URL과도 일치하지 않으면 첫 번째 URL로 리로드
      const currentTabUrl = foundTab.url;
      const urlMatches = urls.some(url => {
        if (url.includes('*')) {
          const parts = url.split('*');
          
          if (parts.length === 2) {
            // 기존 로직: 시작과 끝 체크
            const [start, end] = parts;
            return currentTabUrl.startsWith(start) && currentTabUrl.endsWith(end);
          } 
          else if (parts.length === 3) {
            // 첫부분 시작, 중간부분 포함, 마지막부분 끝 체크
            const [start, middle, end] = parts;
            return currentTabUrl.startsWith(start) && 
                   currentTabUrl.includes(middle) && 
                   currentTabUrl.endsWith(end);
          }
        } else {
          // Exact match check if there is no '*'
          return currentTabUrl === url;
        }
      });
      if (!urlMatches) {
        await chrome.tabs.update(foundTab.id, { url: urls[0] });
      }     

      // 선택된 텍스트를 AI 탭에 삽입하는 스크립트 실행
      await chrome.scripting.executeScript({
        target: { tabId: foundTab.id },
        args: [text, attach],
        function: async (text, attach) => {
          await sleep(1000);

          text = text.replace("----------", " ");
  
          const input = document.querySelector('input[name="prompt"]');
          if (input) {
            input.value = text;
            input.dispatchEvent(new Event("input", { bubbles: true }));
          }
  
          if (!attach) {
            await sleep(1000);

            const button = document.querySelector('button[type="submit"]');
            if (button) {
              button.click();
            }
          }
        }
      });
    } else {
      // If no ai tab is open, create a new tab
      let newTab = await chrome.tabs.create({ url: url });
  
      // Listen for the tab update to ensure it's fully loaded before interacting with it
      const onUpdated = (tabId, changeInfo) => {
        if (tabId === newTab.id && changeInfo.status === "complete") {
          chrome.scripting.executeScript({
            target: { tabId: newTab.id },
            args: [text, attach],
            function: async (text, attach) => {
              await sleep(1000);
  
              text = text.replace("----------", " ");
  
              const input = document.querySelector('input[name="prompt"]');
              if (input) {
                input.value = text;
                input.dispatchEvent(new Event("input", { bubbles: true }));
              }
  
              if (!attach) {
                await sleep(1000);

                const button = document.querySelector('button[type="submit"]');
                if (button) {
                  button.click();
                }
              }
            }
          });
  
          // Remove the listener after the tab is updated
          chrome.tabs.onUpdated.removeListener(onUpdated);
        }
      };
      chrome.tabs.onUpdated.addListener(onUpdated);
    }    
  }  
  else if (id == "mixaudio") {
    if (foundTab) {
      // 이미 열려 있는 탭을 찾으면 해당 탭을 활성화
      await chrome.windows.update(foundTab.windowId, { focused: true });
      await chrome.tabs.update(foundTab.id, { active: true });
      // 현재 탭의 URL이 urls 배열의 어떤 URL과도 일치하지 않으면 첫 번째 URL로 리로드
      const currentTabUrl = foundTab.url;
      const urlMatches = urls.some(url => {
        if (url.includes('*')) {
          const parts = url.split('*');
          
          if (parts.length === 2) {
            // 기존 로직: 시작과 끝 체크
            const [start, end] = parts;
            return currentTabUrl.startsWith(start) && currentTabUrl.endsWith(end);
          } 
          else if (parts.length === 3) {
            // 첫부분 시작, 중간부분 포함, 마지막부분 끝 체크
            const [start, middle, end] = parts;
            return currentTabUrl.startsWith(start) && 
                   currentTabUrl.includes(middle) && 
                   currentTabUrl.endsWith(end);
          }
        } else {
          // Exact match check if there is no '*'
          return currentTabUrl === url;
        }
      });
      if (!urlMatches) {
        await chrome.tabs.update(foundTab.id, { url: urls[0] });
      }     

      // 선택된 텍스트를 AI 탭에 삽입하는 스크립트 실행
      await chrome.scripting.executeScript({
        target: { tabId: foundTab.id },
        args: [text, attach],
        function: async (text, attach) => {
          await sleep(1000);

          const textarea = document.querySelector("div#prompt-form > div > div > div > div > div > textarea");
          if (textarea) {
            textarea.value = text;
            textarea.dispatchEvent(new Event("input", { bubbles: true }));
          }
  
          if (!attach) {
            await sleep(1000);

            const button = document.querySelector('div#prompt-form > div > div > div > div > button[type="submit"]');
            if (button) {
              button.click();
            }
          }
        }
      });
    } else {
      // If no ai tab is open, create a new tab
      let newTab = await chrome.tabs.create({ url: url });
  
      // Listen for the tab update to ensure it's fully loaded before interacting with it
      const onUpdated = (tabId, changeInfo)=> {
        if (tabId === newTab.id && changeInfo.status === "complete") {
          chrome.scripting.executeScript({
            target: { tabId: newTab.id },
            args: [text, attach],
            function: async (text, attach) => {
              await sleep(1000);

              const textarea = document.querySelector("div#prompt-form > div > div > div > div > div > textarea");
              if (textarea) {
                textarea.value = text;
                textarea.dispatchEvent(new Event("input", { bubbles: true }));
              }
  
              if (!attach) {
                await sleep(1000);

                const button = document.querySelector('div#prompt-form > div > div > div > div > button[type="submit"]');
                if (button) {
                  button.click();
                }
              }
            }
          });
  
          // Remove the listener after the tab is updated
          chrome.tabs.onUpdated.removeListener(onUpdated);
        }
      };
      chrome.tabs.onUpdated.addListener(onUpdated);
    }    
  }  
  else if (id == "mubert") {
    if (foundTab) {
      // 이미 열려 있는 탭을 찾으면 해당 탭을 활성화
      await chrome.windows.update(foundTab.windowId, { focused: true });
      await chrome.tabs.update(foundTab.id, { active: true });
      // 현재 탭의 URL이 urls 배열의 어떤 URL과도 일치하지 않으면 첫 번째 URL로 리로드
      const currentTabUrl = foundTab.url;
      const urlMatches = urls.some(url => {
        if (url.includes('*')) {
          const parts = url.split('*');
          
          if (parts.length === 2) {
            // 기존 로직: 시작과 끝 체크
            const [start, end] = parts;
            return currentTabUrl.startsWith(start) && currentTabUrl.endsWith(end);
          } 
          else if (parts.length === 3) {
            // 첫부분 시작, 중간부분 포함, 마지막부분 끝 체크
            const [start, middle, end] = parts;
            return currentTabUrl.startsWith(start) && 
                   currentTabUrl.includes(middle) && 
                   currentTabUrl.endsWith(end);
          }
        } else {
          // Exact match check if there is no '*'
          return currentTabUrl === url;
        }
      });
      if (!urlMatches) {
        await chrome.tabs.update(foundTab.id, { url: urls[0] });
      }     

      // 선택된 텍스트를 AI 탭에 삽입하는 스크립트 실행
      await chrome.scripting.executeScript({
        target: { tabId: foundTab.id },
        args: [text, attach],
        function: async (text, attach) => {
          //await sleep(1000);
          await sleep(3000);
  
          const textarea = document.querySelector('div.refined-generate-track-form textarea[name="prompt"]');
          if (textarea) {
            textarea.value = text;
            textarea.dispatchEvent(new Event("input", { bubbles: true }));
          }
  
          if (!attach) {
            await sleep(1000);

            const button = document.querySelector("div.refined-generate-track-form button");
            if (button) {
              button.click();
            }
          }
        }
      });
    } else {
      // If no ai tab is open, create a new tab
      let newTab = await chrome.tabs.create({ url: url });
  
      // Listen for the tab update to ensure it's fully loaded before interacting with it
      const onUpdated = (tabId, changeInfo) => {
        if (tabId === newTab.id && changeInfo.status === "complete") {
          chrome.scripting.executeScript({
            target: { tabId: newTab.id },
            args: [text, attach],
            function: async (text, attach) => {
              //await sleep(1000);
              await sleep(3000);
  
              const textarea = document.querySelector('div.refined-generate-track-form textarea[name="prompt"]');
              if (textarea) {
                textarea.value = text;
                textarea.dispatchEvent(new Event("input", { bubbles: true }));
              }
  
              if (!attach) {
                await sleep(1000);

                const button = document.querySelector("div.refined-generate-track-form button");
                if (button) {
                  button.click();
                }
              }
            }
          });
  
          // Remove the listener after the tab is updated
          chrome.tabs.onUpdated.removeListener(onUpdated);
        }
      };
      chrome.tabs.onUpdated.addListener(onUpdated);
    }    
  }  
  else if (id == "udio") {
    if (foundTab) {
      // 이미 열려 있는 탭을 찾으면 해당 탭을 활성화
      await chrome.windows.update(foundTab.windowId, { focused: true });
      await chrome.tabs.update(foundTab.id, { active: true });
      // 현재 탭의 URL이 urls 배열의 어떤 URL과도 일치하지 않으면 첫 번째 URL로 리로드
      const currentTabUrl = foundTab.url;
      const urlMatches = urls.some(url => {
        if (url.includes('*')) {
          const parts = url.split('*');
          
          if (parts.length === 2) {
            // 기존 로직: 시작과 끝 체크
            const [start, end] = parts;
            return currentTabUrl.startsWith(start) && currentTabUrl.endsWith(end);
          } 
          else if (parts.length === 3) {
            // 첫부분 시작, 중간부분 포함, 마지막부분 끝 체크
            const [start, middle, end] = parts;
            return currentTabUrl.startsWith(start) && 
                   currentTabUrl.includes(middle) && 
                   currentTabUrl.endsWith(end);
          }
        } else {
          // Exact match check if there is no '*'
          return currentTabUrl === url;
        }
      });
      if (!urlMatches) {
        await chrome.tabs.update(foundTab.id, { url: urls[0] });
      }     

      // 선택된 텍스트를 AI 탭에 삽입하는 스크립트 실행
      await chrome.scripting.executeScript({
        target: { tabId: foundTab.id },
        args: [text, attach],
        function: async (text, attach) => {
          await sleep(1000);

          text = text.replace("----------", " ");
  
          const textarea = document.querySelector("input#prompt");
          if (textarea) {
            textarea.value = text;
            textarea.dispatchEvent(new Event("input", { bubbles: true }));
          }
  
          if (!attach) {
            await sleep(1000);

            const buttons = document.querySelectorAll('button');
            for (const button of buttons) {
              if (button.textContent == "Create") {
                button.click();
                break;
              }
            }
          }
        }
      });
    } else {
      // If no ai tab is open, create a new tab
      let newTab = await chrome.tabs.create({ url: url });
  
      // Listen for the tab update to ensure it's fully loaded before interacting with it
      const onUpdated = (tabId, changeInfo)=> {
        if (tabId === newTab.id && changeInfo.status === "complete") {
          chrome.scripting.executeScript({
            target: { tabId: newTab.id },
            args: [text, attach],
            function: async (text, attach) => {
              await sleep(1000);
  
              text = text.replace("----------", " ");
  
              const textarea = document.querySelector("input#prompt");
              if (textarea) {
                textarea.value = text;
                textarea.dispatchEvent(new Event("input", { bubbles: true }));
              }
  
              if (!attach) {
                await sleep(1000);

                const buttons = document.querySelectorAll('button');
                for (const button of buttons) {
                  if (button.textContent == "Create") {
                    button.click();
                    break;
                  }
                }
              }
            }
          });
  
          // Remove the listener after the tab is updated
          chrome.tabs.onUpdated.removeListener(onUpdated);
        }
      };
      chrome.tabs.onUpdated.addListener(onUpdated);
    }    
  }  
  else if (id == "suno") {
    if (foundTab) {
      // 이미 열려 있는 탭을 찾으면 해당 탭을 활성화
      await chrome.windows.update(foundTab.windowId, { focused: true });
      await chrome.tabs.update(foundTab.id, { active: true });
      // 현재 탭의 URL이 urls 배열의 어떤 URL과도 일치하지 않으면 첫 번째 URL로 리로드
      const currentTabUrl = foundTab.url;
      const urlMatches = urls.some(url => {
        if (url.includes('*')) {
          const parts = url.split('*');
          
          if (parts.length === 2) {
            // 기존 로직: 시작과 끝 체크
            const [start, end] = parts;
            return currentTabUrl.startsWith(start) && currentTabUrl.endsWith(end);
          } 
          else if (parts.length === 3) {
            // 첫부분 시작, 중간부분 포함, 마지막부분 끝 체크
            const [start, middle, end] = parts;
            return currentTabUrl.startsWith(start) && 
                   currentTabUrl.includes(middle) && 
                   currentTabUrl.endsWith(end);
          }
        } else {
          // Exact match check if there is no '*'
          return currentTabUrl === url;
        }
      });
      if (!urlMatches) {
        await chrome.tabs.update(foundTab.id, { url: urls[0] });
      }     

      // 선택된 텍스트를 AI 탭에 삽입하는 스크립트 실행
      await chrome.scripting.executeScript({
        target: { tabId: foundTab.id },
        args: [text, attach],
        function: async (text, attach) => {
          await sleep(1000);

          text = text.replace("----------", " ");
  
          const textarea = document.querySelector('textarea[maxlength="200"]');
          if (textarea) {
            textarea.value = text;
            textarea.dispatchEvent(new Event("input", { bubbles: true }));
          }
  
          if (!attach) {
            await sleep(1000);

            const button = document.querySelector('button[aria-label="Create"]');
            if (button) {
              button.click();
            }
          }
        }
      });
    } else {
      // If no ai tab is open, create a new tab
      let newTab = await chrome.tabs.create({ url: url });
  
      // Listen for the tab update to ensure it's fully loaded before interacting with it
      const onUpdated = (tabId, changeInfo) => {
        if (tabId === newTab.id && changeInfo.status === "complete") {
          chrome.scripting.executeScript({
            target: { tabId: newTab.id },
            args: [text, attach],
            function: async (text, attach) => {
              await sleep(1000);
  
              text = text.replace("----------", " ");
  
              const textarea = document.querySelector('textarea[maxlength="200"]');
              if (textarea) {
                textarea.value = text;
                textarea.dispatchEvent(new Event("input", { bubbles: true }));
              }
  
              if (!attach) {
                await sleep(1000);

                const button = document.querySelector('button[aria-label="Create"]');
                if (button) {
                  button.click();
                }
              }
            }
          });
  
          // Remove the listener after the tab is updated
          chrome.tabs.onUpdated.removeListener(onUpdated);
        }
      };
      chrome.tabs.onUpdated.addListener(onUpdated);
    }    
  }  
  else if (id == "minerva") {
    if (foundTab) {
      // 이미 열려 있는 탭을 찾으면 해당 탭을 활성화
      await chrome.windows.update(foundTab.windowId, { focused: true });
      await chrome.tabs.update(foundTab.id, { active: true });
      // 현재 탭의 URL이 urls 배열의 어떤 URL과도 일치하지 않으면 첫 번째 URL로 리로드
      const currentTabUrl = foundTab.url;
      const urlMatches = urls.some(url => {
        if (url.includes('*')) {
          const parts = url.split('*');
          
          if (parts.length === 2) {
            // 기존 로직: 시작과 끝 체크
            const [start, end] = parts;
            return currentTabUrl.startsWith(start) && currentTabUrl.endsWith(end);
          } 
          else if (parts.length === 3) {
            // 첫부분 시작, 중간부분 포함, 마지막부분 끝 체크
            const [start, middle, end] = parts;
            return currentTabUrl.startsWith(start) && 
                   currentTabUrl.includes(middle) && 
                   currentTabUrl.endsWith(end);
          }
        } else {
          // Exact match check if there is no '*'
          return currentTabUrl === url;
        }
      });
      if (!urlMatches) {
        await chrome.tabs.update(foundTab.id, { url: urls[0] });
      }     

      // 선택된 텍스트를 AI 탭에 삽입하는 스크립트 실행
      await chrome.scripting.executeScript({
        target: { tabId: foundTab.id },
        args: [text, attach],
        function: async (text, attach) => {
          await sleep(1000);
          //await sleep(3000);
          
          text = text.replace("----------", " ");
  
          const textarea = document.querySelector('textarea[maxlength="3001"]');
          if (textarea) {
            textarea.value = text;
            textarea.dispatchEvent(new Event("input", { bubbles: true }));
          }
  
          if (!attach) {
            await sleep(1000);
            //await sleep(3000);

            const buttons = document.querySelector('textarea[maxlength="3001"]').parentElement.querySelectorAll("div > div");
            if (buttons.length >= 4) {
              const button = buttons[3];
              button.click();
            }
          }
        }
      });
    } else {
      // If no ai tab is open, create a new tab
      let newTab = await chrome.tabs.create({ url: url });
  
      // Listen for the tab update to ensure it's fully loaded before interacting with it
      const onUpdated = (tabId, changeInfo) => {
        if (tabId === newTab.id && changeInfo.status === "complete") {
          chrome.scripting.executeScript({
            target: { tabId: newTab.id },
            args: [text, attach],
            function: async (text, attach) => {
              await sleep(1000);
              //await sleep(3000);
  
              text = text.replace("----------", " ");
  
              const textarea = document.querySelector('textarea[maxlength="3001"]');
              if (textarea) {
                textarea.value = text;
                textarea.dispatchEvent(new Event("input", { bubbles: true }));
              }
  
              if (!attach) {
                await sleep(1000);
                //await sleep(3000);

                const buttons = document.querySelector('textarea[maxlength="3001"]').parentElement.querySelectorAll("div > div");
                if (buttons.length >= 4) {
                  const button = buttons[3];
                  button.click();
                }
              }
            }
          });
  
          // Remove the listener after the tab is updated
          chrome.tabs.onUpdated.removeListener(onUpdated);
        }
      };
      chrome.tabs.onUpdated.addListener(onUpdated);
    }    
  }  
  else if (id == "kling") {
    if (foundTab) {
      // 이미 열려 있는 탭을 찾으면 해당 탭을 활성화
      await chrome.windows.update(foundTab.windowId, { focused: true });
      await chrome.tabs.update(foundTab.id, { active: true });
      // 현재 탭의 URL이 urls 배열의 어떤 URL과도 일치하지 않으면 첫 번째 URL로 리로드
      const currentTabUrl = foundTab.url;
      const urlMatches = urls.some(url => {
        if (url.includes('*')) {
          const parts = url.split('*');
          
          if (parts.length === 2) {
            // 기존 로직: 시작과 끝 체크
            const [start, end] = parts;
            return currentTabUrl.startsWith(start) && currentTabUrl.endsWith(end);
          } 
          else if (parts.length === 3) {
            // 첫부분 시작, 중간부분 포함, 마지막부분 끝 체크
            const [start, middle, end] = parts;
            return currentTabUrl.startsWith(start) && 
                   currentTabUrl.includes(middle) && 
                   currentTabUrl.endsWith(end);
          }
        } else {
          // Exact match check if there is no '*'
          return currentTabUrl === url;
        }
      });
      if (!urlMatches) {
        await chrome.tabs.update(foundTab.id, { url: urls[0] });
      }     

      // 선택된 텍스트를 AI 탭에 삽입하는 스크립트 실행
      await chrome.scripting.executeScript({
        target: { tabId: foundTab.id },
        args: [text, attach],
        function: async (text, attach) => {
          await sleep(1000);

          text = text.replace("----------", " ");
  
          const textarea = document.querySelector('textarea[maxlength="2500"]');
          if (textarea) {
            textarea.value = text;
            textarea.dispatchEvent(new Event("input", { bubbles: true }));
          }
  
          if (!attach) {
            await sleep(1000);

            const button = document.querySelector("div.bottom button");
            if (button) {
              button.click();
            }
          }
        }
      });
    } else {
      // If no ai tab is open, create a new tab
      let newTab = await chrome.tabs.create({ url: url });
  
      // Listen for the tab update to ensure it's fully loaded before interacting with it
      const onUpdated = (tabId, changeInfo) => {
        if (tabId === newTab.id && changeInfo.status === "complete") {
          chrome.scripting.executeScript({
            target: { tabId: newTab.id },
            args: [text, attach],
            function: async (text, attach) => {
              await sleep(1000);

              text = text.replace("----------", " ");
  
              const textarea = document.querySelector('textarea[maxlength="2500"]');
              if (textarea) {
                textarea.value = text;
                textarea.dispatchEvent(new Event("input", { bubbles: true }));
              }
  
              if (!attach) {
                await sleep(1000);

                const button = document.querySelector("div.bottom button");
                if (button) {
                  button.click();
                }
              }
            }
          });
  
          // Remove the listener after the tab is updated
          chrome.tabs.onUpdated.removeListener(onUpdated);
        }
      };
      chrome.tabs.onUpdated.addListener(onUpdated);
    }    
  }  
  else if (id == "invideo") {
    if (foundTab) {
      // 이미 열려 있는 탭을 찾으면 해당 탭을 활성화
      await chrome.windows.update(foundTab.windowId, { focused: true });
      await chrome.tabs.update(foundTab.id, { active: true });
      // 현재 탭의 URL이 urls 배열의 어떤 URL과도 일치하지 않으면 첫 번째 URL로 리로드
      const currentTabUrl = foundTab.url;
      const urlMatches = urls.some(url => {
        if (url.includes('*')) {
          const parts = url.split('*');
          
          if (parts.length === 2) {
            // 기존 로직: 시작과 끝 체크
            const [start, end] = parts;
            return currentTabUrl.startsWith(start) && currentTabUrl.endsWith(end);
          } 
          else if (parts.length === 3) {
            // 첫부분 시작, 중간부분 포함, 마지막부분 끝 체크
            const [start, middle, end] = parts;
            return currentTabUrl.startsWith(start) && 
                   currentTabUrl.includes(middle) && 
                   currentTabUrl.endsWith(end);
          }
        } else {
          // Exact match check if there is no '*'
          return currentTabUrl === url;
        }
      });
      if (!urlMatches) {
        await chrome.tabs.update(foundTab.id, { url: urls[0] });
      }     

      // 선택된 텍스트를 AI 탭에 삽입하는 스크립트 실행
      await chrome.scripting.executeScript({
        target: { tabId: foundTab.id },
        args: [text, attach],
        function: async (text, attach) => {
          await sleep(1000);

          const textarea = document.querySelector('textarea[name="brief"]');
          if (textarea) {
            textarea.value = text;
            textarea.dispatchEvent(new Event("input", { bubbles: true }));
          }
  
          if (!attach) {
            await sleep(1000);

            const button = textarea.parentElement.parentElement.querySelector('button');
            if (button) {
              button.click();
            }
          }
        }
      });
    } else {
      // If no ai tab is open, create a new tab
      let newTab = await chrome.tabs.create({ url: url });
  
      // Listen for the tab update to ensure it's fully loaded before interacting with it
      const onUpdated = (tabId, changeInfo) => {
        if (tabId === newTab.id && changeInfo.status === "complete") {
          chrome.scripting.executeScript({
            target: { tabId: newTab.id },
            args: [text, attach],
            function: async (text, attach) => {
              //await sleep(1000);
              await sleep(3000);

              const textarea = document.querySelector('textarea[name="brief"]');
              if (textarea) {
                textarea.value = text;
                textarea.dispatchEvent(new Event("input", { bubbles: true }));
              }
      
              if (!attach) {
                await sleep(1000);
    
                const button = textarea.parentElement.parentElement.querySelector('button');
                if (button) {
                  button.click();
                }
              }
            }
          });
  
          // Remove the listener after the tab is updated
          chrome.tabs.onUpdated.removeListener(onUpdated);
        }
      };
      chrome.tabs.onUpdated.addListener(onUpdated);
    }    
  }  
  else if (id == "krea") {
    if (foundTab) {
      // 이미 열려 있는 탭을 찾으면 해당 탭을 활성화
      await chrome.windows.update(foundTab.windowId, { focused: true });
      await chrome.tabs.update(foundTab.id, { active: true });
      // 현재 탭의 URL이 urls 배열의 어떤 URL과도 일치하지 않으면 첫 번째 URL로 리로드
      const currentTabUrl = foundTab.url;
      const urlMatches = urls.some(url => {
        if (url.includes('*')) {
          const parts = url.split('*');
          
          if (parts.length === 2) {
            // 기존 로직: 시작과 끝 체크
            const [start, end] = parts;
            return currentTabUrl.startsWith(start) && currentTabUrl.endsWith(end);
          } 
          else if (parts.length === 3) {
            // 첫부분 시작, 중간부분 포함, 마지막부분 끝 체크
            const [start, middle, end] = parts;
            return currentTabUrl.startsWith(start) && 
                   currentTabUrl.includes(middle) && 
                   currentTabUrl.endsWith(end);
          }
        } else {
          // Exact match check if there is no '*'
          return currentTabUrl === url;
        }
      });
      if (!urlMatches) {
        await chrome.tabs.update(foundTab.id, { url: urls[0] });
      }     

      // 선택된 텍스트를 AI 탭에 삽입하는 스크립트 실행
      await chrome.scripting.executeScript({
        target: { tabId: foundTab.id },
        args: [text, attach],
        function: async (text, attach) => {
          await sleep(1000);

          const textarea = document.querySelector('textarea#prompt');
          if (textarea) {
            textarea.value = text;
            textarea.dispatchEvent(new Event("input", { bubbles: true }));
          }
  
          if (!attach) {
            await sleep(1000);

            const button = textarea.parentElement.querySelector('button');
            if (button) {
              button.click();
            }
          }
        }
      });
    } else {
      // If no ai tab is open, create a new tab
      let newTab = await chrome.tabs.create({ url: url });
  
      // Listen for the tab update to ensure it's fully loaded before interacting with it
      const onUpdated = (tabId, changeInfo) => {
        if (tabId === newTab.id && changeInfo.status === "complete") {
          chrome.scripting.executeScript({
            target: { tabId: newTab.id },
            args: [text, attach],
            function: async (text, attach) => {
              await sleep(1000);

              const textarea = document.querySelector('textarea#prompt');
              if (textarea) {
                textarea.value = text;
                textarea.dispatchEvent(new Event("input", { bubbles: true }));
              }
      
              if (!attach) {
                await sleep(1000);
    
                const button = textarea.parentElement.querySelector('button');
                if (button) {
                  button.click();
                }
              }
            }
          });
  
          // Remove the listener after the tab is updated
          chrome.tabs.onUpdated.removeListener(onUpdated);
        }
      };
      chrome.tabs.onUpdated.addListener(onUpdated);
    }    
  }    
  else if (id == "gamma") {
    if (foundTab) {
      // 이미 열려 있는 탭을 찾으면 해당 탭을 활성화
      await chrome.windows.update(foundTab.windowId, { focused: true });
      await chrome.tabs.update(foundTab.id, { active: true });
      // 현재 탭의 URL이 urls 배열의 어떤 URL과도 일치하지 않으면 첫 번째 URL로 리로드
      const currentTabUrl = foundTab.url;
      const urlMatches = urls.some(url => {
        if (url.includes('*')) {
          const parts = url.split('*');
          
          if (parts.length === 2) {
            // 기존 로직: 시작과 끝 체크
            const [start, end] = parts;
            return currentTabUrl.startsWith(start) && currentTabUrl.endsWith(end);
          } 
          else if (parts.length === 3) {
            // 첫부분 시작, 중간부분 포함, 마지막부분 끝 체크
            const [start, middle, end] = parts;
            return currentTabUrl.startsWith(start) && 
                   currentTabUrl.includes(middle) && 
                   currentTabUrl.endsWith(end);
          }
        } else {
          // Exact match check if there is no '*'
          return currentTabUrl === url;
        }
      });
      if (!urlMatches) {
        await chrome.tabs.update(foundTab.id, { url: urls[0] });
      }     

      // 선택된 텍스트를 AI 탭에 삽입하는 스크립트 실행
      await chrome.scripting.executeScript({
        target: { tabId: foundTab.id },
        args: [text, attach],
        function: async (text, attach) => {
          await sleep(1000);

          text = text.replace("----------", " ");
  
          const textarea = document.querySelector("textarea");
          if (textarea) {
            textarea.value = text;
            textarea.dispatchEvent(new Event("input", { bubbles: true }));
          }
  
          if (!attach) {
            await sleep(1000);

            const buttons = document.querySelector("textarea").parentElement.parentElement.querySelectorAll("button");
            const button = buttons[buttons.length - 1];
            if (button) {
              button.click();
            }
          }
        }
      });
    } else {
      // If no ai tab is open, create a new tab
      let newTab = await chrome.tabs.create({ url: url });
  
      // Listen for the tab update to ensure it's fully loaded before interacting with it
      const onUpdated = (tabId, changeInfo) => {
        if (tabId === newTab.id && changeInfo.status === "complete") {
          chrome.scripting.executeScript({
            target: { tabId: newTab.id },
            args: [text, attach],
            function: async (text, attach) => {
              await sleep(1000);

              text = text.replace("----------", " ");
  
              const textarea = document.querySelector("textarea");
              if (textarea) {
                textarea.value = text;
                textarea.dispatchEvent(new Event("input", { bubbles: true }));
              }
  
              if (!attach) {
                await sleep(1000);

                const buttons = document.querySelector("textarea").parentElement.parentElement.querySelectorAll("button");
                const button = buttons[buttons.length - 1];
                if (button) {
                  button.click();
                }
              }
            }
          });
  
          // Remove the listener after the tab is updated
          chrome.tabs.onUpdated.removeListener(onUpdated);
        }
      };
      chrome.tabs.onUpdated.addListener(onUpdated);
    }    
  } 
  else {
    if (foundTab) {
      // 이미 열려 있는 탭을 찾으면 해당 탭을 활성화
      await chrome.windows.update(foundTab.windowId, { focused: true });
      await chrome.tabs.update(foundTab.id, { active: true });
      // 현재 탭의 URL이 urls 배열의 어떤 URL과도 일치하지 않으면 첫 번째 URL로 리로드
      const currentTabUrl = foundTab.url;
      const urlMatches = urls.some(url => {
        if (url.includes('*')) {
          const parts = url.split('*');
          
          if (parts.length === 2) {
            // 기존 로직: 시작과 끝 체크
            const [start, end] = parts;
            return currentTabUrl.startsWith(start) && currentTabUrl.endsWith(end);
          } 
          else if (parts.length === 3) {
            // 첫부분 시작, 중간부분 포함, 마지막부분 끝 체크
            const [start, middle, end] = parts;
            return currentTabUrl.startsWith(start) && 
                   currentTabUrl.includes(middle) && 
                   currentTabUrl.endsWith(end);
          }
        } else {
          // Exact match check if there is no '*'
          return currentTabUrl === url;
        }
      });
      if (!urlMatches) {
        await chrome.tabs.update(foundTab.id, { url: urls[0] });
      }      

      // 선택된 텍스트를 AI 탭에 삽입하는 스크립트 실행
      await chrome.scripting.executeScript({
        target: { tabId: foundTab.id },
        args: [text, attach],
        function: async (text, attach) => {
          //await sleep(1000);
          
        }
      });
    } else {
      // If no ai tab is open, create a new tab
      let newTab = await chrome.tabs.create({ url: url });
  
      // Listen for the tab update to ensure it's fully loaded before interacting with it
      const onUpdated = (tabId, changeInfo) => {
        if (tabId === newTab.id && changeInfo.status === "complete") {
          chrome.scripting.executeScript({
            target: { tabId: newTab.id },
            args: [text, attach],
            function: async (text, attach) => {
              //await sleep(1000);
              
            }
          });
  
          // Remove the listener after the tab is updated
          chrome.tabs.onUpdated.removeListener(onUpdated);
        }
      };
      chrome.tabs.onUpdated.addListener(onUpdated);
    }    
  }  
}
