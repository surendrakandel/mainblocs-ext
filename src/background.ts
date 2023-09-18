
import { get } from "svelte/store";
import { getFileToken } from "./utils/tokens";
import { layoutStore } from "./components";
import { getComments } from "./utils/comments";


export interface BlogCreateData {
  blog_info:  Record<string,string>,
  file_token: string,
  file_url: string,
  pass_phrase: string,
}

export async function postBlogCreate(data:BlogCreateData){
 try{
  let res = await fetch("https://www.mainblocs.com/api/blog", 
      {
          "headers": {
             "Content-Type": "application/json",
          },
          "referrer": "https://www.notion.so/",
          "referrerPolicy": "strict-origin-when-cross-origin",
          "body": JSON.stringify(data),
          "method": "POST",
          "mode": "cors",
          "credentials": "include"
      })
  let resData = await res.json()
  console.log("res data is", resData)
 }catch(error){
       console.log("error is", error)
       throw error
 }

}

chrome.runtime.onInstalled.addListener(() => {
  console.log("Extension installed!")   
})
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log("Message received! in background script", message)
 })  


chrome.webRequest.onBeforeRequest.addListener(
  function(details) {
    let fetchingZipFile = get(layoutStore).fetchingZipFile
      if(!fetchingZipFile){
        try{
          if (details.url.endsWith('.zip')) {
            let file_token = getFileToken()
            let file_url = details.url
            chrome.storage.sync.get("comments").then((res) => {
              console.log("comments got back from store", res)
               let comments = res.comments
                console.log("comments are", comments)
                let commennts = JSON.parse(comments)
                console.log("creating blog post file token is", file_token, "file url is", file_url, "blog info is", comments)
                postBlogCreate({blog_info:commennts, file_token, file_url, pass_phrase:""}).then((res) => {
                  console.log("res is", res)
                }).catch((error) => {
                  console.log("error is", error)
                })

            }).catch((error) => {
              console.log("error is", error)
            })
           
        }
      
        }catch(e:any){
          console.log("error is", e.message)
        }
        return {cancel: true};
      }
  },
  {urls: ["*://file.notion.so/*"]}, 
);

