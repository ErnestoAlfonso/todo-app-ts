export interface Todo {
    id:string
    title:string
    completed:boolean
}

export type TodoTitle = Pick<Todo, 'title'>
export type TodoId = Pick<Todo, 'id'>
export type TodoCompleted = Pick<Todo, 'completed'>


export type ListOfTodos = Todos[]

export type FILTERS_VALUE =  typeof TODO_FILTERS[keyof typeof TODO_FILTERS]