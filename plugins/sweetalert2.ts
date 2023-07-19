import Swal from "vue-sweetalert2";

export default defineNuxtPlugin(() => {
  return {
    provide: {
      Swal,
    },
  };
});
