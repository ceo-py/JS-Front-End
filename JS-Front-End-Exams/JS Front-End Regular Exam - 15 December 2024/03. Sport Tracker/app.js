function sportTracker() {
  const tracker = {
    BASE_API_URL: "http://localhost:3030/jsonstore/workout/",
    inputFields: [
      document.querySelector("#workout"),
      document.querySelector("#date"),
      document.querySelector("#location"),
    ],
    addWorkout: document.querySelector("#add-workout"),
    editWorkout: document.querySelector("#edit-workout"),
    loadWorkout: document.querySelector("#load-workout"),
    listElements: document.querySelector("#list"),
    form: document.querySelector("form"),
    id: null,
  };

  const body = (id) => {
    const bodyRaw = {};
    tracker.inputFields.forEach((x) => {
      bodyRaw[x.name] = x.value;
    });
    if (id) bodyRaw._id = id;
    return JSON.stringify(bodyRaw);
  };

  const changeFunctionality = (e) => {
    const currentElement = e.parentNode.parentNode;
    tracker.id = currentElement.id;
    [...currentElement.querySelectorAll("h2,h3")].forEach((x, i) => {
      tracker.inputFields[i].value = x.textContent;
    });
    tracker.listElements.removeChild(currentElement);
    tracker.editWorkout.disabled = false;
    tracker.addWorkout.disabled = true;
  };

  const doneFunctionality = (e) => {
    fetch(`${tracker.BASE_API_URL}${e.parentNode.parentNode.id}`, {
      method: "DELETE",
    }).then(() => loadWorkoutFunctionality());
  };

  const addWorkoutFunctionality = () => {
    fetch(`${tracker.BASE_API_URL}`, { method: "POST", body: body() }).then(
      () => {
        loadWorkoutFunctionality();
      }
    );
  };

  const editWorkoutFunctionality = () => {
    fetch(`${tracker.BASE_API_URL}${tracker.id}`, {
      method: "PUT",
      body: body(tracker.id),
    }).then(() => {
      tracker.editWorkout.disabled = true;
      tracker.addWorkout.disabled = false;
      loadWorkoutFunctionality();
    });
  };

  const loadWorkoutFunctionality = () => {
    fetch(tracker.BASE_API_URL)
      .then((response) => response.json())
      .then((data) => {
        tracker.listElements.innerHTML = "";
        tracker.addWorkout.disabled = false;
        tracker.form.reset();
        Object.values(data).forEach((sport) => {
          tracker.listElements.innerHTML += `
            <div class="container" id=${sport._id}>
                <h2>${sport.workout}</h2>
                <h3>${sport.date}</h3>
                <h3 id="location">${sport.location}</h3>
                <div id="buttons-container">
                    <button class="change-btn" onclick="solve.changeFunctionality(this)">Change</button>
                    <button class="delete-btn" onclick="solve.doneFunctionality(this)">Done</button>
                </div>
            </div>
            `;
        });
      });
  };

  tracker.loadWorkout.addEventListener("click", loadWorkoutFunctionality);
  tracker.addWorkout.addEventListener("click", addWorkoutFunctionality);
  tracker.editWorkout.addEventListener("click", editWorkoutFunctionality);
  return {
    changeFunctionality,
    doneFunctionality,
  };
}

const solve = sportTracker();
