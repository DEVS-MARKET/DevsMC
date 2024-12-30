<template>

  <!-- Mods Title -->
  <div class="fix bg-zinc-900 rounded-lg p-3 w-[16rem] translate-x-[-40px] translate-y-[-20px]">
    <h1 class="text-[32px] ml-5 font-medium text-white">ModPacks</h1>
    <p class="text-[15px] ml-5 font-medium text-gray-300 mb-3">Build your own modpack here</p>
  </div>

  <!-- Mod Search bar -->
  <!-- <div class="flex bg-zinc-900 items-center rounded-lg w-[70vw] p-3 ml-16 mr-16">
    <svg class="w-5 h-5 text-gray-500 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M15.7955 15.8111L21 21M18 10.5C18 14.6421 14.6421 18 10.5 18C6.35786 18 3 14.6421 3 10.5C3 6.35786 6.35786 3 10.5 3C14.6421 3 18 6.35786 18 10.5Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
    <input class="flex-1 outline-none rounded-lg bg-zinc-800block w-full mt-1 p-2 bg-zinc-700 border border-gray-600 rounded text-white placeholder-gray-500" type="text" placeholder="Search mods...">
  </div> -->

  <div class="flex items-center rounded-lg ml-4">
    <button @click="toggleModal()" data-modal-target="createmodpack" data-modal-toggle="createmodpack" type="button" class="text-white bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 ">
      Create a new modpack
    </button>

  </div>

  <!-- Mods -->
  <div class="flex items-center justify-center h-[calc(100vh-400px)]">
    <div class="p-6 text-white mt-[2%] max-w-[70rem] h-[calc(100vh-400px)] custom-scrollbar overflow-y-auto">
      <div class="flex gap-2 flex-wrap -m-2">

        <!-- Modpack -->
        <div class="bg-zinc-900 text-white p-4 flex items-center justify-between w-[70vw] rounded-md" v-for="(modpack, index) in modpacks" :key="index">
          <!-- Left Section -->
          <div class="flex items-center">
            <!-- Mod Image -->
            <div class="w-16 h-16 flex-shrink-0 mr-4">
              <img :src="`devsmc://${modpack.loader}.png`" class="object-cover mb-4 rounded-md">
            </div>

            <!-- Mods Info Section -->
            <div class="flex flex-col">
              <div class="flex items-baseline">
                <h2 class="text-xl font-bold mr-2">{{ modpack.name }}</h2>
              </div>
              <div class="flex items-center mt-2 space-x-4">
                <!-- Game Version -->
                <div class="flex items-center text-sm">
                  <svg class="w-4 h-4 mr-1" viewBox="0 0 24 20" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M7.99999 8.5C7.99999 7.94772 7.55227 7.5 6.99999 7.5C6.4477 7.5 5.99999 7.94772 5.99999 8.5V9H5.49999C4.9477 9 4.49999 9.44771 4.49999 10C4.49999 10.5523 4.9477 11 5.49999 11H5.99999V11.5C5.99999 12.0523 6.4477 12.5 6.99999 12.5C7.55227 12.5 7.99999 12.0523 7.99999 11.5V11H8.49999C9.05227 11 9.49999 10.5523 9.49999 10C9.49999 9.44771 9.05227 9 8.49999 9H7.99999V8.5Z" fill="#ffffff"></path> <path d="M18 8C18 8.55229 17.5523 9 17 9C16.4477 9 16 8.55229 16 8C16 7.44772 16.4477 7 17 7C17.5523 7 18 7.44772 18 8Z" fill="#ffffff"></path> <path d="M17 13C17.5523 13 18 12.5523 18 12C18 11.4477 17.5523 11 17 11C16.4477 11 16 11.4477 16 12C16 12.5523 16.4477 13 17 13Z" fill="#ffffff"></path> <path d="M16 10C16 10.5523 15.5523 11 15 11C14.4477 11 14 10.5523 14 10C14 9.44771 14.4477 9 15 9C15.5523 9 16 9.44771 16 10Z" fill="#ffffff"></path> <path d="M19 11C19.5523 11 20 10.5523 20 10C20 9.44771 19.5523 9 19 9C18.4477 9 18 9.44771 18 10C18 10.5523 18.4477 11 19 11Z" fill="#ffffff"></path> <path fill-rule="evenodd" clip-rule="evenodd" d="M12 3C10.1879 3 7.96237 3.25817 6.21782 3.5093C3.94305 3.83676 2.09096 5.51696 1.60993 7.7883C1.34074 9.05935 1.07694 10.5622 1.01649 11.8204C0.973146 12.7225 0.877981 13.9831 0.777155 15.1923C0.672256 16.4504 1.09148 17.7464 1.86079 18.6681C2.64583 19.6087 3.88915 20.2427 5.32365 19.8413C6.24214 19.5842 6.97608 18.9387 7.5205 18.3026C8.07701 17.6525 8.51992 16.9124 8.83535 16.3103C9.07821 15.8467 9.50933 15.5855 9.91539 15.5855H14.0846C14.4906 15.5855 14.9218 15.8467 15.1646 16.3103C15.4801 16.9124 15.923 17.6525 16.4795 18.3026C17.0239 18.9387 17.7578 19.5842 18.6763 19.8413C20.1108 20.2427 21.3541 19.6087 22.1392 18.6681C22.9085 17.7464 23.3277 16.4504 23.2228 15.1923C23.122 13.9831 23.0268 12.7225 22.9835 11.8204C22.923 10.5622 22.6592 9.05935 22.39 7.7883C21.909 5.51696 20.0569 3.83676 17.7821 3.5093C16.0376 3.25817 13.8121 3 12 3ZM6.50279 5.48889C8.22744 5.24063 10.3368 5 12 5C13.6632 5 15.7725 5.24063 17.4972 5.4889C18.965 5.70019 20.1311 6.77489 20.4334 8.20267C20.6967 9.44565 20.9332 10.8223 20.9858 11.9164C21.0309 12.856 21.1287 14.1463 21.2297 15.3585C21.2912 16.0956 21.0342 16.8708 20.6037 17.3866C20.1889 17.8836 19.7089 18.0534 19.2153 17.9153C18.8497 17.8129 18.4327 17.509 17.9989 17.0021C17.5771 16.5094 17.2144 15.9131 16.9362 15.3822C16.4043 14.3667 15.3482 13.5855 14.0846 13.5855H9.91539C8.65178 13.5855 7.59571 14.3667 7.06374 15.3822C6.78558 15.9131 6.42285 16.5094 6.00109 17.0021C5.56723 17.509 5.15027 17.8129 4.78463 17.9153C4.29109 18.0534 3.81102 17.8836 3.39625 17.3866C2.96576 16.8708 2.70878 16.0956 2.77024 15.3585C2.87131 14.1463 2.96904 12.856 3.01418 11.9164C3.06675 10.8223 3.30329 9.44565 3.56653 8.20267C3.86891 6.77489 5.03497 5.70019 6.50279 5.48889Z" fill="#ffffff"></path> </g></svg>
                  <span>Game Version: {{ modpack.loader }} {{ modpack.version }}</span>
                </div>
                <!-- Last Update -->
                <div class="flex items-center text-sm">
                  <svg class="w-4 h-4 mr-1" viewBox="0 0 24 20" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M3 9H21M7 3V5M17 3V5M6 12H8M11 12H13M16 12H18M6 15H8M11 15H13M16 15H18M6 18H8M11 18H13M16 18H18M6.2 21H17.8C18.9201 21 19.4802 21 19.908 20.782C20.2843 20.5903 20.5903 20.2843 20.782 19.908C21 19.4802 21 18.9201 21 17.8V8.2C21 7.07989 21 6.51984 20.782 6.09202C20.5903 5.71569 20.2843 5.40973 19.908 5.21799C19.4802 5 18.9201 5 17.8 5H6.2C5.0799 5 4.51984 5 4.09202 5.21799C3.71569 5.40973 3.40973 5.71569 3.21799 6.09202C3 6.51984 3 7.07989 3 8.2V17.8C3 18.9201 3 19.4802 3.21799 19.908C3.40973 20.2843 3.71569 20.5903 4.09202 20.782C4.51984 21 5.07989 21 6.2 21Z" stroke="#ffffff" stroke-width="2" stroke-linecap="round"></path> </g></svg>
                  <span>Last Update: {{ modpack.updated_at }}</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Install Button -->


          <div class="inline-flex rounded-md shadow-sm" role="group">
            <button @click="$router.push(`/modpacks/${index}/mods`)" type="button" class="px-4 py-2 text-sm font-medium rounded-s-lg dark:bg-blue-600 dark:border-blue-700 dark:text-white dark:hover:text-white dark:hover:bg-blue-700 dark:focus:ring-blue-500 dark:focus:text-white">
              Add mods
            </button>
            <button @click="playModpack(`${index}`)" type="button" class="px-4 py-2 text-sm font-medium dark:bg-green-600 dark:border-green-700 dark:text-white dark:hover:text-white dark:hover:bg-green-700 dark:focus:ring-blue-500 dark:focus:text-white">
              Play
            </button>
            <button @click="removeModpack(`${modpack.name}`)" type="button" class="px-4 py-2 text-sm font-medium rounded-e-lg dark:bg-red-600 dark:border-red-700 dark:text-white dark:hover:text-white dark:hover:bg-red-700 dark:focus:ring-red-500 dark:focus:text-white">
              Remove
            </button>
          </div>

        </div>

      </div>
    </div>
  </div>

  <div id="createmodpack" tabindex="-1" aria-hidden="true" class="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
    <div class="relative p-4 w-full max-w-2xl max-h-full">
      <!-- Modal content -->
      <div class="relative bg-white rounded-lg shadow dark:bg-zinc-900">
        <!-- Modal header -->
        <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
          <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
            Create a new modpack
          </h3>
          <button type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="createmodpack">
            <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
            </svg>
            <span class="sr-only">Close modal</span>
          </button>
        </div>
        <!-- Modal body -->
        <div class="p-4 md:p-5 space-y-4">
          <div class="flex flex-col">
            <label for="modpack-name" class="text-sm font-medium text-gray-900 dark:text-white">Modpack Name</label>
            <input id="modpack-name" required v-model="modpack.name" type="text" class="mt-1 block w-full p-3 border border-gray-200 rounded-lg dark:border-gray-600 dark:bg-zinc-800 dark:text-white" placeholder="Enter modpack name">
          </div>
          <div class="flex flex-col">
            <label for="modpack-loader" class="text-sm font-medium text-gray-900 dark:text-white">Loader</label>
            <select id="modpack-loader" required @change="changeLoader" v-model="modpack.loader" class="mt-1 block w-full p-3 border border-gray-200 rounded-lg dark:border-gray-600 dark:bg-zinc-800 dark:text-white">
              <option value="forge">Forge</option>
              <option value="fabric">Fabric</option>
            </select>
          </div>
          <div class="flex flex-col">
            <label for="modpack-version" class="text-sm font-medium text-gray-900 dark:text-white">Version</label>
            <select id="modpack-version" required v-model="this.modpack.version" class="mt-1 block w-full p-3 border border-gray-200 rounded-lg dark:border-gray-600 dark:bg-zinc-800 dark:text-white">
              <option v-for="(gameVersion, index) in gameVersions" v-bind:key="index" :value="gameVersion.version">{{ gameVersion.version }}</option>
            </select>
          </div>
        </div>
        <!-- Modal footer -->
        <div class="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
          <button @click="createModpack" data-modal-hide="createmodpack" type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            Create
          </button>
          <button @click="toggleModal" data-modal-hide="createmodpack" type="button" class="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
            Cancel
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {toRaw} from "vue";
import {initFlowbite} from "flowbite";
import {Modal} from "flowbite";

