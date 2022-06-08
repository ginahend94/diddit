import { getIcon } from "../functions/icon";

export default (() => {
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
    subtaskForm.classList.add('subtask-form');
    subtaskForm.classList.add('hidden');
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
    notesLabel.for = 'notes';
    notesLabel.prepend('Notes:');
    const notes = document.createElement('textarea');
    notesLabel.append(notes);
    notes.name = 'notes';
    notes.id = 'notes';
    notes.placeholder = 'Notes (optional)';

    const getSelectedPriority = () => selectedPriority;

    return { taskDetails, getSelectedPriority };

})();