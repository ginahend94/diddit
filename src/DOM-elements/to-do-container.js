import load from "../functions/load";
import save from "../functions/save";
// editTask 
import newTask, { handleCheckbox, taskDetails, editTask } from "../functions/todoManager";
import format from "date-fns/format";
import { getIcon } from "../functions/icon";
import Modal from "./modal";
import contextMenu from "./context-menu";
// import modalInnerTemplate from './create-edit-task'

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
    taskContainer.addEventListener('contextmenu', e => {
        e.preventDefault();
        const menu = contextMenu.generateMenu('taskOptions', task);
        contextMenu.openMenu(e, menu);
    });

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
        taskDueDate.textContent = task.dateFormatted;
    }

    const dragIcon = getIcon('drag', ['drag']);
    taskContainer.append(dragIcon);

    if (task.subtasks) {
        const subtasks = document.createElement('ul');
        taskLi.append(subtasks);
        subtasks.classList.add('subtasks');

        task.subtasks.forEach((item) => {
            const subtask = document.createElement('li');
            subtasks.append(subtask);
            subtask.classList.add('subtask');
            subtask.classList.add('drag-element');
            subtask.id = item.id;
            subtask.dataset.container = task.id;

            const taskContainer = document.createElement('div');
            subtask.append(taskContainer);
            taskContainer.classList.add('task-container', 'subtask-container');

            const checkboxContainer = document.createElement('label');
            taskContainer.append(checkboxContainer);
            checkboxContainer.classList.add('checkbox-container');
            checkboxContainer.setAttribute('for', `checkbox-${item.id}`);
            const listCheckbox = document.createElement('input');
            taskContainer.append(listCheckbox);
            listCheckbox.id = `checkbox-${item.id}`;
            listCheckbox.type = 'checkbox';
            listCheckbox.classList.add('list-checkbox', 'subtask-checkbox');
            listCheckbox.checked = item.completed;

            const checkmarkContainer = document.createElement('label');
            taskContainer.append(checkmarkContainer);
            checkmarkContainer.setAttribute('for', `checkbox-${item.id}`);

            const checkmark = document.createElement('span');
            checkmarkContainer.append(checkmark);
            checkmark.classList.add('checkmark');

            const taskText = document.createElement('span');
            taskContainer.append(taskText);
            taskText.classList.add('task-text');
            taskText.textContent = item.name;

            if (item.date) {
                const taskDueDate = document.createElement('span');
                taskContainer.append(taskDueDate);
                taskDueDate.classList.add('task-due-date');
                taskDueDate.textContent = item.dateFormatted;
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