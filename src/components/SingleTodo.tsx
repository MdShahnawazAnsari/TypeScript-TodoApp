import { Todo } from "@/models";
import { useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { MdDone } from "react-icons/md";

interface Props {
  todo: Todo;
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  index: number;
}

const SingleTodo: React.FC<Props> = ({ todo, todos, setTodos, index }) => {
  const [edit, setEdit] = useState<boolean>(false);
  const [editTodo, setEditTodo] = useState<string>(todo.todo);

  // for Todo Done or Undone
  const handleDone = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, isDone: !todo.isDone } : todo
      )
    );
  };

  // for Todo Delete
  const handleDelete = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  // for Todo Edit
  const handleEdit = async (e: React.FormEvent, id: number) => {
    e.preventDefault();
    await setTodos(
      todos.map((todo) => (todo.id === id ? { ...todo, todo: editTodo } : todo))
    );
    setEdit(!edit);
  };

  return (
    <Draggable draggableId={todo.id.toString()} index={index}>
      {(provided, snapshot) => (
        <form
          className={`flex bg-blue-800 w-[90%] mx-auto rounded p-5 mt-4 transition-[0.3s] hover:shadow-xl hover:scale-105 ${
            snapshot.isDragging ? "shadow-2xl" : ""
          }`}
          onSubmit={(e) => handleEdit(e, todo.id)}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          {edit ? (
            <input
              className="text-black flex-[1] text-xl p-1 focus:outline-none px-2"
              value={editTodo}
              onChange={(e) => setEditTodo(e.target.value)}
            />
          ) : todo.isDone ? (
            <s className="flex-[1] p-1 border-none text-xl focus:outline-none">
              {todo.todo}
            </s>
          ) : (
            <span className="flex-[1] p-1 border-none text-xl focus:outline-none">
              {todo.todo}
            </span>
          )}
          <div className="flex">
            <span
              className="ml-3 text-2xl cursor-pointer"
              onClick={() => {
                if (!edit && !todo.isDone) setEdit(!edit);
              }}
            >
              <AiFillEdit />
            </span>
            <span
              className="ml-3 text-2xl cursor-pointer"
              onClick={() => handleDelete(todo.id)}
            >
              <AiFillDelete />
            </span>
            <span
              className="ml-3 text-2xl cursor-pointer"
              onClick={() => handleDone(todo.id)}
            >
              <MdDone />
            </span>
          </div>
        </form>
      )}
    </Draggable>
  );
};

export default SingleTodo;
