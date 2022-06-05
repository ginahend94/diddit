import load from "../functions/load";
import save from "../functions/save";
import newTask, { handleCheckbox, editTask } from "../functions/todoManager";
import format from "date-fns/format";
import { getIcon } from "../functions/icon";
import Modal from "./modal";

const profile = load('profile');

export default list => {

    const todoListContainer = document.createElement('div');
    todoListContainer.classList.add('to-do-list-container');

    const todoList = document.createElement('ul');
    todoListContainer.append(todoList);
    todoList.classList.add('to-do-list');
    todoList.classList.add('drag-container');
    todoList.id = list.id;

    const button = document.createElement('button');
    todoListContainer.append(button);
    button.classList.add('add-new-task');
    button.addEventListener('click', e => {
        newTask.showModal(list.id);
    });
    button.textContent = 'Add new task';

    return todoListContainer;
}

export const createTaskNode = task => {
    const taskLi = document.createElement('li');
    taskLi.classList.add('task');
    taskLi.classList.add('drag-element');
    taskLi.classList.add('drag-container');
    taskLi.id = task.id;
    taskLi.dataset.container = task.container;

    const taskContainer = document.createElement('div');
    taskLi.append(taskContainer);
    taskContainer.classList.add('task-container');
    taskContainer.classList.add(`${task.priority}-priority`);
    taskContainer.addEventListener('click', e => {
        if (e.target !== taskContainer && e.target !== taskContainer.querySelector('.task-text')) return;
        taskDetails(task);
    })

    const checkboxContainer = document.createElement('label');
    taskContainer.append(checkboxContainer);
    checkboxContainer.classList.add('checkbox-container');
    checkboxContainer.setAttribute('for', `checkbox-${task.id}`);

    const listCheckbox = document.createElement('input');
    taskContainer.append(listCheckbox);
    listCheckbox.id = `checkbox-${task.id}`;
    listCheckbox.type = 'checkbox';
    listCheckbox.classList.add('list-checkbox');
    listCheckbox.checked = task.completed;

    const checkmarkContainer = document.createElement('label');
    taskContainer.append(checkmarkContainer);
    checkmarkContainer.setAttribute('for', `checkbox-${task.id}`);

    const checkmark = document.createElement('span');
    checkmarkContainer.append(checkmark);
    checkmark.classList.add('checkmark');

    const taskText = document.createElement('span');
    taskContainer.append(taskText);
    taskText.classList.add('task-text');
    taskText.textContent = task.name;

    if (task.date) {
        const taskDueDate = document.createElement('span');
        taskContainer.append(taskDueDate);
        taskDueDate.classList.add('task-due-date');
        taskDueDate.textContent = format(new Date(task.date), 'MM/dd/yyyy');
    }

    const dragIcon = getIcon('drag', ['drag']);
    taskContainer.append(dragIcon);

    if (task.subtasks) {
        const subtasks = document.createElement('ul');
        taskLi.append(subtasks);
        subtasks.classList.add('subtasks');

        task.subtasks.forEach((item, i) => {
            const subtask = document.createElement('li');
            subtasks.append(subtask);
            subtask.classList.add('subtask');
            subtask.classList.add('drag-element');
            subtask.id = `${task.id}.${i}`;
            subtask.dataset.container = task.id;

            const taskContainer = document.createElement('div');
            subtask.append(taskContainer);
            taskContainer.classList.add('task-container', 'subtask-container');

            const checkboxContainer = document.createElement('label');
            taskContainer.append(checkboxContainer);
            checkboxContainer.classList.add('checkbox-container');
            checkboxContainer.setAttribute('for', `checkbox-${subtask.id}`);
            const listCheckbox = document.createElement('input');
            taskContainer.append(listCheckbox);
            listCheckbox.id = `checkbox-${subtask.id}`;
            listCheckbox.type = 'checkbox';
            listCheckbox.classList.add('list-checkbox');

            const checkmarkContainer = document.createElement('label');
            taskContainer.append(checkmarkContainer);
            checkmarkContainer.setAttribute('for', `checkbox-${subtask.id}`);

            const checkmark = document.createElement('span');
            checkmarkContainer.append(checkmark);
            checkmark.classList.add('checkmark');

            const taskText = document.createElement('span');
            taskContainer.append(taskText);
            taskText.classList.add('task-text');
            taskText.textContent = item[0];

            if (item[1]) {
                const taskDueDate = document.createElement('span');
                taskContainer.append(taskDueDate);
                taskDueDate.classList.add('task-due-date');
                taskDueDate.textContent = format(new Date(item[1]), 'MM/dd/yyyy');
            }

            const dragIcon = getIcon('drag', ['drag']);
            taskContainer.append(dragIcon);

        })
    }

    const inputs = Array.from(taskLi.querySelectorAll('input[type="checkbox"]'));
    inputs.forEach(input => {
        input.addEventListener('change', e => {
            handleCheckbox(e, task);
            editTask(task);
        })
    })

    return taskLi;
}

const taskDetails = task => {
    const showDetailModal = (() => {
        const modalInner = () => {
            const taskDetails = document.createElement('div');

            const title = document.createElement('h3');
            taskDetails.append(title);
            title.classList.add('task-details', 'title')
            title.textContent = task.name;

            if (task.date) {
                const dueDate = document.createElement('div');
                taskDetails.append(dueDate);
                dueDate.classList.add('task-details', 'due-date');
                dueDate.textContent = `Due ${format(new Date(task.date), 'MM/dd/yyyy')}`;
            }

            const priority = document.createElement('div');
            taskDetails.append(priority);
            priority.classList.add('task-details', 'priority');
            priority.textContent = `${task.priority=='none'?'No ':task.priority + '-'}Priority`;

            if (task.subtasks.length) {
                const subtasks = document.createElement('ul');
                taskDetails.append(subtasks);
                subtasks.classList.add('task-details', 'subtasks');

                const subtaskHeading = document.createElement('h4');
                subtasks.append(subtaskHeading);
                subtaskHeading.textContent = 'Subtasks:';

                task.subtasks.forEach(subtask => {
                    const li = document.createElement('li');
                    subtasks.append(li);
                    li.textContent = subtask[0];
                    if (!subtask[1]) return; 
                    const ul = document.createElement('ul');
                    li.append(ul);
                    const date = document.createElement('li');
                    ul.append(date);
                    date.textContent = `Due ${format(new Date(subtask[1]), 'MM/dd/yyyy')}`;
                })
            }

            if (task.notes.trim()) {
                
                const notes = document.createElement('div');
                taskDetails.append(notes);
                notes.classList.add('task-details', 'notes');

                const notesHeading = document.createElement('h4');
                notes.append(notesHeading);
                notesHeading.textContent = 'Notes:';

                const notesBody = document.createElement('p');
                notes.append(notesBody);
                notesBody.textContent = task.notes;
            }

            const editButton = document.createElement('button');
            taskDetails.append(editButton);
            editButton.prepend(getIcon('square-edit-outline'));
            editButton.append('Edit task');
            editButton.style.width = 'fit-content';
            editButton.addEventListener('click', e => {
                Modal.close(modal);
                
            })

            return taskDetails;
        }

        const modal = Modal.create(
            ['show-task-details'],
            modalInner(),
            () => Modal.close(modal),
            'Close',
            false,
            true,
            true
        );
        Modal.open(modal);
    })();
}