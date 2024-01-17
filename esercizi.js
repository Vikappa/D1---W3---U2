// class User {
//     constructor(firstName, lastName, age, location) {
//         this.firstName = firstName
//         this.lastName = lastName
//         this.age = age
//         this.location = location
//         this.confrontaEtàCon = function (soggetoConfronto) {
//             if (this.age > soggetoConfronto.age) {
//                 console.log(`E' più vecchio ${this.firstName}, che ha ${this.age} anni che ${soggetoConfronto.firstName} che ne ha ${soggetoConfronto.age}`)
//                 return `E' più vecchio ${this.firstName}, che ha ${this.age} anni che ${soggetoConfronto.firstName} che ne ha ${soggetoConfronto.age}`
//             }
//             if (this.age < soggetoConfronto.age) {
//                 console.log(`E' più vecchio ${soggetoConfronto.firstName}, che ha ${soggetoConfronto.age} anni che ${this.firstName} che ne ha ${this.age}`)
//                 return `E' più vecchio ${soggetoConfronto.firstName}, che ha ${soggetoConfronto.age} anni che ${this.firstName} che ne ha ${this.age}`
//             }
//             if (this.age === soggetoConfronto.age) {
//                 console.log(`${soggetoConfronto.firstName} e ${this.firstName} sono coetanei , hanno ${this.age} anni`)
//                 return `${soggetoConfronto.firstName} e ${this.firstName} sono coetanei , hanno ${this.age} anni`
//             }
//         }
//     }
// }

// const marioRossi = new User("Mario", "Rossi", 55, "Padova")
// const darioBianchi = new User("Dario", "Bianchi", 37, "Vicenza")
// const marcoNeri = new User("Marco", "Neri", 55, "Torino")
// marioRossi.confrontaEtàCon(darioBianchi)
// marioRossi.confrontaEtàCon(marcoNeri)
// darioBianchi.confrontaEtàCon(marcoNeri)
// console.log("") //spaziatura per i risultati del prossimo esercizio
/////////////////////////////////////////////////////////////////////////////////////////////////////
const campoPassword = document.getElementById('passwordUtente')
const listaPetSchermo = document.getElementById('listaPetSchermo')
const listaOwnerSchermo = document.getElementById('ownerList')
const divPets = document.getElementById('contenitoreListaPet')
const divOwners = document.getElementById('divOwners')
let listaPetAcquisiti = []
const form = document.getElementById('petForm')
const titolo1 = document.getElementById('titoloPets')
const titolo2 = document.getElementById('titoloProprietari')
const buttonrecylce = document.getElementById('recycle')
const btnInietta = document.getElementById('inietta')

let updateSessionTimers = 500 // secondi intervallo registrazione timer

let stringaPassword

campoPassword.addEventListener("input", function () {
    stringaPassword = passwordUtente.value
    svuotaListaPet()
    loadLocalStorage()
    updateSchermoPet()
    updateVisibilità()
})

class Pet {

    constructor(petName, petOwner, specie, razza) {
        this.petName = petName
        this.petOwner = petOwner
        this.specie = specie
        this.razza = razza
    }

    stringaPet() {
        return `${this.petName}, ${this.specie} di ${this.petOwner}, ${this.razza}`
    }

    stessoPadroneDi(otherPet) {
        if (this.petOwner === otherPet.petOwner) {
            return true
        } else {
            return false
        }
    }

    stringaPerOwnerCard() {
        return `${this.petName}, ${this.specie} ${this.razza}`
    }

}

class recordProprietario {
    constructor(nomeProprietario, arrayPet) {
        this.nomeProprietario = nomeProprietario
        this.ownZoo = arrayPet
    }



}

class Sessione {
    constructor(dataInizio, durata) {
        this.dataInizio
        this.durata
    }
}

const svuotaListaPet = function () {
    listaPetAcquisiti = []
}

