import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { apiUrl } from '../../api/Api.js'
function TodoList({ todos, setTodos }) {
    const jwt = Cookies.get('jwt');

    const [editing, setEditing] = useState(false);
    const [currentTodo, setCurrentTodo] = useState(null);
    const [categories, setCategories] = useState(null)
    const navigate = useNavigate();
    useEffect(() => {
        if (!jwt) {
            navigate("/")
        }
    }, [jwt, navigate])

    useEffect(() => {
        const myHeaders = new Headers();
        myHeaders.append('Authorization', `Bearer ${jwt}`);

        const requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow',
        };

        fetch(`${apiUrl}/tasks`, requestOptions)
            .then((response) => response.text())
            .then((result) => {
                setTodos((prev) => JSON.parse(result));
            })
            .catch((error) => console.log('error', error));
    },[apiUrl,jwt,setTodos]);

    const handleDelete = ({ _id }) => {
        const myHeaders = new Headers();
        myHeaders.append('Authorization', `Bearer ${jwt}`);

        const requestOptions = {
            method: 'DELETE',
            headers: myHeaders,
            redirect: 'follow',
        };

        fetch(`${apiUrl}/tasks/${_id}`, requestOptions)
            .then((response) =>window.location.reload(false))
            .catch((error) => console.log('error', error));
    };

    const handleComplete = (todo) => {
        console.log(todo);
        const myHeaders = new Headers();
        myHeaders.append('Authorization', `Bearer ${jwt}`);
        myHeaders.append('Content-Type', 'application/json');

        const raw = JSON.stringify({
            completed: !todo.completed,
        });

        const requestOptions = {
            method: 'PATCH',
            headers: myHeaders,
            body: raw,
            redirect: 'follow',
        };

        fetch(`${apiUrl}/tasks/${todo._id}`, requestOptions)
            .then((response) => response.text())
            .then((result) => window.location.reload(false))
            .catch((error) => console.log('error', error));
    };

    const handleEdit = (todo) => {
        setEditing(true);
        setCurrentTodo({
            id: todo._id,
            description: todo.description,
            category: todo.category,
        });
        console.log(editing);
        console.log(currentTodo);
    };

    const handleTodoConfirm = () => {
        const myHeaders = new Headers();
        myHeaders.append('Authorization', `Bearer ${jwt}`);
        myHeaders.append('Content-Type', 'application/json');

        const raw = JSON.stringify({
            description: currentTodo.description,
            category: currentTodo.category,
        });

        const requestOptions = {
            method: 'PATCH',
            headers: myHeaders,
            body: raw,
            redirect: 'follow',
        };

        fetch(`${apiUrl}/tasks/${currentTodo.id}`, requestOptions)
            .then((response) => response.text())
            .then(() => {
                setEditing(false);
                setCurrentTodo(null);
                window.location.reload(false);
            })
            .catch((error) => console.log('error', error));
    };

    const handleTodoCancel = () => {
        setEditing(false);
        setCurrentTodo(null);
    };

    useEffect(() => {
        let constList = ["4 months to go","3 months to go","2 months to go","1 months to go","1 week to go","Wedding Day"]
        constList.push(...(todos.map(task => task.category)))
        const unique = [...new Set(constList)];
        setCategories(unique)
    }, [todos])


    return (
        <div className='ListDiv'>

            {categories&&categories.map((category)=>{
                let filteredTodos = todos.filter(task=> task.category===category)
                return (<div>
                <h2>{category}</h2>
                {filteredTodos.map((todo)=>{
                    return (
                        <li
                        className={todo.completed ? 'list-item complete' : 'list-item'}
                        key={todo.id}
                    >
                        {(editing&&currentTodo.id===todo._id) ? (
                            <>
                                <input
                                    type='text'
                                    className='edit-list'
                                    value={currentTodo.description}
                                    onChange={(e) =>
                                        setCurrentTodo({
                                            ...currentTodo,
                                            description: e.target.value,
                                        })
                                    }
                                />
                                <input
                                    type='text'
                                    className='edit-list'
                                    value={currentTodo.category}
                                    onChange={(e) =>
                                        setCurrentTodo({
                                            ...currentTodo,
                                            category: e.target.value,
                                        })
                                    }
                                />
                                <div className='editButtons'>
                                    <button
                                        className='button-confirm task-button'
                                        onClick={handleTodoConfirm}
                                    >
                                        <i class="fa fa-check"></i>
                                    </button>
                                    <button
                                        className='button-cancel task-button'
                                        onClick={handleTodoCancel}
                                    >
                                        <i class="fa fa-times-circle"></i>
                                    </button>
                                </div>
                            </>
                        ) : (
                            <>
                                <input
                                    type='text'
                                    value={todo.description}
                                    className='list'
                                    onChange={(e) => e.preventDefault()}
                                />
                                {/* <input
                                    type='text'
                                    value={todo.category}
                                    className='list'
                                    onChange={(e) => e.preventDefault()}
                                /> */}
                                <div>
                                    <button
                                        className='button-complete task-button'
                                        onClick={() => handleComplete(todo)}
                                    >
                                        <i className='fa fa-check-circle'></i>
                                    </button>
                                    <button
                                        className='button-edit task-button'
                                        onClick={() => handleEdit(todo)}
                                    >
                                        <i className='fa fa-edit'></i>
                                    </button>
                                    <button
                                        className='button-delete task-button'
                                        onClick={() => handleDelete(todo)}
                                    >
                                        <i className='fa fa-trash'></i>
                                    </button>
                                </div>
                            </>
                        )}
                    </li>
                    )
                })}
                </div>)
            })}
            {/* {todos.length !== 0 &&
                todos.map((todo, i) => {
                    //    console.log(todos[i].category); 
                    return (

                        <li
                            className={todo.completed ? 'list-item complete' : 'list-item'}
                            key={todo.id}
                        >
                            {editing ? (
                                <>
                                    <input
                                        type='text'
                                        className='edit-list'
                                        value={currentTodo.description}
                                        onChange={(e) =>
                                            setCurrentTodo({
                                                ...currentTodo,
                                                description: e.target.value,
                                            })
                                        }
                                    />
                                    <input
                                        type='text'
                                        className='edit-list'
                                        value={currentTodo.category}
                                        onChange={(e) =>
                                            setCurrentTodo({
                                                ...currentTodo,
                                                category: e.target.value,
                                            })
                                        }
                                    />
                                    <div>
                                        <button
                                            className='button-confirm task-button'
                                            onClick={handleTodoConfirm}
                                        >
                                            <i class="fa fa-check"></i>
                                        </button>
                                        <button
                                            className='button-cancel task-button'
                                            onClick={handleTodoCancel}
                                        >
                                            <i class="fa fa-times-circle"></i>
                                        </button>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <input
                                        type='text'
                                        value={todo.description}
                                        className='list'
                                        onChange={(e) => e.preventDefault()}
                                    />
                                    <input
                                        type='text'
                                        value={todo.category}
                                        className='list'
                                        onChange={(e) => e.preventDefault()}
                                    />
                                    <div>
                                        <button
                                            className='button-complete task-button'
                                            onClick={() => handleComplete(todo)}
                                        >
                                            <i className='fa fa-check-circle'></i>
                                        </button>
                                        <button
                                            className='button-edit task-button'
                                            onClick={() => handleEdit(todo)}
                                        >
                                            <i className='fa fa-edit'></i>
                                        </button>
                                        <button
                                            className='button-delete task-button'
                                            onClick={() => handleDelete(todo)}
                                        >
                                            <i className='fa fa-trash'></i>
                                        </button>
                                    </div>
                                </>
                            )}
                        </li> */}
                    {/* ); */}
                {/* })} */}
        </div>
    );
}

export default TodoList;