const createNoteButton = document.querySelector('#createNewNote'),
      openArchiveButton = document.querySelector('#openArchive'),
      openBinButton = document.querySelector('#openBin'),
      activeNotesList = document.querySelector('#activeNotesList'),
      notesList = document.querySelector('.notes__list'),
      summaryNotesList = document.querySelector('.summary__list'),
      modalWindow = document.querySelector('.modal'),
      creationForm = document.querySelector('form');

let activeNotes = [{
    title: 'Shopping list', 
    content: 'Tomatoes, bread', 
    category: 'Task', 
    dateOfCreate: 'April 20, 2021',
    dates: ''
}, {
    title: 'The theory of evolution', 
    content: 'The evolution theory', 
    category: 'Random Thought', 
    dateOfCreate: 'April 27, 2021',
    dates: ''
}, {
    title: 'New Feature', 
    content: 'Implement new task button', 
    category: 'Idea', 
    dateOfCreate: 'May 05, 2021',
    dates: ''
}, {
    title: 'Books', 
    content: 'The Lean Startup', 
    category: 'Task', 
    dateOfCreate: 'May 15, 2021',
    dates: ''
}];

let archivedNotes = [];

parseNotesList('#activeNotesList');

class Note {
    constructor(title, category, content) {
        this.title = title;
        this.dateOfCreate = getCurrentDate();
        this.category = category;
        this.content = content;
        this.dates = getDates(content);
    }
}

createNoteButton.addEventListener('click', () => openModalWindow('.modal', '.create__form-wrapper'));

creationForm.addEventListener('submit', (event) => {
    event.preventDefault();

    getUserData(creationForm);

    creationForm.reset();
});

modalWindow.addEventListener('click', (event) => {
    const target = event.target;
    
    if(target.classList.contains('close__modal') || target.classList.contains('modal')) {
        closeModalWindow(modalWindow);
    }
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalWindow.classList.contains('show')) {
        closeModalWindow(modalWindow);
    }
})

notesList.addEventListener('click', (event) => {
    const target = event.target;
    const currentNote = target.parentNode.parentNode;

    if (target.classList.contains('edit')) {
        editeNote();
    }

    if (target.classList.contains('archive')) {
        noteToArchive();
    }

    if (target.classList.contains('remove')) {
        removeCurrentNote(currentNote, notesList);
    }
})

function openModalWindow(modalSelector, contentSelector) {
    const modal = document.querySelector(modalSelector),
          contentBox = document.querySelector(contentSelector);

    modal.classList.add('show');
    modal.classList.remove('hide');

    contentBox.classList.add('show');
    contentBox.classList.remove('hide');
}

function closeModalWindow(modal) {
    const modalWindow = modal;
    modalWindow.classList.remove('show');
    modalWindow.classList.add('hide');
}

function getUserData(form) {
    const formData = new FormData(form);

    const noteData = Object.fromEntries(formData.entries());

    const {title, category, content} = noteData;

    const newNote = new Note(title, category, content);

    activeNotes.push(newNote);
    console.log(activeNotes);

    renderNote(newNote, '#activeNotesList');
    closeModalWindow(modalWindow);
}

function parseNotesList(parent) {
    activeNotes.forEach(note => {
        renderNote(note, parent);
    })
}

function renderNote(note, parentSelector) {
    const parent = document.querySelector(parentSelector);
    const element = document.createElement('div');

    let description = note.content;
    let dates = note.dates;
    
    element.classList.add('notes__list-item');

    if (note.content.length >= 14) {
        description = note.content.slice(0, 14) + '...';
    }

    if (note.dates.length >= 14) {
        dates = note.content.slice(0, 14) + '...';
    }


    element.innerHTML = `<div class="list-title">${note.title}</div>
                        <div class="note__content-wrapper">
                            <div class="note__create-date">${note.dateOfCreate}</div>
                            <div class="note__category">${note.category}</div>
                            <div class="note__content">${description}</div>
                            <div class="note__dates">${dates}</div>
                        </div>
                        <div class="note__management">
                            <div class="edit"></div>
                            <div class="archive"></div>
                            <div class="remove"></div>
                        </div>`;
    parent.append(element);
}

function removeCurrentNote(noteElem, parentElem) {
    const noteElemsList = [...parentElem.children];

    const index = noteElemsList.indexOf(noteElem);
    
    noteElem.remove();
    activeNotes = activeNotes.filter((note, i) => i !== index);
}

function getCurrentDate() {
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    
    const now = new Date();
    const monthName = months[now.getMonth()];
    const day = now.getDate();
    const year = now.getFullYear();
    
    return `${monthName} ${day}, ${year}`;
}

function getDates (content) {
    const dateRegex = /\d{1,2}\/\d{1,2}\/\d{4}/g;
    if (dateRegex.test(content)) {
        return content.match(dateRegex).join(', ');
    }
    return "";
}