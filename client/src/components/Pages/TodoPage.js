import React from 'react'
import { useState } from 'react'
import '../../style/TodoPage.css'
import Header from '../Todo -list/Header.js'
import Form from '../Todo -list/Form.js'
import TodoList from '../Todo -list/TodoList.js'

export default function TodoPage() {
    const [input,setInput]=useState("")
    const [todos,setTodos]=useState([])
    const [category,setCategory]=useState("")
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

