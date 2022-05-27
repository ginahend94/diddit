export const Profile = {
        name: 'Gina',
        colorPalette: 'pink',
        projects: [
            {
                name: 'Website',
                id: 1,
                archived: 'false',
                lists: [
                    {
                        id: '1.1',
                        tasks: [
                            {
                                id: '1.1.1',
                                title: 'plan ui',
                                description: 'plan out the ui for the website',
                                notes: `-bright colors\n-cutesy font\n-emojis`,
                                priority: 'medium',
                                subtasks: null,
                                starred: false,
                                tags: ['art', 'work'],
                                completed: false,
                            },
                            {
                                id: '1.1.2',
                                title: 'find host',
                                description: 'find a service to host the website',
                                notes: null,
                                priority: 'high',
                                subtasks: null,
                                starred: true,
                                tags: ['work'],
                                completed: false,
                            },
                            {
                                id: '1.1.3',
                                title: 'write pseudocode',
                                description: null,
                                notes: `-write comments in js file so I can use it as a roadmap AND comments`,
                                priority: 'none',
                                subtasks: null,
                                starred: false,
                                tags: ['programming', 'work'],
                                completed: true,
                            },
                        ],
                    },
                ],
            },
        ],
    };