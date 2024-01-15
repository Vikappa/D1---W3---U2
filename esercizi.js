class User {
    constructor(firstName, lastName, age, location) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.age = age;
        this.location = location;
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

marioRossi.confrontaEtàCon(darioBianchi)
marioRossi.confrontaEtàCon(marcoNeri)
darioBianchi.confrontaEtàCon(marcoNeri)
console.log("") //spaziatura per i risultati del prossimo esercizio

/////////////////////////////////////////////////////////////////////////////////////////////////////
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

const listaPetSchermo = document.getElementById('listaPetSchermo')
let listaPetAcquisiti = []
const form = document.getElementById('petForm')
const updatePetListSchermo = function () {
    listaPetSchermo.innerHTML = ``

    let listaRitorno = ``

    for (let index = 0; index < listaPetAcquisiti.length; index++) {
        listaRitorno = listaRitorno + `<div class="card m-1" style="width: 18rem;">
        <ul class="list-group list-group-flush">
          <li class="list-group-item">${listaPetAcquisiti[index].petName}</li>
          <li class="list-group-item">${listaPetAcquisiti[index].specie}, ${listaPetAcquisiti[index].razza}</li>
          <li class="list-group-item">Di ${listaPetAcquisiti[index].petOwner}</li>
        </ul>
      </div>`
    }

    listaPetSchermo.innerHTML = listaRitorno
}

const checkOwners = function () {

    //console.log("Owner di più gatti " + listaOwner)
}


const addPet = function () {
    // I controlli che i campi siano riempiti vengono effettuati dal form
    let petName = document.getElementById('petName').value
    let petOwner = document.getElementById('petOwner').value
    let specie = document.getElementById('specie').value
    let razza = document.getElementById('razza').value

    let newpet = new Pet(petName, petOwner, specie, razza)

    let presente = false

    listaPetAcquisiti.forEach(pet => {
        if (pet.stringaPet() === newpet.stringaPet()) {
            presente = true
        }
    });

    if (!presente) {
        listaPetAcquisiti.push(newpet)
    }



}


form.addEventListener('submit', function (e) {
    e.preventDefault() // fermiamo la pagina dal refresh
    addPet()
    updatePetListSchermo()
    checkOwners()

    for (let index = 0; index < listaPetAcquisiti.length; index++) {
        console.log(listaPetAcquisiti[index].stringaPet())
    }
    console.log("")//Spaziatura di cortesia
})