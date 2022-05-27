import './style.css';
import save from './save';
import load from './load';
import nav from './nav';

const pageContent = () => {
    const page = document.createElement('div');
    nav();
    return page;
}

document.body.appendChild(pageContent())

// Click 




// Object for each to-do created by factory function
// props:
// title
// description
// dueDate
// priority
// notes
// checklist

// Project folders
// Default project ('My Project'?)
// localStorage to save data

//* APP  LOGIC SEPARATE FROM DOM MANIP

// User can:
// View all projects
// View all tasks in each project (title and duedate)
// create new projects
// expand task to see details
// delete task
// edit task
//

// FANDANGLES
// drag and drop
// change color palette
// share to-dos
// import/export/batch import
// upload images to to-do
// light/dark theme