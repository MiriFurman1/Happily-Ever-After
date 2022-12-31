import React, { useEffect } from 'react'
import Cookies from 'js-cookie'

function TodoList({ todos, setTodos }) {

    const jwt = Cookies.get('jwt')
    let apiUrl = "http://localhost:5000/api";
    if (process.env.NODE_ENV === "production") {
        apiUrl = '/api'
    }
    useEffect(() => {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${jwt}`);

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        fetch(`${apiUrl}/tasks`, requestOptions)
            .then(response => response.text())
            .then(result => {

                setTodos(prev => JSON.parse(result))
            }
            )
            .catch(error => console.log('error', error));
    })

    const handleDelete = ({ _id }) => {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${jwt}`)

        var requestOptions = {
            method: 'DELETE',
            headers: myHeaders,
            redirect: 'follow'
        };

        fetch(`${apiUrl}/tasks/${_id}`, requestOptions)
            .then(response => response.text())
            .catch(error => console.log('error', error));
    }

    const handleComplete = (todo) => {
        console.log(todo);
        var myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${jwt}`)
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            "completed": !todo.completed
        });

        var requestOptions = {
            method: 'PATCH',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch(`${apiUrl}/tasks/${todo._id}`, requestOptions)
            .then(response => response.text())
            .then(result => console.log(result))
            .catch(error => console.log('error', error));
    }

    return (
        <div>
            <div className='Headlines'>
                <p className="list"> Task </p>
                <p className="list"> Category</p>
            </div>
            {todos.length !== 0 && todos.map((todo) => {
                return (
                    <li className={todo.completed ? 'list-item complete' : 'list-item'} key={todo.id}>
                        <input type="text" value={todo.description} className="list" onChange={(e) => e.preventDefault()} />
                        <input type="text" value={todo.category} className="list" onChange={(e) => e.preventDefault()} />
                        <div>
                            <button className='button-complete task-button' onClick={() => handleComplete(todo)}>
                                <i className='fa fa-check-circle'></i>
                            </button>
                            <button className='button-edit task-button'>
                                <i className='fa fa-edit'></i>
                            </button>
                            <button className='button-delete task-button' onClick={() => handleDelete(todo)}>
                                <i className='fa fa-trash'></i>
                            </button>
                        </div>
                    </li>
                )
            })}
        </div>
    )
}

export default TodoList