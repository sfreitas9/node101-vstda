# NODE101 VSTDA

## To install
```
npm install
```
---
## To run
```
npm start
```
Then go to your browser or use Postman:
- http://localhost:8484
    - return amount of time server has been running (in milliseconds)
- http://localhost:8484/api/TodoItems/
    - list all the To Do items
- http://localhost:8484/api/TodoItems/#
    - display To Do item with id=# (e.g., 0, 1, or 2 for test data)    
- You can also post a new item
- You can also delete an existing item
- http://localhost:8484/api/TodoItems/Completed
    - display completed To Do items (e.g., 2 for test data)
- http://localhost:8484/api/TodoItems/NotCompleted
    - display uncompleted To Do items (e.g., 0 & 1 for test data)

Errors are logged to log.csv for invalid POST data or 404 errors
---
## To test, in separate terminals run:
```
npm start
npm test
```