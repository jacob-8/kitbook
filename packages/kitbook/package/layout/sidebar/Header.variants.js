export const variants = [
    {
        // name: 'Not Expanded',
        props: {
            activeURL: "/foo",
        },
    },
    {
        name: 'active / desktop',
        width: 800,
        props: {
            activeURL: "/",
            githubURL: "/",
        },
    },
    {
        name: 'with slot',
        props: {
            activeURL: "/Somewhere",
        },
        slots: [
            {
                content: 'My Workbench'
            }
        ]
    },
];
