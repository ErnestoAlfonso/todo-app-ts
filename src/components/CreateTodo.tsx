import React, { useState } from "react"
import { type TodoTitle } from "../types"

interface Props {
    saveTodo: ({ taskMessage }: TodoTitle) => void
}


export const CreateTodo : React.FC<Props> = ({saveTodo}) => {
    const [inputValue, setInputValue] = useState('')
    
    const handleSubmit = (event: React.FormEvent<HTMLInputElement>): void => {
        event.preventDefault()
        saveTodo({ taskMessage: inputValue})
        setInputValue('')
    }
    
    return(
        <form onSubmit={handleSubmit}>

            <input
                className="new-todo"
                value= {inputValue}
                onChange={(e)=>{setInputValue(e.target.value)}}
                onKeyDown={() => {}}
                placeholder = "What do you want to do?"
                autoFocus
                />
        </form>
    )
}