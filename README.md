# employee hierarchy chart

[![Dependency Status](https://david-dm.org/preboot/angularjs-webpack/status.svg)](https://david-dm.org/preboot/angular-webpack#info=dependencies) [![devDependency Status](https://david-dm.org/preboot/angularjs-webpack/dev-status.svg)](https://david-dm.org/preboot/angularjs-webpack#info=devDependencies)

### Quick start

```
# clone the repo
$ git clone https://github.com/abhisarautoninja/myapp.git 

# change directory to your app
$ cd myapp

# install the dependencies with npm
$ npm install

# start the server
$ npm start

$ go to [http://localhost:8080](http://localhost:8080) in your browser.
```


## Json file location  
* [myapp/src/app/json.js](myapp/src/app/json.js)

## JSON Guidelines -:

### Each employee detail must contain unique "id".
* "id"
    * **Compulsary field (Must be Unique for each employee)**
* "name"
	* Optional
* "teamName"
	* Optional
* "designation"
	* Optional
* "children"
	* If no children then give an empty array [ ];
	
## Sample data -: 
