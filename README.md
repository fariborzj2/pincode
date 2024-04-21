# pinCode Class

A JavaScript class for creating and managing PIN code inputs.

## Installation

You can install the PinCode class via npm:

```bash
npm install pincode-class

## Basic Usage
Include the PinCode JavaScript file in your HTML


1. Include code:

```html
<script src="pinlogin.pkgd.min.js"></script>
```

2. Call the plugin:
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
