import load from "./load"

const profile = load('profile');

export const getActiveTask = (task) => {
    const list = getActiveList(task.container);
    return list.tasks[list.tasks.findIndex(a => a.id == task.id)]
}

export const getActiveList = (listId) => {
    const project = getActiveProject();
    console.log(project.lists)
    return project.lists[project.lists.findIndex(a => a.id == listId)]
}

export const getActiveProject = () => {
    return profile.projects[profile.projects.findIndex(a => a.active == true)]
}