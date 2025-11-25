
document.addEventListener('alpine:init', () => {
    Alpine.data('pincode', (options = {}) => ({
        instance: null,
        init() {
            // Import logic or expect global pinCode
            // Assuming pinCode is available globally via script tag
            if (typeof pinCode !== 'undefined') {
                this.instance = new pinCode(this.$el, options);
            } else {
                console.error("pinCode library not loaded");
            }
        }
    }));
});
