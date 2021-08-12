const f /* files */ = [
  { // f[0]
    path: "/index",
    import: () => import("C:\\dev\\runner-ui\\src\\index.md"),
    "id": "1ctb1v1",
    "ext": ".md",
    "dir": "",
    "segment": "index",
    "sortKey": "index",
    "title": "Getting started",
    "canonical": "/index",
    "options": {
      "title": "Getting started",
      "tree": true
    },
    "views": [
      "example of a view"
    ],
    "headings": [
      {
        "level": 1,
        "hierarchy": [
          "Svelte-UI Svench Workbench"
        ],
        "text": "Svelte-UI Svench Workbench",
        "id": "svelte-ui-svench-workbench"
      },
      {
        "level": 2,
        "hierarchy": [
          "Svelte-UI Svench Workbench",
          "What is Svench?"
        ],
        "text": "What is Svench?",
        "id": "what-is-svench"
      },
      {
        "level": 2,
        "hierarchy": [
          "Svelte-UI Svench Workbench",
          "Get Started"
        ],
        "text": "Get Started",
        "id": "get-started"
      }
    ]
  },
  { // f[1]
    path: "/lib/Copy",
    import: () => import("C:\\dev\\runner-ui\\src\\lib\\Copy.svench"),
    "id": "nq3elx",
    "ext": ".svench",
    "dir": "lib",
    "segment": "Copy",
    "sortKey": "Copy",
    "title": "Copy",
    "canonical": "/lib/Copy",
    "options": {},
    "views": [
      "Input message"
    ],
    "headings": []
  },
  { // f[2]
    path: "/lib/Modal",
    import: () => import("C:\\dev\\runner-ui\\src\\lib\\Modal.svench"),
    "id": "1yzgo5f",
    "ext": ".svench",
    "dir": "lib",
    "segment": "Modal",
    "sortKey": "Modal",
    "title": "Modal",
    "canonical": "/lib/Modal",
    "options": {},
    "views": [
      "Default"
    ],
    "headings": []
  },
  { // f[3]
    path: "/lib/Toasts",
    import: () => import("C:\\dev\\runner-ui\\src\\lib\\Toasts.svench"),
    "id": "v2q5qe",
    "ext": ".svench",
    "dir": "lib",
    "segment": "Toasts",
    "sortKey": "Toasts",
    "title": "Toasts",
    "canonical": "/lib/Toasts",
    "options": {},
    "views": [
      "Default"
    ],
    "headings": []
  },
  { // f[4]
    path: "/lib/Button",
    import: () => import("C:\\dev\\runner-ui\\src\\lib\\Button.svench"),
    "id": "xz7nl2",
    "ext": ".svench",
    "dir": "lib",
    "segment": "Button",
    "sortKey": "Button",
    "title": "Button",
    "canonical": "/lib/Button",
    "options": {},
    "views": [
      "External link size",
      "Forms",
      "colors",
      "white",
      "Loading state",
      "disabled click",
      "lg click",
      "ctrl click"
    ],
    "headings": []
  }
]

const d /* dirs */ = [
  { // d[0]
    path: "/lib",
    "id": "13bzfkj",
    "ext": undefined,
    "dir": ".",
    "segment": "lib",
    "sortKey": "lib",
    "title": "lib",
    "canonical": "/lib",
    children: () => [f[4], f[1], f[2], f[3]]
  }
]

for (const g of [f, d])
  for (const x of g) x.children = x.children ? x.children() : []

const routes = [...f, ...d]

const tree = {
  path: "/",
  isRoot: true,
  "id": undefined,
  "ext": undefined,
  "dir": undefined,
  "segment": undefined,
  "sortKey": undefined,
  "title": undefined,
  "canonical": undefined,
  children: [
    f[0],
    d[0]
  ]
}

export { f as files, d as dirs, routes, tree }
