import { useState } from "react"
import { type Todo as TodoType,type TodoId, type ListOfTodos } from "../types"
import { Todo } from "./Todo"


interface Props{
    todo:ListOfTodos
    onToggleCompletedTodo: ({id,completed}:  Pick<TodoType, 'id' | 'completed'>) => void
    onRemoveTodo: ({ id }: TodoId) => void
    setTitle: ({ id, taskMessage }: Pick<TodoType, 'id' | 'taskMessage'>) => void
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
                    taskMessage={todo.taskMessage}
                        completed={todo.completed}
                        creationDateTime={todo.creationDateTime}
                        finishDate={todo.finishDate }
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