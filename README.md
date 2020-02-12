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
```bash
> Server running at 3000
> MongoDB connected.
```
The server is now live at <http://localhost:3000>

***

The api can be accessed at `/api`
Currently, there are two sets of endpoints. `/users` & `/data`

### `/users`

#### GET

* ##### `/create`
    * Required package                
        ```json
        {
            "name" : String,
            "email" : String,
            "code" : String
        }
        ```

    * Responses
        * Success             
            ```json
            {
                "user" : Object,
                "pass" : Number
            }
            ```
        * Fail
            ```json
            {
                "Error": String
            }
            ```

* #### `/signin`
    * Required package   
        ```json
        {
            "code" : String,
            "pass" : String
        }
        ```

    * Responses
        * Success
            ```json
            {
                "success" : "Authorized",
                "token" : Object
            }
            ```
        * Fail
            ```json
            {
                "Error": String
            }
            ```

* #### `/signout`
    * Required package
      ```json
        {
            "token" : Object
        }
        ```

    * Responses
        * Success 
          ```json
          {
              "success" : "signed out"
          }
          ```
        * Fail
          ```json
          {
              "Error": String
          }
          ```

#### POST

* #### `/confirm-email`
    * Required package         
        ```json
        {
            "token" : Object,
            "emailPin" : Number
        }
        ```

    * Responses
        * Success       
            ```json
            {
                "Error" : null
            }
            ```
        * Fail 
            ```json
            {
                "Error": String
            }
            ```

* #### `/resend-confirmation-email`
    * Required package
        ```json
        {
            "token" : Object,
            "name" : String,
            "email" : String,
            "emailPin" : Number
        }
        ```

    * Responses
        * Success
            ```json
            {
                "Error" : null
            }
            ```
        * Fail
            ```json
            {
                "Error": String
            }
            ```

#### PATCH

* #### `/email`
    * Required package
        ```json
        {
            "token" : Object,
            "email" : String
        }
        ```

    * Responses
        * Success
            ```json
            {
                "Error" : null
            }
            ```
        * Fail
            ```json
            {
                "Error": String
            }
            ```

* #### `/reset-password`
    * Required package
        ```json
        {
            "token" : Object
        }
        ```

    * Responses
        * Success
            ```json
            {
                "Error" : null
            }
            ```
        * Fail
            ```json
            {
                "Error": String
            }
            ```

### `/data`

#### POST

* #### `/get`
    * Required package
        ```json
        {
            "token" : Object
        }
        ```

    * Responses
        * Success
            ```json
            {
                "docs" : Object
            }
            ```
        * Fail
            ```json
            {
                "Error": String
            }
            ```

* #### `/get-settings`
    * Required package
        ```json
        {
            "token" : Object
        }
        ```

    * Responses
        * Success
            ```json
            {
                "Error" : null,
                "data" : {
                    "notification" : Boolean,
                    "timer" : Number
                }
            }
            ```
        * Fail
            ```json
            {
                "Error": String
            }
            ```
      
#### PATCH

* #### `/sync-settings`
    * Required package
        ```json
        {
            "token" : Object,
            "notification" : Boolean,
            "timer" : Number
        }
        ```

    * Responses
        * Success
            ```json
            {
                "Error" : null
            }
            ```
        * Fail
            ```json
            {
                "Error": String
            }
            ```
## License
[MIT](https://github.com/exceptionalism/ku-connect/blob/master/LICENSE)