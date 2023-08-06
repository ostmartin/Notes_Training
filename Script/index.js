const createNoteButton = document.querySelector('#createNewNote'),
      openArchiveButton = document.querySelector('#openArchive'),
      openBinButton = document.querySelector('#openBin'),
      notesLists = document.querySelectorAll('.notes__list'),
      summaryNotesList = document.querySelector('.summary__list'),
      modalWindow = document.querySelector('.modal'),
      creationForm = document.querySelector('form');


      
const taskSumActive = document.querySelector('#taskSumActive'),
    taskSumArchive = document.querySelector('#taskSumArchive'),
    randomSumActive = document.querySelector('#randomSumActive'),
    randomSumArchive = document.querySelector('#randomSumArchive'),
    ideaSumActive = document.querySelector('#ideaSumActive'),
    ideaSumArchive = document.querySelector('#ideaSumArchive');

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

parseNotesList('#activeNotesList', '#modalArchive');
updateSumTable();

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

openArchiveButton.addEventListener('click', () => openModalWindow('.modal', '#modalArchive'));

creationForm.addEventListener('submit', (event) => {
    event.preventDefault();

    getUserData(creationForm);

    creationForm.reset();
    updateSumTable();
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

notesLists.forEach(list => {
    list.addEventListener('click', (event) => {
        const target = event.target;
        const currentNote = target.parentNode.parentNode;
        const currentParent = currentNote.parentNode;
    
        if (target.classList.contains('edit')) {
            editeNote();
        }
    
        if (target.classList.contains('archive')) {
            moveNote(currentNote, activeNotes, archivedNotes, currentParent);
        }
    
        if (target.classList.contains('remove')) {
            if (currentParent.id === 'activeNotesList') {
                removeNote(currentNote, currentParent, activeNotes);
            } else if (currentParent.id === 'modalArchive') {
                removeNote(currentNote, currentParent, archivedNotes);
            }
        }
    
        if (target.classList.contains('unarchive')) {
            moveNote(currentNote, archivedNotes, activeNotes, currentParent);
        }
    })
})

function openModalWindow(modalSelector, contentSelector) {
    const modal = document.querySelector(modalSelector),
          contentBox = document.querySelector(contentSelector);

    modal.classList.add('show');
    modal.classList.remove('hide');

    contentBox.classList.add('show');
    contentBox.classList.remove('hide');
}

function closeModalWindow(modalSelector) {
    const modalWindow = modalSelector;
    const modalContent = modalWindow.querySelector('.show');

    modalWindow.classList.remove('show');
    modalWindow.classList.add('hide');

    modalContent.classList.remove('show');
    modalContent.classList.add('hide');
}

function getUserData(form) {
    const formData = new FormData(form);

    const noteData = Object.fromEntries(formData.entries());

    const {title, category, content} = noteData;

    const newNote = new Note(title, category, content);

    activeNotes.push(newNote);

    renderNote(newNote, '#activeNotesList', false);
    closeModalWindow(modalWindow);
}

function parseNotesList(parentActive, parentArchive) {
    activeNotes.forEach(note => {
        renderNote(note, parentActive, false);
    })

    archivedNotes.forEach(note => {
        renderNote(note, parentArchive, true);
    })
}

function renderNote(note, parentSelector, archived) {
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

    element.innerHTML = checkNoteForArchive(note, archived, description, dates);

    parent.append(element);
}

function checkNoteForArchive(note, archived, description, dates) {
    let html = `<div class="list-title">${note.title}</div>
                        <div class="note__content-wrapper">
                            <div class="note__create-date">${note.dateOfCreate}</div>
                            <div class="note__category">${note.category}</div>
                            <div class="note__content">${description}</div>
                            <div class="note__dates">${dates}</div>
                        </div>`;
    
    if (archived) {
        html += `<div class="note__management">
                                <div class="unarchive"></div>
                                <div class="remove"></div>
                             </div>`
    } else {
        html += `<div class="note__management">
                                <div class="edit"></div>
                                <div class="archive"></div>
                                <div class="remove"></div>
                             </div>`

    }
    return html;
}

function removeNote(noteElem, parentElem, notesArr) {
    const noteElemsList = [...parentElem.children];

    const index = noteElemsList.indexOf(noteElem);

    notesArr.splice(index, 1);
    noteElem.remove();
    updateSumTable();
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

function updateSumTable() {
    taskSumActive.textContent = getSum(activeNotes, 'Task');
    taskSumArchive.textContent = getSum(archivedNotes, 'Task');

    randomSumActive.textContent = getSum(activeNotes, 'Random Thought');
    randomSumArchive.textContent = getSum(archivedNotes, 'Random Thought');

    ideaSumActive.textContent = getSum(activeNotes, 'Idea');
    ideaSumArchive.textContent = getSum(archivedNotes, 'Idea');
}

function getSum(arr, category) {
    return arr.reduce((sum, note) => {
        if (note.category === category) {
            sum += 1;
        }

        return sum;
    }, 0)
}

function moveNote(noteElem, sourceArr, targetArr, parentElem) {
    const noteElemsList = [...parentElem.children];
    const index = noteElemsList.indexOf(noteElem);
    
    targetArr.push(sourceArr[index]);

    if(sourceArr === activeNotes) {
        renderNote(sourceArr[index], '#modalArchive', true);
    } else {        
        renderNote(sourceArr[index], '#activeNotesList', false);
    }

    sourceArr.splice(index, 1);
    noteElem.remove();

    updateSumTable();
}