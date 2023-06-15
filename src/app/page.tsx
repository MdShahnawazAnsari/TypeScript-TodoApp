"use client";
import InputFeild from "@/components/InputFeild";
import TodoList from "@/components/TodoList";
import { Todo } from "@/models";
import { useState } from "react";
import { DragDropContext, DropResult } from "react-beautiful-dnd";

const Home: React.FC = () => {
  const [todo, setTodo] = useState<string>("");
  const [todos, setTodos] = useState<Todo[]>([]);
  const [completedTodos, setCompletedTodos] = useState<Todo[]>([]);

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();

    if (todo) {
      setTodos([...todos, { id: Date.now(), todo: todo, isDone: false }]);
      setTodo("");
    } else if (!todo) alert("please type any message");
  };

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;
    if (!destination) return;

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    )
      return;

    // making sahllow copy of todos
    let add,
      active = todos,
      complete = completedTodos;

    // removing the current todo from active means todos or complete means completedTodos and adding to the add variable
    if (source.droppableId === "TodoList") {
      add = active[source.index];
      active.splice(source.index, 1);
    } else {
      add = complete[source.index];
      complete.splice(source.index, 1);
    }

    //adding todos and then setting it to state
    if (destination.droppableId === "TodoList") {
      active.splice(destination.index, 0, add);
    } else {
      complete.splice(destination.index, 0, add);
    }
    setTodos(active);
    setCompletedTodos(complete);
  };
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <h1 className="text-center text-2xl font-bold z-50 mt-10">
        Todo List App
      </h1>
      <InputFeild handleAdd={handleAdd} todo={todo} setTodo={setTodo} />
      <TodoList
        todos={todos}
        setTodos={setTodos}
        completedTodos={completedTodos}
        setCompletedTodos={setCompletedTodos}
      />
    </DragDropContext>
  );
};

export default Home;
