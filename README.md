# KU-Connect Server API

The API is built with NodeJs.

Make sure you have [NodeJs](https://nodejs.org) installed on your system.

## Installation

To install the necessary packages for the api, execute the following command in the terminal.
```bash
$ npm install
```

Likewise, the following command will start the project in development mode.
```bash
$ npm run dev
```

You can also directly start the development server with NodeJs
```bash
$ node api
```

You should get the following prompts.
```terminal
Server running at  3000
MongoDB connected.
```
The server is now live at [http://localhost:3000](http://localhost:3000)

***

The api can be accessed at `/api`
Currently, there are two sets of endpoints. `/users` & `/data`

### `/users`

#### GET

* ##### `/create`
    * Required package
                
                {
                    "name" : String,
                    "email" : String,
                    "code" : String
                }

    * Responses
        * Success

                {
                    "user" : Object,
                    "pass" : Number
                }
        * Fail

                {
                    "Error": String
                }

* #### `/signin`
    * Required package
                
                {
                    "code" : String,
                    "pass" : String
                }

    * Responses
        * Success

                {
                    "success" : "Authorized",
                    "token" : Object
                }
        * Fail

                {
                    "Error": String
                }

* #### `/signout`
    * Required package
                
                {
                    "token" : Object
                }

    * Responses
        * Success

                {
                    "success" : "signed out"
                }
        * Fail

                {
                    "Error": String
                }

#### POST

* #### `/confirm-email`
    * Required package
                
                {
                    "token" : Object,
                    "emailPin" : Number
                }

    * Responses
        * Success

                {
                    "Error" : null
                }
        * Fail

                {
                    "Error": String
                }

* #### `/resend-confirmation-email`
    * Required package
                
                {
                    "token" : Object,
                    "name" : String,
                    "email" : String,
                    "emailPin" : Number
                }

    * Responses
        * Success

                {
                    "Error" : null
                }
        * Fail

                {
                    "Error": String
                }

#### PATCH

* #### `/email`
    * Required package
                
                {
                    "token" : Object,
                    "email" : String
                }

    * Responses
        * Success

                {
                    "Error" : null
                }
        * Fail

                {
                    "Error": String
                }

* #### `/reset-password`
    * Required package
                
                {
                    "token" : Object
                }

    * Responses
        * Success

                {
                    "Error" : null
                }
        * Fail

                {
                    "Error": String
                }

### `/data`

#### POST

  * ##### `/get`
      * Required package
                  
                  {
                      "token" : Object
                  }

      * Responses
          * Success

                  {
                      "docs" : Object
                  }
          * Fail

                  {
                      "Error": String
                  }

* #### `/get-settings`
    * Required package
                
                {
                    "token" : Object
                }

    * Responses
        * Success

                {
                    "Error" : null,
                    "data" : {
                        "notification" : Boolean,
                        "timer" : Number
                    }
                }
        * Fail

                {
                    "Error": String
                }
      
#### PATCH

* #### `/sync-settings`
    * Required package
                
                {
                    "token" : Object,
                    "notification" : Boolean,
                    "timer" : Number
                }

    * Responses
        * Success

                {
                    "Error" : null
                }
        * Fail

                {
                    "Error": String
                }


## License
[MIT](https://github.com/exceptionalism/ku-connect/blob/master/LICENSE)