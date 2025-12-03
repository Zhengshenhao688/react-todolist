import React, { createContext, useContext, useState, useEffect } from 'react';

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
  updateTodo: (id: string, title: string) => void;
  clearCompleted: () => void;
}

const TodoContext = createContext<TodoContextType | undefined>(undefined);

export const TodoProvider = ({ children }: { children: React.ReactNode }) => {
  const [todos, setTodos] = useState<TodoItem[]>(() => {
    const saved = localStorage.getItem('context-todos');
    if (saved) {
      return JSON.parse(saved, (key, value) =>
        key === 'createdAt' ? new Date(value) : value
      );
    }
    return [];
  });

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem('context-todos', JSON.stringify(todos));
  }, [todos]);

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

  const updateTodo = (id: string, title: string) => {
    setTodos(prevTodos =>
      prevTodos.map(todo =>
        todo.id === id ? { ...todo, title } : todo
      )
    );
  };

  const clearCompleted = () => {
    setTodos(prevTodos => prevTodos.filter(todo => !todo.completed));
  };

  return (
    <TodoContext.Provider
      value={{ todos, addTodo, toggleTodo, deleteTodo, updateTodo, clearCompleted }}
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