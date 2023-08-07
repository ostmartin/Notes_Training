export {domModule}

function domModule () {
    return {
        createNoteButton : document.querySelector('#createNewNote'),
        openArchiveButton : document.querySelector('#openArchive'),
        notesLists : document.querySelectorAll('.notes__list'),
        modalWindow : document.querySelector('.modal'),
        creationForm : document.querySelector('form'),
        taskSumActive : document.querySelector('#taskSumActive'),
        taskSumArchive : document.querySelector('#taskSumArchive'),
        randomSumActive : document.querySelector('#randomSumActive'),
        randomSumArchive : document.querySelector('#randomSumArchive'),
        ideaSumActive : document.querySelector('#ideaSumActive'),
        ideaSumArchive : document.querySelector('#ideaSumArchive')
    }
}