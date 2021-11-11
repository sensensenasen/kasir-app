<template>
  <div class="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
    <!--header-->
    <div class="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
      <h3 class="text-3xl font-semibold">My QR Code</h3>
      <button class="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none" v-on:click="toggleModal()">
        <span class="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none"> × </span>
      </button>
    </div>
    <!--body-->
    <div class="relative px-6 py-6 flex-auto">
      <qrcode-vue :value="value" :size="300" level="H" />
    </div>
    <!--footer-->
    <div class="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
      <button class="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button" v-on:click="toggleModal()">Close</button>
    </div>
  </div>
</template>
<script>
import QrcodeVue from "qrcode.vue";

export default {
  props: ["value"],
  data() {
    return {};
  },
  components: {
    QrcodeVue,
  },
  methods: {
    toggleModal() {
      this.$emit("togglemodal");
    },
  },
};
</script>
