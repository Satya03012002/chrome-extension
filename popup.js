document.getElementById("btm").addEventListener("click", onClickReminder);

function onClickReminder(){
    const value = (document.getElementById("inputid").value);
    console.log(value)
    document.getElementById("header").innerHTML = value

    // (async () => {
    //     const [tab] = await chrome.tabs.query({active: true, lastFocusedWindow: true});
    //     const response = await chrome.tabs.sendMessage(tab.id, {greeting: "hello"});
    //     // do something with response here, not outside the function
    //     console.log(response);
    //   })();



}


    (async () => {
        const [tab] = await chrome.tabs.query({active: true, lastFocusedWindow: true});
        const response = await chrome.tabs.sendMessage(tab.id, {greeting: "hello"});
        // do something with response here, not outside the function
        console.log(response);
        console.log("hello");
      })();




const managetab = async()=>{


    const tabs =  await chrome.tabs.query({
        url: [
          "https://developer.chrome.com/docs/webstore/*",
          "https://developer.chrome.com/docs/extensions/*",
        ],
      });
    
    const collator = new Intl.Collator();
    tabs.sort((a, b) => collator.compare(a.title, b.title));
    
    const template = document.getElementById("li_template");
    const elements = new Set();
    for (const tab of tabs) {
      const element = template.content.firstElementChild.cloneNode(true);
    
      const title = tab.title.split("-")[0].trim();
      const pathname = new URL(tab.url).pathname.slice("/docs".length);
    
      element.querySelector(".title").textContent = title;
      element.querySelector(".pathname").textContent = pathname;
      element.querySelector("a").addEventListener("click", async () => {
        // need to focus window as well as the active tab
        await chrome.tabs.update(tab.id, { active: true });
        await chrome.windows.update(tab.windowId, { focused: true });
      });
    
      elements.add(element);
    }
    document.querySelector("ul").append(...elements);
    
    const button = document.getElementById("butn");
    button.addEventListener("click", async () => {
      const tabIds = tabs.map(({ id }) => id);
      const group = await chrome.tabs.group({ tabIds });
      await chrome.tabGroups.update(group, { title: "DOCS" });
    });
}

managetab()



//#############





