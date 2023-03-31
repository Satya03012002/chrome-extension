chrome.runtime.onInstalled.addListener(() => {
    console.log("hello")

    //receiving a message
    chrome.runtime.onMessage.addListener(
        function(request, sender, sendResponse) {
        console.log(sender.tab ?
                    "from a content script:" + sender.tab.url :
                    "from the extension");
        if (request.greeting === "hello")
            sendResponse({farewell: "goodbye"});
        }
    );

    //create context menu
    chrome.contextMenus.create({
        id: "parent",
        title: "Search for: \"%s\" ", 
        contexts: ["all"], 
    })

    chrome.contextMenus.create({
        id : "nested context menu1",
        title: "ScreenShot",
        parentId: "parent",
        contexts:["all"],
        // onclick: function(info, tab) {
        //   console.log("hello")
        // }
        
      });
      
      chrome.contextMenus.create({
        id : "nested context menu2",
        title: "ScreenRecording",
        parentId: "parent",
        contexts:["all"],
       
      });
});

//listener for context menu
chrome.contextMenus.onClicked.addListener(function(info, tab){
    //the URL that will be added to based on the selection
    // baseURL = "http://en.wikipedia.org/wiki/";
    // var newURL = baseURL + info.selectionText;
    // //create the new URL in the user's browser
    // chrome.tabs.create({ url: newURL });

    chrome.contextMenus.create({
        title: "ScreenShot",
        parentId: "parent",
        contexts:["all"],
        
      });
      
      chrome.contextMenus.create({
        title: "ScreenRecording",
        parentId: "parent",
        contexts:["all"],
       
      });
})