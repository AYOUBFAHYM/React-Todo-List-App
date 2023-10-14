import React, { useState } from 'react'
import TodoForm from './TodoForm'
import Todo from './Todo'
import { v4 as uuidv4 } from 'uuid'
import '../App.css'
import EditTodoForm from './EditTodoForm'

uuidv4();

const TodoWarpper = () => {
    const [todos, setTodos] = useState([]);

    const addTodo = (todo) => {
        if (todo.trim() === '') return; // Check if 'todo' is an empty string
        setTodos([...todos, {
            id: uuidv4(),
            task: todo,
            completed: false,
            isEditing: false
        }])
        console.log(todos)
    }

    const toggleCompleted = id => {
        setTodos(todos.map(todo => todo.id === id ? {
            ...todo, completed: !todo.completed
        } : todo
        ))
    }

    const deleteTodo = id => {
        setTodos(todos.filter(todo => todo.id !== id))
    }

    const editTodo = id => {
        setTodos(todos.map(todo => todo.id === id ? {
            ...todo,
            isEditing: !todo.isEditing
        } : todo))
    }

    const editTask = (task, id) => {
        setTodos(todos.map(todo =>
            todo.id === id ? { ...todo, task, isEditing: false } : todo
        ));
    }


    return (
        <div className='TodoWrapper'>
            <h1>Get Thing Done!</h1>
            <TodoForm addTodo={addTodo} />
            {todos.map((todo) => (
                todo.isEditing ? (
                    <EditTodoForm editTodo={editTask} task={todo} />
                ) : (<Todo task={todo} key={todo.id}
                    toggleCompleted={toggleCompleted}
                    deleteTodo={deleteTodo}
                    editTodo={editTodo} />)
            )
            )})

        </div>
    )
}

export default TodoWarpper
