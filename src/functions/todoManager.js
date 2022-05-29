import { v4 as uuidv4 } from "uuid";
import save from "./save";
import load from "./load";

const profile = load('profile');

export const createList = project => {
    const list = {
        id: `${project.id}.${uuidv4()}`,
        tasks: [],
        container: project.id,
    }
    console.log(project);
    project.lists.push(list);
    console.log(project);
    console.log(profile);
    profile.projects = profile.projects.map(oldproject => {
        if (oldproject.id == project.id) return oldproject = project;
        return oldproject
    });
    save('profile', profile);
    console.log(profile);
    return list;
}

export const createTask = (list, taskName) => {
    // console.log(`Will create task with id ${list.id}.${uuidv4()}`);
    const newTask = {
        taskName,
        classes: [dragElement, dragContainer],
        id: `${list.id}.${uuidv4()}`,
        container: list.id,
    };
    list.push(newTask);
    profile.projects.lists = profile.projects.lists.map(oldlist => {
        if (oldlist.id == list.id) return oldlist = list;
        return oldlist
    });
}