let productList



const requestProduct = async () => {
    try {
        let response = await fetch("https://striveschool-api.herokuapp.com/books")
        let dataSearched = await response.json()
        return dataSearched
    } catch (e) {
        return e
    }
}

const getProduct = async () => {
    let data = await requestProduct()
    productList = data
    displayProducts()
}

window.onload = () => {
    getProduct()
}


function productHTML(category, img, price, title, asin) {
    return `<div class="col">
                <div class="card">
                     <img src="${img}" class="card-img-top img-fluid myModImg" alt="...">
                     <span class="badge badge-warning">${category}</span>
                    <div class="card-body">
                         <h5 class="card-title">${title}</h5>
                         <p class="card-text" value="${price}" data="${asin}">£ ${price}</p>
                         <div class="d-flex justify-content-between">
                             <button class="btn btn-primary" onclick="buyItem(event)" value="${price}" asin="${asin}">Buy</button>
                             <button class="btn btn-outline" onclick="hide(event)"">Hide</button>
                        </div>
                    </div>
                </div>
            </div>`
}
// <button class="btn btn-outline" onclick="hide(event)>Hide</button>


function displayProducts() {
    let section = document.querySelectorAll('.product-section')

    productList.forEach(book => {
        section[0].insertAdjacentHTML('beforeend', `${productHTML(book.category, book.img, book.price, book.title, book.asin)}`)

    });
    shoppingCart()
}


let shoppingCartList = {}
let sumItem = 0
let num = 0


function buyItem(event) {
    let currentCard = event.target.closest('.col')
    currentCard.classList.add('selected')
    let itemAsin = event.target.getAttribute('asin')

    addToShoppingCart(itemAsin)
}

function addToShoppingCart(asin) {
    let newItem = productList.filter(book => book.asin === asin)
    num++
    sumItem = sumItem + newItem[0].price
    shoppingCartList[`item${num}`] = (newItem)
    console.log(shoppingCartList)
    showTotalPrice()
    displayItemInBasket(newItem[0])
    let removeItemBtn = document.querySelectorAll('.removeItem')
    removeItemBtn[removeItemBtn.length - 1].setAttribute('chartItem', `item${num}`)
}

function showTotalPrice() {
    let totalPriceDisplay = document.querySelector('#totalPrice')
    totalPriceDisplay.innerText = `£ ${sumItem.toFixed(2)}`
}

function displayItemInBasket(item) {
    let setItemsInCart = document.querySelector('.cart-items')
    setItemsInCart.insertAdjacentHTML("afterbegin", `${itemHTML(item.price, item.title, item.asin)}`)

}

function itemHTML(price, title, asin) {
    return `<div class="nodeItemChart">
    <p class="card-text">${title}     <span>£ ${price}</span></p>
    <div class="d-flex removeItem" data=${asin} onclick="removeItemFromCartList(event)"> 
    <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd"><path d="M11.5 0c6.347 0 11.5 5.153 11.5 11.5s-5.153 11.5-11.5 11.5-11.5-5.153-11.5-11.5 5.153-11.5 11.5-11.5zm0 1c5.795 0 10.5 4.705 10.5 10.5s-4.705 10.5-10.5 10.5-10.5-4.705-10.5-10.5 4.705-10.5 10.5-10.5zm-6.5 10h13v1h-13v-1z"/></svg>
    </div>
    <hr>
  </div>`
}


function removeItemFromCartList(e) {
    let getItemFromChart = e.target.parentElement.getAttribute('chartitem')

    delete shoppingCartList[getItemFromChart]
    e.target.closest('.nodeItemChart').remove()


}


function hide(e) {
    e.target.closest('.col').classList.add('d-none')
}













function shoppingCart() {
    let body = document.querySelector('body')

    body.insertAdjacentHTML('afterbegin', `<div id="shoppingCart" class="card">
    <svg class="myModCart" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M10 19.5c0 .829-.672 1.5-1.5 1.5s-1.5-.671-1.5-1.5c0-.828.672-1.5 1.5-1.5s1.5.672 1.5 1.5zm3.5-1.5c-.828 0-1.5.671-1.5 1.5s.672 1.5 1.5 1.5 1.5-.671 1.5-1.5c0-.828-.672-1.5-1.5-1.5zm-10.563-5l-2.937-7h16.812l-1.977 7h-11.898zm11.233-5h-11.162l1.259 3h9.056l.847-3zm5.635-5l-3.432 12h-12.597l.839 2h13.239l3.474-12h1.929l.743-2h-4.195z"/></svg>
    <div class="card-body">
      <h5 id="totalPrice" class="">Empty</h5>
      <div class="cart-items"></div>
      <a href="#" class="btn btn-primary buy-btn">Buy Now</a>
      <a href="#" class="btn btn-outline btn-cleanCart ">Clean cart</a>
    </div>
  </div>
</div>`)
}



let filteredBooks
let allBooks

let test
let testFulllist = []

function searchDynamic(e) {
    let searchValue = e.target.value.toLocaleLowerCase()
    if (searchValue.length < 3)
        return
    getAllDisplayedBooks(e)

    filteredBooks = allBooks.filter(book => {
        book.includes(searchValue)
        if (!book.includes(searchValue)) {
            hideCardsNotFiltered(book)
        }
    }
    )



}


function hideCardsNotFiltered(title) {
    let allBooksTitles = document.querySelectorAll('.card-title')
    allBooksTitles.forEach(book => {
        let bookToLowerCase = book.innerText.toLowerCase()
        if (bookToLowerCase === title) {
            book.closest('.col').classList.add('d-none')
        }
    })

}


function getAllDisplayedBooks(e) {
    let allBooksTitles = document.querySelectorAll('.card-title')
    allBooks = [...allBooksTitles].map(bookTitle => bookTitle.innerText.toLowerCase())
}