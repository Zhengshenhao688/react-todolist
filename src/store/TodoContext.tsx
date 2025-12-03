import React, { createContext, useContext, useState } from 'react';

interface TodoItem {
  id: string;
  title: string;
  completed: boolean;
  createdAt: Date;
}

interface TodoContextType {
  todos: TodoItem[];
  addTodo: (title: string) => void;
  toggleTodo: (id: string) => void;
  deleteTodo: (id: string) => void;
}

const TodoContext = createContext<TodoContextType | undefined>(undefined);

export const TodoProvider = ({ children }: { children: React.ReactNode }) => {
  const [todos, setTodos] = useState<TodoItem[]>([]);

  const addTodo = (title: string) => {
    setTodos([
      ...todos,
      { id: Date.now().toString(), title, completed: false, createdAt: new Date() }
    ]);
  };

  const toggleTodo = (id: string) => {
    setTodos(
      todos.map((t) =>
        t.id === id ? { ...t, completed: !t.completed } : t
      )
    );
  };

  const deleteTodo = (id: string) => {
    setTodos(todos.filter((t) => t.id !== id));
  };

  return (
    <TodoContext.Provider
      value={{ todos, addTodo, toggleTodo, deleteTodo }}
    >
      {children}
    </TodoContext.Provider>
  );
};

/* eslint-disable react-refresh/only-export-components */
export const useTodoContext = () => {
  const ctx = useContext(TodoContext);
  if (!ctx) throw new Error('useTodoContext must be used within TodoProvider');
  return ctx;
};