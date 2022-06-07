import load from "../functions/load";
import save from "../functions/save";
import newTask, { handleCheckbox, editTask, taskDetails } from "../functions/todoManager";
import format from "date-fns/format";
import { getIcon } from "../functions/icon";
import Modal from "./modal";
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

// const taskDetails = task => {
//     const showDetailModal = (() => {
//         const modalInner = () => {
//             const taskDetails = document.createElement('div');

//             const title = document.createElement('h3');
//             taskDetails.append(title);
//             title.classList.add('task-details', 'title')
//             title.textContent = task.name;

//             if (task.date) {
//                 const dueDate = document.createElement('div');
//                 taskDetails.append(dueDate);
//                 dueDate.classList.add('task-details', 'due-date');
//                 dueDate.textContent = `Due ${format(new Date(task.date), 'MM/dd/yyyy')}`;
//             }

//             const priority = document.createElement('div');
//             taskDetails.append(priority);
//             priority.classList.add('task-details', 'priority');
//             priority.textContent = `${task.priority=='none'?'No ':task.priority + '-'}Priority`;

//             if (task.subtasks.length) {
//                 const subtasks = document.createElement('ul');
//                 taskDetails.append(subtasks);
//                 subtasks.classList.add('task-details', 'subtasks');

//                 const subtaskHeading = document.createElement('h4');
//                 subtasks.append(subtaskHeading);
//                 subtaskHeading.textContent = 'Subtasks:';

//                 task.subtasks.forEach(subtask => {
//                     const li = document.createElement('li');
//                     subtasks.append(li);
//                     li.textContent = subtask[0];
//                     if (!subtask[1]) return; 
//                     const ul = document.createElement('ul');
//                     li.append(ul);
//                     const date = document.createElement('li');
//                     ul.append(date);
//                     date.textContent = `Due ${format(new Date(subtask[1]), 'MM/dd/yyyy')}`;
//                 })
//             }

//             if (task.notes.trim()) {
                
//                 const notes = document.createElement('div');
//                 taskDetails.append(notes);
//                 notes.classList.add('task-details', 'notes');

//                 const notesHeading = document.createElement('h4');
//                 notes.append(notesHeading);
//                 notesHeading.textContent = 'Notes:';

//                 const notesBody = document.createElement('p');
//                 notes.append(notesBody);
//                 notesBody.textContent = task.notes;
//             }

//             const editButton = document.createElement('button');
//             taskDetails.append(editButton);
//             editButton.prepend(getIcon('square-edit-outline'));
//             editButton.append('Edit task');
//             editButton.style.width = 'fit-content';
//             editButton.addEventListener('click', e => {
//                 Modal.close(modal);

//             })

//             return taskDetails;
//         }

//         const modal = Modal.create(
//             ['show-task-details'],
//             modalInner(),
//             () => editTaskDetails(),
//             'Close',
//             false,
//             true,
//             true
//         );
//         Modal.open(modal);

//         const editTaskDetails = () => {
//             const modalInner =  (() => {
//                 const taskDetails = document.createElement('form');
//                 taskDetails.classList.add('task-details');
            
//                 const taskTitle = document.createElement('input');
//                 taskDetails.append(taskTitle);
//                 taskTitle.type = 'text';
//                 taskTitle.name = 'task-title';
//                 taskTitle.id = 'task-title';
//                 taskTitle.classList.add('task-title');
//                 taskTitle.placeholder = 'Enter task here...';
//                 taskTitle.required = true;
//                 taskTitle.value = task.name;
            
//                 const small = document.createElement('small');
//                 taskDetails.append(small);
//                 small.style.color = 'rgb(var(--danger))';
//                 small.textContent = 'Name is required.';
//                 small.classList.add('hidden');
//                 taskTitle.addEventListener('input', () => small.classList.add('hidden'));
            
