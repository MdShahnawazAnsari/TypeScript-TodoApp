import { Todo } from "@/models";
import SingleTodo from "./SingleTodo";
import { Droppable } from "react-beautiful-dnd";

interface Props {
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  completedTodos: Todo[];
  setCompletedTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

const TodoList = ({
  todos,
  setTodos,
  completedTodos,
  setCompletedTodos,
}: Props) => {
  return (
    // <div className="flex justify-evenly w-[90%] flex-wrap">
    //   {todos.map((todo) => (
    //     <SingleTodo todo={todo} key={todo.id} todos={todos} setTodos={setTodos} />
    //   ))}
    // </div>
    <div className="flex w-[95%] flex-col md:flex-row gap-4 items-start px-10 mt-5">
      <Droppable droppableId="TodoList">
        {(provided, snapshot) => (
          <div
            className={`w-full  bg-blue-600 ${snapshot.isDraggingOver ? "bg-blue-900" : ""}`}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            <h2 className={`text-center text-2xl font-semibold`}>
              Active Task
            </h2>
            <div className="flex flex-col p-4 rounded-md">
              {todos.map((todo, index) => (
                <SingleTodo
                  todo={todo}
                  key={todo.id}
                  todos={todos}
                  setTodos={setTodos}
                  index={index}
                />
              ))}
              {provided.placeholder}
            </div>
          </div>
        )}
      </Droppable>
      <Droppable droppableId="TodoCompleted">
        {(provided, snapshot) => (
          <div
            className={`w-full bg-blue-600  ${snapshot.isDraggingOver ? "bg-blue-900" : ""}`}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            <h2 className="text-center text-2xl font-semibold">
              Completed Task
            </h2>
            <div className="flex flex-col p-4 rounded-md ">
              {completedTodos.map((todo, index) => (
                <SingleTodo
                  key={todo.id}
                  todo={todo}
                  todos={completedTodos}
                  setTodos={setCompletedTodos}
                  index={index}
                />
              ))}
              {provided.placeholder}
            </div>
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default TodoList;
