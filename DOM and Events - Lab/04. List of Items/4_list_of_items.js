function addItem() {
    const newItemText = document.querySelector("#newItemText").value.trim()
    console.log(newItemText)
    document.querySelector("#items").innerHTML += `<li>${newItemText}</li>`
    document.querySelector("#newItemText").value = ""
}


// function addItem() {
//   const newItemText = document.getElementById("newItemText").value.trim();
//  
//   if (newItemText !== "") {
//     const newItem = document.createElement("li");
//     newItem.textContent = newItemText;
//    
//     document.getElementById("items").appendChild(newItem);
//    
//     document.getElementById("newItemText").value = "";
//   }
// }
