function addItem() {
    const newItemText = document.querySelector('#newItemText')
    const items = document.querySelector('#items')
    newItemText.value !== ''? items.innerHTML += `<li>${newItemText.value} <a href="#">[Delete]</a></li>`: null
    const deleteItem = (e) => e.target.parentNode.remove()
    items.addEventListener('click', deleteItem)
    newItemText.value = ''
}



// function addItem() {
//     const newItemText = document.getElementById("newItemText")
//     const listItems = document.getElementById("items")
//     listItems.addEventListener('click', deleteItem)
//
//
//     if (newItemText !== "") {
//         const newItem = document.createElement("li");
//         newItem.innerHTML = `${newItemText.value} <a href="#">[Delete]</a>`
//         listItems.appendChild(newItem)
//         document.getElementById("newItemText").value = ""
//     }
//
//     function deleteItem(item) {
//         item.target.parentNode.remove()
//     }
// }



// function addItem() {
//     const newItemText = document.getElementById("newItemText").value.trim();
//     const listItems = document.getElementById("items");
//     listItems.addEventListener('click', deleteItem);
//
//     if (newItemText !== "") {
//         const newItem = document.createElement("li");
//         const textNode = document.createTextNode(newItemText);
//         const deleteLink = document.createElement("a");
//         deleteLink.setAttribute("href", "#");
//         deleteLink.textContent = "[Delete]";
//         newItem.appendChild(textNode);
//         newItem.appendChild(deleteLink);
//         listItems.appendChild(newItem);
//         document.getElementById("newItemText").value = "";
//     }
//
//     function deleteItem(item) {
//         item.target.parentNode.remove();
//     }
// }
