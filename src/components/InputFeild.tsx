import { useRef } from "react";

interface Props {
  todo: string;
  setTodo: React.Dispatch<React.SetStateAction<string>>;
  handleAdd: (e: React.FormEvent) => void;
}

const InputFeild: React.FC<Props> = ({ todo, setTodo, handleAdd }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  return (
    <form
      className="flex w-[90%] mx-auto items-center relative mt-6"
      onSubmit={(e) => {
        handleAdd(e);
        inputRef.current?.blur();
      }}
    >
      <input
        className="w-[100%] rounded-[50px] py-4 px-8 text-2xl text-black border-none shadow-md"
        type="text"
        placeholder="search here"
        value={todo}
        onChange={(e) => setTodo(e.target.value)}
        ref={inputRef}
      />
      <button
        className="absolute w-12 h-12 m-3 rounded-[50px] right-0 border-none text-sm bg-[var(--bg-collor)] text-white transition-[0.2s all] shadow-lg hover:bg-blue-800 active:scale-75 active:sahdow-md"
        type="submit"
      >
        Go
      </button>
    </form>
  );
};

export default InputFeild;
