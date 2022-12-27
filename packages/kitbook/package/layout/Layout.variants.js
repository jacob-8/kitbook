export const variants = [
    {
        name: 'Not Expanded',
        description: 'Only the active route will be expanded (since this is a Kitbook inside the Kitbook, it will be pulling the page to show from the parent Kitbook URL which renders a blank page if you click to other pages, it will break out of that variant and show a clone of the parent Kitbook)',
        width: 800,
        height: 400,
        props: {
            expanded: false,
            githubURL: 'https://github.com',
            title: 'My Cool Kitbook'
        },
    },
    {
        name: 'Expanded menu',
        width: 800,
        height: 500,
        props: {
            expanded: true,
            githubURL: 'https://github.com',
            title: 'My Other Kitbook'
        },
    },
];
