const createNoteButton = document.querySelector('#createNewNote'),
      openArchiveButton = document.querySelector('#openArchive'),
      openBinButton = document.querySelector('#openBin'),
      activeNotesList = document.querySelector('.notes__list'),
      summaryNotesList = document.querySelector('.summary__list');

const activeNotes = [{
    name: 'Shopping list', 
    content: 'Tomatoes, bread', 
    category: 'Task', 
    dateOfCreate: 'April 20, 2021', 
    active: true,
    parent: '.notes__list',
    classes: '.notes__list-item'
}, {
    name: 'The theory of evolution', 
    content: 'The evolution theory', 
    category: 'Random Thought', 
    dateOfCreate: 'April 27, 2021', 
    active: true,
    parent: '.notes__list',
    classes: '.notes__list-item'
}, {
    name: 'New Feature', 
    content: 'Implement new task button', 
    category: 'Idea', 
    dateOfCreate: 'May 05, 2021', 
    active: true,
    parent: '.notes__list',
    classes: '.notes__list-item'
}, {
    name: 'Books', 
    content: 'The Lean Startup', 
    category: 'Task', 
    dateOfCreate: 'May 15, 2021', 
    active: true,
    parent: '.notes__list',
    classes: '.notes__list-item'
}],
      archivedNotes = [];



class Note {
    constructor(name, content, category, dateOfCreate, active, parentSelector, ...classes) {
        this.name = name;
        this.dateOfCreate = dateOfCreate;
        this.category = category;
        this.content = content;
        this.active = active;
        this.parent = document.querySelector(parentSelector),
        this.classes = classes;
        this.dates = this.getDates(this.content);
    }

    getDates (description) {
        const dateRegex = /\d{1,2}\/\d{1,2}\/\d{4}/g;
        if (dateRegex.test(description)) {
            return description.match(dateRegex).join(', ');
        }
        return "";
    }

    render() {
        const element = document.createElement('div');
        let description = this.content;

        if (this.classes.length === 0) {
            this.element = 'notes__list-item';
            element.classList.add(this.element);
        } else {
            element.classList.add(this.classes);
        }

        if (this.content.length >= 14) {
            description = this.content.slice(0, 12) + '...';
        }

        element.innerHTML = `<div class="notes__list-item">
                                <div class="list-title">${this.name}</div>
                                <div class="note__content-wrapper">
                                <div class="note__create-date">${this.dateOfCreate}</div>
                                <div class="note__category">${this.category}</div>
                                <div class="note__content">${description}</div>
                                <div class="note__dates">${this.dates}</div>
                                </div>
                                <div class="note__management">
                                <div class="edit__note"><img src="./public/listItemChange.png" alt="Change note"></div>
                                <div class="archive__note"><img src="./public/listItemArchive.png" alt="Archive note"></div>
                                <div class="remove__note"><img src="./public/listItemRemove.png" alt="Remove note"></div>
                                </div>
                            </div>`;
        this.parent.append(element);
    }
}

parseNotesList('.notes__list');

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
        noteData.parent = '.notes__list'
        noteData.classes = '.notes__list-item';
        console.log(noteData);

        activeNotes.push(noteData);
        console.log(activeNotes)
        parseNotesList(noteData.parent);

        addNoteForm.reset();

        closeModalWindow('.modal');
        closeModalWindow('.create__form-wrapper');
    })
})


function parseNotesList (parentElem) {
    document.querySelector(parentElem).innerHTML ='';
    activeNotes.forEach(({name, content, category, dateOfCreate, active, parent}) => {
        new Note(name, content, category, dateOfCreate, active, parent, '.notes__list-item').render();
    })
}

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

    modalWindow.addEventListener('click', (e) => {
        let target = e.target;
        
        if (target === modalWindow || target.classList.contains('close__modal')) {
            closeModalWindow('.modal');
            closeModalWindow('.create__form-wrapper');
        }
    });
    
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modalWindow.classList.contains('show')) {
            closeModalWindow('.modal');
            closeModalWindow('.create__form-wrapper');
        }
    })
}

function closeModalWindow(selector) {
    const modalWindow = document.querySelector(selector);
    modalWindow.classList.remove('show');
    modalWindow.classList.add('hide');
}