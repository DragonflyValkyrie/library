const myLibrary = [];

// Book constructor
function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.info = function () {
        return `${this.title}, ${this.author}, ${this.pages}, ${this.read}`;
    };
}

// Book prototype method to toggle read status
Book.prototype.readBook = function () {
    // Toggle read status between "Yes" and "No"
    this.read = this.read === "No" ? "Yes" : "No";
};

// Add new book to library
function addBookToLibrary(title, author, pages, read) {
    const newBook = new Book(title, author, pages, read);
    myLibrary.push(newBook);
}

// Display the books in card format
function displayBooks() {
    const container = document.getElementById("book-container");
    container.innerHTML = "";

    for (let i = 0; i < myLibrary.length; i++) {
        const book = myLibrary[i];

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
            removeBookFromLibrary(indexToRemove);
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

// Add sample books to the library
addBookToLibrary("The Hobbit", "J.R.R Tolkien", 255, "Yes");
addBookToLibrary("Lord Of The Rings", "J.R.R Tolkien", 3785, "No");

// Display the initial set of books
displayBooks();

// Function to remove a book from the library
function removeBookFromLibrary(index) {
    myLibrary.splice(index, 1);
}

// Listen for form submit button
document.getElementById("bookForm").addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent the default form submission behavior

    // Retrieve form values
    const title = document.getElementById("title").value;
    const author = document.getElementById("author").value;
    const pages = document.getElementById("pages").value;
    const read = document.getElementById("read").checked ? "Yes" : "No";

    // Add the new book to the library
    addBookToLibrary(title, author, pages, read);

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
