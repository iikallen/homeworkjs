const inputElement = document.getElementById('title');
const createBtn = document.getElementById('create');
const listElement = document.getElementById('list');

let notes = [
    {
        title: 'Купи краба',
        status: true
    },
    {
        title: 'Яблоки не забудь',
        status: false
    }
];

function render() {
    listElement.innerHTML = ''; 
    for (let i = 0; i < notes.length; i++) {
        const note = notes[i];
        listElement.insertAdjacentHTML('beforeend', getNoteTemplate(note, i));
    }
}

render();

createBtn.onclick = function () {
    if (inputElement.value.length === 0) {
        return;
    }

    const newNote = {
        title: inputElement.value,
        status: false
    };

    notes.push(newNote);
    render();
    inputElement.value = '';
};

function getNoteTemplate(note, index) {
    const doneClass = note.status ? 'done' : '';
    const colorClass = note.status ? 'text-success' : ''; 
    return `
        <li class="list-group-item d-flex justify-content-between align-items-center ${doneClass} ${colorClass}">
            <span>${note.title}</span>
            <span>
                <button class="btn btn-small btn-success done" data-index="${index}">&check;</button>
                <button class="btn btn-small btn-danger delete" data-index="${index}">&times;</button>
            </span>
        </li>`;
}

listElement.addEventListener('click', function (event) {
    const target = event.target;
    if (target.classList.contains('delete')) {
        const index = target.getAttribute('data-index');
        notes.splice(index, 1); 
        render(); 
    } else if (target.classList.contains('done')) {
        const index = target.getAttribute('data-index');
        notes[index].status = !notes[index].status; 
        render();
    }
});