const loadLocalStorage = function () {
    let arrayPetRecuperato = []
    let arrayRecuperato = [...Object.entries(localStorage)]

    for (let index = 0; index < arrayRecuperato.length; index++) {
        if (arrayRecuperato[index][0].includes(`_${stringaPassword}_`)) {
            arrayPetRecuperato.push(JSON.parse(arrayRecuperato[index][1]))
        }
    }

    for (let j = 0; j < arrayPetRecuperato.length; j++) {
        listaPetAcquisiti.push(arrayPetRecuperato[j])
    }

} // Aggiunge a listaPetAcquisiti gli elementi presenti in storage con la password corrente

const sincronizzaMemoriaUtente = function () {
    let arrayCaricato = [...Object.entries(localStorage)]
    arrayCaricato.forEach(oggettoCaricato => {
        if (oggettoCaricato[0].includes(`_${stringaPassword}_`))
            localStorage.removeItem(`${oggettoCaricato[0]}`)
    })

    for (let o = 0; o < listaPetAcquisiti.length; o++) {
        localStorage.setItem(`petListStorage_${stringaPassword}_${o}`, JSON.stringify(listaPetAcquisiti[o]))
    }

} // rimuove tutte le chiavi utente dell'user e le rimette a partire da 0, riordinandole NB: SALVA IN LOCALSTORAGE listaPetAcquisiti di questo user


const removePet = function (x) {
    listaPetAcquisiti.splice(x, 1) // Rimuovo l'elemento da listaPetAcquisiti
    updateSchermoPet()
    updateOwnerList()

} // rimuove l'elemento dal dom dal localstorage e dalla lista in esecuzione corrente e refresha tutto

const updateVisibilità = function () {
    if (listaPetAcquisiti.length > 0) {
        divPets.classList.remove('d-none')
    } else {
        divPets.classList.add('d-none')
    }
} // Rende visibile o invisibile i div contenitori di card in base alla lunghezza di listaPetAcquisiti

const updateSchermoPet = function () {
    listaPetSchermo.innerHTML = ``
    let stringaFinale = ``
    for (let i = 0; i < listaPetAcquisiti.length; i++) {
        stringaFinale = stringaFinale + `<div class="card m-1" style="width: 18rem;" id ="cardId${i}">
    <ul class="list-group list-group-flush">
      <li class="list-group-item fs-5 fw-bold p-0">${listaPetAcquisiti[i].petName}</li>
      <li class="list-group-item fs-6 p-0">Di ${listaPetAcquisiti[i].petOwner}</li>
      <li class="list-group-item fs-6 p-0">${listaPetAcquisiti[i].specie} ${listaPetAcquisiti[i].razza}</li>
      <span class="badge bg-secondary p-1 m-1 align-self-end bg-danger" onclick=removePet(${i}) >Rimuovi</span>
    </ul>
    </div>`
    }
    listaPetSchermo.innerHTML = stringaFinale
    sincronizzaMemoriaUtente()
} // renderizza le card pet a schermo in base a listaPetAcquisiti + richiama metodo sincronizzazione pet a schermo-localstorage

const addPet = function () {
    // I controlli che i campi siano riempiti vengono effettuati dal form
    let petName = document.getElementById('petName').value
    let petOwner = document.getElementById('petOwner').value
    let specie = document.getElementById('specie').value
    let razza = document.getElementById('razza').value

    let newpet = new Pet(petName, petOwner, specie, razza)

    let presente = false
    for (let f = 0; f < listaPetAcquisiti.length; f++) {
        if (JSON.stringify(newpet) === JSON.stringify(listaPetAcquisiti[f])) {// Controllo vhr non esista un oggetto uguale
            presente = true
            break
        } else { // Aggiungo a listaPetAcquisiti
            presente = false
        }
    }

    if (!presente) {
        listaPetAcquisiti.push(newpet)
        updateSchermoPet()
        updateVisibilità() // Questo metodo aggiorna lo schermo ma anche il localStorage
        updateOwnerList()
        //easterEgg(newpet)
    }

} // aggiunge il pet, salva in localstorage, aggiorna schermo

