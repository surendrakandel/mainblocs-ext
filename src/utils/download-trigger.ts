async function makeOverLayVisible() {
    try{
            // 1. Get the first child of the body that was created when extension is run on the page for the first time
        const overlay = document.body.firstChild as HTMLElement;
        document.body.style.overflowY = "scroll"
        if(overlay && overlay?.style != undefined || overlay?.style != null){
            overlay.style.height = "100vh";
            overlay.style.position = "absolute";
            overlay.style.top = "0px";
            overlay.style.left = "0px";
            overlay.style.width = "100vw";
            overlay.style.zIndex = "1000"
            overlay.style.backgroundColor = "white";
            let notionPage = document.getElementById("notion-app")
            console.log("notion page", notionPage)
            if(notionPage){
                notionPage.style.zIndex =  "100"
            }
        }

        // 3. Create the spinning circle
        const spinner = document.createElement('div');
        spinner.style.width = '100px';
        spinner.style.height = '100px';
        spinner.style.borderRadius = '50%';  // Makes it a circle
        spinner.style.border = '5px solid transparent';  // Transparent border
        spinner.style.borderTopColor = 'green';  // Top border is green
        spinner.style.animation = 'spin 1s linear infinite';  // Spinning animation
        spinner.style.position = 'absolute';
        spinner.style.top = '50%';
        spinner.style.left = '50%';
        spinner.style.transform = 'translate(-50%, -50%)';  // Centers the circle

        // 4. Add spinning animation
        const style = document.createElement('style');
        style.innerHTML = `
        @keyframes spin {
            0% { transform: translate(-50%, -50%) rotate(0deg); }
            100% { transform: translate(-50%, -50%) rotate(360deg); }
        }
        `;
        document.head.appendChild(style);

        // 5. Append the spinner to the first child
        overlay.appendChild(spinner);
        // 6. create another element for text publishing
        const text = document.createElement("div")
        text.style.position = "absolute"
        text.style.top = "50%"
        text.style.left = "50%"
        text.style.transform = "translate(-50%, -50%)"
        text.style.fontSize = "20px"
        text.style.fontWeight = "bold"
        text.style.marginTop = "80px"
        text.style.color = "green"
        text.textContent = "Publishing..."
        overlay.appendChild(text)

    }catch(e){
        throw "Error in makeOverLayVisible"
    }
    return 
}
async function resetOverlay() {
    const overlay = document.body.firstChild as HTMLElement;
    overlay.style.height = "0px";
    overlay.style.zIndex = "0";
    let notionPage = document.getElementById("notion-app")
    if(notionPage){
        notionPage.style.display =  "block"
    }
    // remove all the children of the overlay
    while (overlay.firstChild) {
        overlay.removeChild(overlay.firstChild);
    }
}
function delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
}
async function clickOnMenu(): Promise<void> {
    let count = 0;
    while (count < 10) {
       let menuButton =  document.getElementsByTagName("header")[0].querySelector("div .notion-topbar-more-button")
        if (menuButton && menuButton instanceof HTMLElement) {
            menuButton.click();
            return;
        }
        await delay(200);
        count++;
    }
    throw new Error("Could not find main menu");
}
async function clickOnExportOnMainMenu(){
    let count = 0;
    while(count < 10){
        let divs = document.querySelectorAll("div[role='menuitem']");
        for(let div of divs){
            if(div?.textContent?.includes("Export")){
                await delay(200);
                // @ts-ignore
                div.click();
                return;
            }
        }
        await delay(200);
        count++;
    }
    throw new Error("Could not find Export on main menu");
}
async function choseHTML(){
    function clickOutsideDropdown() {
        // Simulate a click on the document body
        document.body.click();
    }
    
    function clickElementWithText(elementType, text) {
        const xPath = `//${elementType}[contains(translate(text(), 'HTML', 'html'), 'html')]`;
        const elements = document.evaluate(xPath, document, null, XPathResult.ANY_TYPE, null);
        const foundElement = elements.iterateNext();
    
        if (foundElement) {
            foundElement.click();
            return true;
        }
    
        return false;
    }
    
    function waitForDialogAndClickHtml() {
        // Use MutationObserver to wait for the appearance of the dialog
        const observer = new MutationObserver((mutationsList, observer) => {
            for(let mutation of mutationsList) {
                if (mutation.type === 'childList') {
                    if (clickElementWithText('div', 'html')) {
                        setTimeout(() => {
                            clickOutsideDropdown();  // Click outside after clicking on the 'html' option
                        }, 500);  // Give it a small delay to ensure the dropdown reacts to the previous click
                        observer.disconnect(); // Stop observing once our action is complete
                    }
                }
            }
        });
    
        observer.observe(document.body, { childList: true, subtree: true });
    
        // Trigger the action by clicking the initial button
        clickElementWithText('div', 'markdown & csv');
    }
    
    waitForDialogAndClickHtml();
    
}
async function clickOnExport(){
    let count = 0
    while(count < 10){
        const divs = document.querySelectorAll("div[role='button']");
        for(let div of divs){
            if(div?.textContent?.includes("Export")){
                await delay(200);
                // @ts-ignore
                div.click();
                return;
            }
        }
        await delay(200);
        count++;
    }
    throw new Error("Could not find Export on export menu");
   
}

