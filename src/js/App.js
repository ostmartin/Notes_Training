import { domModule } from "./modules/DOMModule";
import { notesModule } from "./modules/NotesModule";
import { modalModule } from "./modules/ModalModule";

window.addEventListener('DOMContentLoaded', () => {
    const {
        createNoteButton,
        openArchiveButton,
        notesLists, 
        modalWindow, 
        creationForm, 
        taskSumActive, 
        taskSumArchive, 
        randomSumActive, 
        randomSumArchive, 
        ideaSumActive, 
        ideaSumArchive
    } = domModule();

    notesModule(createNoteButton, openArchiveButton, creationForm, notesLists, taskSumActive, taskSumArchive, ideaSumActive, ideaSumArchive, randomSumActive, randomSumArchive, modalWindow);
    modalModule(modalWindow);
})