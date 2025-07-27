import { useEffect, useState } from "react";
import "./index.css";

function App() {
  const [todos, setTodos] = useState([]);
  const [task, setTask] = useState("");

  useEffect(() => {
    const getTodos = async () => {
      const response = await fetch(`http://localhost:5000/api/todos`, {
        method: "GET",
      });
      const todos = await response.json();
      setTodos(todos);
    };

    getTodos();
  }, []);

  const createTodo = async (e) => {
    e.preventDefault();

    // Log backend URL to check if env variable is set
    console.log("Creating todo at:", `${process.env.REACT_APP_BACKEND_URL}/api/todos`);

    const response = await fetch('http://localhost:5000/api/todos', {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ task }),
    });
    
    if (!response.ok) {
      console.error("Failed to create todo");
      return;
    }

    const newTodo = await response.json();
    setTodos([...todos, newTodo]);
    setTask(""); // Clear input field after adding todo
  };

  const deleteTodo = async (todoId) => {
    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/api/todos/${todoId}`, // fixed typo in BACKEND_URL
      {
        method: "DELETE",
      }
    );

    if (!response.ok) return;

    setTodos((prev) => prev.filter((todo) => todo._id !== todoId));
  };

  return (
    <div className="container">
      <h1 className="title">Task Manager</h1>

      {/* Attach onSubmit handler to form, NOT to button */}
      <form className="form" onSubmit={createTodo}>
        <input
          type="text"
          className="form_input"
          placeholder="Add a new Todo..."
          required
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />

        <button type="submit" className="todo_add_button">
          Create Todo
        </button>
      </form>

      <div>
        {todos.length > 0 ? (
          todos.map((todo) => (
            // Use _id as key since backend likely provides _id
            <div className="todos" key={todo._id}>
              <p>{todo.task}</p>
              <p>{todo.status ? "Completed" : "Pending"}</p>
              <button onClick={() => deleteTodo(todo._id)}>delete</button>
            </div>
          ))
        ) : (
          <div>
            <p>No todos found</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
