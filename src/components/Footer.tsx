import { FILTERS_VALUE } from "../types"
import { CreateTodo } from "./CreateTodo"
import { Filters } from "./Filters"

interface Props {
    count: number
    filterSelected: FILTERS_VALUE
    onCreateTodo: () => void
    handleFilterChange: (filter: FILTERS_VALUE) => void
}


export const Footer: React.FC<Props> = ({
    count = 0,
    filterSelected,
    handleFilterChange,
    onCreateTodo
    }) => {
        return (
            <footer className="footer">
                <span className="todo-count">
                    <strong>{count}</strong> Tasks
                </span>

                <Filters
                    filterSelected = {filterSelected}
                    onFilterChange = {handleFilterChange} 
                />
            </footer>
        )
}