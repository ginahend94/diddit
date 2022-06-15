// import { v4 as uuidv4 } from "uuid";
import generateId from "./generateId";
import save from "./save";
import load from "./load";
import { getIcon } from "./icon";
import Modal from '../DOM-elements/modal';
import render from "./render";
import format from "date-fns/format";
// import modalInner from "../DOM-elements/create-edit-task";

const profile = load('profile');

export default (() => {
    const showModal = (listId) => {
        const modalInner = (() => {
            const taskDetails = document.createElement('form');
            taskDetails.classList.add('task-details');

            const taskTitle = document.createElement('input');
            taskDetails.append(taskTitle);
            taskTitle.type = 'text';
            taskTitle.name = 'task-title';
            taskTitle.id = 'task-title';
            taskTitle.classList.add('task-title');
            taskTitle.placeholder = 'Enter task here...';
            taskTitle.required = true;

            const small = document.createElement('small');
            taskDetails.append(small);
            small.style.color = 'rgb(var(--danger))';
            small.textContent = 'Name is required.';
            small.classList.add('hidden');
            taskTitle.addEventListener('input', () => small.classList.add('hidden'));

            const dateLabel = document.createElement('label');
            taskDetails.append(dateLabel);
            dateLabel.prepend('Due by');
            const prettyDateContainer = document.createElement('div');
            dateLabel.append(prettyDateContainer);
            prettyDateContainer.classList.add('pretty-date-container');
            const prettyDateLabel = document.createElement('label');
            prettyDateContainer.append(prettyDateLabel)
            prettyDateLabel.setAttribute('for', 'pretty-date');
            const mmSpan = document.createElement('span');
            prettyDateLabel.append(mmSpan);
            mmSpan.textContent = 'mm';
            mmSpan.id = 'mm';
            prettyDateLabel.append(' / ');
            const ddSpan = document.createElement('span');
            prettyDateLabel.append(ddSpan);
            ddSpan.textContent = 'dd';
            ddSpan.id = 'dd';
            prettyDateLabel.append(' / ');
            const yyyySpan = document.createElement('span');
            prettyDateLabel.append(yyyySpan);
            yyyySpan.textContent = 'yyyy';
            yyyySpan.id = 'yyyy';

            const prettyDate = document.createElement('input');
            prettyDateContainer.append(prettyDate);
            prettyDate.type = 'date';
            prettyDate.name = 'pretty-date';
            prettyDate.id = 'pretty-date';


            prettyDate.addEventListener('change', e => {
                let dateArray = e.target.value.split('-');
                if (dateArray.length <= 1) {
                    yyyy.textContent = 'yyyy';
                    mm.textContent = 'mm';
                    dd.textContent = 'dd';
                    return;
                }
                yyyySpan.textContent = dateArray[0];
                mmSpan.textContent = dateArray[1];
                ddSpan.textContent = dateArray[2];
            })



            const clearButton = getIcon('close-circle');
            prettyDateContainer.append(clearButton);
            clearButton.id = 'clr-btn';
            clearButton.style = 'width:15px;height:15px;font-size:15px';
            clearButton.addEventListener('click', e => {
                e.preventDefault();
                prettyDate.value = '';
                prettyDate.dispatchEvent(new Event('change'));
            })

            const taskPriority = document.createElement('div');
            taskDetails.append(taskPriority);
            taskPriority.classList.add('task-priority');
            const legend = document.createElement('legend');
            taskPriority.append(legend);
            legend.textContent = 'Priority';
            const priorityDiv = document.createElement('div');
            taskPriority.append(priorityDiv);
            const prioritySelection = document.createElement('span');
            priorityDiv.append(prioritySelection);
            prioritySelection.id = 'priority-selection';
            prioritySelection.prepend('None');
            const chevron = getIcon('chevron-down');
            prioritySelection.append(chevron);

            const taskPriorityList = document.createElement('fieldset');
            priorityDiv.append(taskPriorityList);
            taskPriorityList.name = 'task-priority';
            taskPriorityList.id = 'task-priority';
            taskPriorityList.classList.add('task-priority-list');
            const taskPriorityListBg = document.createElement('div');
            taskPriorityList.append(taskPriorityListBg);
            taskPriorityListBg.classList.add('context-menu-container');
            taskPriorityListBg.addEventListener('click', () => closePriority());

            const labelNone = document.createElement('label');
            taskPriorityList.append(labelNone);
            labelNone.classList.add('active');
            const inputNone = document.createElement('input');
            labelNone.append(inputNone);
            inputNone.name = 'priority';
            inputNone.type = 'radio';
            inputNone.value = 'none';
            inputNone.setAttribute('checked', true);
            labelNone.append('None');

            const labelLow = document.createElement('label');
            taskPriorityList.append(labelLow);
            const inputLow = document.createElement('input');
            labelLow.append(inputLow);
            inputLow.name = 'priority';
            inputLow.type = 'radio';
            inputLow.value = 'low';
            labelLow.append('Low');

            const labelMedium = document.createElement('label');
            taskPriorityList.append(labelMedium);
            const inputMedium = document.createElement('input');
            labelMedium.append(inputMedium);
            inputMedium.name = 'priority';
            inputMedium.type = 'radio';
            inputMedium.value = 'medium';
            labelMedium.append('Medium');

            const labelHigh = document.createElement('label');
            taskPriorityList.append(labelHigh);
            const inputHigh = document.createElement('input');
            labelHigh.append(inputHigh);
            inputHigh.name = 'priority';
            inputHigh.type = 'radio';
            inputHigh.value = 'high';
            labelHigh.append('High');


            taskPriorityList.addEventListener('click', () => {
                closePriority();
            })

            prioritySelection.addEventListener('click', () => {
                openPriority();
            })

            const radios = taskPriorityList.querySelectorAll('input');
            let selectedPriority = 'none';
            radios.forEach(button => {
                button.addEventListener('change', e => {
                    selectedPriority = [...radios].find(a => a.checked).value;
                    prioritySelection.childNodes[0].textContent = selectedPriority;
                })
            })
            const openPriority = () => {
                taskPriorityList.style.display = 'flex';
            }
            const closePriority = () => {
                taskPriorityList.style.display = 'none';
            }

            const addSubtasks = document.createElement('div');
            taskDetails.append(addSubtasks);
            addSubtasks.classList.add('add-subtasks');
            const addSubtasksLabel = document.createElement('label');
            addSubtasks.append(addSubtasksLabel);
            addSubtasksLabel.setAttribute('for', 'add-subtasks');
            const addSubtasksCheckbox = document.createElement('input');
            addSubtasksLabel.append(addSubtasksCheckbox);
            addSubtasksCheckbox.type = 'checkbox';
            addSubtasksCheckbox.name = 'add-subtasks';
            addSubtasksCheckbox.id = 'add-subtasks';
            addSubtasksLabel.append('Add subtasks');

            const subtaskForm = document.createElement('div');
            addSubtasks.append(subtaskForm);
            subtaskForm.classList.add('subtask-form', 'hidden');
            const subtaskDirections = document.createElement('small');
            subtaskForm.append(subtaskDirections);
            subtaskDirections.classList.add('subtask-directions');
            subtaskDirections.textContent = 'Enter your subtasks below. Add a due date (mm/dd/yyyy format) separated by a comma, and each subtask on its own line.';
            const subtasks = document.createElement('textarea');
            subtaskForm.append(subtasks);
            subtasks.name = 'subtasks';
            subtasks.id = 'new-subtasks';

            subtasks.placeholder = 'e.g. Walk dog, 6/12/22';

            addSubtasksCheckbox.addEventListener('change', e => {
                if (!e.target.checked) return subtaskForm.classList.add('hidden');
                return subtaskForm.classList.remove('hidden');
            })


            const notesLabel = document.createElement('label');
            taskDetails.append(notesLabel);
            notesLabel.setAttribute('for', 'notes');
            notesLabel.classList.add('note')
            notesLabel.prepend('Notes:');
            const notes = document.createElement('textarea');
            notesLabel.append(notes);
            notes.name = 'notes';
            notes.id = 'notes';
            notes.placeholder = 'Notes (optional)';

            const getSelectedPriority = () => selectedPriority;
            const shouldAddSubtasks = () => addSubtasksCheckbox.checked;

            return { taskDetails, getSelectedPriority, listId, addSubtasks:shouldAddSubtasks };

        })();

        const modal = Modal.create(
            [],
            modalInner.taskDetails,
            () => confirm({
                name: document.getElementById('task-title').value,
                date: document.getElementById('pretty-date').value ? new Date(document.getElementById('pretty-date').valueAsDate.toISOString().slice(0, -1)) : '', // Date without timezone
                priority: modalInner.getSelectedPriority(),
                subtasks: document.getElementById('new-subtasks').value,
                notes: document.getElementById('notes').value,
                listId,
            }),
            'Save task',
            true,
            false,
            true
        );
        Modal.open(modal);

        const confirm = (options) => {
            const warning = document.querySelector('.modal-inner small');
            if (!options.name) {
                return warning.classList.remove('hidden');
            }
            let subtasks = '';
            if (modalInner.addSubtasks() && options.subtasks) {
                subtasks = options.subtasks
                    .split(/\r?\n/)
                    .map((a, i) => {
                        const b = a.split(',');
                        if (!b[1]) return { name: b[0], completed: false, id: i };
                        let date = b[1].split('/');
                        const dueDate = new Date(parseInt(date[2]), parseInt(date[0]) - 1, parseInt(date[1]));
                        const dateFormatted = format(dueDate, 'MM/dd/yyyy');
                        return { name: b[0], date: dueDate, dateFormatted, completed: false, id: i };
                    })
            }
            createTask({ ...options, subtasks, listId });
            Modal.close(modal);
        }
    }

    const createTask = (options) => {

        const activeProject = profile.projects[profile.projects.findIndex(project => options.listId.split('.')[0] == project.id)];
        const list = activeProject.lists[activeProject.lists.findIndex(list => list.id == options.listId)];

        const { listId, ...noListId } = options;

        const newTask = {
            ...noListId,
            classes: ['dragElement', 'dragContainer'],
            id: `${options.listId}.${generateId()}`,
            container: options.listId,
            completed: false,
            ...(options.date && { dateFormatted: format(new Date(options.date), 'MM/dd/yyyy') })
        };
        if (newTask.subtasks.length) newTask.subtasks.forEach(a => {
            a.id = `${newTask.id}.${a.id}`;
        })
        console.log(newTask.subtasks);
        list.tasks.push(newTask);
        console.log(newTask)

        activeProject.lists = activeProject.lists.map(oldlist => {
            if (oldlist.id == listId) return oldlist = list;
            return oldlist;
        });

        save('profile', profile);
        render();
        return newTask;
    }
    return { showModal }

})()

