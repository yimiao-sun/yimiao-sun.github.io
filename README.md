# Yimiao's Academic Homepage

👋 Hi there, this is my academic homepage built on [vue.js](https://vuejs.org/), [marked](https://github.com/markedjs/marked), [citation-js](https://github.com/citation-js/citation-js) and [bolt.css](https://github.com/tbolt/boltcss).

## 🌴 Clone Template

This repo is licensed under [MIT](https://opensource.org/licenses/MIT), so feel free to clone or fork it.

To use this as a template, you may want to:
1. Fork this repository to your namespace.
2. Rename the repo to `<your github username>.github.io`
3. Remove analytics in `src/index.html`
4. Remove files in `public/files/`
5. Change favicon in `public/favicon-32x32.png`
6. Change footer in `src/App.vue`
7. Change all the contents in `src/content/`
8. Setup [node.js](https://nodejs.org/en/) for development ([nvm](https://github.com/nvm-sh/nvm) is recommended to manage different versions of node.js)
9. Clone your repo to your computer
10. Change directory to the cloned repo, type `npm install` in the terminal to install all necessary dependencies
11. Type `npm run dev` to test in your localhost
12. You may want to change branches in `.github/workflows/deploy.yml`, and change repo `settings/Code and automation/Pages/Build and deployment/Source` to `Github Actions`

## 🚀 Quick Start

- Project Setup

```sh
npm install
```

- Compile and Hot-Reload for Development

```sh
npm run dev
```

- Compile and Minify for Production

```sh
npm run build
```

## 📝 Memorandum

1. Favicon is generated via [favicon.io](https://favicon.io/favicon-generator/), you should put the generated one into `/public` folder
2. Change `<title>` content in `index.html`
3. Search icons from [font-awesome](https://fontawesome.com/v4/icons/) and [academicons]("https://cdn.jsdelivr.net/gh/jpswalsh/academicons@1/css/academicons.min.css")
4. All info are stored in `./src/content/*.json`, please modify these files.
5. Analytics are hard-coded in `index.html`, make sure to remove them.
6. footer links are hard-coded in `App.vue`
