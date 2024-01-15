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
const listaPetSchermo = document.getElementById('listaPetSchermo')
let listaPetAcquisiti = []

const updatePetList = function () {
    listaPetSchermo.innerHTML = ``
}

const addPet = function () {
    updatePetList()



    let pRitorno
}

