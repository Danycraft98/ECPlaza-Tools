# ECPlaza Tools -- Server Configuration (Everything You Need)
[![Build Status](https://travis-ci.org/joemccann/dillinger.svg?branch=master)](https://travis-ci.org/joemccann/dillinger)

Web Application that compares two spreadsheet files 

The following repository contains all files required to spin up the ECPlaza Tools web-app on Heroku server. As of writing this readme, currently ECPlaza is currently using the web-app. The Variant-KB web-app helps store and access Genes and Variants as well as their relevant information. The web-app is python based (python 3.9.1) and uses Django as the main framework. You can view the demo [here](https://ecplaza-tools.herokuapp.com/)<br/>

The application can easily be deployed to Heroku, which you can find more informations at [Getting Started with Python on Heroku](https://devcenter.heroku.com/articles/getting-started-with-python).

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

## Requirements
- Python 3.6
- Django (3.1)
- See the requirement.txt for more PyPi packages you need.


## Running Locally

Make sure you have Python 3.9.1 and mysql installed. 

```sh
$ git clone https://github.com/Danycraft98/ecplaza-tools.git
$ cd ecplaza-tools

$ python3 -m venv ecplaza-tools
$ pip install -r requirements.txt

$ mysql -u <username> -p
$ <password>
$ create database ecplaza_tools_db;

$ python manage.py makemigrations
$ python manage.py migrate
$ python manage.py runserver

$ mysql -u <username> -p ecplaza_tools_db < ecplaza_tools_db_<latestschemadate>.sql
$ <password>
```

Your app should now be running on [localhost:8000](http://localhost:8000/).

## Deploying to Heroku

To deploy to Heroku, you'll need to install the [Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli).

```sh
$ heroku create ecplaza-tools
$ git push heroku main
$ heroku open
```


### Useful Commands
#### Python Commands
Create Migration files<br/>
`$ python manage.py makemigrations`

Load Migrations (Make sure the database is created before executing the command)<br/>
`$ python manage.py migrate`

#### Heroku Commands
Get Heroku configuration variables<br/>
`$ heroku config -a ecplaza-tools`

Run command on Heroku cmd<br/>
`$ heroku run <cmd> -a ecplaza-tools`
Example: `$ heroku run python manage.py migrate -a ecplaza-tools`

open Heroku database<br/>
`$ heroku pg:psql -a ecplaza-tools`


heroku config:set SQLALCHEMY_TRACK_MODIFICATIONS=False -a ecplaza-tools
Install Certificates.command
release: python manage.py createuser staff --email staff@email.com --password password