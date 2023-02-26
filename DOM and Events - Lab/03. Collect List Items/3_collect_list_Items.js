function extractText() {
    const liElements = document.getElementsByTagName("li")

    let text = "";

    for (let i = 0; i < liElements.length; i++) {
        text += liElements[i].innerHTML + "\n";
    }

    const resultTextArea = document.getElementById("result");
    resultTextArea.value = text;

}