export async function downloadCurrentPage(){
    try{
        await makeOverLayVisible();
        await clickOnMenu();
        await clickOnExportOnMainMenu();
        await choseHTML();
        await clickOnExport();
        await resetOverlay();
    }catch(e){
        throw e;
    }
}

// async function checkMainBlocInConnection(){
//     let count = 0;
//     while (count < 10) {
//         const menuItems = document.querySelectorAll('div[role="menuitem"] div');
//         if (menuItems) {
//             for (let menuItem of menuItems) {
//                 if (menuItem.textContent?.toLocaleLowerCase() === "mainbloc") {
//                     return true;
//                 }
//             }
//         }
//         await delay(200);
//         count++;
//     }
//     return false;
// }

// async function clickOnAddConnection(): Promise<void> {
//     let count = 0;
//     while (count < 10) {
//         const menuDiv = document.querySelector('div[role="menu"]');
//         if (menuDiv) {
//             const menuItems = menuDiv.querySelectorAll('div[role="menuitem"]');
//             for (let menuItem of menuItems) {
//                 if (menuItem.textContent?.toLocaleLowerCase() === "add connections") {
//                     (menuItem as HTMLElement).click();
//                     return;
//                 }
//             }
//         }
//         await delay(200);
//         count++;
//     }
//     throw new Error("Could not find add connection");
// }

// async function clickOnMainBloc(): Promise<void> {
//     let count = 0;
//     while (count < 10) {
//         const parentElement = document.querySelectorAll("div[role='menuitem'] div");
//         for (let element of parentElement) {
//             if (element.textContent?.toLocaleLowerCase() === "mainbloc" && element instanceof HTMLElement) {
//                 debugger
//                 element.click();
//                 return;
//             }
//         }
//         await delay(200);
//         count++;
//     }
//     throw new Error("Could not find mainbloc");
// }
// async function clickOnMenu(): Promise<void> {
//     let count = 0;
//     while (count < 10) {
//        let menuButton =  document.getElementsByTagName("header")[0].querySelector("div .notion-topbar-more-button")
//         if (menuButton && menuButton instanceof HTMLElement) {
//             menuButton.click();
//             return;
//         }
//         await delay(50);
//         count++;
//     }
//     throw new Error("Could not find mainbloc");
// }
// async function clickOnConfirm(): Promise<void> {
//     let count = 0;
//     while (count < 10) {
//         const container = document.querySelectorAll('.notion-overlay-container div[role="button"]');
//         for (let element of container) {
//             if (element.textContent?.toLocaleLowerCase() === "confirm" && element instanceof HTMLElement) {
//                 element.click();
//                 return;
//             }
//         }
//         await delay(200);
//         count++;
//     }
//     throw new Error("Could not find confirm");
// }

