<script setup>
import {ref, onMounted, toRaw} from "vue";
import { useRouter } from "vue-router";
import {initFlowbite} from "flowbite";

const router = useRouter();
const accounts = ref([]);
const newAccount = ref('');

const microsoftLogin = async () => {
  window.devsApi.login()
      .then((response) => {
        getAccounts();
      })
};

const addNoPremiumAccount = async () => {
  const response = await window.devsApi.nopremium(newAccount.value);
  await getAccounts();
};

const getAccounts = async () => {
  const response = await window.devsApi.getMinecraftAccounts();
  accounts.value = response;
};

const playAccount = async (account) => {
  localStorage.setItem('selectedAccount', JSON.stringify(account));
  window.devsApi.changeTitle(`Playing as ${account.object.name || account.object.username}`);
  await router.push('/play');
}

const removeAccount = async (account) => {
  const response = await window.devsApi.removeAccount(account);
  await getAccounts();
}

onMounted(() => {
  getAccounts();
  initFlowbite();
  window.devsApi.changeTitle('Login');
});
</script>

<template>
  <div class="flex col gap-2 items-center justify-center h-screen">

    <div class="block w-[30rem] p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-800 dark:hover:bg-gray-800">
      <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Add new account</h5>

      <button type="button" @click="microsoftLogin" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
        Login via Microsoft
      </button>

      <button data-modal-target="nonpremium-modal" data-modal-toggle="nonpremium-modal" type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
        Non-Premium Account
      </button>


    </div>

    <div class="block w-[30rem] p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-800 dark:hover:bg-gray-800">

      <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Added accounts: </h5>

      <!-- Accounts list -->
      <div v-if="accounts.length === 0" class="text-gray-500 dark:text-gray-400">No accounts added yet</div>
      <div v-else class="overflow-auto max-h-[40rem]">
        <div v-for="(account, index) in accounts" :key="index" class="flex items-center justify-between py-2">
          <div class="flex items center">
            <img :src="`https://mc-heads.net/avatar/${account.object.name || account.object.username}`" class="w-8 h-8 rounded-full me-2" alt="avatar" />
            <div>
              <div class="text-gray-900 dark:text-white">{{ account.object.name || account.object.username }}</div>
              <div class="text-gray-500 dark:text-gray-400 text-sm">{{ account.object.uuid || '' }}</div>
              <span class="bg-green-100 text-green-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-green-900 dark:text-green-300" v-if="account.microsoft">Premium</span>
              <span class="bg-red-100 text-red-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-red-900 dark:text-red-300" v-else>Non-Premium</span>
              <!-- Action buttons -->
              <div class="flex gap-2 mt-2">
                <button type="button" @click="playAccount(account)" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                  Play
                </button>
                <button @click="removeAccount(index)" type="button" class="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 focus:outline-none dark:focus:ring-red-800">
                  Remove
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div id="nonpremium-modal" tabindex="-1" aria-hidden="true" class="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
    <div class="relative p-4 w-full max-w-2xl max-h-full">
      <!-- Modal content -->
      <div class="relative rounded-lg shadow dark:bg-gray-700">
        <!-- Modal header -->
        <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
          <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
            Adding Non-Premium Account
          </h3>
          <button type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="nonpremium-modal">
            <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
            </svg>
            <span class="sr-only">Close modal</span>
          </button>
        </div>

        <div class="p-4 md:p-5 space-y-4">
          <div class="mb-5">
            <label for="username" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Username</label>
            <input v-model="newAccount" type="text" id="username" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@flowbite.com" required />
          </div>
        </div>

        <div class="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
          <button @click="addNoPremiumAccount()" data-modal-hide="nonpremium-modal" type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            Add account
          </button>
          <button data-modal-hide="nonpremium-modal" type="button" class="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
            Close
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>