import Popup from '../../src/components/Popup.svelte';
import "../app.css"
const target = document.getElementById('app');

async function render() {
    let storage =  chrome.storage.sync
    if(target){
        new Popup({ target, props:{store: storage}});
    }
   
}

document.addEventListener('DOMContentLoaded', render);
