const Todo = require("../src/models/Todo");
const request = require("supertest");
const app = require("../src/index"); // assuming that the express app is exported from app.js

global.score = 1;

const mock = [
  {
    title: "Buy groceries",
    description:
      "Purchase fruits, vegetables, milk, bread, and eggs from the local grocery store.",
  },
  {
    title: "Finish report",
    description:
      "Complete the quarterly sales report and submit it to the manager for review.",
  },
  {
    title: "Clean the garage",
    description:
      "Organize and declutter the garage, and sweep the floor to keep it tidy.",
  },
  {
    title: "Call plumber",
    description:
      "Contact the local plumber to fix the leaking faucet in the kitchen.",
  },
  {
    title: "Exercise",
    description:
      "Go for a 45-minute jog in the park or do a workout session at the gym.",
  },
  {
    title: "Pay bills",
    description:
      "Pay the utility bills, credit card bills, and rent for the month.",
  },
];

const sortedTodosDesc = [
  {
    title: "Pay bills",
    description:
      "Pay the utility bills, credit card bills, and rent for the month.",
    status: "pending",
  },
  {
    title: "Exercise",
    description:
      "Go for a 45-minute jog in the park or do a workout session at the gym.",
    status: "pending",
  },
  {
    title: "Call plumber",
    description:
      "Contact the local plumber to fix the leaking faucet in the kitchen.",
    status: "pending",
  },
  {
    title: "Clean the garage",
    description:
      "Organize and declutter the garage, and sweep the floor to keep it tidy.",
    status: "pending",
  },
  {
    title: "Finish report",
    description:
      "Complete the quarterly sales report and submit it to the manager for review.",
    status: "pending",
  },
  {
    title: "Buy groceries",
    description:
      "Purchase fruits, vegetables, milk, bread, and eggs from the local grocery store.",
    status: "pending",
  },
];

const sortedTodosAsc = [
  {
    title: "Buy groceries",
    description:
      "Purchase fruits, vegetables, milk, bread, and eggs from the local grocery store.",
    status: "pending",
  },
  {
    title: "Finish report",
    description:
      "Complete the quarterly sales report and submit it to the manager for review.",
    status: "pending",
  },
  {
    title: "Clean the garage",
    description:
      "Organize and declutter the garage, and sweep the floor to keep it tidy.",
    status: "pending",
  },
  {
    title: "Call plumber",
    description:
      "Contact the local plumber to fix the leaking faucet in the kitchen.",
    status: "pending",
  },
  {
    title: "Exercise",
    description:
      "Go for a 45-minute jog in the park or do a workout session at the gym.",
    status: "pending",
  },
  {
    title: "Pay bills",
    description:
      "Pay the utility bills, credit card bills, and rent for the month.",
    status: "pending",
  },
];

