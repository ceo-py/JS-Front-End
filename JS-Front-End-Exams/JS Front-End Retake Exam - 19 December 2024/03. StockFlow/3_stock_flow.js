function stockFlow() {
  const stock = {
    BASE_API_URL: "http://localhost:3030/jsonstore/orders/",
    inputFields: [
      document.querySelector("#name"),
      document.querySelector("#date"),
      document.querySelector("#quantity"),
    ],
    orderBtn: document.querySelector("#order-btn"),
    editOrder: document.querySelector("#edit-order"),
    loadOrders: document.querySelector("#load-orders"),
    list: document.querySelector("#list"),
    form: document.querySelector("form"),
    id: null,
  };

  const handleDone = (e) => {
    fetch(`${stock.BASE_API_URL}${e.parentNode.id}`, {
      method: "DELETE",
    }).then(() => handleLoadOrders());
  };
  const handleChange = (e) => {
    const currentElement = e.parentNode;
    stock.id = currentElement.id;
    stock.list.removeChild(currentElement);
    stock.editOrder.disabled = false;
    stock.orderBtn.disabled = true;
    [...currentElement.querySelectorAll("h2,h3")].forEach((h, i) => {
      stock.inputFields[i].value = h.textContent;
    });
  };

  const body = (id) => {
    const bodyRaw = {};
    stock.inputFields.forEach((x) => {
      bodyRaw[x.name] = x.value;
    });
    if (id) bodyRaw._id = id;
    return JSON.stringify(bodyRaw);
  };

  const handleLoadOrders = () => {
    fetch(stock.BASE_API_URL)
      .then((response) => response.json())
      .then((data) => {
        stock.editOrder.disabled = true;
        stock.form.reset();
        stock.list.innerHTML = "";
        Object.keys(data).forEach((x) => {
          stock.list.innerHTML += `
                    <div class="container" id=${data[x]._id}>
                        <h2>${data[x].name}</h2>
                        <h3>${data[x].date}</h3>
                        <h3>${data[x].quantity}</h3>
                        <button class="change-btn" onclick="solve.handleChange(this)">Change</button>
                        <button class="done-btn" onclick="solve.handleDone(this)">Done</button>
                    </div>
            `;
        });
      });
  };
  const handleEditOrders = (e) => {
    e.preventDefault();
    fetch(`${stock.BASE_API_URL}${stock.id}`, {
      method: "PUT",
      body: body(stock.id),
    }).then(() => {
      stock.editOrder.disabled = true;
      stock.orderBtn.disabled = false;
      handleLoadOrders();
    });
  };

  const handleOrder = (e) => {
    e.preventDefault();
    fetch(`${stock.BASE_API_URL}`, { method: "POST", body: body() }).then(
      () => {
        stock.form.reset();
        handleLoadOrders();
      }
    );
  };

  stock.loadOrders.addEventListener("click", handleLoadOrders);
  stock.editOrder.addEventListener("click", handleEditOrders);
  stock.orderBtn.addEventListener("click", handleOrder);
  return {
    handleDone,
    handleChange,
  };
}

const solve = stockFlow();











// function stockFlow() {
//   const BASE_API_URL = "http://localhost:3030/jsonstore/orders/";
//   const elements = {
//     inputs: {
//       name: document.querySelector("#name"),
//       date: document.querySelector("#date"),
//       quantity: document.querySelector("#quantity")
//     },
//     buttons: {
//       order: document.querySelector("#order-btn"),
//       edit: document.querySelector("#edit-order"),
//       load: document.querySelector("#load-orders")
//     },
//     list: document.querySelector("#list"),
//     form: document.querySelector("form")
//   };
//   let currentId = null;
//
//   const createOrderElement = (data) => `
//     <div class="container" id=${data._id}>
//       <h2>${data.name}</h2>
//       <h3>${data.date}</h3>
//       <h3>${data.quantity}</h3>
//       <button class="change-btn" onclick="solve.handleChange(this)">Change</button>
//       <button class="done-btn" onclick="solve.handleDone(this)">Done</button>
//     </div>
//   `;
//
//   const getFormData = () => ({
//     name: elements.inputs.name.value,
//     date: elements.inputs.date.value,
//     quantity: elements.inputs.quantity.value
//   });
//
//   const handleDone = async (element) => {
//     await fetch(`${BASE_API_URL}${element.parentNode.id}`, { method: "DELETE" });
//     await loadOrders();
//   };
//
//   const handleChange = (element) => {
//     const container = element.parentNode;
//     currentId = container.id;
//     elements.list.removeChild(container);
//     elements.buttons.edit.disabled = false;
//     elements.buttons.order.disabled = true;
//
//     const [name, date, quantity] = container.querySelectorAll("h2,h3");
//     elements.inputs.name.value = name.textContent;
//     elements.inputs.date.value = date.textContent;
//     elements.inputs.quantity.value = quantity.textContent;
//   };
//
//   const loadOrders = async () => {
//     const response = await fetch(BASE_API_URL);
//     const data = await response.json();
//
//     elements.buttons.edit.disabled = true;
//     elements.form.reset();
//     elements.list.innerHTML = Object.values(data).map(createOrderElement).join("");
//   };
//
//   const handleEdit = async (e) => {
//     e.preventDefault();
//     await fetch(`${BASE_API_URL}${currentId}`, {
//       method: "PUT",
//       body: JSON.stringify({ ...getFormData(), _id: currentId })
//     });
//
//     elements.buttons.edit.disabled = true;
//     elements.buttons.order.disabled = false;
//     await loadOrders();
//   };
//
//   const handleOrder = async (e) => {
//     e.preventDefault();
//     await fetch(BASE_API_URL, {
//       method: "POST",
//       body: JSON.stringify(getFormData())
//     });
//
//     elements.form.reset();
//     await loadOrders();
//   };
//
//   elements.buttons.load.addEventListener("click", loadOrders);
//   elements.buttons.edit.addEventListener("click", handleEdit);
//   elements.buttons.order.addEventListener("click", handleOrder);
//
//   return { handleDone, handleChange };
// }
//
// const solve = stockFlow();