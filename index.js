const BASE = "https://fsa-crud-2aa9294fe819.herokuapp.com/api";
const USER = "/2603-FTB-CT-WEB-PT";
const RESOURCE = "/events";
const API = `${BASE}${USER}${RESOURCE}`;

console.log("API", API);

//state
let events = [];
let selectedParty = null;

async function getAllEvents() {
  try {
    const response = await fetch(API);
    const result = await response.json();

    console.log(result);

    return result.data;
  } catch (error) {
    console.error("There was an error retrieving all events", error);
  }
}

const getSingleParty = async (id) => {
  try {
    const response = await fetch(`${API}/${id}`);
    const result = await response.json();

    console.log(result);

    selectedParty = result.data;
    render();
  } catch (error) {
    console.error("There was an error GETting individual event", error);
  }
};

// async function addParty(event) {
//   try {
//     await fetch(API, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(event),
//     });
//     getAllEvents();
//   } catch (error) {
//     console.error("There was an error POSTing events", error);
//   }
// }

// async function deleteParty(id) {
//     try {
//         await fetch(`${API}/${id}`, {
//             method: "DELETE",
//     });
//     selectedParty = undefined;

//     getAllEvents();
//     } catch (error) {
//         console.error("There was an error deleting the event", error);
//     }
// }

// components

function PartyListItem(event) {
  const $li = document.createElement("li");

  $li.innerHTML = `<a href="#selected">${event.name}</a>`;

  $li.addEventListener("click", async function () {
    await getSingleParty(event.id);
  });

  console.log(event);

  return $li;
}

function PartyList() {
  const $ul = document.createElement("ul");
  $ul.classList.add("events");

  const $events = events.map(PartyListItem);

  $ul.replaceChildren(...$events);

  return $ul;
}

function ReservationDisplay(event) {
  const $card = document.createElement("article");
  $card.classList.add("event");

  $card.innerHTML = `
        <h2>${event.name} #${event.id}</h2>

        
        <p>${event.id}</p>
        <p>${event.date}</p>
        <p>${event.description}</p>
        <p>${event.location}</p>
        
    `;

  $card.addEventListener("click", async function () {
    console.log("click");
    await getSingleParty(event.id);
  });

  return $card;
}

function SelectedParty() {
  if (!selectedParty) {
    const $p = document.createElement("p");
    $p.textContent = "Please click a event to view the details";
    return $p;
  }

  const $section = document.createElement("section");
  $section.classList.add("selected-event");

  $section.innerHTML = `
    <h3>Name: ${selectedParty.name} ID: #${selectedParty.id}</h3>
    <p>Date:</p><p>${selectedParty.date}</p>
    <p>Location:</p><p>${selectedParty.location}</p>
    <p>Description:</p><p> ${selectedParty.description}</p>
    
    `;

  return $section;
}

function PartyCollection() {
  const $collection = document.createElement("article");
  $collection.classList.add("events");

  const $events = events.map(ReservationDisplay);

  $collection.replaceChildren(...$events);

  return $collection;
}
// render

function render() {
  const $app = document.querySelector("#app");

  $app.innerHTML = `
    <h1>Party Planner</h1>

    <main>
    
    <section>
        <h2>Upcoming events</h2>
        <PartyList></PartyList>
    </section>
    
    <section>
        <h2>Party Details</h2>
        <SelectedParty></SelectedParty>
    </section>
    
    </main>
    `;

  $app.querySelector("PartyList").replaceWith(PartyList());
  $app.querySelector("SelectedParty").replaceWith(SelectedParty());
}

async function init() {
  events = await getAllEvents();
  render();
}
init();

// function NewPartyForm() {
//     const $form = document.createElement("form");
//     $form.innerHTML =`
//         <label>
//             Name
//             <input name="name" type="text" required>
//         </label>
//         <label>
//             Date and Address
//             <input name="tod" type="text" required>
//         </label>
//         <label>
//             Party Details
//             <input name="partydetails" type="text" reqiured>
//         </label>

//     `
// }

// getSingleParty(186);
