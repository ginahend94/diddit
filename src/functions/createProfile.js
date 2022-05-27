import { v4 as uuidv4 } from "uuid";

export default (name = 'User', icon = 'carbon:user-avatar-filled', colorPalette = 'default', bio = 'You haven\'t created a bio yet.') => ({
    name,
    bio,
    icon,
    colorPalette,
    projects: [
        {
            name: 'My Project',
            id: uuidv4(),
            archived: false,
            lists: [],
            notes: [],
            files: [],
        }
    ],
});