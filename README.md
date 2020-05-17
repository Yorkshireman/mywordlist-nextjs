## Description
The frontend for MyWordlist, built using NextJS, backed by:
* Authentication server - currently https://github.com/Yorkshireman/authentication-server, in development
* Resources server - currently https://github.com/Yorkshireman/my_wordlist_resources, in development

A Staging deployment can be found at https://infinite-fortress-83857.herokuapp.com. Test login `test1@test.com` / `password` can be used.

## Running locally
* Create a local `.env` file containing the following Staging endpoints:
```
AUTHENTICATION_SERVER_BASE_URL=https://mysterious-tundra-28425.herokuapp.com
RESOURCES_SERVER_BASE_URL=https://my-wordlist-resources-stage.herokuapp.com
```
* Start the local server with `npm run dev`  
* Navigate to `http://localhost:3000`  
