# pinCode Class

A JavaScript class for creating and managing PIN code inputs.

## Demo
A screenshot of the plugins pincode input fields with single instance to illustrate a login procedure and two instances for registration purposes:   
![screenshot](pincode.png)

## Installation

You can install the PinCode class via npm:

```bash
npm install pincode-class
```

## Basic Usage
Include the PinCode JavaScript file in your HTML


1. Include the pincode JavaScript file in your HTML:

```html
<script src="pincode.min.js"></script>
```

2. Create an HTML container element where you want the PIN code inputs to appear

```html
<div id="pincode-container"></div>
```

3. Initialize the pincode library with the container element selector and any options you want to customize:
```javascript
const pincode = new Pincode('#pincode-container', {
      fields: 4,
      inputClass: 'custom-input',
      complete: (pin) => {
         console.log('Complete PIN code entered:', pin);
      },
      invalid: (input, index) => {
         console.log('Invalid input detected:', input, 'at index:', index);
      },
      keydown: (event, input, index) => {
         console.log('Key pressed:', event.key, 'on input:', input, 'at index:', index);
     }
});
```

## Options
Customize the pincode library behavior with the following options:

* fields (default: 4): Number of PIN code input fields to generate.
* inputClass (default: ''): Additional CSS classes to apply to the PIN code input fields.
* invalid: Callback function called when an invalid input is detected.
* keydown: Callback function called when a key is pressed down on an input field.

## Callbacks

* The pincode library supports the following callback functions:
* complete(pin): Called when the PIN code is complete, with the complete PIN code as an argument.
* invalid(input, index): Called when an invalid input is detected, with the invalid input element and its index as arguments.
* keydown(event, input, index): Called when a key is pressed down on an input field, with the key event, input element, and its index as arguments.


## License

[MIT License](https://opensource.org/licenses/mit-license) © Fariborz Jafarzadeh
