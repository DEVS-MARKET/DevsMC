<template>
  <div id="app" class="flex p-4">
    <!-- Sidebar -->
    <div id="sidebar" class="w-64 h-[95vh] bg-zinc-900 text-white p-5 rounded-2xl shadow-lg overflow-y-auto box-border">
      <!-- Side Logo -->
      <div class="flex items-center justify-center mb-6 ml-[-20px]">
        <img :src="`devsmc://devsmc-logo.png`" alt="DevsMC Logo" class="w-12 h-12 mr-2" />
        <span class="text-2xl font-bold">DevsMC</span>
      </div>

      <!-- Side Buttons List -->
      <ul>
        <!-- Home Button -->
        <li @click="pushTo('/')" :class="{'bg-zinc-700': this.$router.currentRoute.value.name === 'Home', '': this.$router.currentRoute.value.name !== 'Home'}"
            class="p-3 my-2 rounded cursor-pointer text-center hover:bg-zinc-600 flex items-center">
          <svg class="w-6 h-6 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M22 12.2039V13.725C22 17.6258 22 19.5763 20.8284 20.7881C19.6569 22 17.7712 22 14 22H10C6.22876 22 4.34315 22 3.17157 20.7881C2 19.5763 2 17.6258 2 13.725V12.2039C2 9.91549 2 8.77128 2.5192 7.82274C3.0384 6.87421 3.98695 6.28551 5.88403 5.10813L7.88403 3.86687C9.88939 2.62229 10.8921 2 12 2C13.1079 2 14.1106 2.62229 16.116 3.86687L18.116 5.10812C20.0131 6.28551 20.9616 6.87421 21.4808 7.82274" stroke="#ffffff" stroke-width="2.4" stroke-linecap="round"></path> <path d="M15 18H9" stroke="#ffffff" stroke-width="2.4" stroke-linecap="round"></path> </g>
          </svg>
          Home
        </li>
        <!-- Settings Button -->
        <li @click="pushTo('/settings')" :class="{'bg-zinc-700': this.$router.currentRoute.value.name === 'Settings', '': this.$router.currentRoute.value.name !== 'Settings'}"
            class="p-3 my-2 rounded cursor-pointer text-center hover:bg-zinc-600 flex items-center">
          <svg class="w-6 h-6 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M12 8.25C9.92894 8.25 8.25 9.92893 8.25 12C8.25 14.0711 9.92894 15.75 12 15.75C14.0711 15.75 15.75 14.0711 15.75 12C15.75 9.92893 14.0711 8.25 12 8.25ZM9.75 12C9.75 10.7574 10.7574 9.75 12 9.75C13.2426 9.75 14.25 10.7574 14.25 12C14.25 13.2426 13.2426 14.25 12 14.25C10.7574 14.25 9.75 13.2426 9.75 12Z" fill="#ffffff"></path> <path fill-rule="evenodd" clip-rule="evenodd" d="M11.9747 1.25C11.5303 1.24999 11.1592 1.24999 10.8546 1.27077C10.5375 1.29241 10.238 1.33905 9.94761 1.45933C9.27379 1.73844 8.73843 2.27379 8.45932 2.94762C8.31402 3.29842 8.27467 3.66812 8.25964 4.06996C8.24756 4.39299 8.08454 4.66251 7.84395 4.80141C7.60337 4.94031 7.28845 4.94673 7.00266 4.79568C6.64714 4.60777 6.30729 4.45699 5.93083 4.40743C5.20773 4.31223 4.47642 4.50819 3.89779 4.95219C3.64843 5.14353 3.45827 5.3796 3.28099 5.6434C3.11068 5.89681 2.92517 6.21815 2.70294 6.60307L2.67769 6.64681C2.45545 7.03172 2.26993 7.35304 2.13562 7.62723C1.99581 7.91267 1.88644 8.19539 1.84541 8.50701C1.75021 9.23012 1.94617 9.96142 2.39016 10.5401C2.62128 10.8412 2.92173 11.0602 3.26217 11.2741C3.53595 11.4461 3.68788 11.7221 3.68786 12C3.68785 12.2778 3.53592 12.5538 3.26217 12.7258C2.92169 12.9397 2.62121 13.1587 2.39007 13.4599C1.94607 14.0385 1.75012 14.7698 1.84531 15.4929C1.88634 15.8045 1.99571 16.0873 2.13552 16.3727C2.26983 16.6469 2.45535 16.9682 2.67758 17.3531L2.70284 17.3969C2.92507 17.7818 3.11058 18.1031 3.28089 18.3565C3.45817 18.6203 3.64833 18.8564 3.89769 19.0477C4.47632 19.4917 5.20763 19.6877 5.93073 19.5925C6.30717 19.5429 6.647 19.3922 7.0025 19.2043C7.28833 19.0532 7.60329 19.0596 7.8439 19.1986C8.08452 19.3375 8.24756 19.607 8.25964 19.9301C8.27467 20.3319 8.31403 20.7016 8.45932 21.0524C8.73843 21.7262 9.27379 22.2616 9.94761 22.5407C10.238 22.661 10.5375 22.7076 10.8546 22.7292C11.1592 22.75 11.5303 22.75 11.9747 22.75H12.0252C12.4697 22.75 12.8407 22.75 13.1454 22.7292C13.4625 22.7076 13.762 22.661 14.0524 22.5407C14.7262 22.2616 15.2616 21.7262 15.5407 21.0524C15.686 20.7016 15.7253 20.3319 15.7403 19.93C15.7524 19.607 15.9154 19.3375 16.156 19.1985C16.3966 19.0596 16.7116 19.0532 16.9974 19.2042C17.3529 19.3921 17.6927 19.5429 18.0692 19.5924C18.7923 19.6876 19.5236 19.4917 20.1022 19.0477C20.3516 18.8563 20.5417 18.6203 20.719 18.3565C20.8893 18.1031 21.0748 17.7818 21.297 17.3969L21.3223 17.3531C21.5445 16.9682 21.7301 16.6468 21.8644 16.3726C22.0042 16.0872 22.1135 15.8045 22.1546 15.4929C22.2498 14.7697 22.0538 14.0384 21.6098 13.4598C21.3787 13.1586 21.0782 12.9397 20.7378 12.7258C20.464 12.5538 20.3121 12.2778 20.3121 11.9999C20.3121 11.7221 20.464 11.4462 20.7377 11.2742C21.0783 11.0603 21.3788 10.8414 21.6099 10.5401C22.0539 9.96149 22.2499 9.23019 22.1547 8.50708C22.1136 8.19546 22.0043 7.91274 21.8645 7.6273C21.7302 7.35313 21.5447 7.03183 21.3224 6.64695L21.2972 6.60318C21.0749 6.21825 20.8894 5.89688 20.7191 5.64347C20.5418 5.37967 20.3517 5.1436 20.1023 4.95225C19.5237 4.50826 18.7924 4.3123 18.0692 4.4075C17.6928 4.45706 17.353 4.60782 16.9975 4.79572C16.7117 4.94679 16.3967 4.94036 16.1561 4.80144C15.9155 4.66253 15.7524 4.39297 15.7403 4.06991C15.7253 3.66808 15.686 3.2984 15.5407 2.94762C15.2616 2.27379 14.7262 1.73844 14.0524 1.45933C13.762 1.33905 13.4625 1.29241 13.1454 1.27077C12.8407 1.24999 12.4697 1.24999 12.0252 1.25H11.9747ZM10.5216 2.84515C10.5988 2.81319 10.716 2.78372 10.9567 2.76729C11.2042 2.75041 11.5238 2.75 12 2.75C12.4762 2.75 12.7958 2.75041 13.0432 2.76729C13.284 2.78372 13.4012 2.81319 13.4783 2.84515C13.7846 2.97202 14.028 3.21536 14.1548 3.52165C14.1949 3.61826 14.228 3.76887 14.2414 4.12597C14.271 4.91835 14.68 5.68129 15.4061 6.10048C16.1321 6.51968 16.9974 6.4924 17.6984 6.12188C18.0143 5.9549 18.1614 5.90832 18.265 5.89467C18.5937 5.8514 18.9261 5.94047 19.1891 6.14228C19.2554 6.19312 19.3395 6.27989 19.4741 6.48016C19.6125 6.68603 19.7726 6.9626 20.0107 7.375C20.2488 7.78741 20.4083 8.06438 20.5174 8.28713C20.6235 8.50382 20.6566 8.62007 20.6675 8.70287C20.7108 9.03155 20.6217 9.36397 20.4199 9.62698C20.3562 9.70995 20.2424 9.81399 19.9397 10.0041C19.2684 10.426 18.8122 11.1616 18.8121 11.9999C18.8121 12.8383 19.2683 13.574 19.9397 13.9959C20.2423 14.186 20.3561 14.29 20.4198 14.373C20.6216 14.636 20.7107 14.9684 20.6674 15.2971C20.6565 15.3799 20.6234 15.4961 20.5173 15.7128C20.4082 15.9355 20.2487 16.2125 20.0106 16.6249C19.7725 17.0373 19.6124 17.3139 19.474 17.5198C19.3394 17.72 19.2553 17.8068 19.189 17.8576C18.926 18.0595 18.5936 18.1485 18.2649 18.1053C18.1613 18.0916 18.0142 18.045 17.6983 17.8781C16.9973 17.5075 16.132 17.4803 15.4059 17.8995C14.68 18.3187 14.271 19.0816 14.2414 19.874C14.228 20.2311 14.1949 20.3817 14.1548 20.4784C14.028 20.7846 13.7846 21.028 13.4783 21.1549C13.4012 21.1868 13.284 21.2163 13.0432 21.2327C12.7958 21.2496 12.4762 21.25 12 21.25C11.5238 21.25 11.2042 21.2496 10.9567 21.2327C10.716 21.2163 10.5988 21.1868 10.5216 21.1549C10.2154 21.028 9.97201 20.7846 9.84514 20.4784C9.80512 20.3817 9.77195 20.2311 9.75859 19.874C9.72896 19.0817 9.31997 18.3187 8.5939 17.8995C7.86784 17.4803 7.00262 17.5076 6.30158 17.8781C5.98565 18.0451 5.83863 18.0917 5.73495 18.1053C5.40626 18.1486 5.07385 18.0595 4.81084 17.8577C4.74458 17.8069 4.66045 17.7201 4.52586 17.5198C4.38751 17.314 4.22736 17.0374 3.98926 16.625C3.75115 16.2126 3.59171 15.9356 3.4826 15.7129C3.37646 15.4962 3.34338 15.3799 3.33248 15.2971C3.28921 14.9684 3.37828 14.636 3.5801 14.373C3.64376 14.2901 3.75761 14.186 4.0602 13.9959C4.73158 13.5741 5.18782 12.8384 5.18786 12.0001C5.18791 11.1616 4.73165 10.4259 4.06021 10.004C3.75769 9.81389 3.64385 9.70987 3.58019 9.62691C3.37838 9.3639 3.28931 9.03149 3.33258 8.7028C3.34348 8.62001 3.37656 8.50375 3.4827 8.28707C3.59181 8.06431 3.75125 7.78734 3.98935 7.37493C4.22746 6.96253 4.3876 6.68596 4.52596 6.48009C4.66055 6.27983 4.74468 6.19305 4.81093 6.14222C5.07395 5.9404 5.40636 5.85133 5.73504 5.8946C5.83873 5.90825 5.98576 5.95483 6.30173 6.12184C7.00273 6.49235 7.86791 6.51962 8.59394 6.10045C9.31998 5.68128 9.72896 4.91837 9.75859 4.12602C9.77195 3.76889 9.80512 3.61827 9.84514 3.52165C9.97201 3.21536 10.2154 2.97202 10.5216 2.84515Z" fill="#ffffff"></path> </g>
          </svg> Settings
        </li>
        <!-- Logs Button -->
        <li @click="pushTo('/logs')" :class="{'bg-zinc-700': this.$router.currentRoute.value.name === 'Logs', '': this.$router.currentRoute.value.name !== 'Logs'}"
            class="p-3 my-2 rounded cursor-pointer text-center hover:bg-zinc-600 flex items-center">
          <svg class="w-6 h-6 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M7 21H17M6.2 17H17.8C18.9201 17 19.4802 17 19.908 16.782C20.2843 16.5903 20.5903 16.2843 20.782 15.908C21 15.4802 21 14.9201 21 13.8V6.2C21 5.0799 21 4.51984 20.782 4.09202C20.5903 3.71569 20.2843 3.40973 19.908 3.21799C19.4802 3 18.9201 3 17.8 3H6.2C5.0799 3 4.51984 3 4.09202 3.21799C3.71569 3.40973 3.40973 3.71569 3.21799 4.09202C3 4.51984 3 5.07989 3 6.2V13.8C3 14.9201 3 15.4802 3.21799 15.908C3.40973 16.2843 3.71569 16.5903 4.09202 16.782C4.51984 17 5.07989 17 6.2 17Z" stroke="#ffffff" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"></path> </g>
          </svg> Logs
        </li>
        <!-- Authors Button -->
        <li @click="pushTo('/authors')" :class="{'bg-zinc-700': this.$router.currentRoute.value.name === 'Authors', '': this.$router.currentRoute.value.name !== 'Authors'}"
            class="p-3 my-2 rounded cursor-pointer text-center hover:bg-zinc-600 flex items-center">
          <svg class="w-6 h-6 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M3 18C3 15.3945 4.66081 13.1768 6.98156 12.348C7.61232 12.1227 8.29183 12 9 12C9.70817 12 10.3877 12.1227 11.0184 12.348C11.3611 12.4703 11.6893 12.623 12 12.8027C12.3107 12.623 12.6389 12.4703 12.9816 12.348C13.6123 12.1227 14.2918 12 15 12C15.7082 12 16.3877 12.1227 17.0184 12.348C19.3392 13.1768 21 15.3945 21 18V21H15.75V19.5H19.5V18C19.5 15.5147 17.4853 13.5 15 13.5C14.4029 13.5 13.833 13.6163 13.3116 13.8275C14.3568 14.9073 15 16.3785 15 18V21H3V18ZM9 11.25C8.31104 11.25 7.66548 11.0642 7.11068 10.74C5.9977 10.0896 5.25 8.88211 5.25 7.5C5.25 5.42893 6.92893 3.75 9 3.75C10.2267 3.75 11.3158 4.33901 12 5.24963C12.6842 4.33901 13.7733 3.75 15 3.75C17.0711 3.75 18.75 5.42893 18.75 7.5C18.75 8.88211 18.0023 10.0896 16.8893 10.74C16.3345 11.0642 15.689 11.25 15 11.25C14.311 11.25 13.6655 11.0642 13.1107 10.74C12.6776 10.4869 12.2999 10.1495 12 9.75036C11.7001 10.1496 11.3224 10.4869 10.8893 10.74C10.3345 11.0642 9.68896 11.25 9 11.25ZM13.5 18V19.5H4.5V18C4.5 15.5147 6.51472 13.5 9 13.5C11.4853 13.5 13.5 15.5147 13.5 18ZM11.25 7.5C11.25 8.74264 10.2426 9.75 9 9.75C7.75736 9.75 6.75 8.74264 6.75 7.5C6.75 6.25736 7.75736 5.25 9 5.25C10.2426 5.25 11.25 6.25736 11.25 7.5ZM15 5.25C13.7574 5.25 12.75 6.25736 12.75 7.5C12.75 8.74264 13.7574 9.75 15 9.75C16.2426 9.75 17.25 8.74264 17.25 7.5C17.25 6.25736 16.2426 5.25 15 5.25Z" fill="#ffffff"></path> </g>
          </svg> Authors
        </li>
      </ul>

      <div class="absolute bottom-10 left-5 right-5 flex flex-col px-4">
        <!-- Accounts Info -->
        <div class="flex items-center mb-4" v-if="selectedAccount">
          <img :src="`https://mc-heads.net/avatar/${selectedAccount?.object?.name || selectedAccount?.object?.username}`" alt="User Face" class="w-10 h-10 rounded-full border border-gray-700 mr-4" />
          <div>
            <p class="text-gray-400 text-xs">Welcome back,</p>
            <p class="text-white text-lg font-semibold">{{ selectedAccount?.object?.name || selectedAccount?.object?.username }}</p>
          </div>
        </div>

        <!-- Accounts Button -->
        <div class="flex space-x-2">
          <button @click="openAccounts()" class="bg-blue-600 text-white py-1 px-3 rounded-md font-semibold hover:bg-blue-700 text-sm">
            Change Account
          </button>
          <button class="bg-transparent border border-gray-300 text-gray-300 py-1 px-3 rounded-md font-semibold hover:bg-gray-100 hover:text-gray-900 text-sm">
            Log out
          </button>
        </div>
      </div>
    </div>

    <!-- Version List -->
    <div :style="{ bottom: `${adjustedBottom}px`}" class="absolute left-[560px] z-50">
      <ul v-if="isMenuVisible" id="version-menu" class="custom-scrollbar absolute right-0 mt-2 w-[15rem] max-h-[20rem] bg-zinc-800 text-white rounded-lg shadow-lg overflow-y-auto">
        <!-- Search bar -->
        <input type="text" v-model="searchedVersion" @input="filterVersions" class="w-full p-2 bg-zinc-700 text-white border-b border-gray-700" placeholder="Search version">

        <li v-for="(version, index) in filteredVersions" :key="index" class="p-2 hover:bg-zinc-700 cursor-pointer" @click="selectVersion(version.name)">
          {{ version.name }}
        </li>
      </ul>
    </div>

    <!-- Main Section -->
    <div id="content" class="flex-grow p-5">
      <router-view />
    </div>

    <!-- Bottom Bar -->
    <div class="fixed bottom-5 left-[calc(18rem)] right-5 h-32 bg-zinc-900 text-white p-5 rounded-2xl shadow-lg overflow-y-auto box-border flex items-center">
      <!-- Select Version Button -->
      <div class="relative flex-shrink-0 ml-4">
        <button :disabled="isGameRunned" @click="toggleMenu" id="version-selector" class="max-w-[15rem] h-[3rem] bbg-transparent border border-gray-300 text-gray-300 py-1 px-3 rounded-md font-semibold text-sm flex items-center hover:bg-gray-100 hover:text-gray-900">
          <span id="selected-version">{{ selectedVersion ?? 'Select Version' }}</span>
          <svg class="w-5 h-5 ml-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
        </button>
      </div>
      <!-- Play Button -->
      <div class="flex flex-grow justify-center">
        <button @click="runGame" v-if="!isGameRunned" :disabled="isGameRunned" class="text-white py-4 px-8 w-64 rounded-full flex flex-col items-center" :class="isGameRunned ? 'bg-gray-600 hover:bg-gray-700 shadow-gray-glow' : 'bg-green-600 hover:bg-green-700 shadow-green-glow'">
          <span class="text-2xl font-bold">PLAY</span>
        </button>
        <button @click="killGame" v-if="isGameRunned && selectedAccount" :disabled="!isGameRunned" class="text-white py-4 px-8 w-64 rounded-full flex flex-col items-center" :class="!isGameRunned ? 'bg-gray-600 hover:bg-gray-700 shadow-gray-glow' : 'bg-red-600 hover:bg-red-700 shadow-red-glow'">
          <span class="text-2xl font-bold">STOP</span>
        </button>
      </div>
      <!-- Open Ver Folder Button -->
      <div class="relative flex-shrink-0 ml-4">
        <button @click="openDir" class="max-w-[10rem] h-[3rem] bbg-transparent border border-gray-300 text-gray-300 py-1 px-3 rounded-md font-semibold text-sm flex items-center hover:bg-gray-100 hover:text-gray-900">
          <span>Open version folder</span>
        </button>
      </div>
    </div>
  </div>

  <!-- Accounts Window -->
  <div id="window" class="z-100">
    <Accounts @update-account="updateSelectedAccount()" v-if="showAccounts" />
  </div>
