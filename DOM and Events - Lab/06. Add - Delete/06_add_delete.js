function addItem() {
    const newItemText = document.getElementById("newItemText")
    const listItems = document.getElementById("items")
    listItems.addEventListener('click', deleteItem)


    if (newItemText !== "") {
        const newItem = document.createElement("li");
        newItem.innerHTML = `${newItemText.value} <a href="#">[Delete]</a>`
        listItems.appendChild(newItem)
        document.getElementById("newItemText").value = ""
    }

    function deleteItem(item) {
        item.target.parentNode.remove()
    }
}

