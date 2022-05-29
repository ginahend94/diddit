import { v4 as uuidv4 } from "uuid";
import save from "../functions/save";
import load from "../functions/load";
import Modal from "./modal";
import { createTask } from "../functions/todoManager";

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
        createTask(list);
    });
    button.textContent = 'Add new task';

    return todoListContainer;
}

const createTaskNode = list => {
    console.log('soon bud :)')
}
