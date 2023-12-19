class myLibrary {
    constructor() {
        this.books = [];
    }

    // Add new book to library
    addBookToLibrary(title, author, pages, read) {
        const newBook = new Book(title, author, pages, read);
        this.books.push(newBook);
    }

    // Remove a book from the library
    removeBookFromLibrary(index) {
        this.books.splice(index, 1);
    }
}

class Book {
    // Book constructor
    constructor(title, author, pages, read) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
    }

    // Returns info of the book
    info() {
        return `${this.title}, ${this.author}, ${this.pages}, ${this.read}`;
    }

    // Toggle read status
    readBook() {
        // Toggle read status between "Yes" and "No"
        this.read = this.read === "No" ? "Yes" : "No";
    }
}

// Display the books in card format
function displayBooks() {
    const container = document.getElementById("book-container");
    container.innerHTML = "";

    for (let i = 0; i < libraryInstance.books.length; i++) {
        const book = libraryInstance.books[i];

        // Create a div element for each book
        const bookCard = document.createElement("div");
        bookCard.classList.add("card");

        // Create separate elements for each piece of information
        const titleElement = document.createElement("h2");
        titleElement.textContent = `Title: ${book.title}`;

        const authorElement = document.createElement("p");
        authorElement.textContent = `Author: ${book.author}`;

        const pagesElement = document.createElement("p");
        pagesElement.textContent = `Pages: ${book.pages}`;

        const readElement = document.createElement("p");
        readElement.textContent = `Read: ${book.read}`;

        const readBook = document.createElement("button");
        readBook.textContent = "Have Read";
        readBook.dataset.index = i;

        const removeBook = document.createElement("button");
        removeBook.textContent = "Remove Book";
        removeBook.dataset.index = i;

        // Updates books that have been or not read
        readBook.addEventListener("click", function () {
            const indexHasBeenRead = this.dataset.index;
            myLibrary[indexHasBeenRead].readBook();
            displayBooks();
        });

        // Removes book from library
        removeBook.addEventListener("click", function () {
            const indexToRemove = this.dataset.index;
            libraryInstance.removeBookFromLibrary(indexToRemove);
            displayBooks();
        });

        // Append the elements to the card
        bookCard.appendChild(titleElement);
        bookCard.appendChild(authorElement);
        bookCard.appendChild(pagesElement);
        bookCard.appendChild(readElement);
        bookCard.appendChild(readBook);
        bookCard.appendChild(removeBook);

        // Append the card to the container
        container.appendChild(bookCard);
    }
}

const libraryInstance = new myLibrary();

// Add sample books to the library
libraryInstance.addBookToLibrary("The Hobbit", "J.R.R Tolkien", 255, "Yes");
libraryInstance.addBookToLibrary("Lord Of The Rings", "J.R.R Tolkien", 3785, "No");

// Display the initial set of books
displayBooks();

// Listen for form submit button
document.getElementById("bookForm").addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent the default form submission behavior

    // Retrieve form values
    const title = document.getElementById("title").value;
    const author = document.getElementById("author").value;
    const pages = document.getElementById("pages").value;
    const read = document.getElementById("read").checked ? "Yes" : "No";

    // Add the new book to the library
    libraryInstance.addBookToLibrary(title, author, pages, read);

    // Reset the form
    event.target.reset();

    // Update and display the books
    displayBooks();
});

// Modal functionality
const openButton = document.querySelector("[data-open-modal]");
const closeButton = document.querySelector("[data-close-modal]");
const modal = document.querySelector("[data-modal]");

openButton.addEventListener("click", () => {
    modal.showModal();
});

// Closes modal if click outside of container
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
