export function createPlaceHolderDiv(){
    const div = document.createElement("div")
    div.style.height = "0px"
    div.style.width = "100vw"
    div.style.top = "0px"
    div.style.left = "0px"
    div.setAttribute("id", "mainblocsOverLay")
    document.body.insertBefore(div, document.body.firstChild)
}