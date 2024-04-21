/**
 * PinCode Class
 * 
 * A JavaScript class for creating and managing PIN code inputs.
 * 
 * @version 1.0.0
 * @author Fariborz Jafarzadeh
 * @license MIT
 * @email fariborzj2@gmail.com
 */

class pinCode {
    /**
     * Constructor for PinCode class.
     * 
     * @param {string} selector - The selector for the container element where PIN code inputs will be generated.
     * @param {Object} options - Options for configuring PinCode behavior.
     * @param {number} [options.fields=4] - The number of PIN code input fields to generate.
     * @param {string} [options.inputClass=''] - Additional CSS classes to apply to the PIN code input fields.
     * @param {Function} [options.complete] - A callback function to be called when the PIN code is complete.
     * @param {Function} [options.invalid] - A callback function to be called when an invalid input is detected.
     * @param {Function} [options.keydown] - A callback function to be called when a key is pressed down on an input field.
     */
    constructor(selector, options) {
        this.selector = selector;
        this.options = options;
        this.inputs = [];
        this.pincode = '';

        // Initialize PIN code inputs
        this.initInputs();

        // Attach event listeners
        this.attachEventListeners();

        // Store the invalid callback function
        this.invalidCallback = options.invalid;

        // Reference to hidden PIN code input field
        this.hiddenPincodeInput = document.querySelector(`${this.selector} .pincode`);
    }

    // Initialize PIN code input fields
    initInputs() {
        const { fields = 4, inputClass = '' } = this.options;
        const container = document.querySelector(this.selector);

        for (let i = 0; i < fields; i++) {
            const input = document.createElement('input');
            input.type = 'tel';
            input.maxLength = 1;
            input.minLength = 1;
            // input.placeholder = '*';
            input.classList.add('pin-input', ...inputClass.split(' '));

            // Clear input on click
            input.addEventListener('click', () => {
                input.value = '';
            });

            container.appendChild(input);
            this.inputs.push(input);

            // Disable all inputs initially
            input.disabled = true;

            // Move cursor to end on keyup
            input.addEventListener('keyup', (event) => {
                const target = event.target;
                target.setSelectionRange(target.value.length, target.value.length);
            });            
        }

        // Enable the first input
        this.inputs[0].disabled = false;

        // Create hidden input for storing PIN code
        const hiddenInput = document.createElement('input');
        hiddenInput.type = 'text';
        hiddenInput.classList.add('pincode');
        hiddenInput.hidden = true;
        container.appendChild(hiddenInput);
    }

    // Attach event listeners to inputs
    attachEventListeners() {
        this.inputs.forEach((input, index) => {
            input.addEventListener('input', (event) => {
                this.handleInput(event, index);
                const target = event.target;
                target.setSelectionRange(target.value.length, target.value.length);
            });

            input.addEventListener('keydown', (event) => {
                this.handleKeydown(event, index);
            });
        });
    }

    // Handle input events
    handleInput(event, index) {
        const currentInput = event.target;
        const maxLength = parseInt(currentInput.getAttribute('maxlength'));
        const nextInput = this.inputs[index + 1];

        // Move to next input when current is filled
        if (currentInput.value && !isNaN(parseInt(currentInput.value)) && currentInput.value.length === maxLength && nextInput) {
            nextInput.disabled = false;
            nextInput.focus();
        }

        // Complete PIN code entry
        if (index === this.inputs.length - 1 && currentInput.value) {
            this.pincode = Array.from(this.inputs).map(input => input.value).join('');
            this.hiddenPincodeInput.value = this.pincode; // Update hidden input value
            if (typeof this.options.complete === 'function') {
                this.options.complete(this.pincode);
            }
        }

        // Handle invalid input
        if (isNaN(parseInt(currentInput.value))) {
            if (typeof this.invalidCallback === 'function') {
                this.invalidCallback(currentInput, index);
            }
            currentInput.value = ''; // Clear input
        }

        // Toggle class based on input value
        currentInput.classList.toggle('pinvalid', !!currentInput.value);

        // Return if input value is empty
        if (!currentInput.value) {
            return;
        }
    }

    // Handle keydown events
    handleKeydown(event, index) {
        const currentInput = event.target;
        const previousInput = this.inputs[index - 1];
        const nextInput = this.inputs[index + 1];

        // Move focus to previous input on Backspace
        if (event.key === 'Backspace' && !currentInput.value && previousInput) {
            previousInput.focus();
        }

        // Move focus to previous input on Left Arrow
        if (event.key === 'ArrowLeft' && previousInput) {
            previousInput.focus();
        }

        // Move focus to next input on Right Arrow
        if (event.key === 'ArrowRight' && nextInput) {
            nextInput.focus();
        }

        // Delete value in next input on Delete
        if (event.key === 'Delete' && !currentInput.value && nextInput) {
            nextInput.value = '';
            currentInput.focus();
        }

        // Auto-fill next input with number
        if (!isNaN(parseInt(event.key)) && currentInput.value && currentInput.value.length === 1 && !nextInput.disabled) {
            nextInput.value = event.key;
            nextInput.focus();
        }

        // Clear current input on Delete key press when no next input
        if (event.key === 'Delete' && !nextInput) {
            currentInput.value = '';
        }

        // Handle non-numeric key press
        if (isNaN(parseInt(event.key)) && event.key !== 'Backspace' && event.key !== 'Delete') {
            if (typeof this.invalidCallback === 'function') {
                this.invalidCallback(currentInput, index);
            }
            alert('Only English numbers are allowed');
            currentInput.value = ''; // Clear input
        }

        // Execute custom keydown callback
        if (typeof this.options.keydown === 'function') {
            this.options.keydown(event, currentInput, index);
        }
    }  
}
