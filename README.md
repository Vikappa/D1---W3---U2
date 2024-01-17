# Pet Registry Interface

Il progetto consiste in una semplice interfaccia che consente di registrare i dettagli degli animali domestici in un database salvato nel localstorage del browser.

## Caratteristiche principali

- L'interfaccia è stata realizzata utilizzando Bootstrap 5 e JavaScript.
- Il metodo responsabile del rendering delle card gestisce anche la "riorganizzazione" del localstorage per riflettere le modifiche apportate dalle iterazioni precedenti del metodo.
- Gli oggetti salvati nel localstorage contengono la password dell'utente, e solo chi li ha inseriti ha il permesso di rimuoverli.
- Il listener del form aggiunge direttamente l'oggetto al localstorage e rirenderizza la pagina utilizzando i dati salvati.
- Non è possibile inserire oggetti duplicati nel database.
- I pulsanti presenti sulle card degli animali consentono di rimuovere l'oggetto corrispondente dal localstorage e rirenderizzare la pagina.
- Sono presenti ulteriori listener che monitorano la durata delle sessioni e stampano le informazioni rilevanti in console.


