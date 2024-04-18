function solve() {
  const API_URL = "http://localhost:3030/jsonstore/games/";
  const myBoardGamesCollection = {
    inputFields: [...document.querySelectorAll("input")],
    form: document.querySelector("form"),
    addGame: document.querySelector("#add-game"),
    editGame: document.querySelector("#edit-game"),
    loadGames: document.querySelector("#load-games"),
    gamesList: document.querySelector("#games-list"),
    id: null,
  };

  const body = (id) => {
    const bodyRaw = {};
    myBoardGamesCollection.inputFields.forEach((x) => {
      bodyRaw[x.name.replace("g-", "")] = x.value;
    });
    if (id) bodyRaw._id = id;
    return JSON.stringify(bodyRaw);
  };

  const changeBtnHandler = (e) => {
    myBoardGamesCollection.id = e.id;
    const currentElement = e.parentNode.parentNode;
    [...currentElement.querySelectorAll("p")].forEach((x, i) => {
      myBoardGamesCollection.inputFields[i].value = x.textContent;
    });
    myBoardGamesCollection.gamesList.removeChild(currentElement);
    myBoardGamesCollection.editGame.disabled = false;
    myBoardGamesCollection.addGame.disabled = true;
  };

  const deleteBtnHandler = (e) => {
    fetch(`${API_URL}${e.id}`, { method: "DELETE" }).then(() => loadGames());
  };
  const loadGames = () => {
    myBoardGamesCollection.gamesList.innerHTML = "";
    fetch(API_URL)
      .then((x) => x.json())
      .then((x) => {
        Object.values(x).forEach((c) => {
          myBoardGamesCollection.gamesList.innerHTML += `
            <div class="board-game">
                <div class="content">
                    <p>${c.name}</p>
                    <p>${c.type}</p>
                    <p>${c.players}</p>
                </div>
                <div class="buttons-container">
                    <button class="change-btn" id="${c._id}" onclick="funcJc.changeBtnHandler(this)">Change</button>
                    <button class="delete-btn" id="${c._id}" onclick="funcJc.deleteBtnHandler(this)">Delete</button>
                </div>
            </div>
            `;
        });
      });
  };
  const addGame = () => {
    fetch(API_URL, { method: "POST", body: body() }).then(() => {
      myBoardGamesCollection.form.reset();
      loadGames();
    });
  };
  const editGame = () => {
    fetch(`${API_URL}${myBoardGamesCollection.id}`, {
      method: "PUT",
      body: body(myBoardGamesCollection.id),
    }).then(() => {
      myBoardGamesCollection.form.reset();
      loadGames();
      myBoardGamesCollection.editGame.disabled =
        !myBoardGamesCollection.editGame.disabled;
      myBoardGamesCollection.addGame.disabled =
        !myBoardGamesCollection.addGame.disabled;
    });
  };

  myBoardGamesCollection.loadGames.addEventListener("click", loadGames);
  myBoardGamesCollection.addGame.addEventListener("click", addGame);
  myBoardGamesCollection.editGame.addEventListener("click", editGame);

  return {
    changeBtnHandler,
    deleteBtnHandler,
  };
}

const funcJc = solve();










// function solve() {
//   const API_URL = "http://localhost:3030/jsonstore/games/";
//   const myBoardGamesCollection = {
//     inputFields: [...document.querySelectorAll("input")],
//     form: document.querySelector("form"),
//     id: null,
//     gamesList: document.querySelector("#games-list"),
//     addGame: document.querySelector("#add-game"),
//     editGame: document.querySelector("#edit-game"),
//     loadGame: document.querySelector("#load-games"),
//   };
//
//   const body = (id) => {
//     const bodyRaw = {};
//     myBoardGamesCollection.inputFields.forEach(
//       (x) => (bodyRaw[x.name.replace("g-", "")] = x.value)
//     );
//     if (id) bodyRaw._id = id;
//     return JSON.stringify(bodyRaw);
//   };
//
//   const toggleEditMode = () => {
//     myBoardGamesCollection.editGame.disabled =
//       !myBoardGamesCollection.editGame.disabled;
//     myBoardGamesCollection.addGame.disabled =
//       !myBoardGamesCollection.addGame.disabled;
//   };
//
//   const deleteBtnHandler = (e) =>
//     fetch(`${API_URL}${e.id}`, { method: "DELETE" }).then(() => loadGame());
//
//   const changeBtnHandler = (e) => {
//     const currentItem = e.parentNode.parentNode;
//     myBoardGamesCollection.id = e.id;
//     [...currentItem.querySelectorAll("p")].forEach(
//       (x, i) => (myBoardGamesCollection.inputFields[i].value = x.textContent)
//     );
//     myBoardGamesCollection.gamesList.removeChild(currentItem);
//     myBoardGamesCollection.editGame.disabled = false;
//     myBoardGamesCollection.addGame.disabled = true;
//   };
//
//   const addGame = () => {
//     fetch(`${API_URL}`, {
//       method: "POST",
//       body: body(),
//     }).then(() => {
//       myBoardGamesCollection.form.reset();
//       loadGame();
//     });
//   };
//
//   const editGame = (e) => {
//     const ItemId = myBoardGamesCollection.id;
//     fetch(`${API_URL}${ItemId}`, {
//       method: "PUT",
//       body: body(ItemId),
//     }).then(() => loadGame());
//     toggleEditMode();
//     myBoardGamesCollection.form.reset();
//   };
//
//   const loadGame = () => {
//     myBoardGamesCollection.gamesList.innerHTML = "";
//     fetch(API_URL)
//       .then((x) => x.json())
//       .then((o) => {
//         Object.values(o).forEach((x) => {
//           myBoardGamesCollection.gamesList.innerHTML += `
//                 <div class="board-game">
//                 <div class="content">
//                     <p>${x.name}</p>
//                     <p>${x.type}</p>
//                     <p>${x.players}</p>
//                 </div>
//                 <div class="buttons-container">
//                     <button class="change-btn" id="${x._id}" onclick="funcJs.changeBtnHandler(this)">Change</button>
//                     <button class="delete-btn" id="${x._id}" onclick="funcJs.deleteBtnHandler(this)">Delete</button>
//                 </div>
//                 </div>
//                 `;
//         });
//       });
//   };
//   myBoardGamesCollection.addGame.addEventListener("click", addGame);
//   myBoardGamesCollection.editGame.addEventListener("click", editGame);
//   myBoardGamesCollection.loadGame.addEventListener("click", loadGame);
//
//   return {
//     deleteBtnHandler,
//     changeBtnHandler,
//   };
// }
//
// const funcJs = solve();
