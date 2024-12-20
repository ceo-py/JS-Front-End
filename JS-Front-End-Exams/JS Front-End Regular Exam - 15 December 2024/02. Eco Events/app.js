function solve() {
  const ecoEvents = {
    inputFields: [...document.querySelectorAll("input")],
    nextBtn: document.querySelector("#next-btn"),
    previewList: document.querySelector("#preview-list"),
    eventList: document.querySelector("#event-list"),
    form: document.querySelector("form"),
    fieldData: [],
  };

  const notCorrectInputFields = (fields) => {
    return fields.some((f) => f.value.trim() === "");
  };

  const editBtnFunctionality = () => {
    ecoEvents.nextBtn.disabled = false;
    ecoEvents.inputFields.forEach((f, i) => {
      f.value = ecoEvents.fieldData[i];
    });
    ecoEvents.previewList.innerHTML = "";
  };
  const applyBtnFunctionality = (e) => {
    const targetElement = e.target.parentNode;
    [...targetElement.querySelectorAll("button")].forEach((b) => {
      b.remove();
    });
    ecoEvents.eventList.appendChild(targetElement);
    ecoEvents.previewList.innerHTML = "";
    ecoEvents.nextBtn.disabled = false;
  };

  const nextBtnFunctionality = () => {
    if (notCorrectInputFields(ecoEvents.inputFields)) {
      return;
    }

    ecoEvents.previewList.innerHTML = `
    <li class="application">
      <article>
        <h4>${ecoEvents.inputFields[0].value}</h4>
        <p>Event:${ecoEvents.inputFields[1].value}</strong></p>
        <p><strong>Location:${ecoEvents.inputFields[2].value}</strong></p>
      </article>
      <button class="action-btn edit">edit</button>
      <button class="action-btn apply">apply</button>
    </li>`;
    [...ecoEvents.previewList.querySelectorAll("button")].forEach((b, i) =>
      b.addEventListener(
        "click",
        i % 2 === 0 ? editBtnFunctionality : applyBtnFunctionality
      )
    );
    ecoEvents.fieldData = ecoEvents.inputFields.map((f) => f.value);
    ecoEvents.nextBtn.disabled = true;
    ecoEvents.form.reset();
  };
  ecoEvents.nextBtn.addEventListener("click", nextBtnFunctionality);
}
