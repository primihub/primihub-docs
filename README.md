# Primihub Docs

This is the source code for [PrimiHub Docs](https://docs.primihub.com/).

We really apprecitate it if you would contribute to the content or the theme. You can do your contribution as follows.

# Contribution

This site is built with [Docusaurus 2](https://docusaurus.io/).

Site content is written in Markdown format located in `/docs`. For simple edits, you can directly edit the file on GitHub and generate a Pull Request.

## Prerequisite

This project requires Node.js to be v14.0.0 or higher. Install Node.js in your local machine if necessary.

## Run & Edit Locally

Clone the repo, then edit and run it locally.

```shell
yarn # install dependencies 
yarn start # This command opens up a browser window and will apply your local changes without having to restart.
```

## Routing

Each route you browse at <https://docs.primihub.com/> comes with a markdown file in this project at `/docs`.

For example, the file for <https://docs.primihub.com/docs/developer-docs/roadmap> is `/docs/developer-docs/roadmap.md`.

### Route with multiple pages

It will generate a default index page for a route which contains sub files. You need to create a `_category_.json` file in route folder. See `/docs/developer-docs/core-concept` for more deail.

## How to Insert an Image

1. Prepare your image files and place them in `/static/img` folder, e.g. `/static/img/xxx.jpeg`
2. Refer the image in markdown file with `![image desc](/img/xxxx.jpeg)`

## Meta data

Beside the content, please don't forget adding the following metadata at the header of a Markdown file:

```yaml
keywords: [case1, case2]
description: This is a brief introduction to the content
```

> The metadata will make the search engine index our content easily.

## Menu

Please update [sidebars.js](sidebars.js) if you want to add a new menu item.

## Localization

Please put translation items into the following JSON file if you want to add a translation for English:

```
i18n/en/docusaurus-plugin-content-docs/current.json
```

You could start it with a particular language with the following command:

```shell
yarn start --locale en
```
