export {getUserData, getCurrentDate, getDates, updateSumTable};

function getUserData(form, note) {
    try {
        const formData = new FormData(form);

        const noteData = Object.fromEntries(formData.entries());
    
        const {title, category, content} = noteData;
    
        form.reset();
    
        return new note(title, category, content);
    } catch (error) {
        alert("Error while getting user data:", error)
    }
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

function updateSumTable(activeNotes, archivedNotes, taskSumActive, taskSumArchive, randomSumActive, randomSumArchive, ideaSumActive, ideaSumArchive) {
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