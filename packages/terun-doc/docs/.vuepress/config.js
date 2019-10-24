const versioning = require('./lib/versioning.js')

module.exports = {
    title: 'Terun',
    description: 'Easy code generator for projects',
    head: [
        ['link', {
            rel: 'icon',
            href: '/favicon.png'
        }],
        ['link', {
            rel: 'stylesheet',
            type: 'text/css',
            href: 'https://fonts.googleapis.com/css?family=Nunito:200,200i,300,300i,400,400i,600,600i,800,800i,900,900i'
        },]
    ],
    themeConfig: {
        versions: {
            latest: versioning.versions.latest,
            selected: versioning.versions.latest,
            all: versioning.versions.all
        },
        nav: [
            { text: 'Home', link: '/' },
            { text: 'More', link: '/pages/more/' },
            { text: 'Versions', items: versioning.linksFor('guide/getting-started.md') },
        ],
        sidebar: versioning.sidebars
    },
    plugins: [
        ['@vuepress/back-to-top', true],
        ['@vuepress/medium-zoom', true],
        ['@vuepress/search', {
            searchMaxSuggestions: 10,
            // Only search the latest version, e.g. 4.3, otherwise many duplicates will show up
            test: `/${versioning.versions.latest.replace('.', '\\.')}/`
        }]
    ]
}
