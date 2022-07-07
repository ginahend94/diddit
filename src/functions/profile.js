// import { v4 as uuidv4 } from "uuid";
import { format } from "date-fns";
import Modal from "../DOM-elements/modal.js";
import generateId from "./generateId.js";
import load from "./load.js";

export default (name = '', icon = null, colorPalette = 'default', bio = '') => ({
    name,
    bio,
    icon,
    colorPalette,
    darkMode: true,
    projects: [
        {
            name: 'My Project',
            description: '',
            id: generateId(),
            active: true,
            archived: false,
            lists: [],
            notes: [],
            files: [],
            dateCreated: new Date(),
            dateCreatedFormatted: format(new Date(), 'yyyy-MM-dd')
        }
    ],
});

export const Profile = load('profile');

// EXAMPLE PROFILE

export const gina = {
    "name": "Gina Henderson",
    "bio": "I made this!",
    "icon": 'bxs:dog',
    "colorPalette": "#FA88C8",
    darkMode: true,
    "projects": [
        {
            "name": "Website",
            "description": "My portfolio website",
            "id": "id2e2c4f10-df39-41ff-bc0e-8a7df8601a5b",
            "active": false, "archived": false,
            "lists": [
                {
                    "id": "id2e2c4f10-df39-41ff-bc0e-8a7df8601a5b.id1ca63d86-81a3-4e3a-b7f5-68717a756c78",
                    "tasks": [
                        {
                            "name": "plan ui",
                            "date": "2022-07-01T05:00:00.000Z",
                            "priority": "medium",
                            "subtasks": "",
                            "notes": "-bright colors\n-cute font\n-emojis",
                            "classes": ["dragElement", "dragContainer"],
                            "id": "id2e2c4f10-df39-41ff-bc0e-8a7df8601a5b.id1ca63d86-81a3-4e3a-b7f5-68717a756c78.id1d7132e0-f327-44f7-9c3e-e975dcc958a0",
                            "container": "id2e2c4f10-df39-41ff-bc0e-8a7df8601a5b.id1ca63d86-81a3-4e3a-b7f5-68717a756c78",
                            "completed": false,
                            "dateFormatted": "07/01/2022"
                        },
                        {
                            "name": "find host",
                            "date": "2022-07-07T05:00:00.000Z",
                            "priority": "high",
                            "subtasks": "",
                            "notes": "find a service to host the website",
                            "classes": ["dragElement", "dragContainer"],
                            "id": "id2e2c4f10-df39-41ff-bc0e-8a7df8601a5b.id1ca63d86-81a3-4e3a-b7f5-68717a756c78.idbe00003b-a6ab-4666-89e1-5653210bb493",
                            "container": "id2e2c4f10-df39-41ff-bc0e-8a7df8601a5b.id1ca63d86-81a3-4e3a-b7f5-68717a756c78",
                            "completed": false,
                            "dateFormatted": "07/07/2022"
                        },
                        {
                            "name": "write pseudocode",
                            "date": "",
                            "priority": "none",
                            "subtasks": "",
                            "notes": "-write comments in js file so I can use it as a roadmap AND comments",
                            "classes": ["dragElement", "dragContainer"],
                            "id": "id2e2c4f10-df39-41ff-bc0e-8a7df8601a5b.id1ca63d86-81a3-4e3a-b7f5-68717a756c78.id8a842382-ae9a-431b-a74f-63c62161a3f8",
                            "container": "id2e2c4f10-df39-41ff-bc0e-8a7df8601a5b.id1ca63d86-81a3-4e3a-b7f5-68717a756c78",
                            "completed": false
                        }
                    ],
                    "container": "id2e2c4f10-df39-41ff-bc0e-8a7df8601a5b"
                },
                {
                    "id": "id2e2c4f10-df39-41ff-bc0e-8a7df8601a5b.ida8ea2b81-267f-4e45-b202-7089ee216a58",
                    "tasks": [
                        {
                            "name": "build out ui",
                            "date": "2022-07-13T05:00:00.000Z",
                            "priority": "medium",
                            "subtasks": "",
                            "notes": "-code ui for website\n-take your time!",
                            "classes": ["dragElement", "dragContainer"],
                            "id": "id2e2c4f10-df39-41ff-bc0e-8a7df8601a5b.ida8ea2b81-267f-4e45-b202-7089ee216a58.id693314da-cfe5-48a4-875d-fbbe6dc3f951",
                            "container": "id2e2c4f10-df39-41ff-bc0e-8a7df8601a5b.ida8ea2b81-267f-4e45-b202-7089ee216a58",
                            "completed": false,
                            "dateFormatted": "07/13/2022"
                        },
                        {
                            "name": "buy hosting plan",
                            "date": "2022-07-04T05:00:00.000Z",
                            "priority": "high",
                            "subtasks": [
                                {
                                    "name": "Transfer money", "completed": false, "id": "id2e2c4f10-df39-41ff-bc0e-8a7df8601a5b.ida8ea2b81-267f-4e45-b202-7089ee216a58.iddf0a7efd-b27f-4bd1-9454-5df8d0bcfbcd.0"
                                },
                                {
                                    "name": "Buy domain name", "completed": false, "id": "id2e2c4f10-df39-41ff-bc0e-8a7df8601a5b.ida8ea2b81-267f-4e45-b202-7089ee216a58.iddf0a7efd-b27f-4bd1-9454-5df8d0bcfbcd.1"
                                }
                            ],
                            "notes": "",
                            "classes": ["dragElement", "dragContainer"],
                            "id": "id2e2c4f10-df39-41ff-bc0e-8a7df8601a5b.ida8ea2b81-267f-4e45-b202-7089ee216a58.iddf0a7efd-b27f-4bd1-9454-5df8d0bcfbcd",
                            "container": "id2e2c4f10-df39-41ff-bc0e-8a7df8601a5b.ida8ea2b81-267f-4e45-b202-7089ee216a58",
                            "completed": false,
                            "dateFormatted": "07/04/2022"
                        },
                        {
                            "name": "write markup",
                            "date": "", "priority": "none",
                            "subtasks": "",
                            "notes": "finalize page structure",
                            "classes": ["dragElement", "dragContainer"],
                            "id": "id2e2c4f10-df39-41ff-bc0e-8a7df8601a5b.ida8ea2b81-267f-4e45-b202-7089ee216a58.id4eee04e6-5972-45a5-84e4-03fa93fdcdf4",
                            "container": "id2e2c4f10-df39-41ff-bc0e-8a7df8601a5b.ida8ea2b81-267f-4e45-b202-7089ee216a58",
                            "completed": false
                        }
                    ],
                    "container": "id2e2c4f10-df39-41ff-bc0e-8a7df8601a5b"
                }
            ],
            "notes": [
                {
                    "name": "ideas 🌺",
                    "content": "<div>-balloons</div><div>-minigame</div><div>-clickable photo<br></div>",
                    "id": "id2e2c4f10-df39-41ff-bc0e-8a7df8601a5b.id86d01195-8f76-4577-83bc-2657554a4cb0",
                    "dateCreatedFormatted": "06-29-2022",
                    "dateCreated": "2022-06-29T18:52:28.045Z"
                }
            ],
            "files": [],
            "dateCreated": "2022-06-29T18:46:20.208Z",
            "dateCreatedFormatted": "2022-06-29",
            "dateEdited": "2022-06-29T18:46:39.021Z",
            "dateEditedFormatted": "2022-06-29"
        },
        {
            "name": "Room decorating",
            "description": "To do list for re-doing my bedroom",
            "id": "id96a4fd2f-1dcf-433e-ac8d-ed5fc0b90fe8",
            "active": true,
            "archived": false,
            "lists": [
                {
                    "id": "id96a4fd2f-1dcf-433e-ac8d-ed5fc0b90fe8.ida435c353-f2c0-4e12-ba51-ace8fd9b8279",
                    "tasks": [
                        {
                            "name": "Vacuum floor",
                            "date": "",
                            "priority": "none",
                            "subtasks": "",
                            "notes": "",
                            "classes": ["dragElement", "dragContainer"],
                            "id": "id96a4fd2f-1dcf-433e-ac8d-ed5fc0b90fe8.ida435c353-f2c0-4e12-ba51-ace8fd9b8279.idf08e4b88-314a-4dd2-842d-d58dcfdcd220",
                            "container": "id96a4fd2f-1dcf-433e-ac8d-ed5fc0b90fe8.ida435c353-f2c0-4e12-ba51-ace8fd9b8279",
                            "completed": false
                        },
                        {
                            "name": "Wash new sheets",
                            "date": "", "priority": "none",
                            "subtasks": "", "notes": "",
                            "classes": ["dragElement", "dragContainer"],
                            "id": "id96a4fd2f-1dcf-433e-ac8d-ed5fc0b90fe8.ida435c353-f2c0-4e12-ba51-ace8fd9b8279.idc378247e-61da-405f-8e02-67c3e8d54206",
                            "container": "id96a4fd2f-1dcf-433e-ac8d-ed5fc0b90fe8.ida435c353-f2c0-4e12-ba51-ace8fd9b8279",
                            "completed": false
                        },
                        {
                            "name": "Get net for pillows",
                            "date": "",
                            "priority": "none",
                            "subtasks": "",
                            "notes": "",
                            "classes": ["dragElement", "dragContainer"],
                            "id": "id96a4fd2f-1dcf-433e-ac8d-ed5fc0b90fe8.ida435c353-f2c0-4e12-ba51-ace8fd9b8279.idbd718c9f-cb76-4d2c-9729-60490c5f0e78",
                            "container": "id96a4fd2f-1dcf-433e-ac8d-ed5fc0b90fe8.ida435c353-f2c0-4e12-ba51-ace8fd9b8279",
                            "completed": false
                        }
                    ],
                    "container": "id96a4fd2f-1dcf-433e-ac8d-ed5fc0b90fe8"
                },
                {
                    "id": "id96a4fd2f-1dcf-433e-ac8d-ed5fc0b90fe8.idb66fe3b3-4870-49cc-983d-f30d9f5e1543",
                    "tasks": [
                        {
                            "name": "Put up art",
                            "date": "",
                            "priority": "none",
                            "subtasks": "",
                            "notes": "",
                            "classes": ["dragElement", "dragContainer"],
                            "id": "id96a4fd2f-1dcf-433e-ac8d-ed5fc0b90fe8.idb66fe3b3-4870-49cc-983d-f30d9f5e1543.idb4546792-736a-4d1a-91aa-ce37d7e6c58e",
                            "container": "id96a4fd2f-1dcf-433e-ac8d-ed5fc0b90fe8.idb66fe3b3-4870-49cc-983d-f30d9f5e1543",
                            "completed": false
                        },
                        {
                            "name": "Buy rug",
                            "date": "",
                            "priority": "none",
                            "subtasks": "",
                            "notes": "",
                            "classes": ["dragElement", "dragContainer"],
                            "id": "id96a4fd2f-1dcf-433e-ac8d-ed5fc0b90fe8.idb66fe3b3-4870-49cc-983d-f30d9f5e1543.id9c0f68d0-19e5-439d-a357-6277c315e769",
                            "container": "id96a4fd2f-1dcf-433e-ac8d-ed5fc0b90fe8.idb66fe3b3-4870-49cc-983d-f30d9f5e1543",
                            "completed": false
                        },
                        {
                            "name": "Get candles",
                            "date": "",
                            "priority": "none",
                            "subtasks": "",
                            "notes": "",
                            "classes": ["dragElement", "dragContainer"],
                            "id": "id96a4fd2f-1dcf-433e-ac8d-ed5fc0b90fe8.idb66fe3b3-4870-49cc-983d-f30d9f5e1543.id8801b0cd-6052-4826-b400-dec1bc05b25b",
                            "container": "id96a4fd2f-1dcf-433e-ac8d-ed5fc0b90fe8.idb66fe3b3-4870-49cc-983d-f30d9f5e1543",
                            "completed": false
                        }
                    ],
                    "container": "id96a4fd2f-1dcf-433e-ac8d-ed5fc0b90fe8"
                },
                {
                    "id": "id96a4fd2f-1dcf-433e-ac8d-ed5fc0b90fe8.id3d4dd07b-57a7-43ae-8810-8cf47931f5ab",
                    "tasks": [
                        {
                            "name": "Cable management",
                            "date": "",
                            "priority": "none",
                            "subtasks": "",
                            "notes": "Figure out cables for computer and PS4",
                            "classes": ["dragElement", "dragContainer"],
                            "id": "id96a4fd2f-1dcf-433e-ac8d-ed5fc0b90fe8.id3d4dd07b-57a7-43ae-8810-8cf47931f5ab.id93a14fcc-4b70-4dd6-adca-d9562064814a",
                            "container": "id96a4fd2f-1dcf-433e-ac8d-ed5fc0b90fe8.id3d4dd07b-57a7-43ae-8810-8cf47931f5ab",
                            "completed": false
                        },
                        {
                            "name": "Dust TV",
                            "date": "",
                            "priority": "none",
                            "subtasks": "",
                            "notes": "",
                            "classes": ["dragElement", "dragContainer"],
                            "id": "id96a4fd2f-1dcf-433e-ac8d-ed5fc0b90fe8.id3d4dd07b-57a7-43ae-8810-8cf47931f5ab.idfe974959-521e-4614-b07f-42c86b065da3",
                            "container": "id96a4fd2f-1dcf-433e-ac8d-ed5fc0b90fe8.id3d4dd07b-57a7-43ae-8810-8cf47931f5ab",
                            "completed": false
                        },
                        {
                            "name": "Add nice screensaver to pc",
                            "date": "",
                            "priority": "none",
                            "subtasks": "",
                            "notes": "preferably one that matches room theme",
                            "classes": ["dragElement", "dragContainer"],
                            "id": "id96a4fd2f-1dcf-433e-ac8d-ed5fc0b90fe8.id3d4dd07b-57a7-43ae-8810-8cf47931f5ab.id985d1a0b-3197-4257-8dc1-3246446e3b59",
                            "container": "id96a4fd2f-1dcf-433e-ac8d-ed5fc0b90fe8.id3d4dd07b-57a7-43ae-8810-8cf47931f5ab",
                            "completed": false
                        }
                    ],
                    "container": "id96a4fd2f-1dcf-433e-ac8d-ed5fc0b90fe8"
                }
            ],
            "notes": [
                {
                    "name": "colors",
                    "content": "<div>-pastels</div><div>-lots of pink and seafoam</div><div>-stay away from neons and jewel tones<br></div>",
                    "id": "id96a4fd2f-1dcf-433e-ac8d-ed5fc0b90fe8.id5609263e-00a9-4b62-adcd-8f64689435c8",
                    "dateCreatedFormatted": "06-29-2022",
                    "dateCreated": "2022-06-29T18:55:41.673Z"
                },
                {
                    "name": "shopping list",
                    "content": "<div>-room spray</div><div>-pillow cases</div><div>-throw blanket</div><div>-curtain rod<br></div>",
                    "id": "id96a4fd2f-1dcf-433e-ac8d-ed5fc0b90fe8.id59e59f28-4847-4b02-8d40-51788be18453",
                    "dateCreatedFormatted": "06-29-2022",
                    "dateCreated": "2022-06-29T18:56:14.016Z"
                },
                {
                    "name": "I'm excited :)",
                    "content": "I can't wait to finish decorating my room! It's going to be so much more fun to be in there.<br>",
                    "id": "id96a4fd2f-1dcf-433e-ac8d-ed5fc0b90fe8.idf319a3fb-fcb2-419f-ad2f-fd4f9c6544bd",
                    "dateCreatedFormatted": "06-29-2022",
                    "dateCreated": "2022-06-29T18:56:51.012Z"
                }
            ],
            "files": [],
            "dateCreated": "2022-06-29T18:53:07.900Z",
            "dateCreatedFormatted": "2022-06-29"
        }
    ]
}

export const editProfile = () => {
    console.log('will edit');
    const modalInner = (() => {
        const body = document.createElement('div');

        const nameInput = document.createElement('input');
        body.append(nameInput);
        nameInput.placeholder = Profile.name;
        nameInput.value = Profile.name;

        const bioInput = document.createElement('textarea');
        body.append(bioInput);
        bioInput.placeholder = Profile.bio;
        bioInput.value = Profile.bio;

        const userIconSelect = 'Icon selector will go here.';
        body.append(userIconSelect);

        const colorPaletteInput = 'Color picker will go here.';
        body.append(colorPaletteInput);

        return { body, getName, getBio, getUserIcon, getColorPalette }
    })();
    const modal = Modal.create(
        ['edit-profile'],
        modalInner.body,
        () => confirm(),
        'Save',
        true,
        true,
        true
    );
    Modal.open(modal);
    const confirm = () => {
        const updatedProfile = {
            ...Profile,
            name: modalInner.getName(),
            bio: modalInner.getBio(),
            icon: modalInner.getUserIcon(),
            colorPalette: modalInner.getColorPalette(),
        }
        console.log(updatedProfile);
    }
}