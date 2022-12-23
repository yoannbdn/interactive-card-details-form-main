    const numbers = document.getElementById('cardNumber')
    inputMirrorEffectCard(numbers, 'numbers-display', '0000 0000 0000 0000')

    const cardholdername = document.getElementById('cardholderName')
    inputMirrorEffect(cardholdername, 'cardholder-display', 'Jane Appleseed')

    const month = document.getElementById('cardExpirationMonth')
    inputMirrorEffect(month,'month-display','00')

    const year = document.getElementById('cardExpirationYear')
    inputMirrorEffect(year, 'year-display', '00')

    const cvc = document.getElementById('cvc')
    inputMirrorEffect(cvc, 'cvc-display', '000')

    // Fonction pour disposer le numéro de carte en paquets de 4 chiffres
    function formatCardNumber(number) {
        return number.toString()
            .split('')
            .join(' ')
            .replace(/([0-9]) ([0-9]) ([0-9]) ([0-9])\b/g, '$1$2$3$4')
      }

    // Fonction qui efface le formulaire et le remplace par le message de validation
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

    // Librairies de fonctions

    // Fonction pour attribuer les inputs saisis dans l'HTML d'un autre élément (Effet mirroir)
    function inputMirrorEffect (inputConstName, inputID, initialValueDisplay) {
        inputConstName.addEventListener('input', function() {
            if (inputConstName.value.length == 0) {
                document.getElementById(inputID).innerHTML = initialValueDisplay;
            } else {
                document.getElementById(inputID).innerHTML = this.value
            }
        })
    };    
    function inputMirrorEffectCard (inputConstName, inputID, initialValueDisplay) {
        inputConstName.addEventListener('input', function() {
            if (inputConstName.value.length == 0) {
                document.getElementById(inputID).innerHTML = initialValueDisplay;
            } else {
                let stringSpace = formatCardNumber(this.value)
                document.getElementById(inputID).innerHTML = stringSpace
            }
        })
    };   

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

    /*function isANumberFunction () {
        numbers.addEventListener('input', function(){
        if (isNaN(numbers)){
            document.getElementById("message").innerHTML = 'Veuillez saisir un nombre'
            return true
        }
        else {
            return false
        }})
    }*/

   /* document.getElementById('paymentForm').addEventListener("submit", function(e){
        // Retire le comportement par défaut du formulaire
        // e.preventDefault()
        let errorMessage
        if(!numbers.value) {

        }
    })*/

    // Fonction de vérification de la saisie des inputs et d'alerte en cas d'erreur

    // Messages imposés 
    /* "Wrong format, numbers only"
     "Can't be blank" */

    let form = document.getElementsByTagName('form')[0]
    // const numbers : numéros de CB
    // const cardholdername : nom du titulaire
    // const month : mois d'exp
    // const year : année d'exp
    // const cvc : crypto
    let error = document.querySelector(".error")


    /*cardholdername.addEventListener("input", function (event){
       // Chaque fois que l'utilisateur saisit qqchose, on vérifie la validité du champs numbers
       if (cardholdername.validity.typeMismatch){
        cardholdername.setCustomValidity('Veuillez saisir un nom')
       } else {
        cardholdername.setCustomValidity('')
       }
    })*/
    /*form.addEventListener("submit", function (event) {
        // Chaque fois que l'utilisateur tente d'envoyer les données
        // on vérifie que le champ email est valide.
        if (!email.validity.valid) {
      
          // S'il est invalide, on affiche un message d'erreur personnalisé
          error.innerHTML = "J'attends une adresse e-mail correcte, mon cher&nbsp;!";
          error.className = "error active";
          // Et on empêche l'envoi des données du formulaire
          event.preventDefault();
        }
      }, false);*/
      numbers.addEventListener('input', function(){
        inputNumCards = this.value
        console.log(this.value)

        console.log(inputNumCards.length)
        console.log(isNaN(inputNumCards))
        if (this.value.length == 16 && !isNaN(inputNumCards) == true ) {
            error.innerHTML = ""; // On réinitialise le contenu
            error.className = "error"; // On réinitialise l'état visuel du message
            console.log(`Numéro de carte valide`)
        } else if (this.value.length < 16
                    && this.value > 0
                    && !isNaN(this.value) == true
                    && this.value !== '                '){
            error.innerHTML = `Le numéro de carte est trop court`
            console.log(`Trop court`)
        } else if (this.value.length == 0) {
            error.innerHTML = `Can't be blank !`
        } else if (this.value == '                '){
            error.innerHTML = `NIKOUMOUK`
        } else {
            error.innerHTML = "Merci de renseigner CORRECTEMENT le numéro de ta carte sale fils de pute de ta mère !!!"
            console.log(`Input non valide`)
        }
      });