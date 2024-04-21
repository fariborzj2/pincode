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

class pinCode{constructor(selector,options){this.selector=selector;this.options=options;this.inputs=[];this.pincode='';this.initInputs();this.attachEventListeners();this.invalidCallback=options.invalid;this.hiddenPincodeInput=document.querySelector(`${this.selector} .pincode`)}
initInputs(){const{fields=4,inputClass=''}=this.options;const container=document.querySelector(this.selector);for(let i=0;i<fields;i++){const input=document.createElement('input');input.type='tel';input.maxLength=1;input.minLength=1;input.classList.add('pin-input',...inputClass.split(' '));input.addEventListener('click',()=>{input.value=''});container.appendChild(input);this.inputs.push(input);input.disabled=!0;input.addEventListener('keyup',(event)=>{const target=event.target;target.setSelectionRange(target.value.length,target.value.length)})}
this.inputs[0].disabled=!1;const hiddenInput=document.createElement('input');hiddenInput.type='text';hiddenInput.classList.add('pincode');hiddenInput.hidden=!0;container.appendChild(hiddenInput)}
attachEventListeners(){this.inputs.forEach((input,index)=>{input.addEventListener('input',(event)=>{this.handleInput(event,index);const target=event.target;target.setSelectionRange(target.value.length,target.value.length)});input.addEventListener('keydown',(event)=>{this.handleKeydown(event,index)})})}
handleInput(event,index){const currentInput=event.target;const maxLength=parseInt(currentInput.getAttribute('maxlength'));const nextInput=this.inputs[index+1];if(currentInput.value&&!isNaN(parseInt(currentInput.value))&&currentInput.value.length===maxLength&&nextInput){nextInput.disabled=!1;nextInput.focus()}
if(index===this.inputs.length-1&&currentInput.value){this.pincode=Array.from(this.inputs).map(input=>input.value).join('');this.hiddenPincodeInput.value=this.pincode;if(typeof this.options.complete==='function'){this.options.complete(this.pincode)}}
if(isNaN(parseInt(currentInput.value))){if(typeof this.invalidCallback==='function'){this.invalidCallback(currentInput,index)}
currentInput.value=''}
currentInput.classList.toggle('pinvalid',!!currentInput.value);if(!currentInput.value){return}}
handleKeydown(event,index){const currentInput=event.target;const previousInput=this.inputs[index-1];const nextInput=this.inputs[index+1];if(event.key==='Backspace'&&!currentInput.value&&previousInput){previousInput.focus()}
if(event.key==='ArrowLeft'&&previousInput){previousInput.focus()}
if(event.key==='ArrowRight'&&nextInput){nextInput.focus()}
if(event.key==='Delete'&&!currentInput.value&&nextInput){nextInput.value='';currentInput.focus()}
if(!isNaN(parseInt(event.key))&&currentInput.value&&currentInput.value.length===1&&!nextInput.disabled){nextInput.value=event.key;nextInput.focus()}
if(event.key==='Delete'&&!nextInput){currentInput.value=''}
if(isNaN(parseInt(event.key))&&event.key!=='Backspace'&&event.key!=='Delete'){if(typeof this.invalidCallback==='function'){this.invalidCallback(currentInput,index)}
alert('Only English numbers are allowed');currentInput.value=''}
if(typeof this.options.keydown==='function'){this.options.keydown(event,currentInput,index)}}}
