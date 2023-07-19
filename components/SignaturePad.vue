<template>
  <div>
    <div class="flex justify-center items-center">
      <div class="w-full h-40 lg:h-52 md:h-48 md:w-1/2 lg:w-1/4 bg-white">
        <VueSignaturePad ref="signaturePad" />
      </div>
    </div>
    <div class="flex justify-center items-center mt-8">
      <button
        @click="clearSignature"
        class="w-24 text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
      >
        Clear
      </button>
    </div>
  </div>
</template>

<script>
// Doesn't work with setup tag. So leave it like this.
import pkg from "vue-signature-pad";
const { VueSignaturePad } = pkg;

// console.log(pkg);
export default defineComponent({
  name: "MySignaturePad",
  components: { VueSignaturePad },
  methods: {
    clearSignature() {
      this.$refs.signaturePad.clearSignature();
    },
    saveSignature() {
      const { data } = this.$refs.signaturePad.saveSignature();
      console.log(data);
    },
  },
});
</script>
