<template>

  <!-- Settings Title -->
  <div class="fix bg-zinc-900 rounded-lg p-3 w-[24rem] translate-x-[-40px] translate-y-[-20px]">
    <h1 class="text-[32px] ml-5 font-medium text-white">Settings</h1>
    <p class="text-[15px] ml-5 font-medium text-gray-300 mb-3">Here you can change the game/launcher settings</p>
  </div>

  <!-- Settings -->
  <div class="flex items-center justify-center h-[calc(100vh-320px)] p-6">
    <div class="p-6 text-white mt-[2%] max-w-[70rem] h-[calc(100vh-320px)] custom-scrollbar overflow-y-auto">
      <div class="flex gap-8 flex-wrap -m-2">

        <!-- Section 1: Memory Settings -->
        <div class="mb-8 p-6 h-[17rem] w-[20rem] bg-zinc-900 rounded-lg shadow-lg">
          <h2 class="text-2xl font-semibold mb-2">Memory Settings</h2>
          <p class="text-gray-400 mb-4">Change RAM usage</p>

          <div class="flex space-x-8 translate-y-8">

            <!-- Minimal RAM -->
            <div class="ml-4">
              <label for="min-ram" class="block text-sm font-medium">Min RAM Usage</label>
              <select id="min-ram" class="mt-1 block w-full p-2 bg-zinc-700 border border-gray-600 rounded" @change="updateMemory" v-model="settings.memory.min">
                <option v-for="i in maxMemory" :value="`${i}`" :key="i">{{ i }}GB</option>
              </select>
            </div>

            <!-- Maksymalny RAM -->
            <div>
              <label for="max-ram" class="block text-sm font-medium">Max RAM Usage</label>
              <select id="max-ram" class="mt-1 block w-full p-2 bg-zinc-700 border border-gray-600 rounded" @change="updateMemory" v-model="settings.memory.max">
                <option v-for="i in maxMemory" :value="`${i}`" :key="i">{{ i }}GB</option>
              </select>
            </div>

          </div>
        </div>

        <!-- Section 2: Game Settings -->
        <div class="mb-8 p-6 h-[17rem] w-[20rem] bg-zinc-900 rounded-lg shadow-lg">
          <h2 class="text-2xl font-semibold mb-2">Game Settings</h2>
          <p class="text-gray-400 mb-4">Java custom arguments</p>
          <label for="bg-label" class="block text-sm font-medium mt-3">JVM args</label>
          <textarea @change="changeSettings" v-model="settings.args" type="text" placeholder="-Xmx2G -XX:+UseG1GC -XX:G1HeapRegionSize=32M" class="block w-full h-32 p-2 bg-zinc-700 border border-gray-600 rounded text-white mt-1 placeholder-gray-500 resize-none custom-scrollbar"></textarea>
        </div>

        <!-- Section 3: Client Settings -->
        <div class="mb-8 p-6 h-[17rem] w-[20rem] bg-zinc-900 rounded-lg shadow-lg">
          <h2 class="text-2xl font-semibold mb-2">Client Settings</h2>
          <p class="text-gray-400 mb-4">Customize java and minecraft folder</p>

          <label for="cst-bg-label" class="block text-sm font-medium mt-3">Custom Java Path</label>
          <input @change="changeSettings" type="text" v-model="settings.java" placeholder="C:\Java\bin\javaw.exe" class="block w-full mt-1 p-2 bg-zinc-700 border border-gray-600 rounded text-white placeholder-gray-500">

          <label for="cst-bg-label" class="block text-sm font-medium mt-3">Custom Minecraft Folder Path</label>
          <input @change="changeSettings" type="text" v-model="settings.path" placeholder="C:\Files\.minecraft" class="block w-full mt-1 p-2 bg-zinc-700 border border-gray-600 rounded text-white placeholder-gray-500">
        </div>

        <!-- Section 4: Launcher Background -->
        <div class="mb-8 p-6 h-[17rem] w-[20rem] bg-zinc-900 rounded-lg shadow-lg">
          <h2 class="text-2xl font-semibold mb-2">Launcher Background</h2>
          <p class="text-gray-400 mb-4">Customize your background</p>

          <label for="cst-bg-label" class="block text-sm font-medium mt-3">Custom Background</label>
          <input ref="fileInput" style="display: none !important;" type="file" @change="backgroundChange" placeholder="C:\Files\background.png" class="block w-full mt-1 p-2 bg-zinc-700 border border-gray-600 rounded text-white placeholder-gray-500">
          <button @click="$refs.fileInput.click()" class="block w-full mt-5 bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded">Select file</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {toRaw} from "vue";

export default {
  data() {
    return {
      settings: [],
      maxMemory: 0,
    };
  },
  created() {
    this.getSettings();
    window.devsApi.getSystemPlatform().then((platform) => {
      this.maxMemory = parseInt(platform.totalmem.toFixed(0));
    });
  },
  methods: {
    changeSettings() {
      for (const key in this.settings) {
        console.log(key, this.settings[key])
        window.devsApi.setAppSetting(key, key === 'args' ? toRaw(this.settings[key].split(' ')) : toRaw(this.settings[key]));
      }
    },

    backgroundChange(e) {
      let file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        window.devsApi.setAppSetting('background', reader.result);
        // replace image url in style .background-image
        document.querySelector('.background-image').style.backgroundImage = `url(${reader.result})`;
      };
      reader.readAsDataURL(file);
    },

    getSettings() {
      window.devsApi.getAppSettings().then((settings) => {
        this.settings = settings;
        this.settings.args = this.settings.args.join(' ');
      });
    },

    updateMemory() {
      if (this.settings.memory.min > this.settings.memory.max) {
        return window.devsApi.sendNotification("Configuration Error", "Minimum memory can't be higher than maximum memory");
      }

      window.devsApi.setAppSetting('memory', toRaw(this.settings.memory))

      this.getSettings();
    }
  }
}
</script>