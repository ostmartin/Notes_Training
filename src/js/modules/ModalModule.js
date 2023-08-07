export {modalModule, openModalWindow, closeModalWindow};


function openModalWindow(modalSelector, contentSelector) {
    const modal = document.querySelector(modalSelector),
          contentBox = document.querySelector(contentSelector);

    document.body.style.overflow = 'hidden';
    modal.classList.add('show');
    modal.classList.remove('hide');

    contentBox.classList.add('show');
    contentBox.classList.remove('hide');
}    

function closeModalWindow(modalSelector) {
    const modalWindow = modalSelector;
    const modalContent = modalWindow.querySelector('.show');
    document.body.style.overflow = '';

    modalWindow.classList.remove('show');
    modalWindow.classList.add('hide');

    modalContent.classList.remove('show');
    modalContent.classList.add('hide');
}

function modalModule(modalWindow) {
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
}