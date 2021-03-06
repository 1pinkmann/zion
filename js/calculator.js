let cars = [
    { name: 'bmw-320i', price: '2000' },
    { name: 'bmw-520i', price: '3000' },
    { name: 'bmw-740li', price: '4000' },
    { name: 'cla35', price: '5000' },
    { name: 'cla45s', price: '4000' },
    { name: 'cla180', price: '4000' },
    { name: 'cla200', price: '6000' },
    { name: 'cla250', price: '8000' }
]

class Calculator {

    constructor() {
        this.wrapper = document.getElementById('calculator');
        this.selectCarWrapper = document.getElementById('select-car-wrapper');
        this.selectCar = document.getElementById('select-car');
        this.carPrice = document.getElementById('car-price');
        this.carImage = document.getElementById('car-image');
        this.leftColumn = document.getElementById('left-column');
        this.rightColumnInputs = document.getElementById('right-column-inputs');
        this.mounthly = document.getElementById('mounthly');
        this.periodWrapper = document.getElementById('period-wrapper');
        this.tradeInWrapper = document.getElementById('trade-in-wrapper');
        this.hiddenWrapper = document.getElementById('hidden-wrapper');
        this.calculateButton = document.getElementById('calculate-button');
        this.submitButton = document.getElementById('button');
        this.details = document.getElementById('details');
        this.name = document.getElementById('user-name');
        this.phone = document.getElementById('user-phone');
        this.checkbox = document.getElementById('checkbox');
        this.selectedValue;
        this.calculated = true;
        this.tradeIn = '';
        this.initSelectCarOptions();
        this.initBinds();

        this.selectCarWrapper.addEventListener('click', this.handleSelectCarClick);
        this.rightColumnInputs.addEventListener('click', this.handleRightColumnInputsClick);
        this.calculateButton.addEventListener('click', this.handleCalculate);
        this.submitButton.addEventListener('click', this.handleSubmit);
        [this.name, this.phone].forEach(input => {
            input.addEventListener('input',  this.handleInput);
        })
        this.checkbox.addEventListener('click', this.handleCheckbox);
    }

