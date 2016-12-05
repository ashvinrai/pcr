#[PC Registry](http://pcr.meteorapp.com/)

A platform for crowdsourcing the funds for a personal computer, then ordering the parts.

##Release notes
###New features
- The platform can create order objects using the Zinc API
- The dashboard responsively prompts the user to submit their parts order when enough funds have been collected

###Bug fixes
- Users are redirected to the homepage upon logging out, instead of getting stuck on a non-functional dashboard

###Known bugs and defects
- The production server does not have SMTP configured, so though the code to send verification emails is present and functional in the platform, the emails are not actually sent. Details on how to configure SMTP with Meteor can be found [here](https://themeteorchef.com/snippets/using-the-email-package/).
- While the platform is safe from the submission of malicious data, it does not format or validate forms on the client. An effective library to correct this would be [Cleave.js](https://nosir.github.io/cleave.js/).
- Payment acceptance in the platform is handled with [Stripe](https://stripe.com/), but is currently in [Test Mode](https://stripe.com/docs/testing). Before the project can accept real payments, Stripe has to be configured for production. It would also be recommended to break out Stripe keys into an environment variable file, so that they can be configured independently for development, staging, and testing environments.
- The platform uses [Zinc](https://zinc.io/) to automate ordering computer parts from Amazon. Orders objects are successfully created, but Zinc cannot validate them because they do not include valid payment information. Correcting this requires setting up automatic transfers from Stripe to a bank account, then configuring the server to use that bank account's credentials when submitting orders to Zinc.

##How to set up your development environment

###1) Install Meteor

 On Linux/OSX, you can do it from the Terminal.
```
curl https://install.meteor.com/ | sh
```
On Windows, use the official [installer](https://install.meteor.com/windows).

###2) Clone the repo
Clone the repository onto your local machine.

```
git clone git@github.com:ashvinrai/pcr.git
```
###3) Navigate into the project directory

```
cd pcr/
```
###4) Run the project using Meteor's CLI

```
meteor
```
> If this doesn't work, try restarting your console to make sure that the `meteor` command has been loaded from the path. If `meteor` still doesn't work, make sure that it is included in your system path variables.

###5) Check it out in your browser
Once Meteor is happy and running in your console, navigate to [```http://localhost:3000/```](http://localhost:3000/).

##How to deploy the site to production
###1) Configure your settings
If it does not already exist, create a file `settings.json` in the root directory of the project. This is where you'll put all of the information that Meteor needs to deploy to their first-party hosting service, [Galaxy](https://www.meteor.com/hosting). 

`settings.json` should have the following structure:
```
{
	"galaxy.meteor.com": {
		"env": {
			"ROOT_URL": "http://pcr.meteorapp.com/",
			"DEPLOY_HOSTNAME":"galaxy.meteor.com",
			"MONGO_URL": "<MONGO_URL>"
		}
	},
  "public": {

  }
}

```
`<MONGO_URL>` needs to be replaced with an actual access URL for a MongoDB database, since Galaxy does not provide their own database solution. [MLab](https://mlab.com/) is a recommended provider.
###2) Deploy using Meteor's CLI
The advantage of using Meteor's first-party hosting service is that building and deployment can be done in a single easy step. Just run the following command, including the flag to include your settings file.
```
DEPLOY_HOSTNAME=us-east-1.galaxy-deploy.meteor.com meteor deploy --settings settings.json pcr.meteorapp.com
```
##How the project's code is structured
Meteor is a fairly opinionated framework, which is to say, two Meteor projects that do very different things will still have similar code structure. To this end, if you are not already familiar with the Meteor framework, [their official tutorial](https://www.meteor.com/tutorials/blaze/creating-an-app) will take you a long way in understanding how the application works.

| Filepath | What it contains |
|:------------- |:-------------|
| `/client`      | Code that is run in the browser, but not the server. | 
| `/client/controllers` | The meat of the client side application. All of the JavaScript and logic is here.|
| `/client/stylesheets/` | The stylesheets, mostly scoped by page, are here. They are written using [Sass](http://sass-lang.com/), which Meteor compiles to regular css.
|`/client/views`|All of the templates. They are written using [Blaze](https://guide.meteor.com/blaze.html), which is Meteor's first-party templating language.
|`/lib/router.js`|The site is rendered in the client, so the routing logic is handled in the browser. The routes are defined in this file.|
|`/lib/collections/build.js`|All of the globally-scoped declarations of the Collection tables used in the platform.|
|`/server`|Code that is run on the server, but not in the browser.|
|`/server/main.js`|The primary entry-point for the platform. Contains functions that are not safe to handle in the browser (like accepting payments), as well as code that runs every time the server boots up (like making sure that all of the hard-coded PC builds are in the database).
Though the codebase is light on comments, Meteor's predictable structure prevents ambiguity when determining what code corresponds with which web components, and function names are semantically useful.