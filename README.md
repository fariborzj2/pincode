# pinCode Class

A JavaScript class for creating and managing PIN code inputs.

* **Version:** 1.0.1
* **Author:** Fariborz Jafarzadeh
* **License:** MIT
* **Contact:** fariborzj2@gmail.com

## Demo
A screenshot of the plugins pincode input fields with single instance to illustrate a login procedure and two instances for registration purposes:   
* **Demo Url:** https://fariborzj2.github.io/pincode
  
![screenshot](pincode.png)

## Introduction

The PinCode class provides a simple and customizable way to create and manage PIN code inputs in JavaScript-based applications. It offers various features such as customizable input fields, placeholder characters, event handling, validation, and more.

## Installation

You can install the PinCode class via npm (if published) or include the script directly.

```bash
npm install pin-code
```

## Basic Usage (Vanilla JS)

1. Include the pincode JavaScript file in your HTML:

```html
<script src="pincode.js"></script>
```

2. Create an HTML container element where you want the PIN code inputs to appear

```html
<div id="pin-box"></div>
```

3. Initialize the pincode library with the container element selector and any options you want to customize:
```javascript
const pinCode = new pinCode(document.getElementById('pin-box'), {
    fields: 5,
    placeholder: "•",
    autofocus: true,
    hideinput: true,
    complete: function(pincode) {
        console.log("PIN code entered:", pincode);
    }
});
```

---

## Framework Support

This library includes adapters and examples for **React**, **Vue**, and **Alpine.js**.

### React

A React wrapper component is available in `react/PinCode.jsx`.

**1. Copy the Adapter**
Copy `react/PinCode.jsx` into your project components folder. Ensure `pincode.js` is also available and imported correctly.

**2. Usage**

```jsx
import PinCode from './PinCode';

function App() {
  const handleComplete = (code) => {
    console.log("Completed:", code);
  };

  return (
    <div>
       <h1>Enter OTP</h1>
       <PinCode
          fields={6}
          onComplete={handleComplete}
       />
    </div>
  );
}
```

### Vue 3

A Vue wrapper component is available in `vue/PinCode.vue`.

**1. Copy the Adapter**
Copy `vue/PinCode.vue` into your project components folder. Ensure `pincode.js` is imported correctly inside it.

**2. Usage**

```vue
<template>
  <PinCode
    :fields="4"
    @complete="onComplete"
  />
</template>

<script>
import PinCode from './components/PinCode.vue';

export default {
  components: { PinCode },
  methods: {
    onComplete(code) {
      console.log("Code:", code);
    }
  }
}
</script>
```

### Alpine.js

For Alpine.js, you can use the `x-data` directive to initialize the component.

**1. Include Scripts**
Include both `pincode.js` and `alpine/pincode-alpine.js` (or copy the logic into your main script).

```html
<script src="path/to/pincode.js"></script>
<script>
document.addEventListener('alpine:init', () => {
    Alpine.data('pincode', (options = {}) => ({
        init() {
            new pinCode(this.$el, options);
        }
    }));
});
</script>
```

**2. Usage**

```html
<div x-data="pincode({
    fields: 6,
    complete: (code) => console.log('Alpine Code:', code)
})"></div>
```

---

## Configuration Options
Customize the pincode library behavior with the following options:

* **fields (number):** Number of input fields for the PIN code. Default: 5.
* **placeholder (string):** Placeholder character for empty fields. Default: '•'.
* **autofocus (boolean):** Whether to focus on the first input field automatically. Default: true.
* **hideinput (boolean):** Whether to hide the input characters. Default: true.
* **reset (boolean):** Whether to reset the PIN code after completion. Default: false.
* **pattern (string):** Regular expression pattern for input validation. Default: "^[0-9]*$".
* **copypaste (boolean):** Whether to allow copying and pasting the PIN code. Default: true.
* **complete (function):** Callback function called when the PIN code is completed.
* **invalid (function):** Callback function called when an invalid input is detected.
* **keydown (function):** Callback function called on keydown event for custom handling.
* **input (function):** Callback function called on input event for custom handling.

## Methods

* **reset():** Resets the PIN code inputs.
* **disable():** Disables all input fields.
* **enable():** Enables all input fields.
* **focus(index):** Focus specific input field.

## License

[MIT License](https://opensource.org/licenses/mit-license) © Fariborz Jafarzadeh

## Contribution
Contributions are welcome! Fork the repository, make your changes, and submit a pull request.

## Support
For any inquiries or issues, feel free to contact the author at fariborzj2@gmail.com.
