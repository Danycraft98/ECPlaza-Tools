<!--
*** Thanks for checking out the Best-README-Template. If you have a suggestion
*** that would make this better, please fork the repo and create a pull request
*** or simply open an issue with the tag "enhancement".
*** Thanks again! Now go create something AMAZING! :D
-->



<!-- PROJECT SHIELDS -->
<!--
*** I'm using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->
[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]
[![LinkedIn][linkedin-shield]][linkedin-url]



<!-- PROJECT LOGO -->
<br />
<p align="center">
  <a href="https://github.com/Danycraft98/ecplaza-tools">
    <img src="ECPlazaTools/static/images/logo.png" alt="Logo" width="180" height="80">
  </a>

  <h3 align="center">ECPlaza Tools</h3>

  <p align="center">
    Web Application that contains different tools.
    <br />
    <a href="https://github.com/Danycraft98/ecplaza-tools/wiki"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://ecplaza-tools.herokuapp.com/">View Demo</a>
    ·
    <a href="https://github.com/Danycraft98/ecplaza-tools/issues">Report Bug</a>
    ·
    <a href="https://github.com/Danycraft98/ecplaza-tools/issues">Request Feature</a>
  </p>
</p>



<!-- TABLE OF CONTENTS -->
<details open="open">
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgements">Acknowledgements</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

[![Product Name Screen Shot][product-screenshot]](https://example.com)

The following repository contains all files required to spin up the ECPlaza Tools web-app on Heroku server. As of writing this readme, currently ECPlaza is currently using the web-app. The web-app helps retrieve relevant information for the company to use. The web-app is python-based (python 3.9.1) and uses Django as the main framework. You can view the demo link is available above. Here are the list of applications:


* Spreasheet Comapre Application
* HTML Parser Application
* Traffic Analyzing Application


<!-- GETTING STARTED -->
## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

This is an example of how to list things you need to use the software and how to install them.
* [Python 3.9.1](https://python.org/)
* [Django (3.1)](https://www.djangoproject.com/)
See the requirements.txt for more PyPi packages you need.
  ```sh
  pip install -r requirements.txt
  ```

### Installation

#### Local Deployment
Make sure you have Python 3.9.1 and mysql installed. 

1. Clone the repo
```sh
$ git clone https://github.com/Danycraft98/ecplaza-tools.git
$ cd ecplaza-tools
```
2. Create the virtual environment and install requirements from requirements.txt.
```sh
$ python3 -m venv ecplaza-tools
$ pip install -r requirements.txt
```
3. Make migrations and migrate them.
```sh
$ python manage.py makemigrations
$ python manage.py migrate
```
4. Finally, run the application.
```sh
$ python manage.py runserver
```

Your app should now be running on [localhost:8000](http://localhost:8000/).


#### Deploying to Heroku

To deploy to Heroku, you'll need to install the [Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli).

```sh
$ heroku create ecplaza-tools
$ git push heroku main
$ heroku open
```


#### Useful Commands
##### Python Commands
Create Migration files<br/>
`$ python manage.py makemigrations`

Load Migrations (Make sure the database is created before executing the command)<br/>
`$ python manage.py migrate`

##### Heroku Commands
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


<!-- USAGE EXAMPLES -->
## Usage

Use this space to show useful examples of how a project can be used. Additional screenshots, code examples and demos work well in this space. You may also link to more resources.

_For more examples, please refer to the [Documentation](https://github.com/Danycraft98/ecplaza-tools/wiki)_



<!-- CONTRIBUTING -->
## Contributing

Contributions are what make the open source community such an amazing place to be learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request



<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE` for more information.



<!-- CONTACT -->
## Contact

Daniel Lee - [@Daniel Lee](https://linkedin.com/danycraft98) - lee.daniel.jhl@gmail.com

Project Link: [https://github.com/Danycraft98/ecplaza-tools](https://github.com/Danycraft98/ecplaza-tools)



<!-- ACKNOWLEDGEMENTS -->
## Acknowledgements
* [GitHub Emoji Cheat Sheet](https://www.webpagefx.com/tools/emoji-cheat-sheet)
* [Img Shields](https://shields.io)
* [Choose an Open Source License](https://choosealicense.com)
* [GitHub Pages](https://pages.github.com)
* [Animate.css](https://daneden.github.io/animate.css)
* [Loaders.css](https://connoratherton.com/loaders)
* [Slick Carousel](https://kenwheeler.github.io/slick)
* [Smooth Scroll](https://github.com/cferdinandi/smooth-scroll)
* [Sticky Kit](http://leafo.net/sticky-kit)
* [JVectorMap](http://jvectormap.com)
* [Font Awesome](https://fontawesome.com)





<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/Danycraft98/ecplaza-tools.svg?style=for-the-badge
[contributors-url]: https://github.com/Danycraft98/ecplaza-tools/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/Danycraft98/ecplaza-tools.svg?style=for-the-badge
[forks-url]: https://github.com/Danycraft98/ecplaza-tools/network/members
[stars-shield]: https://img.shields.io/github/stars/Danycraft98/ecplaza-tools.svg?style=for-the-badge
[stars-url]: https://github.com/Danycraft98/ecplaza-tools/stargazers
[issues-shield]: https://img.shields.io/github/issues/Danycraft98/ecplaza-tools.svg?style=for-the-badge
[issues-url]: https://github.com/Danycraft98/ecplaza-tools/issues
[license-shield]: https://img.shields.io/github/license/Danycraft98/ecplaza-tools.svg?style=for-the-badge
[license-url]: https://github.com/Danycraft98/ecplaza-tools/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/othneildrew
[product-screenshot]: images/screenshot.png