export default {
  data: () => ({
    modpacks: [],
    loaders: ['forge', 'fabric'],
    gameVersions: [],
    modpack: {
      name: '',
      loader: '',
      version: '',
    }
  }),

  mounted() {
    this.getModpacks();
    initFlowbite();
  },

  methods: {
    async getModpacks() {
      this.modpacks = await window.devsApi.getModpacks();
      console.log(this.modpacks);
    },
    toggleModal() {
      let modal = new Modal(document.getElementById('createmodpack'))
      modal.toggle();
    },
    async playModpack(modpack_id) {
      console.log(modpack_id);
      let memory = await window.devsApi.getSettingValue('memory');
      let opts = {
        user: JSON.parse(localStorage.getItem('selectedAccount')),
        modpack: toRaw(this.modpacks[modpack_id]),
        launcher: {
          memory: {
            min: `${parseInt(memory.min)}G`,
            max: `${parseInt(memory.max)}G`
          },
        }
      };

      await window.devsApi.playModpack(JSON.stringify(opts));
    },
    async removeModpack(modpack) {
      await window.devsApi.removeModpack(modpack);
      await this.getModpacks();
    },
    async changeLoader() {
      switch (this.modpack.loader) {
        case 'fabric':
          this.gameVersions = await window.devsApi.getFabricVersions();
          break;
        case 'forge':
          this.gameVersions = await window.devsApi.getForgeVersions();
          break;
        default:
          window.devsApi.sendNotification('Valid loaders are forge and fabric', 'U selected an invalid loader');
          break;
      }
    },
    async createModpack() {
      await window.devsApi.addModpack(toRaw(this.modpack));
      this.modpack = {
        name: '',
        loader: '',
        version: '',
      };
      this.toggleModal()
      await this.getModpacks();
    },
  }
}
</script>