const easterEgg = function (newpet) {
    let pazuzu = new Pet('Pazuzu', 'Vincenzo', 'Gatto', 'Certosino')
    let lilith = new Pet('Lilith', 'Vincenzo', 'Gatto', 'Meticcia')
    let condizioneEasterEgg = false
    if (JSON.stringify(newpet) === JSON.stringify(pazuzu)) {// Se inserisci Pazuzu 
        listaPetAcquisiti.forEach(pet => {
            if (JSON.stringify(newpet) === JSON.stringify(lilith)) { //Controlla se c'è già Lilith
                condizioneEasterEgg = true
            }
        })
    }
    if (JSON.stringify(newpet) === JSON.stringify(lilith)) {// Se inserisci Lilith 
        listaPetAcquisiti.forEach(pet => {
            if (JSON.stringify(newpet) === JSON.stringify(pazuzu)) { //Controlla se c'è già Pazuzu
                condizioneEasterEgg = true
            }
        })
    }
    if (condizioneEasterEgg) {
        console.log("Attivo easterEgg")
    }
}

const badgesLine = function (ownerSc) {
    let stringaBadges = ``
    let gatti = 0
    let cani = 0
    let pesci = 0
    let uccelli = 0
    let draghi = 0
    let crostacei = 0
    let ragni = 0
    let insetti = 0
    let serpenti = 0

    for (let i = 0; i < ownerSc.ownZoo.length; i++) {
        if (JSON.parse(ownerSc.ownZoo[i]).specie === "Gatto") {
            gatti++
        }
        if (JSON.parse(ownerSc.ownZoo[i]).specie === "Cane") {
            cani++
        }
        if (JSON.parse(ownerSc.ownZoo[i]).specie === "Pesce") {
            pesci++
        }
        if (JSON.parse(ownerSc.ownZoo[i]).specie === "Uccello") {
            uccelli++
        }
        if (JSON.parse(ownerSc.ownZoo[i]).specie === "Drago") {
            draghi++
        }
        if (JSON.parse(ownerSc.ownZoo[i]).specie === "Crostaceo") {
            crostacei++
        }
        if (JSON.parse(ownerSc.ownZoo[i]).specie === "Ragno") {
            ragni++
        }
        if (JSON.parse(ownerSc.ownZoo[i]).specie === "Insetto") {
            insetti++
        }
        if (JSON.parse(ownerSc.ownZoo[i]).specie === "Serpente") {
            serpenti++
        }
    }
    //gatti
    if (gatti > 0 && gatti < 5) {
        stringaBadges = stringaBadges + `<div class="d-inline m-1 golden"><button type="button" class="bg-secondary position-relative border-0 rounded-3" 
        style="padding-bottom:1px; color: white; padding-bottom:1px;">
        <i class="fa-solid fa-cat"></i> Gattaro
      </button></div>`
    }
    if (gatti >= 5) {
        stringaBadges = stringaBadges + `<div class="d-inline m-1 golden"><button type="button" class="bg-secondary position-relative border-0 rounded-3" 
        style="padding-bottom:1px;background-color: purple!important; color: gold; font-weight:500; padding-bottom:1px;">
        <i class="fa-solid fa-cat"></i>Gattaro
        <span class="position-absolute start-100 translate-middle badge rounded-pill bg-black text-warning" style="padding-bottom:6px; padding-top: 3px; top:-3px">
          gold
        </span>
      </button></div>`    }
    //cani
    if (cani > 0 && cani < 5) {
        stringaBadges = stringaBadges + `<div class="d-inline m-1 golden"><button type="button" class="bg-secondary text-white  position-relative border-0 rounded-3" 
        style="padding-bottom:1px; padding-bottom:1px;">
        <i class="fa-solid fa-dog"></i> Canaro
      </button></div>`    }
    if (cani >= 5) {
        stringaBadges = stringaBadges + `<div class="d-inline m-1 golden"><button type="button" class="bg-secondary position-relative border-0 rounded-3" 
        style="padding-bottom:1px;background-color: purple!important; color: gold; font-weight:500; padding-bottom:1px;">
        <i class="fa-solid fa-dog"></i> Canaro
        <span class="position-absolute start-100 translate-middle badge rounded-pill bg-black text-warning" style="padding-bottom:6px; padding-top: 3px; top:-3px">
          gold
        </span>
      </button></div>`    }
    //pesci
    if (pesci > 0 && pesci < 5) {
        stringaBadges = stringaBadges + `<div class="d-inline m-1 golden"><button type="button" class="bg-secondary text-white  position-relative border-0 rounded-3" 
        style="padding-bottom:1px;padding-bottom:1px;">
        <i class="fa-solid fa-fish"></i> Pescatore
      </button></div>`    }
    if (pesci >= 5) {
        stringaBadges = stringaBadges + `<div class="d-inline m-1 golden"><button type="button" class="bg-secondary position-relative border-0 rounded-3" 
        style="padding-bottom:1px;background-color: purple!important; color: gold; font-weight:500; padding-bottom:1px;">
        <i class="fa-solid fa-fish"></i> Pescatore
        <span class="position-absolute start-100 translate-middle badge rounded-pill bg-black text-warning" style="padding-bottom:6px; padding-top: 3px; top:-3px">
          gold
        </span>
      </button></div>`    }
    //uccelli
    if (uccelli > 0 && uccelli < 5) {
        stringaBadges = stringaBadges + `<div class="d-inline m-1 golden"><button type="button" class="bg-secondary text-white  position-relative border-0 rounded-3" 
        style="padding-bottom:1px; padding-bottom:1px;">
        <i class="fa-solid fa-dove"></i> Avicoltore
      </button></div>`    }
    if (uccelli >= 5) {
        stringaBadges = stringaBadges + `<div class="d-inline m-1 golden"><button type="button" class="bg-secondary position-relative border-0 rounded-3" 
        style="padding-bottom:1px;background-color: purple!important; color: gold; font-weight:500; padding-bottom:1px;">
        <i class="fa-solid fa-dove"></i> Avicoltore
        <span class="position-absolute start-100 translate-middle badge rounded-pill bg-black text-warning" style="padding-bottom:6px; padding-top: 3px; top:-3px">
          gold
        </span>
      </button></div>`    }
    //draghi
    if (draghi > 0 && draghi < 5) {
        stringaBadges = stringaBadges + `<div class="d-inline m-1 golden"><button type="button" class="bg-secondary text-white position-relative border-0 rounded-3" 
        style="padding-bottom:1px;padding-bottom:1px;">
        <i class="fa-solid fa-dragon"></i> Dracomante
      </button></div>`    }
    if (draghi >= 5) {
        stringaBadges = stringaBadges + `<div class="d-inline m-1 golden"><button type="button" class="bg-secondary position-relative border-0 rounded-3" 
        style="padding-bottom:1px;background-color: purple!important; color: gold; font-weight:500; padding-bottom:1px;">
        <i class="fa-solid fa-dragon"></i> Dracomante
        <span class="position-absolute start-100 translate-middle badge rounded-pill bg-black text-warning" style="padding-bottom:6px; padding-top: 3px; top:-3px">
          gold
        </span>
      </button></div>`    }
    //crostacei
    if (crostacei > 0 && crostacei < 5) {
        stringaBadges = stringaBadges + `<div class="d-inline m-1 golden"><button type="button" class="bg-secondary text-white  position-relative border-0 rounded-3" 
        style="padding-bottom:1px; padding-bottom:1px;">
        <i class="fa-solid fa-shrimp"></i> Amico dei granchi
      </button></div>`    }
    if (crostacei >= 5) {
        stringaBadges = stringaBadges + `<div class="d-inline m-1 golden"><button type="button" class="bg-secondary position-relative border-0 rounded-3" 
        style="padding-bottom:1px;background-color: purple!important; color: gold; font-weight:500; padding-bottom:1px;">
        <i class="fa-solid fa-shrimp"></i> Amico dei granchi
        <span class="position-absolute start-100 translate-middle badge rounded-pill bg-black text-warning" style="padding-bottom:6px; padding-top: 3px; top:-3px">
          gold
        </span>
      </button></div>`    }
    //ragni
    if (ragni > 0 && ragni < 5) {
        stringaBadges = stringaBadges + `<div class="d-inline m-1 golden"><button type="button" class="bg-secondary text-white  position-relative border-0 rounded-3" 
        style="padding-bottom:1px;padding-bottom:1px;">
        <i class="fa-solid fa-spider"></i> Aracnofilo
      </button></div>`    }
    if (ragni >= 5) {
        stringaBadges = stringaBadges + `<div class="d-inline m-1 golden"><button type="button" class="bg-secondary position-relative border-0 rounded-3" 
        style="padding-bottom:1px;background-color: purple!important; color: gold; font-weight:500; padding-bottom:1px;">
        <i class="fa-solid fa-spider"></i> Aracnofilo
        <span class="position-absolute start-100 translate-middle badge rounded-pill bg-black text-warning" style="padding-bottom:6px; padding-top: 3px; top:-3px">
          gold
        </span>
      </button></div>`    }
    //insetti
    if (insetti > 0 && insetti < 5) {
        stringaBadges = stringaBadges + `<div class="d-inline m-1 golden"><button type="button" class="bg-secondary text-white position-relative border-0 rounded-3" 
        style="padding-bottom:1px; padding-bottom:1px;">
        <i class="fa-solid fa-locust"></i> Entomologo
      </button></div>`    }
    if (insetti >= 5) {
        stringaBadges = stringaBadges + `<div class="d-inline m-1 golden"><button type="button" class="bg-secondary position-relative border-0 rounded-3" 
        style="padding-bottom:1px;background-color: purple!important; color: gold; font-weight:500; padding-bottom:1px;">
        <i class="fa-solid fa-locust"></i> Entomologo
        <span class="position-absolute start-100 translate-middle badge rounded-pill bg-black text-warning" style="padding-bottom:6px; padding-top: 3px; top:-3px">
          gold
        </span>
      </button></div>`    }
    //serpenti
    if (serpenti > 0 && serpenti < 5) {
        stringaBadges = stringaBadges + `<div class="d-inline m-1 golden"><button type="button" class="bg-secondary text-white position-relative border-0 rounded-3" 
        style="padding-bottom:1px; padding-bottom:1px;">
        <i class="fa-solid fa-worm"></i> Erpetologo
      </button></div>`    }
    if (serpenti >= 5) {
        stringaBadges = stringaBadges + `<div class="d-inline m-1 golden"><button type="button" class="bg-secondary position-relative border-0 rounded-3" 
        style="padding-bottom:1px;background-color: purple!important; color: gold; font-weight:500; padding-bottom:1px;">
        <i class="fa-solid fa-worm"></i> Erpetologo
        <span class="position-absolute start-100 translate-middle badge rounded-pill bg-black text-warning" style="padding-bottom:6px; padding-top: 3px; top:-3px">
          gold
        </span>
      </button></div>`    }
    // zookeeper
    if (gatti + cani + pesci + uccelli + draghi + crostacei + ragni + insetti + serpenti > 19) {
        stringaBadges = stringaBadges + `<div class="d-inline m-1 golden"><button type="button" class="bg-secondary position-relative border-0 rounded-3" 
        style="padding-bottom:1px;background-color: purple!important; color: gold; font-weight:500; padding-bottom:1px;">
        <i class="fa-solid fa-ranking-star"></i> Zoologo
        <span class="position-absolute start-100 translate-middle badge rounded-pill bg-black text-warning" style="padding-bottom:6px; padding-top: 3px; top:-3px">
          platinum
        </span>
      </button></div>`
    }

    return stringaBadges
} // Ritorna una stringa innerHtml con i badges 

