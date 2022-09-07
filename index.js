let form = document.querySelector('form')
let booklistRoot = document.querySelector('.book_list')

class Booklist {
  constructor(books=[]) {
    this.books = books
  }
  addBook(name, author, img) {
    let book = new Book(name, author, img)
    this.books.push(book)
    this.creatUi()
  }
  deleteBook(event, name, author, img) {
    let book = new Book(name, author, img)

    library.books.splice(event.target.id, 1)
    console.log(library.books)
    library.creatUi()
  }

  creatUi() {
    booklistRoot.innerHTML = ''
    this.books.forEach((elm, index) => {
      let li = document.createElement('li')
      let img = document.createElement('img')
      let span = document.createElement('span')
      span.setAttribute('id', index)
      span.innerText = '❌'
      span.addEventListener('click', this.deleteBook)
      img.src = elm.img
      let h1 = document.createElement('h1')
      h1.innerText = elm.name
      let p = document.createElement('p')
      p.innerText = elm.author
      let button = document.createElement('button')
      button.innerText = elm.isRead ? 'complited' : 'Mark as read!'
      button.classList.add('formButton')
      button.addEventListener('click', () => {
        elm.toggleIsRead()
        this.creatUi()
      })
      li.append(img, span, h1, p, button)
      booklistRoot.append(li)
    })
  }
}

let library = new Booklist()
class Book {
  constructor(name, author, img) {
    this.name = name
    this.author = author
    this.img = img
    this.isRead = false
    //  localStorage.setItem('book', JSON.stringify(this.books))
  }
  toggleIsRead() {
    this.isRead = !this.isRead
  }
}
// handleInput

function handleInput(e) {
  e.preventDefault()
  let name = form.bookname.value
  let author = form.bookAuthor.value
  let img = form.bookImage.value
  if (name == '' || author == '' || img == '') {
    alert(' ⤵️⤵️⤵️⤵️⤵️Please fill out the form ⤵️⤵️⤵️⤵️⤵️')
  } else {
    library.addBook(name, author, img)
  }
  form.bookname.value = ''
  form.bookAuthor.value = ''
  form.bookImage.value = ''
}

form.addEventListener('submit', handleInput)
