<template>
  <div class="px-4 mx-auto max-w-screen-xl h-full">
    <div>
      <h1 class="text-2xl font-bold text-center text-gray-900 dark:text-white">Welcome to DevsMC!</h1>
    </div>

    <div class="grid grid-cols-1 gap-6 mt-8 sm:grid-cols-2">

      <div class="block p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
        <h5 class="mb-2 font-bold tracking-tight text-gray-900 dark:text-white">Memory settings</h5>

        <div class="grid grid-cols-2 gap-2">
          <div>
            <label for="minimum_mem" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Pick minimum value of RAM in GB</label>
            <select id="minimum_mem" v-model="settings.memory.min" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
              <option v-for="i in hardware.memory" :key="i" :value="`${i}G`">{{ i }} GB</option>
            </select>
          </div>
          <div>
            <label for="minimum_mem" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Pick minimum value of RAM in GB</label>
            <select id="minimum_mem" v-model="settings.memory.max" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
              <option v-for="i in hardware.memory" :key="i" :value="`${i}G`">{{ i }} GB</option>
            </select>
          </div>
        </div>
      </div>


      <div class="block p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
        <h5 class="mb-2 font-bold tracking-tight text-gray-900 dark:text-white">Game settings</h5>
        <!-- Java custom arguments -->
        <div>
          <label for="java_args" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Java custom arguments</label>
          <textarea id="java_args" v-model="customArgs" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="-Xmx2G -Xms2G"></textarea>
        </div>
      </div>
    </div>

    <div class="block mt-8 p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
      <h5 class="mb-2 font-bold tracking-tight text-gray-900 dark:text-white">Game version</h5>

      <div class="mt-4 mb-4">
        <label for="searchVersion" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Search for a version</label>
        <input id="searchVersion" @change="search" v-model="searchVersion" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="1.17.1">

        <div v-if="searchResults.length > 0" class="mt-2">
          <label for="searchVersion" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Search results</label>
          <select id="searchVersion" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
            <option v-for="(version, i) in searchResults" :key="i" :value="version.name">{{ version.name }}</option>
          </select>
        </div>
      </div>
      <div class="grid grid-cols-2 gap-2">
        <div>
          <label for="officialVersions" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Official Mojang Versions</label>
          <select id="officialVersions" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
            <option v-for="(version, i) in versions.officialVersions" :key="i" :value="version">{{ version.name }}</option>
          </select>
        </div>
        <div>
          <label for="customVersions" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Custom Versions</label>
          <select id="customVersions" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
            <option v-for="(version, i) in versions.customVersions" :key="i" :value="version">{{ version.name }}</option>
          </select>
        </div>
      </div>
    </div>

    <div class="block mt-8 p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
      <h5 class="mb-2 font-bold tracking-tight text-gray-900 dark:text-white">Logs</h5>

      <!-- Logs from game -->
      <!-- A simple console-like div with logs -->
      <div class="bg-gray-50 border border-gray-300 rounded-lg p-4 text-sm text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:text-white">
        <div class="flex items-center gap-2">
          <span class="text-green-500">[INFO]</span>
          <span>Game started</span>
        </div>
      </div>
    </div>
  </div>


  <div class="fixed bottom-4 left-1/2 transform -translate-x-1/2">
    <button type="button" class="text-white  font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 focus:outline-none dark:focus:ring-green-800">
      Start the game
    </button>
  </div>
</template>
<script>
export default {
  data: () => ({
    version: '',
    versions: {},
    searchVersion: '',
    searchResults: [],
    customArgs: '',
    settings: {
      memory: {
        min: 1,
        max: 2
      },
    },
    hardware: {}
  }),

  async mounted() {
    let system = await window.devsApi.getSystemPlatform();
    this.hardware.memory = parseInt(system.totalmem.toFixed(0));
    this.versions = await window.devsApi.getVersions();
    window.devsApi.changeTitle(`Playing as ${JSON.parse(localStorage.getItem("selectedAccount")).object.name || JSON.parse(localStorage.getItem("selectedAccount")).object.username}`);
  },

  methods: {
    async startGame() {
      let args = this.customArgs.split(' ');

      let options = {
        user: JSON.parse(localStorage.getItem("selectedAccount")),
        launcher: {
          memory: {
            min: this.settings.memory.min,
            max: this.settings.memory.max
          },
          version: this.version,
          customArgs: args
        }
      }
    },
    async search() {
      if (this.searchVersion.length < 3) {
        return;
      }
      let allVersions = this.versions.officialVersions.concat(this.versions.customVersions);
      this.searchResults = allVersions.filter(version => version.name.includes(this.searchVersion));
    }
  }
}
</script>