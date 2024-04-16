window.addEventListener("load", solve);

function solve() {
  const contactList = {
    inputFields: [...document.querySelectorAll("#name, #phone, #category")],
    addBtn: document.querySelector("#add-btn"),
    checkList: document.querySelector("#check-list"),
    contactList: document.querySelector("#contact-list"),
    form: document.querySelector("form"),
    currentData: [],
  };

  const editBtn = () => {
    contactList.inputFields.forEach(
      (x, i) => (x.value = contactList.currentData[i])
    );
    contactList.checkList.innerHTML = "";
  };
  const saveBtn = (e) => {
    const currentContact = e.target.parentNode.parentNode;
    currentContact.querySelector(".buttons").remove();
    currentContact.innerHTML += `<button class="del-btn"></button>`;
    currentContact
      .querySelector("button")
      .addEventListener("click", (e) => e.target.parentNode.remove());
    contactList.contactList.appendChild(currentContact);
  };

  const addContact = () => {
    if (contactList.inputFields.some((x) => x.value === "")) return;
    contactList.currentData = contactList.inputFields.map((x) => x.value);
    contactList.checkList.innerHTML = `
    <li>
      <article>
        <p>name:${contactList.inputFields[0].value}</p>
        <p>phone:${contactList.inputFields[1].value}</p>
        <p>category:${contactList.inputFields[2].value}</p>
      </article>
      <div class="buttons">
        <button class="edit-btn"></button>
        <button class="save-btn"></button>
      </div>
    </li>`;
    [...contactList.checkList.querySelectorAll("button")].forEach((x, i) => {
      x.addEventListener("click", i % 2 === 0 ? editBtn : saveBtn);
    });
    contactList.form.reset();
  };

  contactList.addBtn.addEventListener("click", addContact);
}
