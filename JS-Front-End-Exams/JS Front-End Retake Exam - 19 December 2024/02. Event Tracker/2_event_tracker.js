window.addEventListener("load", solve);

function solve() {
  const eventTracker = {
    inputs: [...document.querySelectorAll("input")],
    saveBtn: document.querySelector("#save"),
    deleteBtn: document.querySelector(".delete"),
    upcomingList: document.querySelector("#upcoming-list"),
    eventsList: document.querySelector("#events-list"),
    form: document.querySelector("form")
  };

  const createEventItem = (inputs) => {
    const [name, note, date] = inputs.map(input => input.value);
    return `
            <li class="event-item">
              <div class="event-container">
                <article>
                  <p>Name: ${name}</p>
                  <p>Note: ${note}</p>
                  <p>Date: ${date}</p>
                </article>
                <div class="buttons">
                  <button class="btn edit">Edit</button>
                  <button class="btn done">Done</button>
                </div>
              </div>
            </li>`;
  };

  const handleEdit = (event) => {
    const article = event.target.closest('.event-item').querySelector('article');
    const values = [...article.querySelectorAll('p')]
      .map(p => p.textContent.split(': ')[1]);

    [...eventTracker.inputs].forEach((input, i) => input.value = values[i]);
    event.target.closest('.event-item').remove();
  };

  const handleDone = (event) => {
    const item = event.target.closest('.event-item');
    item.querySelector('.buttons').remove();
    eventTracker.eventsList.appendChild(item);
  };

  const handleSave = (event) => {
    event.preventDefault();
    if ([...eventTracker.inputs].some(input => !input.value.trim())) return;

    eventTracker.upcomingList.insertAdjacentHTML('beforeend', createEventItem(eventTracker.inputs));
    eventTracker.form.reset();

    const lastItem = eventTracker.upcomingList.lastElementChild;
    lastItem.querySelector('.edit').addEventListener('click', handleEdit);
    lastItem.querySelector('.done').addEventListener('click', handleDone);
  };

  eventTracker.saveBtn.addEventListener("click", handleSave);
  eventTracker.deleteBtn.addEventListener("click", () => eventTracker.eventsList.innerHTML = '');
}








// window.addEventListener("load", solve);
// function solve() {
//   const eventTracker = {
//     inputFields: [...document.querySelectorAll("input")],
//     saveBtn: document.querySelector("#save"),
//     deleteBtn: document.querySelector(".delete"),
//     upcomingList: document.querySelector("#upcoming-list"),
//     eventsList: document.querySelector("#events-list"),
//     form: document.querySelector("form"),
//   };
//
//   const isCorrectInputFields = (fields) => {
//     return fields.some((f) => f.value.trim() === "");
//   };
//
//   const editBtnFunc = (e) => {
//     [...e.target.parentElement.parentElement.querySelectorAll("p")].map(
//       (p, i) =>
//         (eventTracker.inputFields[i].value = p.textContent.split(": ")[1])
//     );
//     e.target.parentElement.parentElement.remove();
//   };
//
//   const doneBtnFunc = (e) => {
//     const element = e.target.parentElement.parentElement.parentElement;
//     eventTracker.upcomingList.removeChild(element);
//     [...element.querySelectorAll("button")].forEach((b) => b.remove());
//     eventTracker.eventsList.appendChild(element);
//   };
//
//   const deleteBtnFunc = () => {
//     eventTracker.eventsList.innerHTML = "";
//   };
//
//   const saveBtnFunc = () => {
//     if (isCorrectInputFields(eventTracker.inputFields)) {
//       return;
//     }
//     eventTracker.upcomingList.innerHTML += `
//             <li class="event-item">
//               <div class="event-container">
//                 <article>
//                   <p>Name: ${eventTracker.inputFields[0].value}</p>
//                   <p>Note: ${eventTracker.inputFields[1].value}</p>
//                   <p>Date: ${eventTracker.inputFields[2].value}</p>
//                 </article>
//                 <div class="buttons">
//                   <button class="btn edit">Edit</button>
//                   <button class="btn done">Done</button>
//                 </div>
//               </div>
//             </li>`;
//     eventTracker.form.reset();
//     [...eventTracker.upcomingList.querySelectorAll("button")].forEach(
//       (btn, i) => {
//         btn.addEventListener("click", i === 0 ? editBtnFunc : doneBtnFunc);
//       }
//     );
//   };
//
//   eventTracker.saveBtn.addEventListener("click", saveBtnFunc);
//   eventTracker.deleteBtn.addEventListener("click", deleteBtnFunc);
// }