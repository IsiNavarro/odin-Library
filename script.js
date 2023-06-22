
const libraryGrid = document.getElementById('libraryGrid');

let library = [];

function Book(name, author, pages, read) {
    this.name = name;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

function addBookToLibrary(object, array) {
    array.push(object);
}

function displayLibraryAsGrid(array) {
    array.forEach(element => {
        let gridElement = document.createElement('div');
        gridElement.classList.add('book');

        let divName = document.createElement('div');
        divName.textContent = element.name;
        let divAuthor = document.createElement('div');
        divAuthor.textContent = element.author;
        let divPages = document.createElement('div');
        divPages.textContent = `${element.pages} pages`;
        let readBtn = document.createElement('button');
        readBtn.textContent = element.read ? 'read' : 'not read';
        readBtn.setAttribute('id', 'readBtn');
        if (element.read) {readBtn.classList.toggle('read')}
        let delBtn = document.createElement('button');
        delBtn.classList.add('delete');
        delBtn.textContent = 'Remove x';

        gridElement.appendChild(divName);
        gridElement.appendChild(divAuthor);
        gridElement.appendChild(divPages);
        gridElement.appendChild(readBtn);
        gridElement.appendChild(delBtn);        
        
        libraryGrid.appendChild(gridElement);
    });
}

let HarryPotter = new Book('Harry Potter III: The prisoner of Azkaban', 'J.K. Rowling', '125', false);
let idkbook = new Book('John Paul II', 'Asia', 2137, true);

addBookToLibrary(HarryPotter, library);
addBookToLibrary(idkbook, library);

displayLibraryAsGrid(library);