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

    // Fonction pour attribuer les inputs saisis dans l'HTML d'un autre élément
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
        let formulaire = document.getElementById('paymentForm')
        deleteChildren ('paymentForm')
        formulaire.appendChild(document.createElement('div'))
        classAttribution("#paymentForm div", "confirmation")
        createInjectedBalise("#paymentForm div", 'svg', '<svg width="80" height="80" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="40" cy="40" r="40" fill="url(#a)"/><path d="M28 39.92 36.08 48l16-16" stroke="#fff" stroke-width="3"/><defs><linearGradient id="a" x1="-23.014" y1="11.507" x2="0" y2="91.507" gradientUnits="userSpaceOnUse"><stop stop-color="#6348FE"/><stop offset="1" stop-color="#610595"/></linearGradient></defs></svg>')
        createInjectedBalise("#paymentForm div", 'h2', '<h2>Thank you !</h2>')
        createInjectedBalise("#paymentForm div", 'p', "<p>We've added your card details</p>")
        createInjectedBalise("#paymentForm div", 'button', `<button type="submit" id="form-btn" class="btn">Continue</button>`)
    }


    // Fonction pour supprimer tous les enfants
    function deleteChildren (elementID) {
        let element = document.getElementById(elementID)
        while (element.firstChild){
            element.removeChild(element.firstChild)
        }
    }
    //Fonction d'attribution de classe depuis l'arborescence
    function classAttribution (chemin, classe) {
        let elementWay = document.querySelector(chemin)
        elementWay.classList.add(classe)
    }
    //  Fonction pour injecter des élements dans le HTML
    function createInjectedBalise (chemin, typeOfBalise, contenuAInclure){
        let elementSelectionne = document.querySelector(chemin)
        elementSelectionne.appendChild(document.createElement(typeOfBalise))
        let nouveauChemin = chemin + " " + typeOfBalise
        let injectToBalise = document.querySelector(nouveauChemin)
        injectToBalise.outerHTML = contenuAInclure
    }
    


    
    
    