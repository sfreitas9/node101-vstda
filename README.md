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
    - should return {"status":"ok"}
- http://localhost:8484/api/TodoItems/
    - should list all the To Do items
- http://localhost:8484/api/TodoItems/#
    - should display To Do item with id=# (e.g., 0, 1, or 2 for test data)
- You can also post a new item
- You can also delete an existing item
---
## To test, in separate terminals run:
```
npm start
npm test
```