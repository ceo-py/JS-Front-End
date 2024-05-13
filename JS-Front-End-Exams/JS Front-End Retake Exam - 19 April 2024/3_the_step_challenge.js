function theStepChallenge() {
  const API_URL = "http://localhost:3030/jsonstore/records/";
  const challengeApp = {
    inputFields: document.querySelectorAll("input"),
    loadRecords: document.querySelector("#load-records"),
    addRecord: document.querySelector("#add-record"),
    editRecord: document.querySelector("#edit-record"),
    list: document.querySelector("#list"),
    form: document.querySelector("form"),
    id: null,
  };

  const body = (id) => {
    const bodyRaw = {};
    challengeApp.inputFields.forEach((x) => {
      bodyRaw[x.name.replace("p-", "")] = x.value;
    });
    if (id) bodyRaw._id = id;
    return JSON.stringify(bodyRaw);
  };

  const deleteRecordFunc = (e) => {
    fetch(`${API_URL}${e.parentNode.parentNode.id}`, { method: "DELETE" }).then(
      () => loadRecordsFunc()
    );
  };
  const changeRecordFunc = (e) => {
    const currentElement = e.parentNode.parentNode;
    challengeApp.id = currentElement.id;
    [...currentElement.querySelectorAll("p")].forEach((x, i) => {
      challengeApp.inputFields[i].value = x.textContent;
    });
    challengeApp.list.removeChild(currentElement);
    challengeApp.editRecord.disabled = false;
    challengeApp.addRecord.disabled = true;
  };

  const addRecordFunc = (e) => {
    fetch(`${API_URL}`, {
      method: "POST",
      body: body(),
    }).then(() => {
      challengeApp.form.reset();
      loadRecordsFunc();
    });
  };

  const editRecordFunc = () => {
    fetch(`${API_URL}${challengeApp.id}`, {
      method: "PUT",
      body: body(challengeApp.id),
    }).then(() => {
      loadRecordsFunc();
      challengeApp.editRecord.disabled = true;
      challengeApp.addRecord.disabled = false;
    });
  };
  const loadRecordsFunc = (e) => {
    fetch(API_URL)
      .then((response) => response.json())
      .then((data) => {
        challengeApp.list.innerHTML = "";
        Object.keys(data).forEach((key) => {
          challengeApp.list.innerHTML += `
          <li class="record" id="${data[key]._id}">
            <div class="info">
                <p>${data[key].name}</p>
                <p>${data[key].steps}</p>
                <p>${data[key].calories}</p>
            </div>
            <div class="btn-wrapper">
                <button class="change-btn" onclick="solve.changeRecordFunc(this)">Change</button>
                <button class="delete-btn" onclick="solve.deleteRecordFunc(this)">Delete</button>
            </div>
          </li>
          `;
        });
        challengeApp.form.reset();
      });
  };
  [addRecordFunc, editRecordFunc, loadRecordsFunc].forEach((func) => {
    challengeApp[func.name.replace("Func", "")].addEventListener("click", func);
  });
  return { deleteRecordFunc, changeRecordFunc };
}

const solve = theStepChallenge();
