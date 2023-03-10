function extract(content) {
    const string = document.querySelector(`#${content}`)
   return  string.textContent.match(/\((.*?)\)/g).map(x => x.slice(1, -1)).join('; ')
}
