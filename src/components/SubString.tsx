import { TodoTitle } from "../types"
import { SearchTodo } from "./SearchTodo"


interface Props {
    onSearchTodo: ({ taskMessage }: TodoTitle) => void
}


export const SubString: React.FC<Props> = ({ onSearchTodo }) => {

    return (
        <header className="header">
            <SearchTodo queryTodo={onSearchTodo} />
        </header>

    )
}