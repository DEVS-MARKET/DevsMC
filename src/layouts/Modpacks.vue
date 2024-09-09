<template>
  <!-- Home Title -->
  <div class="fix bg-zinc-900 rounded-lg p-3 w-[30rem] translate-x-[-40px] translate-y-[-20px]">
    <h1 class="text-[32px] ml-5 font-medium text-white">Mod-packs</h1>
    <p class="text-[15px] ml-5 font-medium text-gray-300 mb-3">Here u can manage a custom modpacks</p>
  </div>

  <div class="flex items-center justify-center h-[calc(100vh-280px)] p-6">
    <div class="p-6 text-white mt-[2%] max-w-[70rem] h-[calc(100vh-320px)] custom-scrollbar overflow-y-auto">
      <div class="flex gap-8 flex-wrap -m-2">
        <div v-for="info in news" :key="info.attributes.id" class="mb-8 p-6 h-[10rem] w-[100%] bg-zinc-900 rounded-lg shadow-lg custom-scrollbar overflow-y-auto">
          <h2 class="text-2xl font-semibold mb-2">{{ info.attributes.Title }}</h2>
          <p class="mt-4">{{ info.attributes.Content }}</p>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      news: [],
      modLoaders: [],
    };
  },
  async mounted() {
    let connectData = await window.devsApi.getEnv();
    fetch(connectData.strapi_url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${connectData.strapi_key}`
      }
    })
    .then(response => response.json())
    .then(data => {
      this.news = data.data;
    })

    this.modLoaders.forge = await window.devsApi.getForgeVersions();
    console.log(this.modLoaders.forge);
    this.modLoaders.fabric = await window.devsApi.getFabricVersions();
    console.log(this.modLoaders.fabric);
  }
}
</script>