</template>

<script>
import Accounts from './layouts/Accounts.vue'

export default {
  data() {
    return {
      selectedItem: 'Home',
      contentText: 'Welcome to the Home section!',
      versions: [],
      filteredVersions: [],
      initialBottom: 435,
      maxItems: 8,
      reductionPerMissingItem: 40,
      showAccounts: false,
      selectedVersion: "",
      isMenuVisible: false,
      isGameRunned: localStorage.getItem('isGameRunned') || false,
      selectedAccount: JSON.parse(localStorage.getItem('selectedAccount')) || null,
      minecraftDirectory: '',
      searchedVersion: '',
    };
  },
  components: {
    Accounts,
  },
  computed: {
    adjustedBottom() {
      const itemCount = this.versions.length;
      let newBottom = this.initialBottom;

      if (itemCount < this.maxItems) {
        newBottom -= (this.maxItems - itemCount) * this.reductionPerMissingItem;
      }

      return newBottom;
    },
  },
  async mounted() {

    if (await window.devsApi.getSettingValue('background')) {
      document.querySelector('.background-image').style.backgroundImage = `url(${await window.devsApi.getSettingValue('background')})`
    }

    document.addEventListener('click', this.closeMenuOnOutsideClick);
    this.versions = await window.devsApi.getVersions();
    this.filteredVersions = this.versions;
    if (!this.selectedAccount) {
      this.isGameRunned = true;
      window.devsApi.changeTitle('No selected account');
    }

    this.minecraftDirectory = await window.devsApi.getSettingValue('path');

    this.selectedVersion = localStorage.getItem('selectedVersion') || this.versions[0].name;
    window.devsApi.changeTitle(`Playing as ${this.selectedAccount.object.name || this.selectedAccount.object.username}`)

    window.devsApi.onClosedGame(() => {
      this.isGameRunned = false;
      console.log('Game closed')
    });
  },
  beforeDestroy() {
    document.removeEventListener('click', this.closeMenuOnOutsideClick);
  },
  methods: {
    openDir() {
      window.devsApi.openDirectory(this.minecraftDirectory);
    },
    pushTo(route) {
      if (this.isGameRunned) {
        return;
      }

      this.$router.push({ path: route });
    },
    filterVersions() {
      this.filteredVersions = this.versions.filter(version => version.name.toLowerCase().includes(this.searchedVersion.toLowerCase()));
    },
    updateSelectedAccount() {
      this.selectedAccount = JSON.parse(localStorage.getItem('selectedAccount'));
      this.isGameRunned = false;
    },
    toggleMenu() {
      this.isMenuVisible = !this.isMenuVisible;
    },
    selectVersion(version) {
      this.selectedVersion = version;
      localStorage.setItem('selectedVersion', version);
      this.isMenuVisible = false;
    },
    closeMenuOnOutsideClick(event) {
      const versionSelector = document.querySelector('#version-selector');
      const versionMenu = document.querySelector('#version-menu');
      if (!versionSelector.contains(event.target) && !versionMenu?.contains(event.target)) {
        this.isMenuVisible = false;
      }
    },
    async runGame() {
      let runVer = this.versions.find(version => version.name === this.selectedVersion);

      if (!runVer) {
        return;
      }

      let memory = await window.devsApi.getSettingValue('memory');
      let opts = {
        user: JSON.parse(localStorage.getItem('selectedAccount')),
        launcher: {
          memory: {
            min: `${parseInt(memory.min)}G`,
            max: `${parseInt(memory.max)}G`
          },
          version: runVer,
          customArgs: await window.devsApi.getSettingValue('args')
        }
      };
      window.devsApi.runGame(JSON.stringify(opts));
      this.isGameRunned = true;
      await this.$router.push('/logs');
    },

    async killGame() {
      window.devsApi.stopGame();
      this.isGameRunned = false;
    },

    openAccounts() {
      this.showAccounts = true;
      this.$nextTick(() => {
        const accBackground = document.getElementById('accounts-background');
        if (accBackground) {
          accBackground.classList.remove('hidden');
          accBackground.classList.add('acc-active');
        }
        const accComp = document.getElementById('accounts-comp');
        if(accComp){
          setTimeout(() => {
            accComp.classList.remove('scale-[0.1]');
          }, 100);
        }
      });
    }
  }
}
</script>
