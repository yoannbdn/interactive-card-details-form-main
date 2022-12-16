    const numbers = document.getElementById('cardNumber')
    inputMirrorEffect(numbers, 'numbers-display', '0000 0000 0000 0000')

    const cardholdername = document.getElementById('cardholderName')
    inputMirrorEffect(cardholdername, 'cardholder-display', 'Jane Appleseed')

    const month = document.getElementById('cardExpirationMonth')
    inputMirrorEffect(month,'month-display','00')

    const year = document.getElementById('cardExpirationYear')
    inputMirrorEffect(year, 'year-display', '00')

    const cvc = document.getElementById('cvc')
    inputMirrorEffect(cvc, 'cvc-display', '000')

    function inputMirrorEffect (inputConstName, inputID, initialValueDisplay) {
        inputConstName.addEventListener('input', function() {
            if (inputConstName.value.length == 0) {
                document.getElementById(inputID).innerHTML = initialValueDisplay;
            } else {
                document.getElementById(inputID).innerHTML = this.value
            }
        })
    };

    function confirmation() {
        let elt = document.getElementById("formulaire")
        let elt2 = document.getElementById('confirmation')

        elt.classList.add("constriction")
        elt2.classList.replace('display-off','display-flex')
        document.getElementById('form-btn').innerText = 'Continue'
    }