# ECPlaza Tools -- Server Configuration (Everything You Need)
Web Application that compares two spreadsheet files 

The following repository contains all files required to spin up the ECPlaza Tools web-app on Heroku server. As of writing this readme, currently ECPlaza is currently using the web-app. The Variant-KB web-app helps store and access Genes and Variants as well as their relevant information. The web-app is python based (python 3.9.1) and uses Django as the main framework. You can view the demo [here](https://ecplaza-tools.herokuapp.com/)<br/>

The application can easily be deployed to Heroku, which you can find more informations at [Getting Started with Python on Heroku](https://devcenter.heroku.com/articles/getting-started-with-python).

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

$ python manage.py db init
$ python manage.py db upgrade
$ python manage.py runserver

$ mysql -u <username> -p ecplaza_tools_db < ecplaza_tools_db_<latestschemadate>.sql
$ <password>
```

Your app should now be running on [localhost:5000](http://localhost:5000/).

## Deploying to Heroku

To deploy to Heroku, you'll need to install the [Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli).

```sh
$ heroku create ecplaza-tools
$ git push heroku main
$ heroku open
```


### Useful Commands
#### Python Commands
Initialize Migration location<br/>
`$ python manage.py db init`

Create Migration files<br/>
`$ python manage.py db migrate`

Load Migrations (Make sure the database is created before executing the command)<br/>
`$ python manage.py db upgrade`

#### Heroku Commands
Get Heroku configuration variables<br/>
`$ heroku config -a ecplaza-tools`

Run command on Heroku cmd<br/>
`$ heroku run <cmd> -a ecplaza-tools`
Example: `$ heroku run python manage.py runserver -a ecplaza-tools`

open Heroku database<br/>
`$ heroku pg:psql -a ecplaza-tools`


heroku config:set SQLALCHEMY_TRACK_MODIFICATIONS=False -a ecplaza-tools
Install Certificates.command



![Made with Love in South Korea](

) [![Build Status](https://travis-ci.org/joemccann/dillinger.svg?branch=master)](https://travis-ci.org/joemccann/dillinger)

# laboratory-information-management-system

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

## Requirements
- Python 3.6
- Django (2.1)
- Django REST Framework
- Django Rest Auth
release: python manage.py createuser staff --email staff@email.com --password password

## Installation
```
	pip install -r requirements.txt
	python manage.py makemigrations
	python manage.py migrate
	python manage.py runserver
	http://localhost:8000/users/Install

```
## Basic Login Details
```
	username:"admin",
	password:"qwerty"

```

## Login
```
	/users/Login/
	{
	"username":"admin",
	"password": "qwerty",
	}
```
## Logout
```
/users/Logout/
```
## Create User
```
Url:/users/User/
Json:
		{
		"username": "",
		"password": "",
		"email": "",
		"profile": {
			"id": null,
			"name": "",
			"phone": "",
			"address": "",
			"status": "",
			"image": null
		}
Response:
```
## Role User
```
Url:/users/Role/
Json:
		{
    	"role": ""
		}
Response:
```
## Assigning permission to Role
```
Url:/users/RolePermission/
Json:
		{
		"module": null,
		"role": null,
		"create": false,
		"read": false,
		"update": false,
		"delete": false,
		"type": null
		}
Response:
```
## Assigning Role to User
```
Url:/users/RolePermission/
Json:
		{
		"user": null,
		"role": null,
		"depertment": null
		}
Response:
[
    {
    "id": 1,
    "user": 1,
    "role": 1,
    "depertment": null,
    "date_updated": "2019-08-12T19:19:14.723297Z",
    "created_by": null,
    "updated_by": null
    }
]
```
## Creating a Depertment
```
Url:/lab/Section/
Json:
		{
		"name": "",
		"description": ""
		}
Response:
[
{
"id": 1,
"name": "Milk",
"description": "Milk and Milk Products",
"test_section": [],
"date_updated": "2019-08-12T19:45:29.316190Z",
"created_by": null,
"updated_by": null
}
]
```
## Creating a Test under a Depertment
```
Url:/lab/Test/
Json:
{
	"section_id": 1,
	"name": "carbs",
	"description": "carbohyddrate",
	"field_test": [{
			"name": "trans fat",
			"formula": "0",
			"measure": "mg",
			"uplimit": 100.0,
			"downlimit": 0.0
		},
		{
			"name": "good fat",
			"formula": "0",
			"measure": "mg",
			"uplimit": 100.0,
			"downlimit": 0.0
		}
	]
}
Response:
```
## Creating Client
```
Url:/lab/Client/
Json:
		{
		"name": "",
		"phone": "",
		"address": "",
		"status": "",
		"image": null
		}
Response:
[
{
"id": 1,
"name": "Anupam Saikia",
"phone": "987654",
"address": "sarupather",
"status": "",
"image": null,
"date_updated": "2019-08-13T00:32:43.302409Z",
"user": null,
"created_by": null,
"updated_by": null
}
]
```
## Registering a Sample under a client
```
Url:/lab/Sample/
Json:
		{
		"client_id": null,
		"name": ""
		}
Response:
```
