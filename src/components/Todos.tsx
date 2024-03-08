import { useState } from "react"
import { type Todo as TodoType,type TodoId, type ListOfTodos } from "../types"
import { Todo } from "./Todo"


interface Props{
    todo:ListOfTodos
    onToggleCompletedTodo: ({id,completed}:  Pick<TodoType, 'id' | 'completed'>) => void
    onRemoveTodo: ({id}:TodoId) => void
    setTitle: (params: Omit<TodoType, 'completed'>) => void
}
export const Todos: React.FC<Props> = ({todo, onRemoveTodo,onToggleCompletedTodo,setTitle}) => {

    const [isEditing, setIsEditing] = useState('')
    return(
        <ul className="todo-list">
            {todo.map(todo => (
                <li key={todo.id} 
                onDoubleClick={() => { setIsEditing(todo.id) }}
                className={`
                    ${todo.completed ? 'completed' : ''}
                    ${isEditing === todo.id ? 'editing' : ''}
                `}>
                    <Todo
                    key={todo.id}
                    id = {todo.id}
                    title={todo.title}
                    completed={todo.completed}
                    onToggleCompletedTodo={onToggleCompletedTodo}
                    setTitle={setTitle}
                    onRemoveTodo={onRemoveTodo}
                    isEditing={isEditing}
                    setIsEditing={setIsEditing}
                    />
                </li>
            ))}
        </ul>
    )
}