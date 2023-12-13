const myLibrary = [];

//Book constructor
function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.info = function(){
        return `${this.title}, ${this.author}, ${this.pages}, ${this.read}`;
    };
}

//Add new book to library
function addBookToLibrary(title, author, pages, read) {
    const newBook = new Book(title, author, pages, read);
    myLibrary.push(newBook);
}

//Display the books in card format
function displayBooks() {
    const container = document.getElementById('book-container');

    for (let i = 0; i < myLibrary.length; i++) {
        const book = myLibrary[i];

        // Create a div element for each book
        const bookCard = document.createElement('div');
        bookCard.classList.add('card');

        // Create separate elements for each piece of information
        const titleElement = document.createElement('h2');
        titleElement.textContent = `Title: ${book.title}`;

        const authorElement = document.createElement('p');
        authorElement.textContent = `Author: ${book.author}`;

        const pagesElement = document.createElement('p');
        pagesElement.textContent = `Pages: ${book.pages}`;

        const readElement = document.createElement('p');
        readElement.textContent = `Read: ${book.read}`;

        // Append the elements to the card
        bookCard.appendChild(titleElement);
        bookCard.appendChild(authorElement);
        bookCard.appendChild(pagesElement);
        bookCard.appendChild(readElement);

        // Append the card to the container
        container.appendChild(bookCard);
    }
}


addBookToLibrary("The Hobbit", "J.R.R Tolkien", 255, "Yes");
addBookToLibrary("Lord Of The Rings", "J.R.R Tolkien", 3785, "No");

displayBooks();