//                 const dateLabel = document.createElement('label');
//                 taskDetails.append(dateLabel);
//                 dateLabel.prepend('Due by');
//                 const prettyDateContainer = document.createElement('div');
//                 dateLabel.append(prettyDateContainer);
//                 prettyDateContainer.classList.add('pretty-date-container');
//                 const prettyDateLabel = document.createElement('label');
//                 prettyDateContainer.append(prettyDateLabel)
//                 prettyDateLabel.setAttribute('for', 'pretty-date');
//                 const mmSpan = document.createElement('span');
//                 prettyDateLabel.append(mmSpan);
//                 mmSpan.textContent = 'mm';
//                 mmSpan.id = 'mm';
//                 prettyDateLabel.append(' / ');
//                 const ddSpan = document.createElement('span');
//                 prettyDateLabel.append(ddSpan);
//                 ddSpan.textContent = 'dd';
//                 ddSpan.id = 'dd';
//                 prettyDateLabel.append(' / ');
//                 const yyyySpan = document.createElement('span');
//                 prettyDateLabel.append(yyyySpan);
//                 yyyySpan.textContent = 'yyyy';
//                 yyyySpan.id = 'yyyy';
            
//                 const prettyDate = document.createElement('input');
//                 prettyDateContainer.append(prettyDate);
//                 prettyDate.type = 'date';
//                 prettyDate.name = 'pretty-date';
//                 prettyDate.id = 'pretty-date';
//                 prettyDate.value = format(new Date(task.date), 'YYYY-MM-DD');
            
            
//                 prettyDate.addEventListener('change', e => {
//                     let dateArray = e.target.value.split('-');
//                     if (dateArray.length <= 1) {
//                         yyyy.textContent = 'yyyy';
//                         mm.textContent = 'mm';
//                         dd.textContent = 'dd';
//                         return;
//                     }
//                     yyyySpan.textContent = dateArray[0];
//                     mmSpan.textContent = dateArray[1];
//                     ddSpan.textContent = dateArray[2];
//                 })
            
            
            
//                 const clearButton = getIcon('close-circle');
//                 prettyDateContainer.append(clearButton);
//                 clearButton.id = 'clr-btn';
//                 clearButton.style = 'width:15px;height:15px;font-size:15px';
//                 clearButton.addEventListener('click', e => {
//                     e.preventDefault();
//                     prettyDate.value = '';
//                     prettyDate.dispatchEvent(new Event('change'));
//                 })
            
//                 const taskPriority = document.createElement('div');
//                 taskDetails.append(taskPriority);
//                 taskPriority.classList.add('task-priority');
//                 const legend = document.createElement('legend');
//                 taskPriority.append(legend);
//                 legend.textContent = 'Priority';
//                 const priorityDiv = document.createElement('div');
//                 taskPriority.append(priorityDiv);
//                 const prioritySelection = document.createElement('span');
//                 priorityDiv.append(prioritySelection);
//                 prioritySelection.id = 'priority-selection';
//                 prioritySelection.prepend('None');
//                 const chevron = getIcon('chevron-down');
//                 prioritySelection.append(chevron);
            
//                 const taskPriorityList = document.createElement('fieldset');
//                 priorityDiv.append(taskPriorityList);
//                 taskPriorityList.name = 'task-priority';
//                 taskPriorityList.id = 'task-priority';
//                 taskPriorityList.classList.add('task-priority-list');
//                 const taskPriorityListBg = document.createElement('div');
//                 taskPriorityList.append(taskPriorityListBg);
//                 taskPriorityListBg.classList.add('context-menu-container');
//                 taskPriorityListBg.addEventListener('click', () => closePriority());
            
//                 const labelNone = document.createElement('label');
//                 taskPriorityList.append(labelNone);
//                 labelNone.classList.add('active');
//                 const inputNone = document.createElement('input');
//                 labelNone.append(inputNone);
//                 inputNone.name = 'priority';
//                 inputNone.type = 'radio';
//                 inputNone.value = 'none';
//                 inputNone.setAttribute('checked', true);
//                 labelNone.append('None');
            
//                 const labelLow = document.createElement('label');
//                 taskPriorityList.append(labelLow);
//                 const inputLow = document.createElement('input');
//                 labelLow.append(inputLow);
//                 inputLow.name = 'priority';
//                 inputLow.type = 'radio';
//                 inputLow.value = 'low';
//                 labelLow.append('Low');
            
//                 const labelMedium = document.createElement('label');
//                 taskPriorityList.append(labelMedium);
//                 const inputMedium = document.createElement('input');
//                 labelMedium.append(inputMedium);
//                 inputMedium.name = 'priority';
//                 inputMedium.type = 'radio';
//                 inputMedium.value = 'medium';
//                 labelMedium.append('Medium');
            
