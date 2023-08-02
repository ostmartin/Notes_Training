const createNoteButton = document.querySelector('#createNewNote'),
      openArchiveButton = document.querySelector('#openArchive'),
      openBinButton = document.querySelector('#openBin'),
      activeNotesList = document.querySelector('.notes__list'),
      summaryNotesList = document.querySelector('.summary__list');

const activeNotes = [],
      archivedNotes = [];

class Note {
    constructor({name, content, category, dateOfCreate, active}) {
        this.name = name;
        this.dateOfCreate = dateOfCreate;
        this.category = category;
        this.content = content;
        this.active = active;
        this.dates = this.getDates(this.content);
    }

    getDates (description) {
        const dateRegex = /\d{1,2}\/\d{1,2}\/\d{4}/g;
        if (dateRegex.test(description)) {
            return description.match(dateRegex).join(', ');
        }
        return "";
    }
}

createNoteButton.addEventListener('click', () => {
    openModalWindow('.modal');
    openModalWindow('.create__form-wrapper');

    const addNoteForm = document.querySelector('#creation_form');

    addNoteForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const formData = new FormData(addNoteForm);

        const noteData = Object.fromEntries(formData.entries());
        noteData.dateOfCreate = getCurrentDate();
        noteData.active = true;

        activeNotes.push(new Note(noteData));

        addNoteForm.reset();

        closeModalWindow('.modal');
        closeModalWindow('.create__form-wrapper');
    })
})

function getCurrentDate() {
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    
    const now = new Date();
    const monthName = months[now.getMonth()];
    const day = now.getDate();
    const year = now.getFullYear();
    
    return `${monthName} ${day}, ${year}`;
}

function openModalWindow(selector) {
    const modalWindow = document.querySelector(selector);
    modalWindow.classList.add('show');
    modalWindow.classList.remove('hide');
}

function closeModalWindow(selector) {
    const modalWindow = document.querySelector(selector);
    modalWindow.classList.remove('show');
    modalWindow.classList.add('hide');
}