function solve() {
    const addButtons = Array.from(document.querySelectorAll('.add-product'))
    const checkoutButton = document.querySelector('.checkout')
    const cartTextArea = document.querySelector('textarea')

    let cart = []
    let totalPrice = 0

    function addToCart(productName, price) {
        cart.push({name: productName, price: price})
        totalPrice += price
        cartTextArea.value += `Added ${productName} for ${price.toFixed(2)} to the cart.\n`
    }

    function checkout() {
        let uniqueProducts = [...new Set(cart.map(product => product.name))]
        let productList = uniqueProducts.join(', ')
        cartTextArea.value += `You bought ${productList} for ${totalPrice.toFixed(2)}.\n`

        addButtons.forEach(button => {
            button.disabled = true
        })
        checkoutButton.disabled = true
    }

    addButtons.forEach(button => {
        button.addEventListener('click', event => {
            let productDiv = event.target.parentElement.parentElement
            let productName = productDiv.querySelector('.product-title').textContent
            let price = parseFloat(productDiv.querySelector('.product-line-price').textContent)
            addToCart(productName, price)
        })
    })

    checkoutButton.addEventListener('click', checkout)

}
