import load from "../functions/load";
import newTask, { handleCheckbox, taskDetails, editTask } from "../functions/todoManager";
import { getIcon } from "../functions/icon";
import contextMenu from "./context-menu";

const profile = load('profile');

export default list => {

    const todoListContainer = document.createElement('div');
    todoListContainer.classList.add('to-do-list-container');
    todoListContainer.addEventListener('contextmenu', e => {
        e.preventDefault();
        const menu = contextMenu.generateMenu('listOptions', list);
        contextMenu.openMenu(e, menu);
    });

    const todoList = document.createElement('ul');
    todoListContainer.append(todoList);
    todoList.classList.add('to-do-list');
    todoList.classList.add('drag-container');
    todoList.id = list.id;

    const buttonContainer = document.createElement('div');
    todoListContainer.append(buttonContainer);
    buttonContainer.classList.add('button-container');

    const button = document.createElement('button');
    buttonContainer.append(button);
    button.classList.add('add-new-task');
    button.addEventListener('click', e => {
        newTask.showModal(list.id);
    });
    button.textContent = 'Add new task';

    const optionsButton = getIcon('dots-vertical', ['list-options']);
    buttonContainer.append(optionsButton);
    optionsButton.addEventListener('click', e => {
        const menu = contextMenu.generateMenu('listOptions', list);
        contextMenu.openMenu(e, menu);
    })

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
        e.stopPropagation();
        const menu = contextMenu.generateMenu('taskOptions', task);
        contextMenu.openMenu(e, menu);
    });

    const checkboxEmpty = document.createElement('label');
    checkboxEmpty.append(getIcon('checkbox-blank-outline'));
    taskContainer.append(checkboxEmpty);
    checkboxEmpty.classList.add('checkbox-empty');
    checkboxEmpty.setAttribute('for', `checkbox-${task.id}`);

    const listCheckbox = document.createElement('input');
    taskContainer.append(listCheckbox);
    listCheckbox.id = `checkbox-${task.id}`;
    listCheckbox.type = 'checkbox';
    listCheckbox.classList.add('list-checkbox');
    listCheckbox.checked = task.completed;
    const checkboxChecked = document.createElement('label');
    checkboxChecked.append(getIcon('checkbox-marked'));
    taskContainer.append(checkboxChecked);
    checkboxChecked.classList.add('checkbox-marked');
    checkboxChecked.setAttribute('for', `checkbox-${task.id}`);

    const textWrapper = document.createElement('div');
    taskContainer.append(textWrapper);
    const taskText = document.createElement('span');
    textWrapper.append(taskText);
    taskText.classList.add('task-text');
    taskText.textContent = task.name;
    if (task.completed) {
        textWrapper.classList.add('completed');
        taskText.classList.add('completed');
    }

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

            const checkboxEmpty = document.createElement('label');
            checkboxEmpty.append(getIcon('checkbox-blank-outline'));
            taskContainer.append(checkboxEmpty);
            checkboxEmpty.classList.add('checkbox-empty');
            checkboxEmpty.setAttribute('for', `checkbox-${item.id}`);
        
            const listCheckbox = document.createElement('input');
            taskContainer.append(listCheckbox);
            listCheckbox.id = `checkbox-${item.id}`;
            listCheckbox.type = 'checkbox';
            listCheckbox.classList.add('list-checkbox', 'subtask-checkbox');
            listCheckbox.checked = item.completed;
            const checkboxChecked = document.createElement('label');
            checkboxChecked.append(getIcon('checkbox-marked'));
            taskContainer.append(checkboxChecked);
            checkboxChecked.classList.add('checkbox-marked');
            checkboxChecked.setAttribute('for', `checkbox-${item.id}`);


            const textWrapper = document.createElement('div');
            taskContainer.append(textWrapper);
            const taskText = document.createElement('span');
            textWrapper.append(taskText);
            taskText.classList.add('task-text');
            taskText.textContent = item.name;
            if (item.completed) {
                textWrapper.classList.add('completed');
                taskText.classList.add('completed');
            }

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