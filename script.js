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
    container.innerHTML = '';

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

        const buttonReadElement = document.createElement('button');
        buttonReadElement.textContent = 'Finished Reading';

        const removeElement = document.createElement('button');
        removeElement.textContent = 'Remove Book';
        removeElement.dataset.index = i; 

        removeElement.addEventListener('click', function() {
            const indexToRemove = this.dataset.index; // Get the index from the data attribute
            removeBookFromLibrary(indexToRemove);
            displayBooks(); // Update the display after removing the book
        });

        // Append the elements to the card
        bookCard.appendChild(titleElement);
        bookCard.appendChild(authorElement);
        bookCard.appendChild(pagesElement);
        bookCard.appendChild(readElement);
        bookCard.appendChild(buttonReadElement);
        bookCard.appendChild(removeElement);

        // Append the card to the container
        container.appendChild(bookCard);
    }
}

addBookToLibrary("The Hobbit", "J.R.R Tolkien", 255, "Yes");
addBookToLibrary("Lord Of The Rings", "J.R.R Tolkien", 3785, "No");

displayBooks();


function removeBookFromLibrary(index) {
    myLibrary.splice(index, 1);
}

//Listen For Form Sumbit Button
document.getElementById('bookForm').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevents the default form submission behavior

    // Retrieve form values
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const pages = document.getElementById('pages').value;
    const read = document.getElementById('read').checked ? "Yes" : "No";

    addBookToLibrary(title, author, pages, read)
    event.target.reset(); // Resets the form

    displayBooks();
    
});


const openButton = document.querySelector("[data-open-modal]");
const closeButton = document.querySelector("[data-close-modal]");
const modal = document.querySelector("[data-modal]");

openButton.addEventListener("click", () => {
    modal.showModal();
});

// closeButton.addEventListener("click", () => {
//     modal.close();
// });

modal.addEventListener("click", e => {
    const dialogDimensions = modal.getBoundingClientRect();
    if (
        e.clientX < dialogDimensions.left ||
        e.clientX > dialogDimensions.right ||
        e.clientY < dialogDimensions.top ||
        e.clientY > dialogDimensions.bottom
    ) {
        modal.close();
    }
});
