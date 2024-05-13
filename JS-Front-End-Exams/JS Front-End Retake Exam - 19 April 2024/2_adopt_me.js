window.addEventListener("load", solve);

function solve() {
  adoptMe = {
    inputFields: [
      document.querySelector("#type"),
      document.querySelector("#gender"),
      document.querySelector("#age"),
    ],
    form: document.querySelector("form"),
    adoptBtn: document.querySelector("#adopt-btn"),
    adoptionInfo: document.querySelector("#adoption-info"),
    adoptedList: document.querySelector("#adopted-list"),
    inputData: [],
  };
  const isEmptySpace = (inputs) => inputs.some((x) => x.value === "");

  const editFunc = (e) => {
    const currentElement = e.target.parentElement.parentElement;
    adoptMe.adoptionInfo.removeChild(currentElement);
    adoptMe.inputData = [...currentElement.querySelectorAll("p")].map(
      (x) => x.textContent.split(":")[1]
    );
    adoptMe.inputFields.forEach((x, i) => (x.value = adoptMe.inputData[i]));
  };

  const doneFunc = (e) => {
    const currentElement = e.target.parentElement.parentElement;
    adoptMe.adoptionInfo.removeChild(currentElement);
    currentElement.querySelector(".buttons").remove();
    currentElement.innerHTML += `<button class="clear-btn">Clear</button>`;
    currentElement.querySelector("button").addEventListener("click", (e) => {
      e.target.parentElement.remove();
    });
    adoptMe.adoptedList.appendChild(currentElement);
  };
  const adoptFunc = (e) => {
    e.preventDefault();
    if (isEmptySpace(adoptMe.inputFields)) return;
    console.log(adoptMe.inputFields.map((x) => x.value));
    adoptMe.adoptionInfo.innerHTML += `
            <li>
              <article>
              ${["Pet:", "Gender:", "Age:"]
                .map((x, i) => `<p>${x}${adoptMe.inputFields[i].value}</p>`)
                .join("")}
              </article>
              <div class="buttons">
                <button class="edit-btn">Edit</button>
                <button class="done-btn">Done</button>
              </div>
            </li>`;
    [...adoptMe.adoptionInfo.querySelectorAll("button")].forEach((x, i) => {
      x.addEventListener("click", i % 2 === 0 ? editFunc : doneFunc);
    });
    adoptMe.form.reset();
  };
  adoptMe.adoptBtn.addEventListener("click", adoptFunc);
}
