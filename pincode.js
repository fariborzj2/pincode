/**
 * PinCode Class
 * 
 * A JavaScript class for creating and managing PIN code inputs.
 * 
 * @version 1.0.1
 * @author Fariborz Jafarzadeh
 * @license MIT
 * @email fariborzj2@gmail.com
 */

class pinCode {
    constructor(selector, options) {
        this.elementId = selector.id;
        console.log(selector);
        this.defaults = {
            fields: 5,
            placeholder: "•",
            autofocus: true,
            hideinput: true,
            reset: false,
            pattern: "^[0-9]*$",
            copypaste: true,
            complete: function(pincode) {},
            invalid: function(input, index) {},
            keydown: function(event, input, index) {},
            input: function(event, input, index) {}
        };
        this.settings = Object.assign({}, this.defaults, options);
        this.values = new Array(this.settings.fields);
        this.timers = [];
        this.createInputs(selector);
        this.reset();
        if (this.settings.autofocus) this.focus(0);
    }

    createInputs(container) {
        const pincodeContainer = document.createElement("div");
        pincodeContainer.id = `${this.elementId}pinContainer`;
        pincodeContainer.classList.add("pin-container");

    
        for (let i = 0; i < this.settings.fields; i++) {
            const input = this.createInput(this.getFieldId(i));
            this.attachEvents(input, i);
            pincodeContainer.appendChild(input);
        }

        container.appendChild(pincodeContainer);
    }

    createInput(id) {
        const input = document.createElement("input");
        input.id = id;
        input.name = id;
        input.type = "tel";
        input.maxLength = 1;
        input.inputMode = "numeric";
        input.pattern = this.settings.pattern;
        input.autocomplete = "one-time-code";
        input.autocorrect = "off";
        input.autocapitalize = "off";
        input.spellcheck = false;
        input.role = "presentation";
        input.classList.add("pin-input");

        return input;
    }

    attachEvents(input, index) {
        const self = this;

        input.addEventListener("focus", function() {
            if (!this.readOnly) {
                this.value = "";
            }
        });

        input.addEventListener("input", function(event) {
            const value = this.value;
            if (value.length > 1) {
                event.preventDefault();
                event.stopPropagation();

                // Handle paste/autofill behavior for input event
                const chars = value.split('');

                // If current index is 0 or close to it, and we have enough chars, fill them
                if (chars.length <= self.settings.fields - index) {
                    let isValid = true;
                    chars.forEach((char, i) => {
                        const targetIndex = index + i;
                        if (targetIndex < self.settings.fields) {
                            const field = self.getField(targetIndex);
                            field.value = char;
                            self.values[targetIndex] = char;
                            if (!self.validateInput(targetIndex)) {
                                isValid = false;
                            }
                            if (targetIndex < self.settings.fields - 1) {
                                self.getField(targetIndex + 1).removeAttribute("readonly");
                            }
                        }
                    });

                    if (isValid) {
                         const lastIndex = index + chars.length - 1;
                         if (lastIndex < self.settings.fields - 1) {
                             self.focus(lastIndex + 1);
                         } else {
                             const pincode = self.values.join("");
                             if (self.settings.reset) {
                                 self.reset();
                             }
                             self.settings.complete(pincode);
                         }
                    }
                    return;
                }
            }

            if (!self.validateInput(index)) {
                event.preventDefault();
                event.stopPropagation();
                return;
            }

            self.settings.input(event, this, index);
            self.values[index] = this.value;

            if (index < self.settings.fields - 1) {
                if (self.settings.hideinput) {
                    if (index > 0) {
                        self.getField(index - 1).value = self.settings.placeholder;
                    }

                    const currentInput = this;
                    self.timers.push(setTimeout(function() {
                        currentInput.value = self.settings.placeholder;
                    }, 1000));
                }

                self.getField(index + 1).removeAttribute("readonly");
                self.focus(index + 1);
            } else {
                if (self.settings.hideinput) {
                    this.value = self.settings.placeholder;
                }

                const pincode = self.values.join("");
                if (self.settings.reset) {
                    self.reset();
                }
                self.settings.complete(pincode);
            }
        });

        input.addEventListener("keydown", function(event) {
            self.timers.forEach(timer => clearTimeout(timer));
            self.timers = [];

            self.settings.keydown(event, this, index);

            if ((event.keyCode === 37 || event.keyCode === 8) && index > 0) {
                self.resetField(index);
                self.focus(index - 1);
                event.preventDefault();
                event.stopPropagation();
            }
        });

        if (this.settings.copypaste && index === 0) {
            input.addEventListener("paste", (event) => { 
                event.stopPropagation();
                event.preventDefault();
        
                const clipboardData = (event.clipboardData || window.clipboardData).getData("Text").trim();
        
                console.log('past number: ' + clipboardData.length);
        
                if (clipboardData.length === this.settings.fields) { 
                    let isValid = true;
        
                    self.getField(0).removeAttribute("readonly");
                    Array.from(clipboardData).forEach((char, i) => {
                        const field = self.getField(i);
                        field.value = char;
                        self.values[i] = char;
                        if (!self.validateInput(i)) { 
                            isValid = false;
                            return; 
                        }
                        if (i < self.settings.fields - 1) {
                            self.focus(i + 1);
                        }
                    });
        
                    if (isValid) {
                        const pincode = Array.from(self.values).join("");
                        if (self.settings.reset) {
                            self.reset();
                        }
                        self.settings.complete(pincode);
                    }
                }
            });
        }
        
               
    
    }

    validateInput(index) {
        const field = this.getField(index);
        const pattern = new RegExp(field.pattern);
        if (field.value.match(pattern)) {
            field.classList.remove("invalid");
            return true;
        } else {
            field.value = "";
            field.classList.add("invalid");
            this.settings.invalid(field, index);
            return false;
        }
    }

    getFieldId(index) {
        return `${this.elementId}_pincode_${index}`;
    }

    getField(index) {
        return document.getElementById(this.getFieldId(index));
    }

    focus(index) {
        this.enableField(index);
        this.getField(index).focus();
    }

    reset() {
        this.values = new Array(this.settings.fields);
        for (let i = 0; i < this.settings.fields; i++) {
            const field = this.getField(i);
            field.value = "";
            if (i > 0) {
                field.readOnly = true;
                field.classList.remove("invalid");
            }
        }
        if (this.settings.autofocus) {
            this.focus(0);
        }
    }

    resetField(index) {
        this.values[index] = "";
        const field = this.getField(index);
        field.value = "";
        field.readOnly = true;
        field.classList.remove("invalid");
    }

    disable() {
        for (let i = 0; i < this.settings.fields; i++) {
            this.disableField(i);
        }
    }

    disableField(index) {
        this.getField(index).readOnly = true;
    }

    enable() {
        for (let i = 0; i < this.settings.fields; i++) {
            this.enableField(i);
        }
    }

    enableField(index) {
        this.getField(index).removeAttribute("readonly");
    }
}

if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
    module.exports = pinCode;
}
