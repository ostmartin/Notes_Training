export {notesModule};
import { updateSumTable, getUserData, getDates, getCurrentDate } from "./DataModule";
import { openModalWindow, closeModalWindow } from "./ModalModule";

function notesModule(createNoteButton, openArchiveButton, creationForm, notesLists, taskSumActive, taskSumArchive, ideaSumActive, ideaSumArchive, randomSumActive, randomSumArchive, modalWindow) {
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
    }, {
        title: 'My Test Note', 
        content: 'With out dates', 
        category: 'Idea', 
        dateOfCreate: 'May 15, 2021',
        dates: ''
    }, {
        title: 'Next Note', 
        content: 'With dates 5/5/2023, 5/5/2022', 
        category: 'Random Thought', 
        dateOfCreate: 'May 15, 2021',
        dates: '5/5/2023, 5/5/2022'
    }, {
        title: 'Last Note', 
        content: 'Some dates 7/7/2021', 
        category: 'Task', 
        dateOfCreate: 'May 15, 2021',
        dates: '7/7/2021'
    }];
    
    let archivedNotes = [];
    
    parseNotesList('#activeNotesList', '#modalArchive');
    updateSumTable(activeNotes, archivedNotes, taskSumActive, taskSumArchive, randomSumActive, randomSumArchive, ideaSumActive, ideaSumArchive);
    
    class Note {
        constructor(title, category, content) {
            this.title = title;
            this.dateOfCreate = getCurrentDate();
            this.category = category;
            this.content = content;
            this.dates = getDates(this.content);
        }
    }

    createNoteButton.addEventListener('click', () => openModalWindow('.modal', '.create__form-wrapper'));

    openArchiveButton.addEventListener('click', () => openModalWindow('.modal', '#modalArchive'));

    creationForm.addEventListener('submit', createNoteByForm);


    function createNoteByForm(event) {
        event.preventDefault();

        const newNote = getUserData(creationForm, Note);

        activeNotes.push(newNote);

        renderNote(newNote, '#activeNotesList', false);
        closeModalWindow(modalWindow);
        updateSumTable(activeNotes, archivedNotes, taskSumActive, taskSumArchive, randomSumActive, randomSumArchive, ideaSumActive, ideaSumArchive);
    }

    notesLists.forEach(list => {
        list.addEventListener('click', (event) => {
            const target = event.target;
            const currentNote = target.parentNode.parentNode;
            const currentParent = currentNote.parentNode;
        
            if (target.classList.contains('edit')) {
                editNote(currentNote, currentParent);
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

    function parseNotesList(parentActive, parentArchive) {
        document.querySelector(parentActive).innerHTML = '';
        document.querySelector(parentArchive).innerHTML = '';
    
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
            dates = note.dates.slice(0, 14) + '...';
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
        updateSumTable(activeNotes, archivedNotes, taskSumActive, taskSumArchive, randomSumActive, randomSumArchive, ideaSumActive, ideaSumArchive);
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
    
        updateSumTable(activeNotes, archivedNotes, taskSumActive, taskSumArchive, randomSumActive, randomSumArchive, ideaSumActive, ideaSumArchive);
    }
    
    function editNote(noteElem, parentElem) {
        openModalWindow('.modal', '.create__form-wrapper');
        creationForm.removeEventListener('submit', createNoteByForm);
        
        const noteElemsList = [...parentElem.children];
        const index = noteElemsList.indexOf(noteElem);
    
        const {title, content, category} = activeNotes[index];
    
        const currTitle = document.querySelector('#formNoteTitle');
        const currContent = document.querySelector('#formNoteContent');
        const currCategory = document.querySelector('#formNoteCategory');
    
        currTitle.value = title;
        currContent.value = content;
        currCategory.value = category;
    
        creationForm.addEventListener('submit', editNoteHandler);
    
        function editNoteHandler(event) {
            event.preventDefault();
            const editedNote = getUserData(creationForm, Note);
    
            closeModalWindow(modalWindow);    
            activeNotes.splice(index, 1, editedNote);
            creationForm.removeEventListener('submit', editNoteHandler);
            creationForm.addEventListener('submit', createNoteByForm);
            parseNotesList('#activeNotesList', '#modalArchive');
            updateSumTable(activeNotes, archivedNotes, taskSumActive, taskSumArchive, randomSumActive, randomSumArchive, ideaSumActive, ideaSumArchive);
        }
    }
}