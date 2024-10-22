window.addEventListener("load", solve);
function solve() {
  const laptopWishlist = {
    inputFields: [...document.querySelectorAll("input")],
    addBtn: document.querySelector("#add-btn"),
    clearBtn: document.querySelector(".btn.clear"),
    checkList: document.querySelector("#check-list"),
    laptopsList: document.querySelector("#laptops-list"),
    savedDataFromInputFields: [],
  };

  const notCorrectInputFields = (fields) => {
    return fields.some((f) => f.value.trim() === "");
  };
  const clearInputFields = (fields) => {
    fields.forEach((f) => (f.value = ""));
  };
  const editBtnFunctionality = () => {
    laptopWishlist.inputFields.forEach(
      (f, i) => (f.value = laptopWishlist.savedDataFromInputFields[i])
    );
    laptopWishlist.checkList.innerHTML = "";
    laptopWishlist.addBtn.disabled = false;
  };
  const okBtnFunctionality = (e) => {
    const laptopData = e.target.parentNode;
    [...laptopData.querySelectorAll("button")].forEach((b) => b.remove());
    laptopWishlist.checkList.removeChild(laptopData);
    laptopWishlist.laptopsList.appendChild(laptopData);
    laptopWishlist.addBtn.disabled = false;
  };

  const btnClearFunctionality = () => {
    location.reload();
  };
  const addBtnFunctionality = () => {
    if (notCorrectInputFields(laptopWishlist.inputFields)) return;
    laptopWishlist.checkList.innerHTML = `
    <li class="laptop-item">
      <article>
        <p>${laptopWishlist.inputFields[0].value}</p>
        <p>Memory: ${laptopWishlist.inputFields[1].value} TB</p>
        <p>Price: ${laptopWishlist.inputFields[2].value}$</p>
      </article>
      <button class="btn edit">edit</button>
      <button class="btn ok">ok</button>
    </li>
    `;
    [...laptopWishlist.checkList.querySelectorAll("button")].forEach((b, i) =>
      b.addEventListener(
        "click",
        i % 2 === 0 ? editBtnFunctionality : okBtnFunctionality
      )
    );
    laptopWishlist.addBtn.disabled = true;
    laptopWishlist.savedDataFromInputFields = laptopWishlist.inputFields.map(
      (f) => f.value
    );
    clearInputFields(laptopWishlist.inputFields);
  };

  laptopWishlist.addBtn.addEventListener("click", addBtnFunctionality);
  laptopWishlist.clearBtn.addEventListener("click", btnClearFunctionality);
  return { okBtnFunctionality, editBtnFunctionality };
}
