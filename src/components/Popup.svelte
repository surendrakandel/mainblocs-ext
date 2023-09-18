<script lang="ts">
  import { fade } from 'svelte/transition'
  import { layoutStore, setCurrentActiveTab, toggleMenu } from './index'
  import { actionType } from '../../src/types'
  import { onMount } from 'svelte'

  export let store: chrome.storage.StorageArea
  function createBlog() {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      if (tabs.length > 0 && tabs[0]?.id) {
        chrome.tabs.sendMessage(tabs[0]?.id, {
          message: actionType.downloadBlogPage,
        })
      }
    })

    // chrome.runtime.sendMessage({ postBlog: 'postBlog' }, function (response) {
    //   console.log('response', response)
    // })
  }
  onMount(() => {
    store.get('store', (result) => {
      let store = result.store
      if (store?.length > 0) {
        result = JSON.parse(result.store)
        console.log('storage vlaue of result is', result)
        // @ts-ignore
        layoutStore.set(result)
      }
    })
  })
  async function updateSettings() {
    try {
      await store.set({
        store: JSON.stringify($layoutStore),
      })
    } catch (error) {
      console.log(error)
    }
  }
</script>

<!-- {#if $layoutStore.openMenu}
  <div
    class="fixed inset-0 bg-black opacity-50 top-[80px] z-[102]"
    transition:fade />
{/if} -->
<div class="min-w-[360px] min-h-[450px] max-w-[360px]">
  <div
    class="popHeader w-full px-3 flex justify-center items-center bg-gray-100
    py-2">
    <div class="w-[100px] h-16">
      <img src="/icons/logo.svg" alt="logo" class="w-full h-full" />
    </div>
    <!-- <button on:click={toggleMenu}>
      <img src="/icons/menu.svg" alt="menu" class="w-6 h-6" />
    </button> -->
  </div>
  <div class="flex flex-col relative h-full w-[85%] mx-auto">
    {#if $layoutStore.currentTab === 'setting'}
      <div
        class="flex flex-col w-full mt-3 absolute top-0 left-0 z-[100]"
        transition:fade>
        <div class="blockGroup">
          <label for="blogId">Cloudlare Deployment URL</label>
          <input
            class=""
            bind:value={$layoutStore.cloudflareDeploymentUrl}
            type="text"
            name="blogId"
            id="blogId"
            placeholder="*.pages.dev" />
        </div>
        <!-- <div class="blockGroup">
          <label for="slug">Notion Integration Token</label>

          <input
            bind:value={$layoutStore.userSettings.notionToken}
            on:change={updateSettings}
            type="text"
            name="slug"
            id="slug"
            class=""
            placeholder="15137e82c6ad4749acd75e17ce5cf20d" />

        </div> -->
        <!-- <div class="blockGroup">
          <label for="slug">Notion file cookie</label>

          <input
            bind:value={$layoutStore.fileCookie}
            type="text"
            name="slug"
            id="slug"
            placeholder="15137e82c6ad4749acd75e17ce5cf20d" />

        </div> -->
        <!-- <div class="blockGroup">
          <label for="slug">Cloudflare API Path</label>
          <input
            bind:value={$layoutStore.current_blog_info.title}
            type="text"
            name="slug"
            id="slug"
            placeholder="15137e82c6ad4749acd75e17ce5cf20d" />
        </div> -->
        <div class="blockGroup">
          <label for="slug">Cloudflare Global Api Key</label>
          <input
            bind:value={$layoutStore.cloudflareGlobalApiToken}
            type="text"
            name="slug"
            id="slug"
            placeholder="9ef43b2189f9c3289524ba5b8e72e93d1a9e0" />
        </div>
        <div class="blockGroup">
          <label for="slug">Your Custom Domain Name</label>

          <input
            bind:value={$layoutStore.current_blog_info.image}
            type="text"
            name="slug"
            id="slug"
            placeholder="example.com" />

        </div>
        <div class="blockGroup mb-12 mt-12">
          <button
            on:click={createBlog}
            type="submit"
            name="blogSubmit"
            id="blogSubmit"
            style="background-color: #000;color:white;"
            class="publishBlog btn h-12 w-full bg-black text-white rounded-md
            border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300
            placeholder:text-gray-400 focus:ring-2 focus:ring-inset
            focus:ring-indigo-600 sm:text-sm "
            placeholder="15137e82c6ad4749acd75e17ce5cf20d">
            Create / Update Post
          </button>
        </div>
      </div>
    {:else if $layoutStore.currentTab == 'profile'}
      <div
        class="flex flex-col w-full mt-3 absolute top-0 left-0"
        transition:fade>
        <div class="blockGroup">
          <label for="blogId">Email</label>
          <input
            class=""
            bind:value={$layoutStore.current_blog_info.id}
            type="text"
            name="blogId"
            id="blogId"
            placeholder="15137e82c6ad4749acd75e17ce5cf20d" />
        </div>
        <div class="blockGroup">
          <label for="slug">Send Passphrase</label>

          <input
            bind:value={$layoutStore.current_blog_info.slug}
            type="text"
            name="slug"
            id="slug"
            class=""
            placeholder="15137e82c6ad4749acd75e17ce5cf20d" />

        </div>
        <div class="blockGroup">
          <label for="slug">Set New Passphrase</label>
          <input
            bind:value={$layoutStore.current_blog_info.title}
            type="text"
            name="slug"
            id="slug"
            placeholder="15137e82c6ad4749acd75e17ce5cf20d" />
        </div>
        <div class="blockGroup mt-4">
          <button
            on:click={createBlog}
            type="submit"
            name="blogSubmit"
            id="blogSubmit"
            class="btn h-12 w-full rounded-md border-0 py-1.5 shadow-sm ring-1
            ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2
            focus:ring-inset focus:ring-indigo-600 sm:text-sm "
            placeholder="15137e82c6ad4749acd75e17ce5cf20d">
            Create Blog
          </button>
        </div>
      </div>
    {:else if $layoutStore.currentTab == 'publish'}
      <div
        class="flex flex-col w-full mt-3 absolute top-0 left-0"
        transition:fade>
        <div class="blockGroup">
          <label for="blogId">Blog Id</label>
          <input
            class=""
            bind:value={$layoutStore.current_blog_info.id}
            type="text"
            name="blogId"
            id="blogId"
            placeholder="15137e82c6ad4749acd75e17ce5cf20d" />
        </div>
        <div class="blockGroup">
          <label for="slug">Blog path</label>

          <input
            bind:value={$layoutStore.current_blog_info.slug}
            type="text"
            name="slug"
            id="slug"
            class=""
            placeholder="15137e82c6ad4749acd75e17ce5cf20d" />

        </div>
        <div class="blockGroup">
          <label for="slug">Blog Title</label>
          <input
            bind:value={$layoutStore.current_blog_info.title}
            type="text"
            name="slug"
            id="slug"
            placeholder="15137e82c6ad4749acd75e17ce5cf20d" />
        </div>
        <div class="blockGroup">
          <label for="slug">Blog Description</label>
          <input
            bind:value={$layoutStore.current_blog_info.description}
            type="text"
            name="slug"
            id="slug"
            placeholder="15137e82c6ad4749acd75e17ce5cf20d" />
        </div>
        <div class="blockGroup">
          <label for="slug">Blog Hero Image</label>

          <input
            bind:value={$layoutStore.current_blog_info.image}
            type="text"
            name="slug"
            id="slug"
            placeholder="15137e82c6ad4749acd75e17ce5cf20d" />

        </div>
        <div class="blockGroup mt-4">
          <button
            on:click={createBlog}
            type="submit"
            name="blogSubmit"
            id="blogSubmit"
            class="btn h-12 w-full rounded-md border-0 py-1.5 shadow-sm ring-1
            ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2
            focus:ring-inset focus:ring-indigo-600 sm:text-sm "
            placeholder="15137e82c6ad4749acd75e17ce5cf20d">
            Create Blog
          </button>
        </div>
      </div>
    {/if}
  </div>
</div>

<!-- {#if $layoutStore.openMenu}
  <div
    transition:fade
    class="flex flex-col gap-3 absolute top-[80px] right-0 bg-gray-300 z-[103]
    w-[200px] p-8">
    <button
      class="flex btn gap-3 items-center"
      on:click={() => setCurrentActiveTab('setting')}>
      <img src="/icons/setting.svg" alt="setting" class="w-6 h-6" />
      <h3>Setting</h3>
    </button>
    <button
      class="flex btn gap-3 items-center"
      on:click={() => setCurrentActiveTab('publish')}>
      <img src="/icons/deploy.svg" alt="setting" class="w-6 h-6" />
      <h3>Publish</h3>
    </button>
    <button
      class="flex btn gap-3 items-center"
      on:click={() => setCurrentActiveTab('profile')}>
      <img src="/icons/profile.svg" alt="setting" class="w-6 h-6" />
      <h3>Profile</h3>
    </button>
  </div>
{/if} -->
