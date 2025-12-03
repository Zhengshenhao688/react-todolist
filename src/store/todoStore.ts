import { create } from "zustand";
import { persist } from "zustand/middleware";

interface TodoItem {
  id: string;
  title: string;
  completed: boolean;
  createdAt: Date;
}

interface TodoStore {
  todos: TodoItem[];
  addTodo: (title: string) => void;
  toggleTodo: (id: string) => void;
  deleteTodo: (id: string) => void;
  updateTodo: (id: string, title: string) => void;
  clearCompleted: () => void;
  setTodos: (todos: TodoItem[]) => void;
}

export const useTodoStore = create<TodoStore>()(
  persist(
    (set) => ({
      todos: [],

      addTodo: (title) =>
        set((state) => ({
          todos: [
            ...state.todos,
            {
              id: Date.now().toString(),
              title,
              completed: false,
              createdAt: new Date(),
            },
          ],
        })),

      toggleTodo: (id) =>
        set((state) => ({
          todos: state.todos.map((t) =>
            t.id === id ? { ...t, completed: !t.completed } : t
          ),
        })),

      deleteTodo: (id) =>
        set((state) => ({
          todos: state.todos.filter((t) => t.id !== id),
        })),

      updateTodo: (id, title) =>
        set((state) => ({
          todos: state.todos.map((t) => (t.id === id ? { ...t, title } : t)),
        })),

      clearCompleted: () =>
        set((state) => ({
          todos: state.todos.filter((t) => !t.completed),
        })),

      setTodos: (todos) => set({ todos }),
    }),
    {
      name: "todo-storage",
      storage: {
        getItem: (name) => {
          const value = localStorage.getItem(name);
          if (!value) return null;
          return JSON.parse(value, (key, val) =>
            key === "createdAt" ? new Date(val) : val
          );
        },
        setItem: (name, value) => {
          localStorage.setItem(name, JSON.stringify(value));
        },
        removeItem: (name) => {
          localStorage.removeItem(name);
        },
      },
    }
  )
);
