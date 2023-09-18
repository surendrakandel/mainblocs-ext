import { writable } from "svelte/store";
export let layoutStore = writable({
    openMenu: false,
    cloudflareDeploymentUrl: "",
    customDomain: "",
    cloudflareGlobalApiToken: "",
    current_blog_info:{
        title: "Blog",
        description: "Blog description",
        slug: "blog",
        href: "/blog",
        content: "Blog content",
        id: "",
        image: "",
        file_token: "",
        file_url: "",
    },
    tabs:["setting", "publish", "profile"],
    currentTab: "setting",
    userSettings:{
        notionToken :"",
    },
    fetchingZipFile: false,
    fileCookie: "",
    fileUrl: "",
},
);
export function toggleMenu() {
    layoutStore.update((store) => {
        return {
            ...store,
            openMenu: !store.openMenu,
        };
    });
}
// @ts-ignore
export function setCurrentActiveTab(tab) {
    layoutStore.update((store) => {
        return {
            ...store,
            openMenu: false,
            currentTab: tab,
        };
    });
}


