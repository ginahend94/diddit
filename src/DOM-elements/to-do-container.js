import { v4 as uuidv4 } from "uuid";
import save from "../functions/save";
import load from "../functions/load";
import Modal from "./modal";
import newTask from "../functions/todoManager";
import format from "date-fns/format";
import { getIcon } from "../functions/icon";

const profile = load('profile');

export default list => {

    // console.log(project)

    // const list = createList(project);

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
        taskDueDate.textContent = format(task.date, 'MM/dd/yyyy');
    }

    const dragIcon = getIcon('menu', ['drag']);
    taskContainer.append(dragIcon);

    if (task.subtasks) {
        console.log(task)
        const subtasks = document.createElement('ul');
        taskLi.append(subtasks);
        subtasks.classList.add('subtasks');

        task.subtasks.forEach((item, i) => {
            console.log(item)
            const subtask = document.createElement('li');
            subtasks.append(subtask);
            subtask.classList.add('subtask');
            subtask.classList.add('drag-element');
            subtask.id = `${task.id}.${i}`;
            subtask.dataset.container = task.id;

            const taskContainer = document.createElement('div');
            subtask.append(taskContainer);
            taskContainer.classList.add('task-container');

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
                taskDueDate.textContent = format(item[1], 'MM/dd/yyyy');
            }

            const dragIcon = getIcon('menu', ['drag']);
            taskContainer.append(dragIcon);

        })
    }

    return taskLi;
}
