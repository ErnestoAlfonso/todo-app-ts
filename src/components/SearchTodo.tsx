import { useState } from "react"
import { TodoTitle } from "../types"


interface Props {
    queryTodo: ({ taskMessage }: TodoTitle) => void
}


export const SearchTodo: React.FC<Props> = ({ queryTodo }) => {
    const [inputValue, setInputValue] = useState('')

    const handleSubmit = (event: React.FormEvent<HTMLInputElement>): void => {
        event.preventDefault()
        queryTodo({ taskMessage: inputValue })
    }

    return (
        <form onSubmit={handleSubmit}>

            <input
                className="new-todo"
                value={inputValue}
                onChange={(e) => { setInputValue(e.target.value) }}
                onKeyDown={() => { }}
                placeholder="Search for tasks"
                autoFocus
            />
        </form>
    )
}