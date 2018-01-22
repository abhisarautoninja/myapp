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
	* **Compulsary field (If no children then give an empty array [ ])**

### Sample data  
```
+ Each object must have ("id","children") rest other keys are optional.
- All the "id" values must be unique.
```
```
[{
    "id": "e1",
    "name": "Dyal Joshi",
    "teamName": "Tech",
    "designation": "Engg.(access 1)",
    "children": [{
        "id": "e11",
        "name": "Savyaschin Upasani",
        "teamName": "Tech",
        "designation": "Engg.(access 11)",
        "children": [{
            "id": "e111",
            "name": "Chakravarti Nambisan",
            "teamName": "Tech",
            "designation": "Engg.(access 111)",
            "children": [{
                "id": "e1111",
                "name": "Lakshmana Kapadia",
                "teamName": "Tech",
                "designation": "Engg.(access 1111)",
                "children": []
            }]
        }]
    }, {
        "id": "e12",
        "name": "Dhuleep Dhavale",
        "teamName": "Tech",
        "designation": "Engg.(access 12)",
        "children": [{
            "id": "e121",
            "name": "Aryabhatta Pandey",
            "teamName": "Tech",
            "designation": "Engg.(access 111)",
            "children": [{
                "id": "e1211",
                "name": "Nakula Bhagat",
                "teamName": "Tech",
                "designation": "Engg.(access 1111)",
                "children": []
            }]
        }]
    }, {
        "id": "e13",
        "name": "Purshottama Nan",
        "teamName": "Tech",
        "designation": "Engg.(access 13)",
        "children": [{
            "id": "e131",
            "name": "Nakula Dvivedi",
            "teamName": "Tech",
            "designation": "Engg.(access 131)",
            "children": [{
                "id": "e1311",
                "name": "Dhule Vaknis",
                "teamName": "Tech",
                "designation": "Engg.(access 1311)",
                "children": []
            }]
        }, {
            "id": "e132",
            "name": "Salani Kapil",
            "teamName": "Tech",
            "designation": "Engg.(access 132)",
            "children": []
        }]
    }, {
        "id": "e14",
        "name": "Mamta Shree",
        "teamName": "Tech",
        "designation": "Engg.(access 14)",
        "children": [{
            "id": "e141",
            "name": "Rushpa Kamal",
            "teamName": "Tech",
            "designation": "Engg.(access 141)",
            "children": [{
                "id": "e1411",
                "name": "Sanskriti Ganapuli",
                "teamName": "Tech",
                "designation": "Engg.(access 1411)",
                "children": []
            }]
        }, {
            "id": "e142",
            "name": "Ambika Patvardhan",
            "teamName": "Tech",
            "designation": "Engg.(access 142)",
            "children": [{
                "id": "e1421",
                "name": "Versha Munshi",
                "teamName": "Tech",
                "designation": "Engg.(access 141)",
                "children": [{
                    "id": "e14211",
                    "name": "Kanwal Pande",
                    "teamName": "Tech",
                    "designation": "Engg.(access 1411)",
                    "children": []
                }]
            }]
        }]
    }, {
        "id": "e15",
        "name": "Ujwal Kashyap",
        "teamName": "Tech",
        "designation": "Engg.(access 15)",
        "children": []
    }, {
        "id": "e16",
        "name": "Sanghvi Kashyap",
        "teamName": "Tech",
        "designation": "Engg.(access 15)",
        "children": []
    }, {
        "id": "e17",
        "name": "Kalpit Singh",
        "teamName": "Tech",
        "designation": "Engg.(access 15)",
        "children": []
    }, {
        "id": "e18",
        "name": "Dayal Kashyap",
        "teamName": "Tech",
        "designation": "Engg.(access 15)",
        "children": [{
            "id": "e181",
            "name": "Ruchi Kata",
            "teamName": "Tech",
            "designation": "Engg.(access 1111)",
            "children": []
        }]
    }, {
        "id": "e19",
        "name": "Prerna Mishra",
        "teamName": "Tech",
        "designation": "Engg.(access 15)",
        "children": [{
            "id": "e191",
            "name": "Chitranjan Thakur",
            "teamName": "Tech",
            "designation": "Engg.(access 111)",
            "children": []
        }, {
            "id": "e192",
            "name": "Ibrahim Ganapuli",
            "teamName": "Tech",
            "designation": "Engg.(access 1111)",
            "children": [{
                "id": "e1921",
                "name": "Wasim Akram",
                "teamName": "Tech",
                "designation": "Engg.(access 1111)",
                "children": []
            }]
        }, {
            "id": "e193",
            "name": "Maharaj Kumar",
            "teamName": "Tech",
            "designation": "Engg.(access 111)",
            "children": [{
                "id": "e1931",
                "name": "Samuel Jackson",
                "teamName": "Tech",
                "designation": "Engg.(access 1111)",
                "children": []
            }]
        }, {
            "id": "e194",
            "name": "Aadil Prasad",
            "teamName": "Tech",
            "designation": "Engg.(access 1111)",
            "children": []
        }, {
            "id": "e195",
            "name": "Dhiraj Khan",
            "teamName": "Tech",
            "designation": "Engg.(access 111)",
            "children": []
        }, {
            "id": "e196",
            "name": "Deep Ram",
            "teamName": "Tech",
            "designation": "Engg.(access 1111)",
            "children": []
        }]
    }, {
        "id": "e16",
        "name": "Ashia Misra",
        "teamName": "Tech",
        "designation": "Engg.(access 16)",
        "children": [{
            "id": "e161",
            "name": "Aishwarya Thakur",
            "teamName": "Tech",
            "designation": "Engg.(access 111)",
            "children": [{
                "id": "e1611",
                "name": "Baibhav Ganapuli",
                "teamName": "Tech",
                "designation": "Engg.(access 1111)",
                "children": []
            }]
        }]
    }]
}, {
    "id": "e2",
    "name": "Saurabh Thakre",
    "teamName": "HR",
    "designation": "Head HR level 2",
    "children": [{
        "id": "e21",
        "name": "Dhani Devadhikar",
        "teamName": "HR",
        "designation": "Associate HR level 21",
        "children": [{
            "id": "e211",
            "name": "Dheeraj Jadhav",
            "teamName": "HR",
            "designation": "Junior HR level 21",
            "children": []
        }]
    }]
}, {
    "id": "e3",
    "name": "Ashutosh Divekar",
    "teamName": "Operations",
    "designation": "Senior Consultant level 3",
    "children": [{
        "id": "e31",
        "name": "Patanjali Seth",
        "teamName": "Operations",
        "designation": "Consultant level 31",
        "children": [{
            "id": "e311",
            "name": "Anguri Devadhikar",
            "teamName": "Operations",
            "designation": "Asst. Consultant level 311",
            "children": []
        }]
    }, {
        "id": "e32",
        "name": "Shackcham Vaknis",
        "teamName": "Operations",
        "designation": "Consultant level 32",
        "children": [{
            "id": "e321",
            "name": "Govind Sirasikar",
            "teamName": "Operations",
            "designation": "Asst. Consultant level 321",
            "children": []
        }]
    }, {
        "id": "e33",
        "name": "Bhrigu Sanyal",
        "teamName": "Operations",
        "designation": "Consultant level 33",
        "children": [{
            "id": "e331",
            "name": "Krishnaa Gazdar",
            "teamName": "Operations",
            "designation": "Asst. Consultant level 331",
            "children": []
        }]
    }]
}];
```