const updateOwnerList = function () {
    listaOwnerSchermo.innerHTML = ``
    let alberoCompleto = [...Object.entries(localStorage)]
    if (alberoCompleto.length > 0) {
        divOwners.classList.remove('d-none')
    } else {
        divOwners.classList.add('d-none')
    }

    let listaProprietari = []

    // Metto in un array le singole iterazioni di ogni owner
    for (let index = 0; index < alberoCompleto.length; index++) {
        let petScope = JSON.parse(alberoCompleto[index][1])
        listaProprietari.push(petScope.petOwner)
    }

    const setDiOwners = new Set(listaProprietari)
    listaProprietari = [...setDiOwners]

    // Preparo un array da riempire con oggetti fatti di nomeProprietario e un array di suoi pet
    let listaOwnerScore = []

    listaProprietari.forEach(owner => {
        let personalZoo = []
        alberoCompleto.forEach(controlloOwner => {
            if (JSON.parse(controlloOwner[1]).petOwner === owner) {
                personalZoo.push(controlloOwner[1])// Scorre tutto il localstorage e aggiunge all'array personale i pet con quel padrone
            }
        })
        let newRecord = new recordProprietario(owner, personalZoo)
        listaOwnerScore.push(newRecord)
    })
    let stringaFinaleHtmlOwnerCards = ``

    listaOwnerScore.forEach(ownerScore => {

        let stringaOggettiPetHtml = ``
        for (let g = 0; g < ownerScore.ownZoo.length; g++) {

            if (ownerScore.nomeProprietario === JSON.parse(ownerScore.ownZoo[g]).petOwner) {
                let ownerPet = new Pet(JSON.parse(ownerScore.ownZoo[g]).petName, JSON.parse(ownerScore.ownZoo[g]).petOwner, JSON.parse(ownerScore.ownZoo[g]).specie, JSON.parse(ownerScore.ownZoo[g]).razza)
                stringaOggettiPetHtml = stringaOggettiPetHtml +
                    `<p class="fs-700">${ownerPet.petName}, ${ownerPet.specie} ${ownerPet.razza}</p>`
            }
        }

        stringaFinaleHtmlOwnerCards = stringaFinaleHtmlOwnerCards + `<div class="card mb-3" style="max-width: 540px;">
          <div class="row no-gutters">
            <div class="col-md-4">
            <h5 class="card-title">${ownerScore.nomeProprietario}</h5>
            </div>
            <div class="col-md-8">
              <div class="card-body">
                ${stringaOggettiPetHtml}
              </div>
            </div>
          </div>
          <h6>Badges:${badgesLine(ownerScore)}</h6>
        </div>`
    })
    listaOwnerSchermo.innerHTML = stringaFinaleHtmlOwnerCards
} // Basato su listaPetAquisiti, refresha le card a schermo



