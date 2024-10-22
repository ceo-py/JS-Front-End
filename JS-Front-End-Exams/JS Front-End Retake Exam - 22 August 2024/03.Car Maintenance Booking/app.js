function carMaintanance() {
  const cars = {
    inputFields: [
      document.querySelector("#car-model"),
      document.querySelector("#date"),
      document.querySelector("#car-service"),
    ],
    baseApiUrl: "http://localhost:3030/jsonstore/appointments/",
    addAppointment: document.querySelector("#add-appointment"),
    editAppointment: document.querySelector("#edit-appointment"),
    loadAppointments: document.querySelector("#load-appointments"),
    appointmentsList: document.querySelector("#appointments-list"),
    form: document.querySelector("form"),
    id: null,
  };

  const body = (id) => {
    const bodyRaw = {};
    cars.inputFields.forEach((x) => {
      bodyRaw[x.name.split('-').pop()] = x.value;
    });
    if (id) bodyRaw._id = id;
    return JSON.stringify(bodyRaw);
  };

  const addAppointmentFunctionality = () => {
    fetch(`${cars.baseApiUrl}`, {
        method: "POST",
        body: body(),
      }).then(() => {
        cars.form.reset();
        loadAppointmentFunctionality();
      });
  };
  const editAppointmentFunctionality = () => {
    fetch(`${cars.baseApiUrl}${cars.id}`, {
        method: "PUT",
        body: body(cars.id),
      }).then(() => {
        loadAppointmentFunctionality();
        cars.addAppointment.disabled = false
        cars.editAppointment.disabled = true
      });
  };
  const changeAppointmentFunctionality = (e) => {
    const currentElement = e.parentNode.parentNode;
    cars.id = currentElement.id;
    [...currentElement.querySelectorAll("h2,h3")].forEach((x, i) => {
      cars.inputFields[i].value = x.textContent;
    });
    cars.appointmentsList.removeChild(currentElement);
    cars.editAppointment.disabled = false
    cars.addAppointment.disabled = true
  };
  const deleteAppointmentFunctionality = (e) => {
    fetch(`${cars.baseApiUrl}${e.parentNode.parentNode.id}`, { method: "DELETE" }).then(
      () => loadAppointmentFunctionality()
    );
  };
  const loadAppointmentFunctionality = () => {
    fetch(cars.baseApiUrl)
      .then((response) => response.json())
      .then((data) => {
        cars.appointmentsList.innerHTML = "";
        Object.keys(data).forEach((key) => {
          cars.appointmentsList.innerHTML += `
            <li class="appointment" id="${data[key]._id}">
              <h2>${data[key].model}</h2>
              <h3>${data[key].date}</h3>
              <h3>${data[key].service}</h3>
              <div class="buttons-appointment">
                <button class="change-btn" onclick="solve.changeAppointmentFunctionality(this)">Change</button>
                <button class="delete-btn" onclick="solve.deleteAppointmentFunctionality(this)">Delete</button>
              </div>
            </li>
        `;
        });
      });
  };
  cars.addAppointment.addEventListener("click", addAppointmentFunctionality);
  cars.editAppointment.addEventListener("click", editAppointmentFunctionality);
  cars.loadAppointments.addEventListener("click", loadAppointmentFunctionality);
  return {
    changeAppointmentFunctionality,
    deleteAppointmentFunctionality,
  };
}

const solve = carMaintanance();
window.addEventListener("load", solve);
