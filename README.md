# Website

This website is built using [Docusaurus 2](https://docusaurus.io/), a modern static website generator.

## Installation

```shell
yarn
```

## Local Development

```shell
yarn start
```

This command starts a local development server and opens up a browser window. Most changes are reflected live without having to restart the server.

## Build

```shell
yarn build
```

This command generates static content into the `build` directory and can be served using any static contents hosting service.

## Deployment

Using SSH:

```shell
USE_SSH=true yarn deploy
```

Not using SSH:

```shell
GIT_USER=<Your GitHub username> yarn deploy
```

If you are using GitHub pages for hosting, this command is a convenient way to build the website and push to the `gh-pages` branch.

## Contribution
Please feel free to help us to improve all the documents.

### Docs
Create a Markdown file in a approprate directory under `i18n/xxx/docusaurus-plugin-content-docs`.

Considering we have multilingua in this repository, you could find the right directory base on different language:

| Language | Directory |
|---|---|
| English | `en` |
| Chinese | `zh-cn` |

Beside the content, please don't forget adding the following metadata at the header of a Markdown file:

```yaml
keywords: [case1, case2]
description: This is a brief introduction to the content
```

> The metadata will make the search engine index our content easily.

### Blog
Please feel free to post your articles here. It should be related to data computation protection, even not related to PrimiHub.

Please be aware of the following convention:

* Put your articles under the [blog](blog) directory in Markdown format
* Make sure your Markdown file name starts with the date format
* Add the necessary front metadata in your Markdown file
  * The metadata could contain `slug`, `title`, `authors`, and `tags`
* Put all images under the [images](blog/images/) directory, and give them a readable name
* Please put the author's information into [authors.yml](blog/authors.yml) if there is a new author

### Menu
Please update [sidebars.js](sidebars.js) if you want to add a new menu item.

### Localization
Please put translation items into the following JSON file if you want to add a translation for English:

```
i18n/en/docusaurus-plugin-content-docs/current.json
```

You could start it with a particular language with the following command:

```shell
yarn start --locale en
```
