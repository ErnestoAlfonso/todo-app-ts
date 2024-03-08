import { FILTERS_VALUE } from "../types"
import { CreateTodo } from "./CreateTodo"
import { Filters } from "./Filters"

interface Props {
    activeCount: number
    completedCount: number
    filterSelected: FILTERS_VALUE
    onCreateTodo: () => void
    handleFilterChange: (filter: FILTERS_VALUE) => void
}


export const Footer: React.FC<Props> = ({
    activeCount=0,
    completedCount = 0,
    filterSelected,
    handleFilterChange,
    onCreateTodo
    }) => {
        return (
            <footer className="footer">
                <span className="todo-count">
                    <strong>{activeCount + completedCount}</strong> Tasks
                </span>

                <Filters
                    filterSelected = {filterSelected}
                    onFilterChange = {handleFilterChange} 
                />
            </footer>
        )
}