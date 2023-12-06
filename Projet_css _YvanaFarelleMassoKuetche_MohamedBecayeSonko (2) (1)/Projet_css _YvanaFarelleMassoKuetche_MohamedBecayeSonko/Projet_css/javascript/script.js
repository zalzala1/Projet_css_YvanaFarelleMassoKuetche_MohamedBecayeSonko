document.addEventListener('DOMContentLoaded', () => {
    // Interaction et réactivité
    const navbarLinks = document.querySelectorAll('.navbar a');
    navbarLinks.forEach(link => {
        link.addEventListener('mouseover', () => {
            link.style.color = 'blue'; // Changement de couleur au survol
        });
        link.addEventListener('mouseout', () => {
            link.style.color = ''; // Retour à la couleur originale
        });
    });

    // Changement de style en fonction de la taille de l'écran
    function adjustStyleForScreenSize() {
        if (window.innerWidth < 600) {
            document.body.style.backgroundColor = '#f0f0f0';
        } else {
            document.body.style.backgroundColor = '';
        }
    }

    window.addEventListener('resize', adjustStyleForScreenSize);
    adjustStyleForScreenSize(); // Appel initial

    // Ajout et suppression de paragraphes
    const addParaButton = document.getElementById('addParagraph');
    const removeParaButton = document.getElementById('removeParagraph');
    const mainContent = document.querySelector('main');

    addParaButton.addEventListener('click', () => {
        const para = document.createElement('p');
        para.textContent = 'Nouveau paragraphe ajouté';
        mainContent.appendChild(para);
    });

    removeParaButton.addEventListener('click', () => {
        if (mainContent.children.length > 1) { // Garde le formulaire toujours présent
            mainContent.removeChild(mainContent.lastChild);
        }
    });

    // Validation du formulaire
    const form = document.getElementById('registrationForm');
    form.addEventListener('submit', (event) => {
        const email = form.querySelector('input[type="email"]').value;
        const regexemail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        const phone = form.querySelector('input[placeholder="Numero de telephone"]').value;
        const regexPhone = /^[0-9]{10}$/;

        if (!regexEmail.test(email)) {
            alert('Adresse email non valide.');
            event.preventDefault(); // Empêche la soumission du formulaire
        }

        if (!regexPhone.test(phone)) {
            alert('Numéro de téléphone non valide.');
            event.preventDefault();
        }

        // Autres validations...
        
        alert('Formulaire soumis avec succès!'); // Message après soumission
    });
    
});
new Vue({
    el: "#app",
    data() {
      return {
        currentCardBackground: Math.floor(Math.random()* 25 + 1), // just for fun :D
        cardName: "",
        cardNumber: "",
        cardMonth: "",
        cardYear: "",
        cardCvv: "",
        minCardYear: new Date().getFullYear(),
        amexCardMask: "#### ###### #####",
        otherCardMask: "#### #### #### ####",
        cardNumberTemp: "",
        isCardFlipped: false,
        focusElementStyle: null,
        isInputFocused: false
      };
    },
    mounted() {
      this.cardNumberTemp = this.otherCardMask;
      document.getElementById("cardNumber").focus();
    },
    computed: {
      getCardType () {
        let number = this.cardNumber;
        let re = new RegExp("^4");
        if (number.match(re) != null) return "visa";
  
        re = new RegExp("^(34|37)");
        if (number.match(re) != null) return "amex";
  
        re = new RegExp("^5[1-5]");
        if (number.match(re) != null) return "mastercard";
  
        re = new RegExp("^6011");
        if (number.match(re) != null) return "discover";
        
        re = new RegExp('^9792')
        if (number.match(re) != null) return 'troy'
  
        return "visa"; // default type
      },
          generateCardNumberMask () {
              return this.getCardType === "amex" ? this.amexCardMask : this.otherCardMask;
      },
      minCardMonth () {
        if (this.cardYear === this.minCardYear) return new Date().getMonth() + 1;
        return 1;
      }
    },
    watch: {
      cardYear () {
        if (this.cardMonth < this.minCardMonth) {
          this.cardMonth = "";
        }
      }
    },
    methods: {
      flipCard (status) {
        this.isCardFlipped = status;
      },
      focusInput (e) {
        this.isInputFocused = true;
        let targetRef = e.target.dataset.ref;
        let target = this.$refs[targetRef];
        this.focusElementStyle = {
          width: `${target.offsetWidth}px`,
          height: `${target.offsetHeight}px`,
          transform: `translateX(${target.offsetLeft}px) translateY(${target.offsetTop}px)`
        }
      },
      blurInput() {
        let vm = this;
        setTimeout(() => {
          if (!vm.isInputFocused) {
            vm.focusElementStyle = null;
          }
        }, 300);
        vm.isInputFocused = false;
      }
    }
  });
