# Hightechu Academy Group Project :metal:

HighTechU Group Project

## MeetMaps

### Website :star:

[Live Demo](https://meetmaps.herokuapp.com/)

### Mini Pitch :ghost:

MeetMap is a social map service that lets you start and join friend groups and find fun places to meet with the least amount of travel from the group. Our software uses the Google Maps API to find all the members of the group (or a default address) and gives you selection of the top 5 most popular locations for teens in order of how close they are to the members of the group. Select a location and the map will show directions for each member of the group from their current location to the destination. No more racking your brain for where to meet and how everyone is going to get there. With an easily buildable MVP in 7 weeks, this project also allows for tons of expansion. It is now easier than ever to get together with your friends and WE do all the work.

### Problem Statment :mega:

People spend too long deciding on a place to meet that is close enough to all group members, sometimes to an extent that the meetup doesn't even occur. 

### User Stories :snowboarder:

I want my users to be able to see a default page on my website.

I want my users to be able to create an account for my website.

I want my users to be able to login to my website.

I want my users to be able to logout of my website.

I want my users to be able to create a group. 

I want my users to be able to add other users to their group. 

I want my users to be able to switch between mulitple groups. 

I want my users to be able to be shown the top three closest locations to meet. 

I want my users to be able to select a location and be directed to it. 

### Website Pages :speedboat:

Landing Page -> `index.html`

### Promo :grinning:

<img src="Promo Images/Map1.PNG">
Signed In -> `Promo Images/Map1.PNG`

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
