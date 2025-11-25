
<template>
  <div ref="pincodeContainer" :id="id" :class="className"></div>
</template>

<script>
import pinCode from '../pincode';

export default {
  name: "PinCode",
  props: {
    fields: { type: Number, default: 5 },
    placeholder: { type: String, default: "•" },
    autofocus: { type: Boolean, default: true },
    hideinput: { type: Boolean, default: true },
    reset: { type: Boolean, default: false },
    pattern: { type: String, default: "^[0-9]*$" },
    copypaste: { type: Boolean, default: true },
    id: { type: String, default: "pincode-vue" },
    className: { type: String, default: "" }
  },
  mounted() {
    this.initPinCode();
  },
  methods: {
    initPinCode() {
      if (this.$refs.pincodeContainer) {
        this.$refs.pincodeContainer.innerHTML = "";

        new pinCode(this.$refs.pincodeContainer, {
          fields: this.fields,
          placeholder: this.placeholder,
          autofocus: this.autofocus,
          hideinput: this.hideinput,
          reset: this.reset,
          pattern: this.pattern,
          copypaste: this.copypaste,
          complete: (code) => this.$emit('complete', code),
          invalid: (field, index) => this.$emit('invalid', field, index),
          keydown: (e, field, index) => this.$emit('keydown', e, field, index),
          input: (e, field, index) => this.$emit('input', e, field, index),
        });
      }
    }
  },
  watch: {
      fields() { this.initPinCode(); },
      placeholder() { this.initPinCode(); },
      // Re-init on significant prop changes
  }
};
</script>
