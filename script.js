let myLibrary = [];

function Book(title, author, pages, read) {
    this.title = title
    this.author = author
    this.pages = pages
    this.read = read
}

// Добавление объекта в массив
let book;

function addBookToLibrary() {
    const titleInput = document.getElementById('title');
    const authorInput = document.getElementById('author');
    const pagesInput = document.getElementById('pages');


    // Добавление статуса к объекту через checkbox
    const checkInput = document.getElementById('read');
    checkInput.addEventListener('click', () => {
        if (checkInput.checked) {
            checkInput.value = 'Finished'
        } else if (!checkInput.checked) {
            checkInput.value = 'Not finished'
        }
    })

    book = new Book(titleInput.value, authorInput.value, pagesInput.value, checkInput.value);
    myLibrary.push(book);
}

function displayBook() {
    // Каждый раз очищаем div перед выводом содержимого array
    const container = document.querySelector('.container');
    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }

    // Переменная для создания уникальных id
    let divAmount = 0;

    myLibrary.forEach((book) => {
        const placeForBookDivs = document.querySelector('.container');
        // Создаем рамки для каждой книги
        const bookDiv = document.createElement('div');
        bookDiv.classList.add('book-div');
        // Создаем для каждой книги уникальный id
        bookDiv.id = divAmount;
        divAmount++;

        // Создаем внутри рамки p для вывода названия, автора и т.д.
        const bookH1 = document.createElement('p');

        // Создаем кнопку для изменения статуса
        const changeStatus = document.createElement('button');
        changeStatus.textContent = 'Status';

        changeStatus.addEventListener('click', (e) => {
            e.preventDefault();
            if (book.read === 'Finished') {
                book.read = 'Not finished';
            } else if (book.read === 'Not finished') {
                book.read = 'Finished';
            }

            displayBook();
        })

        // Создаем кпопку для удаления книги
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.classList.add('close-button');

        deleteButton.addEventListener('click', (e) => {
            e.preventDefault();
            myLibrary.splice(bookDiv.id, 1);
            bookDiv.remove();
        })

        // Выводим название, автора, количество страниц и т.д.
        bookH1.innerHTML += `${book.title}<br>${book.author}<br>${book.pages}<br>${book.read}`;

        // Размещаем все созданные элементы на странице
        placeForBookDivs.appendChild(bookDiv);
        bookDiv.appendChild(bookH1);
        bookDiv.appendChild(deleteButton);
        bookDiv.appendChild(changeStatus);
    })
}

// Открытие формы по нажатию кнопки
const inputForm = document.getElementById('input-form')
const button = document.getElementById('open-form')
button.addEventListener('click', (e) => {
    e.preventDefault();
    inputForm.classList.remove('form-hidden');
    inputForm.classList.add('show-form');
})

//Закрытие формы при нажатии кнопки
const closeButton = document.getElementById('close-button')
closeButton.addEventListener('click', (e) => {
    e.preventDefault();
    inputForm.classList.remove('show-form');
    inputForm.classList.add('form-hidden');
})

// Исполнение функций addBookToLibrary и displayBook по нажатию на кнопку submit.
const submit = document.getElementById('submit')
submit.addEventListener('click', (e) => {
    e.preventDefault();
    addBookToLibrary();
    displayBook();

    // Закрытие формы для заполнения объекта по нажатию на кнопку submit.
    inputForm.classList.remove('show-form');
    inputForm.classList.add('form-hidden');
})