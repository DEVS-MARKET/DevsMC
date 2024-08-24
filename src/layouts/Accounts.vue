<template>
  <!-- Main Accounts Screen -->
  <div id="accounts-background" class="hidden fixed z-50 inset-0 bg-black bg-opacity-50 flex items-center justify-center transition-opacity duration-300">
    <Login @created-account="createdAccount" @closed="this.closeAccounts()" v-if="showLogin" />
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
        <button @click="openLogin()" class="bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded">Add new Account</button>
        <button @click="closeAccounts()" class="bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded">Close</button>
      </div>
    </div>

  </div>
</template>

<script>
import Login from './Login.vue'

export default {
  emits: ['update-account', 'closed'],
  data() {
    return {
      showLogin: false,
      accounts: [],
      activeAccount: '',
    };
  },
  mounted() {
    this.getAccounts();
  },
  components: {
    Login,
  },
  methods: {
    getAccounts() {
      window.devsApi.getMinecraftAccounts().then((accounts) => {
        this.accounts = accounts;
        let activeAccount = JSON.parse(localStorage.getItem('selectedAccount'));
        if (activeAccount) {
          this.activeAccount = this.accounts.findIndex((account) => account.object.username === activeAccount.object.username || account.object.name === activeAccount.object.name);
        }
      });
    },
    async deleteAccount(account) {
      this.activeAccount = '';
      let index = this.accounts.findIndex((acc) => acc.object.username === account.object.username || acc.object.name === account.object.name);
      await window.devsApi.removeAccount(index);
      this.getAccounts();
    },
    createdAccount(object) {
      this.selectAccount(object.index, object.account);
      this.getAccounts();
      this.closeAccounts();
    },
    selectAccount(index, account) {
      localStorage.setItem('selectedAccount', JSON.stringify(account));
      window.devsApi.changeTitle(`Playing as ${account.object.name || account.object.username}`);
      this.activeAccount = index;
      this.$emit('update-account');
    },
    closeAccounts() {
      if (this.activeAccount === '') {
        return;
      }

      this.$nextTick(() => {
        if (document.getElementById('accounts-background')) {
          document.getElementById('accounts-background').classList.remove('acc-active');
          document.getElementById('accounts-background').classList.add('hidden');
        }
        this.showLogin = false;
        this.$emit("closed");
      });
    },
    openLogin() {
      let accComp = document.getElementById('accounts-comp');
      if(accComp){
        accComp.classList.add('scale-[0.1]');
        setTimeout(() => {
          this.showLogin = true;
          this.$nextTick(() => {
            let loginComp = document.getElementById('login-comp');
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