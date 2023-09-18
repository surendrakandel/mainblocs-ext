export let tokens:Record<string,string>= {}
chrome.cookies.getAll({domain: '.notion.so',path:"/f", secure:true}, function(cookie) {
    if (cookie) {
        console.log("cookie start value for /f", cookie)
        for(let i = 0; i < cookie.length; i++){
            tokens[cookie[i].name] = cookie[i].value
        }
    } else {
        console.log('Cookie not found');
    }
});
chrome.cookies.getAll({domain: '.notion.so'}, function(cookie) {
    if (cookie) {
        console.log("cookie start value for public", cookie)
        for(let i = 0; i < cookie.length; i++){
            tokens[cookie[i].name] = cookie[i].value
        }
    } else {
        console.log('Cookie not found');
    }
});
// don't start tracking immendiatly it causes to many renders
setTimeout(() => {
    chrome.cookies.onChanged.addListener(function (changeInfo) {
        if(changeInfo.cookie)
        tokens[changeInfo.cookie.name] = changeInfo.cookie.value
        chrome.cookies.getAll({domain: '.notion.so',path:"/f", secure:true}, function(cookie) {
            if (cookie) {
                console.log("cookies changed all for /f publish events", cookie)
            } else {
                console.log('Cookie not found');
            }
        })
    })
    chrome.cookies.onChanged.addListener(function (changeInfo) {
        tokens[changeInfo.cookie.name] = changeInfo.cookie.value
        chrome.cookies.getAll({domain: '.notion.so'}, function(cookie) {
            if (cookie) {
                console.log("cookies changed all for publish events", cookie)
            } else {
                console.log('Cookie not found');
            }
        })
    })
}, 30000)

export function getFileToken():string{
    return tokens["file_token"] || ""
}