export const createList = project => {
    const list = {
        id: `${project.id}.${generateId()}`,
        tasks: [],
        container: project.id,
    }
    project.lists.push(list);
    profile.projects = profile.projects.map(oldproject => {
        if (oldproject.id == project.id) return oldproject = project;
        return oldproject
    });
    save('profile', profile);
    return list;
}

export const handleCheckbox = (e, task) => {
    if (e.target.classList.contains('subtask-checkbox')) {
        const subtask = task.subtasks[task.subtasks.findIndex(a => a.id == e.target.id.slice(9))]
        subtask.completed = e.target.checked;
    } else {
        task.completed = e.target.checked;
    }
    save('profile', profile);
    return task;
}

export const editTask = task => {
    const activeProject = profile.projects[profile.projects.findIndex(a => {
        return a.id == task.container.split('.')[0];
    })]

    const activeList = activeProject.lists[activeProject.lists.findIndex(a => {
        return a.id == task.container;
    })];

    activeList.tasks = activeList.tasks.map(oldTask => {
        if (oldTask.id == task.id) {
            return oldTask = task;
        }
        return oldTask;
    })
    
    save('profile', profile);
    // render();
}

export const taskDetails = task => {
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
                dueDate.textContent = `Due ${task.dateFormatted}`;
            }

            const priority = document.createElement('div');
            taskDetails.append(priority);
            priority.classList.add('task-details', 'priority');
            priority.textContent = `${task.priority == 'none' ? 'No ' : task.priority + '-'}Priority`;

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
                    li.textContent = subtask.name;
                    if (!subtask.date) return;
                    const ul = document.createElement('ul');
                    li.append(ul);
                    const date = document.createElement('li');
                    ul.append(date);
                    date.textContent = `Due ${subtask.dateFormatted}`;
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
                editTaskDetails();
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

        const editTaskDetails = () => {
            const modalInner = (() => {
                const taskDetails = document.createElement('form');
                taskDetails.classList.add('task-details');

                const taskTitle = document.createElement('input');
                taskDetails.append(taskTitle);
                taskTitle.type = 'text';
                taskTitle.name = 'task-title';
                taskTitle.id = 'task-title';
                taskTitle.classList.add('task-title');
                taskTitle.placeholder = task.name;
                taskTitle.required = true;
                taskTitle.value = task.name;

                const small = document.createElement('small');
                taskDetails.append(small);
                small.style.color = 'rgb(var(--danger))';
                small.textContent = 'Name is required.';
                small.classList.add('hidden');
                taskTitle.addEventListener('input', () => small.classList.add('hidden'));

                const dateSplit = (task.date ? task.dateFormatted : 'mm/dd/yyyy').split('/');
                const mm = dateSplit[0];
                const dd = dateSplit[1];
                const yyyy = dateSplit[2];

                const dateLabel = document.createElement('label');
                taskDetails.append(dateLabel);
                dateLabel.prepend('Due by');
                const prettyDateContainer = document.createElement('div');
                dateLabel.append(prettyDateContainer);
                prettyDateContainer.classList.add('pretty-date-container');
                const prettyDateLabel = document.createElement('label');
                prettyDateContainer.append(prettyDateLabel)
                prettyDateLabel.setAttribute('for', 'pretty-date');
                const mmSpan = document.createElement('span');
                prettyDateLabel.append(mmSpan);
                mmSpan.textContent = mm;
                mmSpan.id = 'mm';
                prettyDateLabel.append(' / ');
                const ddSpan = document.createElement('span');
                prettyDateLabel.append(ddSpan);
                ddSpan.textContent = dd;
                ddSpan.id = 'dd';
                prettyDateLabel.append(' / ');
                const yyyySpan = document.createElement('span');
                prettyDateLabel.append(yyyySpan);
                yyyySpan.textContent = 'yyyy';
                yyyySpan.id = yyyy;

                const prettyDate = document.createElement('input');
                prettyDateContainer.append(prettyDate);
                prettyDate.type = 'date';
                prettyDate.name = 'pretty-date';
                prettyDate.id = 'pretty-date';
                if (task.date) prettyDate.value = format(new Date(task.date), 'yyyy-MM-dd');


                prettyDate.addEventListener('change', e => {
                    let dateArray = e.target.value.split('-');
                    if (dateArray.length <= 1) {
                        yyyy.textContent = 'yyyy';
                        mm.textContent = 'mm';
                        dd.textContent = 'dd';
                        return;
                    }
                    yyyySpan.textContent = dateArray[0];
                    mmSpan.textContent = dateArray[1];
                    ddSpan.textContent = dateArray[2];
                })

                const clearButton = getIcon('close-circle');
                prettyDateContainer.append(clearButton);
                clearButton.id = 'clr-btn';
                clearButton.style = 'width:15px;height:15px;font-size:15px';
                clearButton.addEventListener('click', e => {
                    e.preventDefault();
                    prettyDate.value = '';
                    prettyDate.dispatchEvent(new Event('change'));
                })

                const taskPriority = document.createElement('div');
                taskDetails.append(taskPriority);
                taskPriority.classList.add('task-priority');
                const legend = document.createElement('legend');
                taskPriority.append(legend);
                legend.textContent = 'Priority';
                const priorityDiv = document.createElement('div');
                taskPriority.append(priorityDiv);
                const prioritySelection = document.createElement('span');
                priorityDiv.append(prioritySelection);
                prioritySelection.id = 'priority-selection';
                prioritySelection.prepend('None');
                const chevron = getIcon('chevron-down');
                prioritySelection.append(chevron);

                const taskPriorityList = document.createElement('fieldset');
                priorityDiv.append(taskPriorityList);
                taskPriorityList.name = 'task-priority';
                taskPriorityList.id = 'task-priority';
                taskPriorityList.classList.add('task-priority-list');
                const taskPriorityListBg = document.createElement('div');
                taskPriorityList.append(taskPriorityListBg);
                taskPriorityListBg.classList.add('context-menu-container');
                taskPriorityListBg.addEventListener('click', () => closePriority());

                const labelNone = document.createElement('label');
                taskPriorityList.append(labelNone);
                labelNone.classList.add('active');
                const inputNone = document.createElement('input');
                labelNone.append(inputNone);
                inputNone.name = 'priority';
                inputNone.type = 'radio';
                inputNone.value = 'none';
                inputNone.setAttribute('checked', true);
                labelNone.append('None');

                const labelLow = document.createElement('label');
                taskPriorityList.append(labelLow);
                const inputLow = document.createElement('input');
                labelLow.append(inputLow);
                inputLow.name = 'priority';
                inputLow.type = 'radio';
                inputLow.value = 'low';
                labelLow.append('Low');

                const labelMedium = document.createElement('label');
                taskPriorityList.append(labelMedium);
                const inputMedium = document.createElement('input');
                labelMedium.append(inputMedium);
                inputMedium.name = 'priority';
                inputMedium.type = 'radio';
                inputMedium.value = 'medium';
                labelMedium.append('Medium');

                const labelHigh = document.createElement('label');
                taskPriorityList.append(labelHigh);
                const inputHigh = document.createElement('input');
                labelHigh.append(inputHigh);
                inputHigh.name = 'priority';
                inputHigh.type = 'radio';
                inputHigh.value = 'high';
                labelHigh.append('High');


                taskPriorityList.addEventListener('click', () => {
                    closePriority();
                })

                prioritySelection.addEventListener('click', () => {
                    openPriority();
                })

                const radios = taskPriorityList.querySelectorAll('input');
                let selectedPriority = task.priority;
                radios.forEach(button => {
                    button.addEventListener('change', e => {
                        selectedPriority = [...radios].find(a => a.checked).value;
                        prioritySelection.childNodes[0].textContent = selectedPriority;
                    })
                })
                const openPriority = () => {
                    taskPriorityList.style.display = 'flex';
                }
                const closePriority = () => {
                    taskPriorityList.style.display = 'none';
                }

                const addSubtasks = document.createElement('div');
                taskDetails.append(addSubtasks);
                addSubtasks.classList.add('add-subtasks');
                const addSubtasksLabel = document.createElement('label');
                addSubtasks.append(addSubtasksLabel);
                addSubtasksLabel.setAttribute('for', 'add-subtasks');
                const addSubtasksCheckbox = document.createElement('input');
                addSubtasksLabel.append(addSubtasksCheckbox);
                if (task.subtasks) addSubtasksCheckbox.checked = true;
                addSubtasksCheckbox.type = 'checkbox';
                addSubtasksCheckbox.name = 'add-subtasks';
                addSubtasksCheckbox.id = 'add-subtasks';
                addSubtasksLabel.append('Add subtasks');

                const subtaskForm = document.createElement('div');
                addSubtasks.append(subtaskForm);
                subtaskForm.classList.add('subtask-form');
                if (!task.subtasks) subtaskForm.classList.add('hidden');
                const subtaskDirections = document.createElement('small');
                subtaskForm.append(subtaskDirections);
                subtaskDirections.classList.add('subtask-directions');
                subtaskDirections.textContent = 'Enter your subtasks below. Add a due date (mm/dd/yyyy format) separated by a comma, and each subtask on its own line.';
                const subtasks = document.createElement('textarea');
                subtaskForm.append(subtasks);
                subtasks.name = 'subtasks';
                subtasks.id = 'new-subtasks';
                const taskSubtasks = () => {
                    // console.log(task.subtasks)
                    if (!task.subtasks) return '';
                    let string = {};
                    string.text = '';
                    string.completed = [];
                    task.subtasks.forEach(subtask => {
                        // console.log(subtask)
                        string.text += `${subtask.name}${subtask.date ? ', ' + subtask.dateFormatted : ''}\n`;
                        string.completed.push(subtask.completed);
                    })
                    // console.log(string)
                    return string;
                }
                subtasks.data = taskSubtasks();
                subtasks.value = subtasks.data.text;

                subtasks.placeholder = 'e.g. Walk dog, 6/12/22';

                addSubtasksCheckbox.addEventListener('change', e => {
                    if (!e.target.checked) return subtaskForm.classList.add('hidden');
                    return subtaskForm.classList.remove('hidden');
                })


                const notesLabel = document.createElement('label');
                taskDetails.append(notesLabel);
                notesLabel.classList.add('notes')
                notesLabel.setAttribute('for', 'notes');
                notesLabel.prepend('Notes:');
                const notes = document.createElement('textarea');
                notesLabel.append(notes);
                notes.name = 'notes';
                notes.id = 'notes';
                notes.placeholder = 'Notes (optional)';
                notes.value = task.notes;

                const getSelectedPriority = () => selectedPriority;
                const getTaskTitle = () => taskTitle.value;
                const getTaskDate = () => prettyDate.value;
                const getSubtasks = () => subtasks.value;
                const getSubtaskCompletion = () => subtasks.data.completed;
                const getNotes = () => notes.value;

                return { taskDetails, getSelectedPriority, getTaskTitle, getTaskDate, getSubtasks, getSubtaskCompletion, getNotes };

            })();

            Modal.close(modal);
            const editDetailsModal = Modal.create(
                ['edit-task-modal'],
                modalInner.taskDetails,
                () => confirm(),
                'Save',
                true,
                true,
                true
            )
            Modal.open(editDetailsModal);

            const options = () => ({
                name: modalInner.getTaskTitle(),
                // date: modalInner.getTaskDate ? new Date(modalInner.getTaskDate().valueAsDate.toISOString().slice(0, -1)) : '', // Date without timezone
                date: modalInner.getTaskDate(),
                priority: modalInner.getSelectedPriority(),
                subtasks: (() => {
                    const subtaskText = modalInner.getSubtasks().split(/\r?\n/);
                    let result = [];
                    for (let i = 0; i < subtaskText.length; i++) {
                        result.push({ text: subtaskText[i], completed: modalInner.getSubtaskCompletion()[i] });
                    }
                    return result;
                })(),
                // subtasks: { text:modalInner.getSubtasks(), completed:modalInner.getSubtaskCompletion() },
                notes: modalInner.getNotes(),
            })

            const confirm = () => {
                const warning = document.querySelector('.modal-inner small');
                if (!options().name) {
                    return warning.classList.remove('hidden');
                }
                let subtasks = '';
                if (options().subtasks) {
                    console.log(options().subtasks)
                    subtasks = options().subtasks
                        .filter(a => !!a.text)
                        .map((subtask, i) => {
                            const fullLineArray = subtask.text.split(',');
                            let subtaskInfo = {name:fullLineArray[0].trim(), id: i, completed: subtask.completed}
                            if (!fullLineArray[1]) return { ...subtaskInfo };
                            let date = fullLineArray[1].split('/');
                            const dueDate = new Date(parseInt(date[2]), parseInt(date[0]) - 1, parseInt(date[1]));
                            const dateFormatted = format(dueDate, 'MM/dd/yyyy');
                            return { ...subtaskInfo, dateFormatted, date:dueDate };
                        })
                }
                saveTask({ ...options(), subtasks });
                Modal.close(editDetailsModal);
            }

            const saveTask = (options) => {
                const newTask = {
                    ...options,
                    classes: task.classes,
                    id: task.id,
                    container: task.container,
                    completed: task.completed,
                };
                if (newTask.subtasks.length) newTask.subtasks.forEach(a => {
                    a.id = `${newTask.id}.${a.id}`;
                })

                editTask(newTask);
                render();
            }
        }
    })();
}