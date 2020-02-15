# Hightechu Academy Group Project :metal:

HighTechU Group Project

## [REPLACE ME WITH YOUR GROUP PROJECT NAME]

### Website :star:

[DELETE ME - ADD YOUR LIVE DEMO URL HERE]

[Live Demo]()

### Mini Pitch :ghost:

[DELETE ME - ADD YOUR PITCH HERE]

### Problem Statment :mega:

[DELETE ME - ADD YOUR PROBLEM STATMEMENT HERE]

### User Stories :snowboarder:

[DELETE ME - ADD YOUR USER STORIES HERE]

* EXAMPLE - I want my users to be able to see a default page on my website.
* EXAMPLE - I want my users to be able to login to my website.

### Website Pages :speedboat:

[DELETE ME - ADD YOUR WEBSITE PAGES HERE]

* EXAMPLE - Landing Page -> `index.html`
* EXAMPLE - Login / Register Page -> `login-register.html`

### Promo :grinning:

[DELETE ME - ADD YOUR WEBSITE PROMO IMAGES HERE]

![Example: Promo 1]()

## Getting Started :thinking:

### Requirements :dog:

* [git](https://git-scm.com)
* [Node.js](https://nodejs.org/en/)
* [npm](https://www.npmjs.com) (**Installed with Node.js**)
* [LoopBack CLI Tool](https://loopback.io/lb3/getting-started)

### Obtaining the Project :cat:

1. Open the terminal

2. Change into your working directory

```
cd working/directory
```

3. Clone the repository 

```
git clone URL
```

4. Change into the repository

```
cd REPO_NAME
```

### Running the Application :deer:

1. Install the node_modules

```
npm install
```

2. Run the application locally

```
node .
```

3. Head over to [http://0.0.0.0:3000](http://0.0.0.0:3000) and [http://0.0.0.0:3000/explorer](http://0.0.0.0:3000/explorer) in the browser of your choice.

### Adding Custom Models :ocean:

1. Add Custom Models

```
lb model
```

2. Follow command prompts

## Deploying :bear:

We are using Heroku to host our application. The following steps should only be done once. After setting up the application to deploy with GitHub, everytime you push to the master branch you will re-deploy your application.

1. Log into [Heroku](https://id.heroku.com/login)

1. Create a new app

1. Setup `Deploy with GitHub` (Deploy -> GitHub -> Select Repository)

1. Setup a `mongodb datasource for loopback` using [mLab MongoDB addon](https://elements.heroku.com/addons/mongolab)

1. Replace the `server/datasources.json` with the following:

```json
{
  "db": {
    "db": {
      "url": "mongodb://URL",
      "name": "mongoDS",
      "useNewUrlParser": true,
      "connector": "mongodb"
    }
  }
}
```

**Make sure to replace `URL` with the URL the Heroku mLab MongoDB addon provides.**

## Resources :blue_book:

* [GitHub](https://github.com)
* [GitHub Help](https://help.github.com/)
* [GitHub Markdown Help](https://help.github.com/en/articles/basic-writing-and-formatting-syntax)
* [GIT Command Line Cheat Sheet](https://education.github.com/git-cheat-sheet-education.pdf)
* [Heroku](https://www.heroku.com)
* [Heroku Documentation](https://devcenter.heroku.com/categories/reference)
* [Loopback](http://loopback.io)
* [Loopback Documentation](https://loopback.io/lb3/getting-started)

## Support :grey_question:

For support, visit the [HighTechU Academy Slack]().
