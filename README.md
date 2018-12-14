[![Build Status](https://travis-ci.org/coolbeatz71/sendit-andela.svg?branch=develop)](https://travis-ci.org/coolbeatz71/sendit-andela)
[![Coverage Status](https://coveralls.io/repos/github/coolbeatz71/sendit-andela/badge.svg?branch=develop)](https://coveralls.io/github/coolbeatz71/sendit-andela?branch=develop)
[![Maintainability](https://api.codeclimate.com/v1/badges/b8cfc6af129a376bd18b/maintainability)](https://codeclimate.com/github/coolbeatz71/sendit-andela/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/b8cfc6af129a376bd18b/test_coverage)](https://codeclimate.com/github/coolbeatz71/sendit-andela/test_coverage)

# sendit-andela
[SendIT](https://coolbeatz71.github.io/sendit-andela/UI/) is a courier service that helps users deliver parcels to different destinations.
SendIT provides courier quotes based on weight categories.

1. Users can create an account and log in.
2. Users can create a parcel delivery order.
3. Users can change the destination of a parcel delivery order.
4. Users can cancel a parcel delivery order.
5. Users can see the details of a delivery order.
6. Admin can change the status and present location of a parcel delivery order.

## Website
[https://coolbeatz71.github.io/sendit-andela/UI/](https://coolbeatz71.github.io/sendit-andela/UI/)

## Getting Started
These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites
Prerequisites
```
Node 11.x
```
```
NPM 6.x
```

### Installing
After cloning this repo, cd into it and an type  `npm install` in the CLI to install all the required packages.
If you have Node.js and npm installed, you can start the app with this command `npm start`.

```
npm install
```

```
npm run serve
```

## Running the tests
Testing libraries used are ***Mocha*** and ***Chai***.
After cloning this repo, cd into it and an type  `npm run test` in the CLI

## Deployment
To deploy this project on heroku use the following commands:
```
git remote set-url heroku <repo git>
```
```
git push -u origin master
```

## Contributing
When contributing to this repository, please first discuss the change you wish to make via issue, email, or any other method with the owners of this repository before making a change.

## Documentation
For the documentation, find it [here](https://sendit-rest-api.herokuapp.com/api/V1/)

## Authors
* **Mutombo Jean-Vincent**

## Acknowledgments
* Olawale Aladeusi for his Post on NodeJS and PostgreSQL
* Rwabahizi Jonathan for his help on TDD and swagger-ui
* Charles Odili for his repo on PostgreSQL database integration
