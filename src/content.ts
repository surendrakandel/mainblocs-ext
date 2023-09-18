import { get } from "svelte/store";
import { layoutStore } from "./components";
import { actionType, type commandType } from "./types"
import { createComments } from "./utils/comments";
import { downloadCurrentPage } from "./utils/download-trigger";
import { createPlaceHolderDiv } from "./utils/mainblocs-placeholder";

if( document.body && !document.getElementById("mainblocsOverLay")){
    createPlaceHolderDiv();
}
if(chrome.runtime){
    chrome.runtime.onMessage.addListener((command:commandType, sender, sendResponse) => {
        try{
            if(command.message == actionType.downloadBlogPage){
                createComments();
                downloadCurrentPage();
            }
                
        }catch(e:any){
            alert(`Error in publishing ${e.message}`)
        }
    })
}else{
    console.log("chrome.runtime is not defined")
}




