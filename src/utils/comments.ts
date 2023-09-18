import { layoutStore } from "../components/index";
export let comments:Record<string,string> = {};
export function getComments():Record<string,string>{
    return comments;
}
export  function createComments(){
    console.log("creating comments")
    if(document){
        let commentsDiv = document.querySelectorAll(".notion-page-view-discussion div [spellcheck='true']")
        for(let i = 0; i < commentsDiv.length; i++){
            // get text content of each div
            let commentText = commentsDiv[i].textContent;
            // get first instance of "-"
            if(!commentText || !commentText.includes("-")){
                continue;
            }
            commentText = commentText?.trim();
            let trimIndex = commentText?.indexOf("-")
            let commentName = commentText?.substring(0, trimIndex).toLocaleLowerCase().trim()
            let commentValue = commentText?.substring(trimIndex + 1).toLocaleLowerCase().trim()
                comments[commentName] = commentValue
        }
         // get the id 32 character id at the end of the url after last instance of "-"
    let url = window.location.href;
    debugger
    let id = url.split("-").pop() ?? "";
    comments["id"] = id;
    chrome.storage.sync.set({comments:JSON.stringify(comments)}).then(() => {
        console.log("comments saved", comments)
        return comments;
    })

    }else{
        console.log("document is not defined")
        return 
    }
    
}