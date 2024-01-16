class User {
    constructor(firstName, lastName, age, location) {
        this.firstName = firstName
        this.lastName = lastName
        this.age = age
        this.location = location
        this.confrontaEtàCon = function (soggetoConfronto) {
            if (this.age > soggetoConfronto.age) {
                console.log(`E' più vecchio ${this.firstName}, che ha ${this.age} anni che ${soggetoConfronto.firstName} che ne ha ${soggetoConfronto.age}`)
                return `E' più vecchio ${this.firstName}, che ha ${this.age} anni che ${soggetoConfronto.firstName} che ne ha ${soggetoConfronto.age}`
            }
            if (this.age < soggetoConfronto.age) {
                console.log(`E' più vecchio ${soggetoConfronto.firstName}, che ha ${soggetoConfronto.age} anni che ${this.firstName} che ne ha ${this.age}`)
                return `E' più vecchio ${soggetoConfronto.firstName}, che ha ${soggetoConfronto.age} anni che ${this.firstName} che ne ha ${this.age}`
            }
            if (this.age === soggetoConfronto.age) {
                console.log(`${soggetoConfronto.firstName} e ${this.firstName} sono coetanei , hanno ${this.age} anni`)
                return `${soggetoConfronto.firstName} e ${this.firstName} sono coetanei , hanno ${this.age} anni`
            }
        }
    }
}

const marioRossi = new User("Mario", "Rossi", 55, "Padova")
const darioBianchi = new User("Dario", "Bianchi", 37, "Vicenza")
const marcoNeri = new User("Marco", "Neri", 55, "Torino")
console.log("") //spaziatura per i risultati del prossimo esercizio
/////////////////////////////////////////////////////////////////////////////////////////////////////
const campoPassword = document.getElementById('passwordUtente')
const listaPetSchermo = document.getElementById('listaPetSchermo')
const listaOwnerSchermo = document.getElementById('ownerList')
const divPets = document.getElementById('contenitoreListaPet')
let listaPetAcquisiti = []
const form = document.getElementById('petForm')
const titolo1 = document.getElementById('titoloPets')
const titolo2 = document.getElementById('titoloProprietari')

marioRossi.confrontaEtàCon(darioBianchi)
marioRossi.confrontaEtàCon(marcoNeri)
darioBianchi.confrontaEtàCon(marcoNeri)

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

        easterEgg(newpet)
    }

}

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

const updateOwnerList = function () {

}

loadLocalStorage() //Aggiungo il localStorage alla listaPetAcquisiti alla prima iterazione
updateSchermoPet() // Prima renderizzazione
updateVisibilità() // Update prima renderizzazione
updateOwnerList() // Carica dal localStorage i nomi di tutti gli utenti e i loro score


form.addEventListener('submit', function (e) {
    e.preventDefault() // fermiamo la pagina dal refresh
    addPet()
    console.log("")//Spaziatura di cortesia
})
