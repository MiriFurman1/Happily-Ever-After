import React from 'react'
import { useState ,useEffect} from 'react'
import '../../style/TodoPage.css'
import Header from '../Todo -list/Header.js'
import Form from '../Todo -list/Form.js'
import TodoList from '../Todo -list/TodoList.js'
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

export default function TodoPage() {
    const [input,setInput]=useState("")
    const [todos,setTodos]=useState([])
    const [category,setCategory]=useState("")
    const navigate = useNavigate();
    const [jwt] = useState(Cookies.get('jwt'));

    useEffect(() => {
        if (!jwt) {
            navigate("/")
        }
    }, [jwt, navigate])
    
    return (
        <div className='container'>
            <div className='app-wrapper'>
                <div>
                    <Header />

                </div>
                <div>
                    <Form input={input} setInput={setInput} category={category} setCategory={setCategory}/>
                </div>
                <div>
                    <TodoList todos={todos} setTodos={setTodos}/>
                </div>
            </div>
        </div>
    )
}

