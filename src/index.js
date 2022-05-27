import './normalize.css';
import './style.css';
import save from './functions/save';
import load from './functions/load';
import { Profile } from './profile';
import nav from './DOM-elements/nav';

const pageContent = () => {
    document.body.appendChild(nav(Profile.projects));
    const page = document.createElement('div');
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