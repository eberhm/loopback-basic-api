# Comments API Example #

## Running it

* clone the repo
* npm install
* docker-compose -up

It has already a running instance of mongo

In your favourite browser. Go to:

http://localhost:3000/explorer/ 

## Getting the swagger.json file
In your favourite browser. Go to:

http://localhost:3000/explorer/swagger.json

With this file and the swagger code generator you can create clients for many different programming languages. For more info see:

https://swagger.io/swagger-codegen/  


## Notes

* It has no scalable strategy for searching. That should be done in an elasticsearch and expose it via remote method
* If you're using docker-machine in mac, your url should be http://192.168.99.100:3000/explorer/ 
