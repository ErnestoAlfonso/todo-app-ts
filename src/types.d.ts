export interface Todo {
    id:string
    taskMessage:string
    completed: boolean
    creationDateTime: string
    finishDate: string
}

export type TodoTitle = Pick<Todo, 'taskMessage'>
export type TodoId = Pick<Todo, 'id'>
export type TodoCompleted = Pick<Todo, 'completed'>
export type TodoCreatedDate = Pick<Todo, 'creationDateTime'>
export type TodoFinishedDate = Pick<Todo, 'finishDate'>



export type ListOfTodos = Todos[]

export type FILTERS_VALUE =  typeof TODO_FILTERS[keyof typeof TODO_FILTERS]