form.addEventListener('submit', function (e) {
    e.preventDefault() // fermiamo la pagina dal refresh
    addPet()
})

//////////////////////////////////////////////////////////////////////////////////////////
let mouseX
let mouseY
document.addEventListener('mousemove', function (event) {
    // Ottieni le coordinate del mouse
    mouseX = event.clientX
    mouseY = event.clientY
})

const startRecordingSession = function () {
    let chiave = new Date().getTime()
    let inizioSessione = `[${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}]`
    let varTimer = 0

    const updateSessioneInMemoria = function () {
        varTimer
        const oggettoTime = new Sessione("usersession" + chiave, inizioSessione)
        varTimer += updateSessionTimers
        let currentTime = sessionStorage.getItem('counterTime')
        if (sessionStorage.getItem(`"usersession{chiave}"`) !== null) {

        }
        sessionStorage.setItem(`"usersession${chiave}"`, "Inizio sesione: " + inizioSessione + " Secondi: [" + varTimer + "] elemento evidenziato: " + document.elementFromPoint(mouseX, mouseY).tagName + " " + document.elementFromPoint(mouseX, mouseY).id + " " + document.elementFromPoint(mouseX, mouseY).classList)
    }



    intervalloUpdate = setInterval(updateSessioneInMemoria, updateSessionTimers)

    window.addEventListener('beforeunload', function () {
        clearInterval(intervalloUpdate)
    })
    console.log(inizioSessione)
}

