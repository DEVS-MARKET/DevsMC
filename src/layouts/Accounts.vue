<template>
  <!-- Main Accounts Screen -->
  <div id="accounts-background" class="hidden fixed z-50 inset-0 bg-black bg-opacity-50 flex items-center justify-center transition-opacity duration-300">
    <Login v-if="showLogin" />
    <div v-if="!showLogin" id="accounts-comp" class="bg-zinc-800 text-white p-8 rounded-lg shadow-lg max-w-lg w-full opacity-1 transform scale-[0.1] transition-transform duration-300">
      <!-- Title -->
      <h2 class="text-xl font-semibold">Select New Account</h2>
      <p class="text-s text-gray-400 mb-4">Select or add your new account</p>

      <div class="flex flex-col justify-between mb-4 max-h-[20rem] custom-scrollbar overflow-y-auto">
        <!-- Account 1 -->
        <div :class="(activeAccount === index) ? 'border border-green-500' : ''" @click="selectAccount(index, account)" class="flex items-center p-4 bg-zinc-700 rounded-lg cursor-pointer hover:bg-zinc-600 mb-4 transition" v-for="(account, index) in accounts" :key="index">
          <img :src="`https://mc-heads.net/avatar/${account.object.name || account.object.username}`" alt="Face" class="w-16 h-16 rounded-full mr-4">
          <div class="flex flex-col justify-between">
            <span class="text-sm font-medium text-gray-400">{{ account.microsoft ? 'PREMIUM' : 'NON-PREMIUM' }}</span>
            <span class="text-lg font-semibold">{{ account.object.name || account.object.username }}</span>
          </div>
        </div>

      </div>

      <!-- Buttons -->
      <div class="flex justify-between">
        <button @click="openAccounts()" class="bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded">Add new Account</button>
        <button @click="closeAccounts()" class="bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded">Close</button>
      </div>
    </div>

  </div>
</template>

<script>
import Login from './Login.vue'

export default {
  emits: ['update-account'],
  data() {
    return {
      showLogin: false,
      accounts: [],
      activeAccount: null,
    };
  },
  mounted() {
    window.devsApi.getMinecraftAccounts().then((accounts) => {
      this.accounts = accounts;
    });
  },
  components: {
    Login,
  },
  methods: {
    selectAccount(index, account) {
      localStorage.setItem('selectedAccount', JSON.stringify(account));
      window.devsApi.changeTitle(`Playing as ${account.object.name || account.object.username}`);
      this.activeAccount = index;
      this.$emit('update-account');
    },
    closeAccounts() {
      this.$nextTick(() => {
        const accBackground = document.getElementById('accounts-background');
        if (accBackground) {
          accBackground.classList.remove('acc-active');
          accBackground.classList.add('hidden');
        }
      });
    },
    openAccounts() {
      const accComp = document.getElementById('accounts-comp');
      if(accComp){
        accComp.classList.add('scale-[0.1]');
        setTimeout(() => {
          this.showLogin = true;
          this.$nextTick(() => {
            const loginComp = document.getElementById('login-comp');
            if(loginComp){
              setTimeout(() => {
                loginComp.classList.remove('scale-[0.1]');
              }, 100);
            }
          });
        }, 100);
      }
    }
  }
}
</script>