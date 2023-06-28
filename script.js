const libraryGrid = document.getElementById('libraryGrid');
const addBookBtn = document.getElementById('addBookBtn');
const popUp = document.getElementById('popUp');
const closePopBtn = document.getElementById('closePopBtn');
const form = document.getElementById('form');
const readBtns = document.getElementsByClassName('readBtn');

let library = [];
let index = 0;

function Book(name, author, pages, read) {
    this.name = name;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.displayed = false;
    this.dataIndex = index;
    index ++;
}

function addBookToLibrary(book, library) {
    library.push(book);
}

function deleteBookFromLibrary(dataAttribute){
    // Deletes book from array
    let book = {};
    for(let i = 0; i<library.length; i++){
        book = library[i];
        if (book.dataIndex == dataAttribute) {
            console.log(book);
            library.splice(i, 1);
        }
    }
    // Deletes the div on display
    let divDataAttribute = "data-index";
    let div = document.querySelector(`div[${divDataAttribute}="${dataAttribute}"]`);
    if (div) div.remove();
}

function displayLibrary (library) {
    library.forEach(book => {

        if (book.displayed) return; // Checks if book is already displayed and skips if it is
        else {
            let gridElement = document.createElement('div'); // Creates div (card) to display
            gridElement.classList.add('book');

            let elementName = document.createElement('div'); // Creates and adds NAME to div
            elementName.textContent = book.name;
            gridElement.appendChild(elementName);

            let elementAuthor = document.createElement('div'); // AUTHOR
            elementAuthor.textContent = book.author;
            gridElement.appendChild(elementAuthor);

            let elementPages = document.createElement('div'); // PAGES
            elementPages.textContent = `${book.pages} pages`;
            gridElement.appendChild(elementPages);

            let elementRead = document.createElement('button'); // READ button ; checks read?
            elementRead.classList.add('readBtn');
                // Give id to button READ or NOT READ
                if (book.read) {
                    elementRead.textContent = `read`;
                    elementRead.setAttribute('id', 'read');
                } else {
                    elementRead.textContent = `not read`;
                    elementRead.setAttribute('id', 'notRead')
                }
                // Toogle id and book.read status
                elementRead.addEventListener('click', () => {
                    if (book.read) {
                        elementRead.textContent = 'not read';
                        elementRead.setAttribute('id', 'notRead');
                        book.read = false;
                    }
                    else {
                        elementRead.textContent = 'read'
                        elementRead.setAttribute('id', 'read');
                        book.read = true;
                    };
                })
            gridElement.appendChild(elementRead);

            let deleteButton = document.createElement(`button`); // DELETE button
            deleteButton.textContent = 'delete';
            deleteButton.addEventListener('click', (event) => {
                let parentNode = event.target.parentNode;
                let dataAttribute = parentNode.getAttribute('data-index');
                console.log(dataAttribute);

                deleteBookFromLibrary(dataAttribute);
            })
            gridElement.appendChild(deleteButton);

            gridElement.setAttribute('data-index', book.dataIndex); // ADD Data attribute

            libraryGrid.appendChild(gridElement);
            book.displayed = true;
        }
    });
}

//ADD NEW BOOK Button - POPUP
addBookBtn.addEventListener('click', () => {
    popUp.style.display = 'flex'
})

closePopBtn.addEventListener('click', (event) => {
    event.preventDefault();// Prevents form submission and page reload
    popUp.style.display = 'none';
})

form.addEventListener('submit', (event) => {
    event.preventDefault(); // Prevents form submission and page reload

    const newBookName = document.getElementById('name').value;
    const newBookAuthor = document.getElementById('author').value;
    const newBookPages = document.getElementById('pages').value;
    const newBookRead = document.getElementById('readCheckbox').checked;
    console.log(newBookRead);

    const newBook = new Book(newBookName, newBookAuthor, newBookPages, newBookRead);

    addBookToLibrary(newBook, library);
    displayLibrary(library);

    popUp.style.display = 'none'; //CLOSE PopUp
})

displayLibrary(library);