//////////////////////////////////////////////////////////////////////////////////////////
loadLocalStorage() //Aggiungo il localStorage alla listaPetAcquisiti alla prima iterazione
updateSchermoPet() // Prima renderizzazione
updateVisibilità() // Update prima renderizzazione
updateOwnerList() // Carica dal localStorage i nomi di tutti gli utenti e i loro score
startRecordingSession() // Salva variabili in sessionStorage

buttonrecylce.addEventListener("click", function () {
    console.log("prova")
    localStorage.clear()
    updateSchermoPet()
    updateOwnerList()
    let self = this

    self.classList.remove('btn-info')
    self.classList.add("btn-success")

    setTimeout(function () {
        self.classList.remove('btn-success')
        self.classList.add("btn-light")
        self.classList.add("text-white")
        setTimeout(function () {
            self.classList.remove('text-white')
            self.classList.remove('btn-light')
            self.classList.add("btn-info")
        }, 500)
    }, 1000)

    updateSchermoPet()
    updateOwnerList()
})

btnInietta.addEventListener("click", function () {
    let self = this

    self.classList.remove('btn-info')
    self.classList.add("btn-success")

    setTimeout(function () {
        self.classList.remove('btn-success')
        self.classList.add("btn-light")
        self.classList.add("text-white")
        setTimeout(function () {
            self.classList.remove('text-white')
            self.classList.remove('btn-light')
            self.classList.add("btn-info")
        }, 500)
    }, 1000)
    const pazuzuCat = new Pet("Pazuzu", "Vincenzo", "Gatto", "Certosino")
    const lilithCat = new Pet("Lilith", "Vincenzo", "Gatto", "Meticcia")
    const panzoneFish = new Pet("Panzone", "Vincenzo", "Pesce", "Rosso")
    const smaughDragon = new Pet("Smaugh", "Stefano", "Drago", "Rosso")
    const Furbuzz = new Pet("Furbuzz", "Bob", "Cane", "Bulldog")
    const PrincessHiss = new Pet("Princess Hiss", "Samurai ", "Ragno", "Saltatore")
    const SirNapsalot = new Pet("Sir Naps'a'lot", "Giovanni", "Gatto", "Rosso")
    const LadyMeowface = new Pet("Lady Meowface", "Alice", "Gatto", "Siberiano")
    const Whiskers = new Pet("Whiskers", "Alice", "Cane", "Labrador")
    const dudu = new Pet("Dudu", "Berlusconi", "Cane", "Barboncino")
    const Bip = new Pet("Bip", "Mr. Nimbus", "Crostaceo", "Gamberetto")
    const star = new Pet("Scintilla", "Mr. Nimbus", "Pesce", "Stella marina")
    const pescezebra = new Pet("Haunter", "Mr. Nimbus", "Pesce", "Zebra")
    const assistente = new Pet("assistente", "Mr. Nimbus", "Pesce", "Pagliaccio")
    const willy = new Pet("Willy", "Mr. Nimbus", "Pesce", "Orca Assassina")
    const Danmny = new Pet("Danmny", "Mr. Nimbus", "Pesce", "Orca Assassina")
    const MobyDick = new Pet("Moby Dick", "Mr. Nimbus", "Balena", "Bianca")
    const Pyton = new Pet("Pyton", "Simone", "Serpente", "Pitone")
    const olmo = new Pet("Olmo", "Mr. Nimbus", "Pesce", "Spada")
    const Pamper = new Pet("Pamper", "Mr. Nimbus", "Pesce", "Manta")
    const albert = new Pet("Albert", "Mr. Nimbus", "Pesce", "Palla")
    const zorua = new Pet("Zorua", "Mr. Nimbus", "Pesce", "Fantasma")
    const deeper = new Pet("Deeper", "Mr. Nimbus", "Pesce", "Abissale")
    const Vruum = new Pet("Visconte Vruum", "Donatello", "Serpente", "Anaconda")
    const Fluffenstein = new Pet("Fluffenstein", "Eva", "Cane", "Meticcio")
    const Bark = new Pet("Bark Twain", "Frank", "Cane", "Beogle")
    const napoleon = new Pet("Napoleon", "Frank", "Crostaceo", "Granchio")
    const cip = new Pet("Cipper", "Bob", "Uccello", "Pappagallo")

    localStorage.setItem("petListStorage_aaa_0", JSON.stringify(pazuzuCat))
    localStorage.setItem("petListStorage_aaa_1", JSON.stringify(lilithCat))
    localStorage.setItem("petListStorage_aaa_2", JSON.stringify(panzoneFish))
    localStorage.setItem("petListStorage_bbb_5", JSON.stringify(smaughDragon))
    localStorage.setItem("petListStorage_ccc_4", JSON.stringify(Furbuzz))
    localStorage.setItem("petListStorage_ccc_5", JSON.stringify(cip))
    localStorage.setItem("petListStorage_ddd_2", JSON.stringify(PrincessHiss))
    localStorage.setItem("petListStorage_eee_0", JSON.stringify(SirNapsalot))
    localStorage.setItem("petListStorage_fff_1", JSON.stringify(LadyMeowface))
    localStorage.setItem("petListStorage_fff_2", JSON.stringify(Whiskers))
    localStorage.setItem("petListStorage_eee_0", JSON.stringify(dudu))
    localStorage.setItem("petListStorage_ggg_0", JSON.stringify(Bip))
    localStorage.setItem("petListStorage_ggg_1", JSON.stringify(star))
    localStorage.setItem("petListStorage_ggg_2", JSON.stringify(pescezebra))
    localStorage.setItem("petListStorage_ggg_4", JSON.stringify(assistente))
    localStorage.setItem("petListStorage_ggg_7", JSON.stringify(willy))
    localStorage.setItem("petListStorage_ggg_8", JSON.stringify(Danmny))
    localStorage.setItem("petListStorage_ggg_9", JSON.stringify(MobyDick))
    localStorage.setItem("petListStorage_fff_10", JSON.stringify(Pyton))
    localStorage.setItem("petListStorage_ggg_10", JSON.stringify(olmo))
    localStorage.setItem("petListStorage_ggg_11", JSON.stringify(Pamper))
    localStorage.setItem("petListStorage_ggg_12", JSON.stringify(albert))
    localStorage.setItem("petListStorage_ggg_13", JSON.stringify(zorua))
    localStorage.setItem("petListStorage_ggg_14", JSON.stringify(deeper))
    localStorage.setItem("petListStorage_hhh_2", JSON.stringify(Vruum))
    localStorage.setItem("petListStorage_iii_2", JSON.stringify(Fluffenstein))
    localStorage.setItem("petListStorage_jjj_2", JSON.stringify(Bark))
    localStorage.setItem("petListStorage_jjj_2", JSON.stringify(napoleon))


    updateSchermoPet()
    updateOwnerList()

})