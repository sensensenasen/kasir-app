<template>
  <div>
    <!-- <navbar /> -->
    <!-- Modal -->
    <div v-if="showModal" class="overflow-x-hidden overflow-y-auto w-full h-full fixed inset-0 z-50 outline-none focus:outline-none justify-center items-center flex">
      <div class="relative w-auto my-6 mx-auto max-w-3xl">
        <!--content-->
        <QRModal :value="token" @togglemodal="toggleModal" />
      </div>
    </div>
    <!-- <div v-if="showModal" class="w-full h-full fixed inset-0 z-50 outline-none focus:outline-none justify-center items-center flex opacity-25 bg-black"></div> -->
    <div class="profile-page">
      <section class="relative block h-500-px">
        <div class="absolute top-0 w-full h-full bg-center bg-cover" style="background-image: url('https://images.unsplash.com/photo-1499336315816-097655dcfbda?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2710&q=80')">
          <span id="blackOverlay" class="w-full h-full absolute opacity-50 bg-black"></span>
        </div>
        <div class="top-auto bottom-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden h-70-px" style="transform: translateZ(0)">
          <svg class="absolute bottom-0 overflow-hidden" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" version="1.1" viewBox="0 0 2560 100" x="0" y="0">
            <polygon class="text-blueGray-200 fill-current" points="2560 0 2560 100 0 100"></polygon>
          </svg>
        </div>
      </section>
      <section class="relative py-16 bg-blueGray-200">
        <div class="container mx-auto px-4">
          <div class="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg -mt-64">
            <div class="px-6">
              <div class="flex flex-wrap justify-center">
                <div class="w-full lg:w-3/12 px-4 lg:order-2 flex justify-center">
                  <div class="relative">
                    <img alt="..." :src="team2" class="shadow-xl rounded-full h-auto align-middle border-none absolute -m-16 -ml-20 lg:-ml-16 max-w-150-px" />
                  </div>
                </div>
              </div>
              <div class="text-center mt-32">
                <h3 class="text-4xl font-semibold leading-normal mb-2 text-blueGray-700 mb-2">{{ profile.fullName }}</h3>
                <div class="text-md leading-normal mt-0 mb-2 text-blueGray-400 font-bold">
                  <i class="fas fa-envelope mr-2 text-lg text-blueGray-400"></i>
                  {{ profile.email }}
                </div>
                <div class="mb-2 text-blueGray-600 mt-4">
                  <i class="fas fa-mobile-alt mr-2 text-lg text-blueGray-400"></i>
                  {{ profile.phone }}
                </div>
                <div class="mb-2 text-blueGray-600 uppercase">
                  <i v-if="profile.gender == 'laki-laki'" class="fas fa-mars mr-2 text-lg text-blueGray-400"></i>
                  <i v-if="profile.gender == 'perempuan'" class="fas fa-venus mr-2 text-lg text-blueGray-400"></i>
                  {{ profile.gender }}
                </div>
              </div>
              <div class="mt-10 py-10 border-t border-blueGray-200 text-center">
                <div class="flex flex-wrap justify-center">
                  <div class="w-full lg:w-9/12 px-4">
                    <p v-if="!profile.bio" class="mb-4 text-lg leading-relaxed text-blueGray-700">
                      Lorem ipsum dolor, sit amet consectetur adipisicing elit. Harum quam quia voluptatibus pariatur modi, cumque ea doloremque dolorem eaque maiores. Eligendi accusantium in voluptatibus quod porro nihil aut praesentium
                      fugiat!
                    </p>
                    <p v-if="profile.bio" class="mb-4 text-lg leading-relaxed text-blueGray-700">
                      {{ profile.bio }}
                    </p>
                    <!-- <a href="javascript:void(0)" class="font-normal text-emerald-500"> Show more </a> -->
                  </div>
                </div>
              </div>
              <div class="text-center flex justify-center">
                <button
                  @click="toggleModal"
                  class="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-base px-4 py-2 rounded shadow-md hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  type="button"
                >
                  <i class="fas fa-qrcode"></i>
                  Show QR
                </button>
              </div>
              <div class="text-center flex justify-center pt-2 pb-4">
                <a href="#" @click="logout" class="font-normal text-red-500 font-semibold"> Logout </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>

    <!-- <footer-component /> -->
  </div>
</template>
<script>
import team2 from "@/assets/img/team-1-800x800.jpg";
import axios from "axios";
import QRModal from "../components/QRModal.vue";

export default {
  data() {
    return {
      team2,
      profile: {
        fullName: "N/A",
        email: "N/A",
        phone: "N/A",
        gender: "laki-laki",
      },
      showModal: false,
      token: "",
    };
  },
  components: {
    QRModal,
  },
  mounted: function () {
    var self = this;
    self.token = localStorage.getItem("token");
    axios
      .get("http://kasir-api.app.senas.xyz/users/token/" + self.token)
      .then((response) => {
        self.profile = response.data;
      })
      .catch((error) => console.log(error));
  },
  methods: {
    showEdit() {
      this.showModal = true;
    },
    toggleModal() {
      this.showModal = !this.showModal;
    },
    logout() {
      let loader = this.$loading.show({
        loader: "dots",
      });
      localStorage.clear();
      // simulate AJAX
      setTimeout(async () => {
        loader.hide();
      }, 2000);

      this.$router.push({ path: "/" });
    },
  },
};
</script>