//                 const labelHigh = document.createElement('label');
//                 taskPriorityList.append(labelHigh);
//                 const inputHigh = document.createElement('input');
//                 labelHigh.append(inputHigh);
//                 inputHigh.name = 'priority';
//                 inputHigh.type = 'radio';
//                 inputHigh.value = 'high';
//                 labelHigh.append('High');
            
            
//                 taskPriorityList.addEventListener('click', () => {
//                     closePriority();
//                 })
            
//                 prioritySelection.addEventListener('click', () => {
//                     openPriority();
//                 })
            
//                 const radios = taskPriorityList.querySelectorAll('input');
//                 let selectedPriority = task.priority;
//                 radios.forEach(button => {
//                     button.addEventListener('change', e => {
//                         selectedPriority = [...radios].find(a => a.checked).value;
//                         prioritySelection.childNodes[0].textContent = selectedPriority;
//                     })
//                 })
//                 const openPriority = () => {
//                     taskPriorityList.style.display = 'flex';
//                 }
//                 const closePriority = () => {
//                     taskPriorityList.style.display = 'none';
//                 }
            
//                 const addSubtasks = document.createElement('div');
//                 taskDetails.append(addSubtasks);
//                 addSubtasks.classList.add('add-subtasks');
//                 const addSubtasksLabel = document.createElement('label');
//                 addSubtasks.append(addSubtasksLabel);
//                 addSubtasksLabel.setAttribute('for', 'add-subtasks');
//                 const addSubtasksCheckbox = document.createElement('input');
//                 addSubtasksLabel.append(addSubtasksCheckbox);
//                 addSubtasksCheckbox.type = 'checkbox';
//                 addSubtasksCheckbox.name = 'add-subtasks';
//                 addSubtasksCheckbox.id = 'add-subtasks';
//                 addSubtasksLabel.append('Add subtasks');
            
//                 const subtaskForm = document.createElement('div');
//                 addSubtasks.append(subtaskForm);
//                 subtaskForm.classList.add('subtask-form');
//                 subtaskForm.classList.add('hidden');
//                 const subtaskDirections = document.createElement('small');
//                 subtaskForm.append(subtaskDirections);
//                 subtaskDirections.classList.add('subtask-directions');
//                 subtaskDirections.textContent = 'Enter your subtasks below. Add a due date (mm/dd/yyyy format) separated by a comma, and each subtask on its own line.';
//                 const subtasks = document.createElement('textarea');
//                 subtaskForm.append(subtasks);
//                 subtasks.name = 'subtasks';
//                 subtasks.id = 'new-subtasks';
//                 const taskSubtasks = () => {
//                     let string;
//                     task.subtasks.forEach(subtask => {
//                         string += `${subtask[0]}${subtask[1] ? ', ' + subtask[1] : ''}\n`;
//                         console.log(string);
//                     })
//                     return string;
//                 }
//                 subtasks.value = taskSubtasks();
            
//                 subtasks.placeholder = 'e.g. Walk dog, 6/12/22';
            
//                 addSubtasksCheckbox.addEventListener('change', e => {
//                     if (!e.target.checked) return subtaskForm.classList.add('hidden');
//                     return subtaskForm.classList.remove('hidden');
//                 })
            
            
//                 const notesLabel = document.createElement('label');
//                 taskDetails.append(notesLabel);
//                 notesLabel.for = 'notes';
//                 notesLabel.prepend('Notes:');
//                 const notes = document.createElement('textarea');
//                 notesLabel.append(notes);
//                 notes.name = 'notes';
//                 notes.id = 'notes';
//                 notes.placeholder = 'Notes (optional)';
//                 notes.value = task.notes;
            
//                 const getSelectedPriority = () => selectedPriority;
            
//                 return { taskDetails, getSelectedPriority };
            
//             })();

//             Modal.close(modal);
//             const editDetailsModal = Modal.create(
//                 ['edit-task-modal'],
//                 modalInner.taskDetails,
//                 () => saveTask(),
//                 'Save',
//                 true,
//                 true,
//                 true
//             )
//             console.log(task)
//             for (let node in modalInnerTemplate.taskDetails) {
//                 if (modalInnerTemplate.taskDetails[node].nodeType != 1) return;
//                 console.log(modalInnerTemplate.taskDetails[node])
//             }
//         }
//     })();
// }