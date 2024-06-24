//TODO: Erstelle einen Rechner, mit dem du aus dem Rechnungsbetrag folgende Sachen machen kannst:
// 1) Du kannst den Rechnungsbetrag eingeben
// 2) Du kannst angeben, wie viele Leute sich den Betrag teilen und
// 3) Du kannst das Trinkgeld berechnen, indem du je nach Zufriedenheit mit dem Service einen unterschiedlichen Prozentsatz (Schlechter Service: 2% Trinkgeld, Mittlerer Service: 10% Trinkgeld, Super Service: 20% Trinkgeld) auswählst. Es wird dir angezeigt, wie hoch die Summe des Trinkgeldes ist, wie hoch der insgesamt Rechnungsbetrag ist und wie viel jede:r in der Gruppe zahlen muss.

//? Alle Elemente holen
const invoiceAmountElement = document.getElementById(
  "AmountInputElement"
) as HTMLInputElement;
const numberOfPersonsElement = document.getElementById(
  "inputNumberOfPersonsElement"
) as HTMLInputElement;
const selectServiceElement = document.getElementById(
  "selectServiceQualityElement"
) as HTMLInputElement;
const calculateButton = document.getElementById("button") as HTMLInputElement;
const resultFieldElement = document.getElementById("resultSectionElement");

//? Eventlistener definieren
calculateButton?.addEventListener("click", calculate);

//? Berechnung
function calculate(event: MouseEvent) {
  event.preventDefault();
  // console.log("Klick");
  // Trinkgeld berechnen
  const invoiceAmount: number = parseFloat(invoiceAmountElement.value);
  console.log(invoiceAmount);

  const numberOfPersons: number = parseFloat(numberOfPersonsElement.value);

  const serviceSelection: string = selectServiceElement.value;
  console.log(serviceSelection);

  function calculateTip(
    invoiceAmount: number,
    serviceSelection: string
  ): number {
    let tip: number = 0;
    switch (serviceSelection) {
      case "super":
        tip = 0.2;
        break;
      case "medium":
        tip = 0.1;
        break;
      case "bad":
        tip = 0.02;
        break;
    }
    return invoiceAmount * tip;
  }

  const finalTip = calculateTip(invoiceAmount, serviceSelection);
  console.log(finalTip);
  const globalAmount = finalTip + invoiceAmount;
  const pricePerPerson = globalAmount / numberOfPersons;
  resultElements(finalTip, globalAmount, pricePerPerson);
}

//?Result Element erzeugen
function resultElements(
  finalTip: number,
  globalAmount: number,
  pricePerPerson: number
) {
  if (resultFieldElement) {
    resultFieldElement.innerHTML = "";
  }
  const card = document.createElement("div");
  card.className = "ResultCard";
  const tipElement = document.createElement("p");
  tipElement.innerText = `Das Trinkgeld beträgt ${finalTip.toFixed(2)} EUR`;
  card.appendChild(tipElement);
  const globalAmountElement = document.createElement("p");
  globalAmountElement.innerText = `Die Gesamtsumme beträgt ${globalAmount.toFixed(
    2
  )} EUR`;
  card.appendChild(globalAmountElement);
  const pricePerPersonElement = document.createElement("p");
  pricePerPersonElement.innerText = `Der Preis pro Person beträgt ${pricePerPerson.toFixed(
    2
  )} EUR`;
  card.appendChild(pricePerPersonElement);
  resultFieldElement?.appendChild(card);
}
