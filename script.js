window.onload = function () {

    const numbers = document.getElementById('cardNumber')
    const cardholdername = document.getElementById('cardholderName')
    const month = document.getElementById('cardExpirationMonth')
    const year = document.getElementById('cardExpirationYear')
    const cvc = document.getElementById('cvc')
    
    numbers.addEventListener('input', function () {
        if (numbers.value.length == 0) {
            document.getElementById('numbers-display').innerHTML = '0000 0000 0000 0000'
        } else {
            document.getElementById('numbers-display').innerHTML = this.value
        }
    });

    cardholdername.addEventListener('input', function () {
        if (cardholdername.value.length == 0) {
            document.getElementById('cardholder-display').innerHTML = 'Jane Appleseed'
        } else {
            document.getElementById('cardholder-display').innerHTML = this.value
        }
    });

    month.addEventListener('input', function () {
        if (month.value.length == 0) {
            document.getElementById('month-display').innerHTML = 'MM'
        } else {
            document.getElementById('month-display').innerHTML = this.value
        }
    });

    year.addEventListener('input', function () {
        if (year.value.length == 0) {
            document.getElementById('year-display').innerHTML = 'YY'
        } else {
            document.getElementById('year-display').innerHTML = this.value
        }
    });

    cvc.addEventListener('input', function () {
        if (cvc.value.length == 0) {
            document.getElementById('cvc-display').innerHTML = '000'
        } else {
            document.getElementById('cvc-display').innerHTML = this.value
        }
    });


}