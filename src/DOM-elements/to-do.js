import { v4 as uuidv4 } from "uuid";

export default project => {
    const todoListContainer = document.createElement('div');
    todoListContainer.classList.add('to-do-list-container');

    const todoList = document.createElement('ul');
    todoListContainer.append(todoList);
    todoList.classList.add('to-do-list');
    todoList.classList.add('drag-container');
    todoList.id = `${project.id}.${uuidv4()}`;

    const button = document.createElement('button');
    todoListContainer.append(button);
    button.classList.add('add-new-task');

    return todoListContainer;
}