describe("Todo API Endpoints", () => {
  it("should able to setup server", async () => {
    const response = await request(app).get("/");
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty(
      "message",
      "Welcome to todo CRUD application"
    );

    global.score += 2;
  }, 10000);

  it("should not create a todo if any field is missing", async () => {
    const response = await request(app)
      .post("/todos/create")
      .set("Content-Type", "application/json")
      .send({
        title: "hello world!",
      });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty(
      "message",
      "Title and Description are mandatory"
    );

    global.score += 3;
  }, 10000);

  it("should create a new todo", async () => {
    await Todo.deleteMany();
    const response = await request(app)
      .post("/todos/create")
      .set("Content-Type", "application/json")
      .send(mock[0]);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty(
      "message",
      "Todo created successfully"
    );

    expect(response.body.todo).toHaveProperty("_id");
    expect(response.body.todo).toHaveProperty("title", mock[0].title);
    expect(response.body.todo).toHaveProperty(
      "description",
      mock[0].description
    );
    expect(response.body.todo).toHaveProperty("status", "pending");

    global.score += 3;
  }, 10000);

  it("should get all todos", async () => {
    await Todo.deleteMany();

    for (let i = 0; i < mock.length; i++) {
      const response = await request(app)
        .post("/todos/create")
        .set("Content-Type", "application/json")
        .send(mock[i]);

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty(
        "message",
        "Todo created successfully"
      );

      expect(response.body.todo).toHaveProperty("_id");
      expect(response.body.todo).toHaveProperty("title", mock[i].title);
      expect(response.body.todo).toHaveProperty(
        "description",
        mock[i].description
      );
      expect(response.body.todo).toHaveProperty("status", "pending");
    }

    const getTodos = await request(app).get("/todos");

    expect(getTodos.body.todos.length).toBe(mock.length);

    global.score += 2;
  });

  it("should get descending todos with query params", async () => {
    const getSortedTodos = await request(app).get(
      "/todos?sortBy=createdAt&order=desc"
    );

    for (let i = 0; i < sortedTodosDesc.length; i++) {
      expect(sortedTodosDesc[i].title).toEqual(
        getSortedTodos.body.todos[i].title
      );
    }

    global.score += 2;
  });

  it("should get ascending todos with query params", async () => {
    const getSortedTodos = await request(app).get(
      "/todos?sortBy=createdAt&order=asc"
    );

    for (let i = 0; i < sortedTodosAsc.length; i++) {
      expect(sortedTodosAsc[i].title).toEqual(
        getSortedTodos.body.todos[i].title
      );
    }

    global.score += 2;
  });

  // Test update todo endpoint
  it("should update a todo", async () => {
    await Todo.deleteMany();

    const res = await request(app)
      .post("/todos/create")
      .set("Content-Type", "application/json")
      .send(mock[2]);

    const response = await request(app)
      .patch(`/todos/${res.body.todo._id}`)
      .send({ status: "completed" });
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty(
      "message",
      "Todo updated successfully"
    );
    expect(response.body.todo).toHaveProperty(
      "_id",
      res.body.todo._id.toString()
    );
    expect(response.body.todo).toHaveProperty("title", mock[2].title);
    expect(response.body.todo).toHaveProperty(
      "description",
      mock[2].description
    );
    expect(response.body.todo).toHaveProperty("status", "completed");

    global.score += 3;
  });

  it("should get all pending todos", async () => {
    await Todo.deleteMany();

    for (let i = 0; i < 4; i++) {
      const response = await request(app)
        .post("/todos/create")
        .set("Content-Type", "application/json")
        .send(mock[i]);

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty(
        "message",
        "Todo created successfully"
      );

      expect(response.body.todo).toHaveProperty("_id");
      expect(response.body.todo).toHaveProperty("title", mock[i].title);
      expect(response.body.todo).toHaveProperty(
        "description",
        mock[i].description
      );
      expect(response.body.todo).toHaveProperty("status", "pending");
    }

    const todos = await request(app).get("/todos");

    const response = await request(app)
      .patch(`/todos/${todos.body.todos[0]._id}`)
      .send({ status: "completed" });
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty(
      "message",
      "Todo updated successfully"
    );
    expect(response.body.todo).toHaveProperty("status", "completed");

    const getPendingTodos = await request(app).get("/todos?status=pending");

    expect(getPendingTodos.body.todos.length).toBe(3);

    global.score += 2;
  });

  it("should get all completed todos", async () => {
    await Todo.deleteMany();

    for (let i = 0; i < 4; i++) {
      const response = await request(app)
        .post("/todos/create")
        .set("Content-Type", "application/json")
        .send(mock[i]);

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty(
        "message",
        "Todo created successfully"
      );

      expect(response.body.todo).toHaveProperty("_id");
      expect(response.body.todo).toHaveProperty("title", mock[i].title);
      expect(response.body.todo).toHaveProperty(
        "description",
        mock[i].description
      );
      expect(response.body.todo).toHaveProperty("status", "pending");
    }

    const todos = await request(app).get("/todos");

    const response = await request(app)
      .patch(`/todos/${todos.body.todos[1]._id}`)
      .send({ status: "completed" });
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty(
      "message",
      "Todo updated successfully"
    );
    expect(response.body.todo).toHaveProperty("_id");
    expect(response.body.todo).toHaveProperty("title", mock[1].title);
    expect(response.body.todo).toHaveProperty(
      "description",
      mock[1].description
    );
    expect(response.body.todo).toHaveProperty("status", "completed");

    const getPendingTodos = await request(app).get("/todos?status=completed");
    expect(getPendingTodos.body.todos.length).toBe(1);
    expect(getPendingTodos.body.todos[0]).toHaveProperty("_id");
    expect(getPendingTodos.body.todos[0]).toHaveProperty(
      "title",
      mock[1].title
    );
    expect(getPendingTodos.body.todos[0]).toHaveProperty(
      "description",
      mock[1].description
    );

    global.score += 2;
  });

  // Test delete todo endpoint
  it("should delete a todo by ID", async () => {
    await Todo.deleteMany();

    const res = await request(app)
      .post("/todos/create")
      .set("Content-Type", "application/json")
      .send(mock[1]);

    const response = await request(app).delete(`/todos/${res.body.todo._id}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty(
      "message",
      "Todo deleted successfully"
    );

    const getTodos = await request(app).get("/todos");

    expect(getTodos.body.todos.length).toBe(0);

    global.score += 3;
  }, 10000);
}, 10000);

afterAll((done) => {
  done();
  console.log("Final Score is", global.score);
});