    initBinds() {
        this.handleSelectCarClick = this.handleSelectCarClick.bind(this);
        this.handleRightColumnInputsClick = this.handleRightColumnInputsClick.bind(this);
        this.handleCalculate = this.handleCalculate.bind(this);
        this.handleInput = this.handleInput.bind(this);
        this.handleCheckbox = this.handleCheckbox.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSelectCarClick(e) {

        let targetValue = e.target.closest('[data-value]');

        if (targetValue) {
            let targetValueAttribute = targetValue.getAttribute('data-value');
            if (!targetValueAttribute) {
                this.carImage.style.display = 'none';
                this.carImage.src = '';
                this.carPrice.textContent = 0;
                this.selectedValue = 0;
                this.periodWrapper.classList.add('disabled');
                this.tradeInWrapper.classList.add('disabled');
                if (this.calculated === false) {
                    this.mounthly.textContent = this.calculateMounthly();
                }
                this.selectCarWrapper.setAttribute('data-error', true);
            } else {
                this.periodWrapper.classList.remove('disabled');
                this.tradeInWrapper.classList.remove('disabled');
                this.carImage.src = `./images/cars/${targetValue.textContent}.png`;
                this.carImage.style.display = 'block';
                let priceValue = targetValue.getAttribute('data-value');
                this.carPrice.textContent = priceValue;
                this.selectedValue = priceValue;
                if (this.calculated === false) {
                    this.mounthly.textContent = this.calculateMounthly();
                }
                this.selectCarWrapper.setAttribute('data-error', false);
                this.removeError(this.selectCarWrapper);
            }
        }
    }

    handleRightColumnInputsClick(e) {

        if (this.selectedValue) {
            let periodWrapper = e.target.closest('#period-wrapper');
            let tradeInWrapper = e.target.closest('#trade-in-wrapper');
            let targetValue = e.target.closest('[data-value]');

            if (targetValue) {
                let targetValueAttribute = targetValue.getAttribute('data-value');

                if (periodWrapper) {
                    this.period = targetValueAttribute;
                    if (this.period) {
                        periodWrapper.setAttribute('data-error', false);
                        this.removeError(periodWrapper);
                    } else {
                        periodWrapper.setAttribute('data-error', true);
                    }
                } else if (tradeInWrapper) {
                    this.tradeIn = targetValueAttribute;
                    if (this.tradeIn !== '') {
                        tradeInWrapper.setAttribute('data-error', false);
                        this.removeError(tradeInWrapper);
                    } else {
                        tradeInWrapper.setAttribute('data-error', true);
                    }
                }
                if (this.calculated === false) {
                    this.mounthly.textContent = this.calculateMounthly();
                }
            }
        }
    }

    handleCalculate() {
        this.mounthly.textContent = this.calculateMounthly();
        this.showErrors(document.querySelectorAll('[data-error][data-select]'));
    }

    calculateMounthly() {
        if (this.period && this.tradeIn && this.selectedValue) {
            this.hiddenWrapper.style.display = 'block';
            this.calculated = false;
            this.calculateButton.style.display = 'none';
            return this.mounthlyValue = Math.round((this.selectedValue / this.period) * (this.tradeIn === '1' ? 0.5 : 1));
        } else {
            this.hiddenWrapper.style.display = 'none';
            this.calculateButton.style.display = 'block';
            this.calculated = true;
            return this.mounthly.textContent = 0;
        }
    }

    showErrors(wrappers) {
        wrappers.forEach(wrapper => {
            if (wrapper.getAttribute('data-error') === 'true') {

                let error = document.createElement('span');
                error.className = 'calculator__error';
                error.textContent = 'Please, fill this field';
                error.setAttribute('data-error-element', '');
                wrapper.closest('[data-error]').append(error);
            }
        })
    }

    removeError(wrapper) {
        let error = wrapper.querySelector('[data-error-element]');
        if (error) {  
            error.remove();
        }
    }

    initSelectCarOptions() {
        cars.forEach(car => {
            this.selectCar.options[this.selectCar.options.length] = new Option(car.name, car.price);
        })
    }

    clearForm() {
        let inputs = this.wrapper.querySelectorAll('select, input');
        
        inputs.forEach(input => {
            input.value = '';
        })
    }

    handleInput(e) {
        this.removeError(e.target.closest('[data-error]'));
    }

    handleCheckbox(e) {
        let wrapper = e.target.closest('[data-checkbox-wrapper]');
        let label = wrapper.querySelector('label');
        if (this.checkbox.checked) {
            label.style.color = 'black';
        }
    }

    checkboxError() {
        let wrapper = this.checkbox.closest('[data-checkbox-wrapper]');
        let label = wrapper.querySelector('label');
        label.style.color = 'red';
    }

    handleSubmit() {

        if (!this.checkbox.checked) {
            this.checkboxError();
        }

        this.submitButton.style.pointerEvents = 'none';
        this.submitButton.classList.remove('ready');
        this.submitButton.classList.add('loading');

        if (!this.name.value && !this.phone.value) {
            this.showErrors(document.querySelectorAll('[data-error]'))
        } else if (this.name.value && this.phone.value && this.checkbox.checked) {
            this.data = {
                'Car name': this.selectedValue,
                'Loan period': this.period,
                'Trade in': this.tradeIn ? 'Yes' : 'No',
                'Details': this.details.value,
                'Name': this.name.value,
                'Phone': this.phone.value
            }

            fetch('https://formspree.io/f/xjvpqdzp', {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(this.data)
            }).then(response => {
                this.submitButton.classList.remove('loading');
                this.submitButton.classList.add('complete');
                setTimeout(() => {
                    this.submitButton.classList.remove('complete');
                    this.submitButton.classList.add('ready');
                    this.hiddenWrapper.style.display = 'none';
                    this.calculateButton.style.display = 'block';
                    this.submitButton.style.pointerEvents = 'all';
                    this.clearForm();
                }, 4000);
            })
        }
        
    }
}