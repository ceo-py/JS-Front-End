function addItem() {
  const newItemText = document.getElementById("newItemText").value.trim();
  
  if (newItemText !== "") {
    const newItem = document.createElement("li");
    newItem.textContent = newItemText;
    
    document.getElementById("items").appendChild(newItem);
    
    document.getElementById("newItemText").value = "";
  }
}
