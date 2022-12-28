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

      function spacer(){
        this.toString()
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


    // Système de vérification des inputs et d'alertes "utilisateur"
        // Vérification du numéro de carte en temps réél
        let errorNb = document.querySelector(".error-nb")
        let failInput = '                '
        numbers.addEventListener('input', numbersVerificator(){
            if (this.value.length == 16 && !isNaN(this.value) == true ) {
                errorNb.innerHTML = ""; // On réinitialise le contenu
                errorNb.className = "error-nb"; // On réinitialise l'état visuel du message
                console.log(`Numéro de carte valide`)
                check1 = 1
                console.log('Checked')
                return true

            } else if (this.value.length < 16
                        && this.value > 0
                        && !isNaN(this.value) == true) {
                            errorNb.innerHTML = `Too short !`
                        console.log(`Trop court de ` + (16 - this.value.length))
                        check1 = check1 * 0,12
            } else if (this.value.length == 0) {
                errorNb.innerHTML = `Can't be blank !`
                check1 = check1 * 0,12
            } else if (this.value == failInput){
                errorNb.innerHTML = `NIKOUMOUK`
                check1 = check1 * 0,12
            } else {
                errorNb.innerHTML = 'Wrong format, numbers only.'
                console.log(`Input non valide, ce ne sont pas des nombres`)
                check1 = check1 * 0,12
            }
        });
        function jumpInputs () {
            if ( numbersVerificator() == true ){
                month.focus()
                }
            }

      // Vérification du nom du titulaire en temps réel 
      let errorCardholder = document.querySelector(`.error-cardholder`)
      cardholdername.addEventListener('input', function(){
        if (this.value.length == 0){
            errorCardholder.innerHTML = `Can't be blank !`
            check2 = check2 * 0,12
        } else if (isNaN(this.value) == true){
            if (this.value.length !== 0 && this.value.length <= 3)  {
                errorCardholder.innerHTML = 'Too short..'
                check2 = check2 * 0,12
            } else {
                errorCardholder.innerHTML = ''
                errorCardholder.className = 'error-cardholder'
                check2 = 1
                console.log('Checked')

            }
        } else {
            errorCardholder.innerHTML = 'Wrong format, letters only.'
            check2 = check2 * 0,13
        }
      });

      // Vérification de la date d'expiration de la carte
      let today = new Date()
      let todayMonth = today.getMonth() + 1
      let todayYear = today.getYear() - 100
      let inputMonth = 0
      let inputYear = 0

      let errorDate = document.querySelector(`.error-date`)
      
      // Récupération de l'input month
      month.addEventListener('input', function(){
          if (this.value.length == 0){
              errorDate.innerHTML = `Can't be blank !`
            } else if (this.value.length == 2 && !isNaN(this.value) == true) {
                inputMonth = this.value
                expirationTest()
                year.focus()
            }
            else {
                errorDate.innerHTML = 'Wrong format.'
            }
            
        })
        
      // Récupération de l'input year
      year.addEventListener('input', function(){
        if (this.value.length == 0){
            errorDate.innerHTML = `Can't be blank !`
        } else if (this.value.length == 2 && !isNaN(this.value) == true) {
            inputYear = this.value
            expirationTest()
            cvc.focus()
        } 
        else {
            errorDate.innerHTML = 'Wrong format.'
        }
        
    })

    function expirationTest () {
        console.log(`Date actuelle : ` + todayMonth + `/` + todayYear)
        console.log(`Expiration de la carte : ` + inputMonth + `/`+ inputYear)
  
        if (inputYear == todayYear && inputMonth >= todayMonth && inputMonth <= 12){
            console.log(`Exp. de carte : OK
                ==================`)
                errorDate.innerHTML = ''
                errorDate.className = 'error-date'
                return true

            /*if (inputMonth >= todayMonth && inputMonth <= 12){
                console.log(`Exp. de carte : OK
                ==================`)
                errorDate.innerHTML = ''
                errorDate.className = 'error-date'
                return true
            } else {
                console.log ('Mois invalide')
                errorDate.innerHTML = `Expirated..`
                return false
            }*/
        } else if (inputYear > todayYear && inputMonth > 0 && inputMonth <= 12){
            console.log(`Exp. de carte : OK 2023
                ==================`)
            errorDate.innerHTML = ''
            errorDate.className = 'error-date'
            return true
        } else if (inputMonth > 12 || inputMonth < 1) {
            errorDate.innerHTML = `Wrong format`
        }
        else {
            errorDate.innerHTML = `Expirated`
            console.log("Date d'expiration de carte invalide")
            return false
        }
    }


      // Vérification du CVC
    let errorCvc = document.querySelector(`.error-cvc`)
    cvc.addEventListener('input', function(){
        if (this.value.length == 0){
            errorCvc.innerHTML = `Can't be blank !`
            check5 = check5 * 0.11
        } else if (!isNaN(this.value) == true){
            if (this.value.length == 3){
                errorCvc.innerHTML = ''
                errorCvc.className = 'error-cvc'
                check5 = 1
                console.log('Checked')
            } else {
                errorCvc.innerHTML = `Too short...`
                check5 = check5 * 0.11
            }
        } else {
            errorCvc.innerHTML = 'Wrong format, numbers only.'
            check5 = check5 * 0.11
        }
    });

        // Création de variables permettant de checker tous les inputs
        let check1, check2 = 2
        let check3, check4 = 3
        let check5 = 4
        let sumCheck = check1+check2+check3+check4+check5
            // Chaque verification ci-dessus implémenteront true/false dans les checks
            // Si tous les checkers sont true = le formulaire est valide
        
            function validForm () {
                if ( sumCheck == 5){
                    console.log('Le formulaire est valide')
                    return true
                    formulaire.preventDefault()
                } else {
                    formulaire.preventDefault()
                    console.log('Invalid Form')
                    return false
                }
            }