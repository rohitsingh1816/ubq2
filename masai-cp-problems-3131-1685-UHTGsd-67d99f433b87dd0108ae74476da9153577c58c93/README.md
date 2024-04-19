# Node + Mongo Todo CRUD Application

### Maximum Marks - 25

```
✅ able to submit app - 1 mark (minimum marks)
✅ should able to setup server - 2 marks
✅ should not create a todo if any field is missing - 3 marks
✅ should create a new todo - 3 marks
✅ should get all todos - 2 marks
✅ should get descending todos with query params - 2 marks
✅ should get ascending todos with query params - 2 marks
✅ should update a todo - 3 marks
✅ should get all pending todos - 2 marks
✅ should get all completed todos - 2 marks
✅ should delete a todo by ID - 3 marks
```

## Installation

- Use node version(LTS) should be `v16.16.0`
- Don't change/override package.json
- please make sure you do not push package-lock.json

```
- run `npm install --engine-strict` to install the node modules.

//Complete functions

// test locally
npm run test
`make sure when you test locally server is not running locally.`

```

### Todo Schema

- Todo schema should have title, description, status and createdAt
- use Date.now() as default value for createdAt(type = Date)
- default status should be `pending` (use enum ["pending", "completed"])

## Test Cases

- Create an express server in the index.js file and export it.
- `It will accept 4 different methods, GET, POST, PATCH, DELETE.`
- The server will have 5 routes.

```
GET - /
GET - /todos
POST- /todos/create
PATCH - /todos/:id
DELETE - /todos/:id
```

##### GET

- /

  - response `{ message: "Welcome to todo CRUD application" }"`
  - should return's JSON response with status code "200"

- /todos
  - should return todos JSON response with the status code "200".

```
{
   "todos": [
        {
            "_id": "643f81d254ed357b4db7af0f",
            "title": "learn Graph QL",
            "description": "GraphQL is an open-source data query language and data manipulation language for APIs, and a query runtime engine.",
            "status": "pending",
            "createdAt": "2023-04-19T05:53:22.765Z"
        }
    ]
}
```

- create sorting functionality to get todos in ascending and descending order
- use `sortBy = createdAt` and `order = asc or desc` as query params(http://localhost:8080/todos?sortBy=createdAt&order=asc or desc)
- also create functionality to get all pending and completed todos
- use `status = pending or completed` as query params(http://localhost:8080/todos?status=pending or completed)

##### POST

- post request body should have title and description
- if anything is missing from the title, todo, and tags it should throw an error with the status "400"
- to achieve the above functionality create a middleware for that
- error response - `{ message: "Title and Description are mandatory" }`
- if all fields are present should return's response with status code "201"
- response should look like

```
{
    "message": "Todo created successfully",
    "todo": {
        "title": "learn Graph QL",
        "description": "GraphQL is an open-source data query language and data manipulation language for APIs, and a query runtime engine.",
        "status": "pending",
        "_id": "643f81d254ed357b4db7af0f",
        "createdAt": "2023-04-19T05:53:22.765Z"
    }
}
```

##### PATCH

- you can mark the status as `completed` for todo using the patch request
- should return's response with status code "201"
- return response should be updated document
- response should look like

```
{
    "message": "Todo updated successfully",
    "todo": {
        "_id": "643f81d254ed357b4db7af0f",
        "title": "learn Graph QL",
        "description": "GraphQL is an open-source data query language and data manipulation language for APIs, and a query runtime engine.",
        "status": "completed",
        "createdAt": "2023-04-19T05:53:22.765Z"
    }
}
```

##### DELETE

- should return JSON response with status code "200"

```
{
    "message": "Todo deleted successfully
}
```

## Evaluation Criteria

- able to setup express server
- able to create routes for a todos application

## General guidelines

- The system on cp.masaischool.com may take between 1-20 minutes for responding,
- so we request you to read the problem carefully and debug it before itself
- we also request you not just submit it last minute
- try to keep one submission at a time
