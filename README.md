# employee hierarchy chart

[![Dependency Status](https://david-dm.org/preboot/angularjs-webpack/status.svg)](https://david-dm.org/preboot/angular-webpack#info=dependencies) [![devDependency Status](https://david-dm.org/preboot/angularjs-webpack/dev-status.svg)](https://david-dm.org/preboot/angularjs-webpack#info=devDependencies)

### Quick start

> Clone/Download the repo 

# clone the repo
$ git clone https://github.com/abhisarautoninja/myapp.git 

# change directory to your app
$ cd myapp

# install the dependencies with npm
$ npm install

# start the server
$ npm start
```

go to [http://localhost:8080](http://localhost:8080) in your browser.

## Json file location  
* myapp/src/app/json.js

## Mandatory Conditions -:

# Each employee detail must contain unique "id" along with these fields.
-"id"
	-**Compulsary field**
-"name"
	-Optional
-"teamName"
	-Optional
-"designation"
	-Optional
-"children"
	-If no children then give an empty array [];




* build files and watch: `npm start`

## Testing

#### 1. Unit Tests

* single run: `npm test`
* live mode (TDD style): `npm run test-watch`

# License

[MIT](/LICENSE)
