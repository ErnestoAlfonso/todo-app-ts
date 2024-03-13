import {useEffect, useRef, useState} from "react";
import { type TodoId, type Todo as TodoType } from "../types";



interface Props extends TodoType{
    onToggleCompletedTodo: ({id}:  Pick<TodoType, 'id'>) => void
    onRemoveTodo: ({id}:TodoId) => void
    setTitle: (params: { id: string, taskMessage: string }) => void
    isEditing: string
    setIsEditing: (completed: string) => void
}


export const Todo: React.FC<Props> = ({ id, taskMessage, completed, creationDateTime, finishDate, onRemoveTodo, onToggleCompletedTodo, setTitle, isEditing, setIsEditing }) => {
    const c = creationDateTime
    const f = finishDate


    async function handleChangeCheckBox()
    {
        if (!completed) {
            onToggleCompletedTodo({
                id
            });
        }
    }
    const [isShown, setIsShown] = useState(false);
    const [editedTitle, setEditedTitle] = useState(taskMessage)
    const inputEditTitle = useRef<HTMLInputElement>(null)

    const handleKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
        if(!completed){
            if (e.key === 'Enter') {
                setEditedTitle(editedTitle.trim())
        
                if (editedTitle !== taskMessage) {
                    setTitle({ id, taskMessage: editedTitle })
                }
        
                
            
                setIsEditing('')
            }
            
            if (e.key === 'Escape') {
                setEditedTitle(taskMessage)
                setIsEditing('')
            }
        }
    }
    
    useEffect(() => {
        inputEditTitle.current?.focus()
        }, [isEditing])


    return (
        <>
            <div className="view" onMouseEnter={() => setIsShown(true)}
                onMouseLeave={() => setIsShown(false)} >
                <input
                    className="toggle"
                    checked={completed}
                    type="checkbox"
                    onChange={() => {
                        const confirmacion = window.confirm('¿Estás seguro de que quieres realizar esta acción?');
                        if (confirmacion) {
                             handleChangeCheckBox()
                     
                        }
                    }}
                />
                <label>{taskMessage}</label>

                <button
                    className="destroy"
                    onClick={() => {
                        const confirmacion = window.confirm('¿Estás seguro de que quieres realizar esta acción?');
                        if (confirmacion) {
                            // Acción confirmada
                            onRemoveTodo({ id });
                        }
                    }}
                />
                {isShown && (
                    <span className="span" >
                        {c}
                        <br />
                        {f}
                    </span>
                )}
            </div>

            <input
                className='edit'
                value={editedTitle}
                onChange={(e) => { setEditedTitle(e.target.value) }}
                onKeyDown={handleKeyDown}
                onBlur={() => { setIsEditing('') }}
                ref={inputEditTitle}
            />
        </>
    )
}