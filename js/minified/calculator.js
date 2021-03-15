import cars from"./cars.js";export default class Calculator{constructor(){this.wrapper=document.getElementById("calculator"),this.selectCarWrapper=document.getElementById("select-car-wrapper"),this.selectCar=document.getElementById("select-car"),this.carPrice=document.getElementById("car-price"),this.carImage=document.getElementById("car-image"),this.leftColumn=document.getElementById("left-column"),this.rightColumnInputs=document.getElementById("right-column-inputs"),this.mounthly=document.getElementById("mounthly"),this.periodWrapper=document.getElementById("period-wrapper"),this.periodSelect=document.getElementById("period-select"),this.tradeInWrapper=document.getElementById("trade-in-wrapper"),this.hiddenWrapper=document.getElementById("hidden-wrapper"),this.calculateButton=document.getElementById("calculate-button"),this.submitButton=document.getElementById("button"),this.details=document.getElementById("details"),this.name=document.getElementById("user-name"),this.phone=document.getElementById("user-phone"),this.checkbox=document.getElementById("checkbox"),this.calculated=!0,this.tradeIn="",this.initSelectCarOptions(),this.initBinds(),this.selectCarWrapper.addEventListener("click",this.handleSelectCarClick),this.rightColumnInputs.addEventListener("click",this.handleRightColumnInputsClick),this.calculateButton.addEventListener("click",this.handleCalculate),this.submitButton.addEventListener("click",this.handleSubmit),[this.name,this.phone].forEach(t=>{t.addEventListener("input",this.handleInput)}),this.checkbox.addEventListener("click",this.handleCheckbox)}initBinds(){this.handleSelectCarClick=this.handleSelectCarClick.bind(this),this.handleRightColumnInputsClick=this.handleRightColumnInputsClick.bind(this),this.handleCalculate=this.handleCalculate.bind(this),this.handleInput=this.handleInput.bind(this),this.handleCheckbox=this.handleCheckbox.bind(this),this.handleSubmit=this.handleSubmit.bind(this)}getMounthly(e){let t=cars.find(t=>t.name===e);return t.mounthly.find(t=>t.loan===Number(this.period)&&t.trade===Number(this.tradeIn)).price}handleSelectCarClick(t){let e=t.target.closest("[data-value]");e&&(e.getAttribute("data-value")?(this.periodWrapper.classList.remove("disabled"),this.tradeInWrapper.classList.remove("disabled"),this.carImage.src=`./images/cars/${e.textContent}.png`,this.carImage.style.display="block",this.carName=e.getAttribute("data-value"),t=cars.find(t=>t.name===this.carName).price,this.carPrice.textContent=t,this.selectedValue=t):(this.carImage.style.display="none",this.carImage.src="",this.carPrice.textContent=0,this.selectedValue=0,this.periodWrapper.classList.add("disabled"),this.tradeInWrapper.classList.add("disabled")),this.initLoanPeriodOptions(this.carName),!1===this.calculated&&(this.mounthly.textContent=this.calculateMounthly()),this.initError(this.selectCarWrapper,this.selectedValue))}handleRightColumnInputsClick(e){if(this.selectedValue){var i=e.target.closest("#period-wrapper"),r=e.target.closest("#trade-in-wrapper");let t=e.target.closest("[data-value]");t&&(e=t.getAttribute("data-value"),i?(this.period=e,this.initError(i,this.period)):r&&(this.tradeIn=e,this.initError(r,""!==this.tradeIn)),!1===this.calculated&&(this.mounthly.textContent=this.calculateMounthly()))}}handleCalculate(){this.mounthly.textContent=this.calculateMounthly(),this.showErrors(document.querySelectorAll("[data-error][data-select]"))}calculateMounthly(){return this.period&&this.tradeIn&&this.selectedValue?(this.hiddenWrapper.style.display="block",this.calculated=!1,this.calculateButton.style.display="none",this.mounthlyValue=this.getMounthly(this.carName)):(this.hiddenWrapper.style.display="none",this.calculateButton.style.display="block",this.calculated=!0,0)}showErrors(t){t.forEach(e=>{if(!e.querySelector("[data-error-element]")&&"true"===e.getAttribute("data-error")){let t=document.createElement("span");t.className="calculator__error",t.textContent="Please, fill this field",t.setAttribute("data-error-element",""),e.closest("[data-error]").append(t)}})}removeError(t){let e=t.querySelector("[data-error-element]");e&&e.remove()}initSelectCarOptions(){cars.forEach(t=>{this.selectCar.options[this.selectCar.options.length]=new Option(t.name,t.name)})}initLoanPeriodOptions(e){1<this.periodSelect.options.length&&this.removeOptions();let t=cars.find(t=>t.name===e).mounthly;t.forEach(t=>{1===t.trade&&(this.periodSelect.options[this.periodSelect.options.length]=new Option(t.loan+(1===t.loan?"-Year":"-Years"),t.loan))}),$("#period-select").niceSelect("update")}initError(t,e){e?(t.setAttribute("data-error",!1),this.removeError(t)):t.setAttribute("data-error",!0)}removeOptions(){Array.from(this.periodSelect.options).forEach((t,e)=>{0<e&&t.remove()}),this.period=!1,this.initError(this.selectCarWrapper,this.selectedValue),this.initError(this.periodWrapper,this.period),this.initError(this.tradeInWrapper,""!==this.tradeIn),$("#period-select").niceSelect("update")}clearForm(){let t=this.wrapper.querySelectorAll("select, input");t.forEach(t=>{t.value=""}),this.checkbox.checked=!1,this.period=!1,this.selectedValue=!1,this.tradeIn="",this.carImage.style.display="none",this.carImage.src="",this.carPrice.textContent=0,this.mounthly.textContent=0,this.initError(this.selectCarWrapper,this.selectedValue),this.initError(this.periodWrapper,this.period),this.initError(this.tradeInWrapper,""!==this.tradeIn),$("select").niceSelect("update")}handleInput(t){t.target.value?t.target.closest("[data-error]").setAttribute("data-error",!1):t.target.closest("[data-error]").setAttribute("data-error",!0),this.removeError(t.target.closest("[data-error]"))}handleCheckbox(t){let e=t.target.closest("[data-checkbox-wrapper]"),i=e.querySelector("label");this.checkbox.checked&&(i.style.color="black")}checkboxError(){let t=this.checkbox.closest("[data-checkbox-wrapper]"),e=t.querySelector("label");e.style.color="red"}handleSubmit(){this.checkbox.checked||this.checkboxError(),this.name.value&&this.phone.value?this.name.value&&this.phone.value&&this.checkbox.checked&&(this.submitButton.style.pointerEvents="none",this.submitButton.classList.remove("ready"),this.submitButton.classList.add("loading"),this.data={"Car name":this.carName,"Loan period":this.period,"Trade in":this.tradeIn?"Yes":"No",Mounthly:this.mounthlyValue+"$",Details:this.details.value,Name:this.name.value,Phone:this.phone.value},console.log(this.data),fetch("https://formspree.io/f/xjvpqdzp",{method:"post",headers:{"Content-Type":"application/json"},body:JSON.stringify(this.data)}).then(t=>{this.submitButton.classList.remove("loading"),this.submitButton.classList.add("complete"),setTimeout(()=>{this.submitButton.classList.remove("complete"),this.submitButton.classList.add("ready"),this.hiddenWrapper.style.display="none",this.calculateButton.style.display="block",this.submitButton.style.pointerEvents="all",this.clearForm(),this.initError(this.name.closest("[data-error]"),this.name.value),this.initError(this.phone.closest("[data-error]"),this.phone.value)},4e3)})):this.showErrors(document.querySelectorAll('[data-error="true"]'))}}