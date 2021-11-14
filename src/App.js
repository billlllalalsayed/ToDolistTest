import React from "react";
import "./App.css";
import {Button} from '@material-ui/core';
import { Card, Form } from 'react-bootstrap';
import Weather from "./components/weather";
import { render } from '@testing-library/react';
function Todo({ todo, index, markTodo, removeTodo,editTodo }) {
  return (
    <div
      className="todo"
      
    >
      <span style={{ textDecoration: todo.isDone ? "line-through" : "" }}>{todo.text}</span>
      <div>
      <Button variant="contained" color="primary" onClick={() => markTodo(index)}>Submit</Button>{' '}
      <Button variant="contained" color="default" onClick={() => editTodo(index)}>edit</Button>{' '}
      <Button variant="contained" color="secondary" onClick={() => removeTodo(index)}>Delete</Button>{' '}
      </div>
    </div>
  );
}

function FormTodo({ addTodo }) {
  const [value, setValue] = React.useState("");

  const handleSubmit = e => {
    e.preventDefault();
    if (!value) return;
    addTodo(value);
    setValue("");
  };

  return (
    <Form onSubmit={handleSubmit}> 
    <Form.Group>
      <Form.Label><b>Add Todo</b></Form.Label>
      <Form.Control type="text" className="input" value={value} onChange={e => setValue(e.target.value)} placeholder="Add new todo" />
    </Form.Group>
    <Button variant="contained" color="primary" type="submit">
      Add
    </Button>{' '}
    <Button variant="contained" color="primary" onClick={() => <Weather/>}>Check Weather</Button>{' '}
  </Form>
  );
} 
function App() {
  const [todos, setTodos] = React.useState([
    {
      text: "Unifi React Task",
    }
  ]);
  

  const addTodo = text => {
    const newTodos = [...todos, { text }];
    setTodos(newTodos);
  };

  const markTodo = index => {
    const newTodos = [...todos];
    newTodos[index].isDone = true;
    setTodos(newTodos);
  };

  const editTodo = index => {
    const newTodos = [...todos];
    newTodos[index].isDone = false;
    setTodos(newTodos);
  };
  const removeTodo = index => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  };

  return (
    <div className="app">
      <div className="container">
        <h1 className="text-center mb-4">Todo List</h1>
        <FormTodo addTodo={addTodo} />
        <div>
          {todos.map((todo, index) => (
            <Card>
              <Card.Body>
                <Todo
                key={index}
                index={index}
                todo={todo}
                markTodo={markTodo}
                editTodo={editTodo}
                removeTodo={removeTodo}
                weather={Weather}
                />
              </Card.Body>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
export default App;