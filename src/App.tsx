import { useEffect, useState } from "react"
import { Todos } from "./components/Todos"
import { FILTERS_VALUE, ListOfTodos, TodoTitle, type TodoId, type Todo as TodoType } from "./types"
import { TODO_FILTERS } from "./consts"
import { Footer } from "./components/Footer"
import { Header } from "./components/Header"
import { SubString } from "./components/SubString"

//let false_todos=[
//]


const App = (): JSX.Element => {

    const [todos, setTodos] = useState<ListOfTodos>([])

    const [filterSelected, setFilterSelected] = useState<FILTERS_VALUE>(TODO_FILTERS.ALL)

    const [substring, setSubstring] = useState<string>("")

    const [todosCount, setTodosCount] = useState(0)

    useEffect(() => {
        populateList()

    }, [filterSelected, substring]);
    useEffect(() => { setCount() }, []);

    async function populateList() {
        let response;
        const headers = new Headers();
        headers.append('Accept', '*/*');
        const requestOptions: RequestInit = {
            method: 'GET',
            headers: headers
        }
        if (substring == "") {

            if (filterSelected == TODO_FILTERS.ACTIVE) {
                response = await fetch('api/todotask/false', requestOptions)
            }
            else if (filterSelected == TODO_FILTERS.COMPLETED) {
                response = await fetch('api/todotask/true', requestOptions)
            }
            else {
                response = await fetch('api/todotask', requestOptions)
            }
        }
        else {
            if (filterSelected == TODO_FILTERS.ACTIVE) {
                response = await fetch(`api/todotask/containing/false?substring=${substring}`, requestOptions)
            }
            else if (filterSelected == TODO_FILTERS.COMPLETED) {
                response = await fetch(`api/todotask/containing/true?substring=${substring}`, requestOptions)
            }
            else {
                response = await fetch(`api/todotask/containing?substring=${substring}`, requestOptions)
            }
        }



        //const response = await fetch('api/todotask', requestOptions)
        const data = await response.json()
        setTodos(data)
    }


    async function handleRemove({ id }: TodoId) {
        const requestOptions: RequestInit = {
            method: 'DELETE'
        }
        const response = await fetch(`api/todotask/${id}`, requestOptions)
        populateList()
        setCount()
    }

    async function handleCompleted({ id }: Pick<TodoType, 'id'>) {
        const requestOptions: RequestInit = {
            method: 'PUT'
        }
        const response = await fetch(`/api/todotask/mark/${id}`, requestOptions)
        populateList()
        //const newTodos = todos.map(todo =>{
        //  if (todo.id === id){
        //      return {
        //          ...todo,
        //      completed
        //    }
        //  }

        //  return todo
        //}) 
        //setTodos(newTodos)
    }

    async function handleFilterChange(filter: FILTERS_VALUE) {
        setFilterSelected(filter)
    }


    //const filteredTodos = todos.filter(todo => {
    //  if (filterSelected === TODO_FILTERS.ACTIVE) return !todo.completed
    //  if (filterSelected === TODO_FILTERS.COMPLETED) return todo.completed
    //  return todo
    //})

    async function handleAddTodo({ taskMessage }: TodoTitle) {
        const messageJSON = {
            taskMessage: `${taskMessage}`
        }
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');

        const requestOptions: RequestInit = {
            method: 'POST',
            body: JSON.stringify(messageJSON),
            headers: headers
        }
        //const newTodo = {
        //    taskMessage,
        //  id: crypto.randomUUID(),
        //  completed: false
        //}

        //const newTodos = [...todos, newTodo]
        //setTodos(newTodos)
        const response = await fetch(`/api/todotask`, requestOptions)
        populateList()
        setCount()

        //const newTodos = [...todos, newTodo]
        //setTodos(newTodos)
    }

    async function handleUpdateTitle({ id, taskMessage }: Pick<TodoType, 'id' | 'taskMessage'>) {
        //const newTodos = todos.map(todo =>{
        //  if (todo.id === id) {
        //    return {
        //      ...todo,
        //        taskMessage
        //    }
        //  }

        //  return todo
        //})
        //setTodos(newTodos)
        const requestOptions: RequestInit = {
            method: 'PUT'
        }
        const response = await fetch(`/api/todotask/${id}?taskMessage=${taskMessage}`, requestOptions)
        populateList()
    }

    async function handleSubstringFilter({ taskMessage }: TodoTitle) {
        setSubstring(taskMessage)
    }

    async function setCount() {
        const response = await fetch(`api/todotask/Count`)
        const data = await response.json()
        setTodosCount(data)
    }

  return (
    <div className="todoapp">
      <Header onAddTodo={handleAddTodo}/>

      <Todos
        onToggleCompletedTodo ={handleCompleted}
        onRemoveTodo= {handleRemove}
        setTitle={handleUpdateTitle}
        todo={todos}
      />
      <Footer
              count={todosCount}
        filterSelected={filterSelected}
        onCreateTodo={() =>{}}
        handleFilterChange={handleFilterChange}
          />
          <SubString onSearchTodo={handleSubstringFilter} />

    </div>
  )
}

export default App
