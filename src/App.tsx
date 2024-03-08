import { useEffect, useState } from "react"
import { Todos } from "./components/Todos"
import { FILTERS_VALUE, TodoTitle, type TodoId, type Todo as TodoType } from "./types"
import { TODO_FILTERS } from "./consts"
import { Footer } from "./components/Footer"
import { Header } from "./components/Header"

const false_todos=[
  {
    id:'1',
    title:'todo 1',
    completed:true,
  },
  {
    id:'2',
    title:'todo 2',
    completed:false,
  },
  {
    id:'3',
    title:'todo 3',
    completed:false,
  },
  {
    id:'4',
    title:'todo 4',
    completed:false,
  },
]


const App = (): JSX.Element =>{ 
  const [todos, setTodos] = useState(false_todos)

  const [filterSelected, setFilterSelected] = useState<FILTERS_VALUE>(TODO_FILTERS.ALL)

  useEffect(() =>{

  })

  async function populateList () {
    const response = await fetch("http://")
    const data = await response.json()
    setTodos(data)
  }

  const handleRemove = ({id}:TodoId)=>{
    const newTodos = todos.filter(todos=>todos.id !== id)
    setTodos(newTodos)
  }

  const handleCompleted = ({id, completed}: Pick<TodoType, 'id' | 'completed'>): void=>{
    const newTodos = todos.map(todo =>{
      if (todo.id === id){
        return{
          ...todo,
          completed
        }
      }

      return todo
    }) 
    setTodos(newTodos)
  }

  const handleFilterChange = (filter: FILTERS_VALUE): void=>{
    setFilterSelected(filter)
  }

  const activeCount = todos.filter(todo => !todo.completed).length
  const completedCount = todos.length - activeCount

  const filteredTodos = todos.filter(todo => {
    if (filterSelected === TODO_FILTERS.ACTIVE) return !todo.completed
    if (filterSelected === TODO_FILTERS.COMPLETED) return todo.completed
    return todo
  })

  const handleAddTodo = ({title}:TodoTitle): void =>{
    const newTodo = {
      title,
      id: crypto.randomUUID(),
      completed: false
    }

    const newTodos = [...todos, newTodo]
    setTodos(newTodos)
  }

  const handleUpdateTitle = ({ id, title }: Pick<TodoType, 'id' | 'title'>): void => {
    const newTodos = todos.map(todo =>{
      if (todo.id === id) {
        return {
          ...todo,
          title
        }
      }

      return todo
    })
    setTodos(newTodos)
  }

  return (
    <div className="todoapp">
      <Header onAddTodo={handleAddTodo}/>

      <Todos
        onToggleCompletedTodo ={handleCompleted}
        onRemoveTodo= {handleRemove}
        setTitle={handleUpdateTitle}
        todo={filteredTodos}
      />
      <Footer
        activeCount={activeCount}
        completedCount={completedCount}
        filterSelected={filterSelected}
        onCreateTodo={() =>{}}
        handleFilterChange={handleFilterChange}
      />
      <Header onAddTodo={handleAddTodo}/>

    </div>
  )
}

export default App
