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
        ```js
        {
            "name" : String,
            "email" : String,
            "code" : String
        }
        ```

    * Responses
        * Success             
            ```js
            {
                "user" : Object,
                "pass" : Number
            }
            ```
        * Fail
            ```js
            {
                "Error": String
            }
            ```

* #### `/signin`
    * Required package   
        ```js
        {
            "code" : String,
            "pass" : String
        }
        ```

    * Responses
        * Success
            ```js
            {
                "success" : "Authorized",
                "token" : Object
            }
            ```
        * Fail
            ```js
            {
                "Error": String
            }
            ```

* #### `/signout`
    * Required package
      ```js
        {
            "token" : Object
        }
        ```

    * Responses
        * Success 
          ```js
          {
              "success" : "signed out"
          }
          ```
        * Fail
          ```js
          {
              "Error": String
          }
          ```

#### POST

* #### `/confirm-email`
    * Required package         
        ```js
        {
            "token" : Object,
            "emailPin" : Number
        }
        ```

    * Responses
        * Success       
            ```js
            {
                "Error" : null
            }
            ```
        * Fail 
            ```js
            {
                "Error": String
            }
            ```

* #### `/resend-confirmation-email`
    * Required package
        ```js
        {
            "token" : Object,
            "name" : String,
            "email" : String,
            "emailPin" : Number
        }
        ```

    * Responses
        * Success
            ```js
            {
                "Error" : null
            }
            ```
        * Fail
            ```js
            {
                "Error": String
            }
            ```

#### PATCH

* #### `/email`
    * Required package
        ```js
        {
            "token" : Object,
            "email" : String
        }
        ```

    * Responses
        * Success
            ```js
            {
                "Error" : null
            }
            ```
        * Fail
            ```js
            {
                "Error": String
            }
            ```

* #### `/reset-password`
    * Required package
        ```js
        {
            "token" : Object
        }
        ```

    * Responses
        * Success
            ```js
            {
                "Error" : null
            }
            ```
        * Fail
            ```js
            {
                "Error": String
            }
            ```

### `/data`

#### POST

* #### `/get`
    * Required package
        ```js
        {
            "token" : Object
        }
        ```

    * Responses
        * Success
            ```js
            {
                "docs" : Object
            }
            ```
        * Fail
            ```js
            {
                "Error": String
            }
            ```

* #### `/get-settings`
    * Required package
        ```js
        {
            "token" : Object
        }
        ```

    * Responses
        * Success
            ```js
            {
                "Error" : null,
                "data" : {
                    "notification" : Boolean,
                    "timer" : Number
                }
            }
            ```
        * Fail
            ```js
            {
                "Error": String
            }
            ```
      
#### PATCH

* #### `/sync-settings`
    * Required package
        ```js
        {
            "token" : Object,
            "notification" : Boolean,
            "timer" : Number
        }
        ```

    * Responses
        * Success
            ```js
            {
                "Error" : null
            }
            ```
        * Fail
            ```js
            {
                "Error": String
            }
            ```
## License
[MIT](https://github.com/exceptionalism/ku-connect/blob/master/LICENSE)