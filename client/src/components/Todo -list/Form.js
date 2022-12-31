import React from 'react'
import Cookies from 'js-cookie'
function Form({ input, setInput, category, setCategory }) {
    const jwt = Cookies.get('jwt')
    let apiUrl = "http://localhost:5000/api";
    if (process.env.NODE_ENV === "production") {
        apiUrl = '/api'
    }
    const onInputChange = (event) => {
        setInput(event.target.value)
    }

    const onCategoryChange = (event) => {
        setCategory(event.target.value)
    }

    const onFormSubmit = (event) => {
        event.preventDefault()
        var myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${jwt}`);
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            "description": input,
            "category": category
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch(`${apiUrl}/tasks`, requestOptions)
            .then(response => response.text())
            .then(result => console.log(result))
            .catch(error => console.log('error', error));


        setInput("")
        setCategory("")
    }
    return (
        <div className='formInput'>
            <form onSubmit={onFormSubmit}>
                <input type="text" placeholder="Enter a Task" className="task-input" value={input} required onChange={onInputChange} />
                <input type="text" placeholder="Enter Category" className="task-input" value={category} required onChange={onCategoryChange} />
                <button className="button-add" type="submit">add</button>
            </form>
        </div>
    )
}

export default Form