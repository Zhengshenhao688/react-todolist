import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface TodoItem {
  id: string;
  title: string;
  completed: boolean;
  createdAt: Date;
}

interface TodoState {
  todos: TodoItem[];
}

const initialState: TodoState = {
  todos: (() => {
    const saved = localStorage.getItem('redux-todos');
    if (saved) {
      return JSON.parse(saved, (key, value) =>
        key === 'createdAt' ? new Date(value) : value
      );
    }
    return [];
  })(),
};

const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<string>) => {
      state.todos.push({
        id: Date.now().toString(),
        title: action.payload,
        completed: false,
        createdAt: new Date(),
      });
      localStorage.setItem('redux-todos', JSON.stringify(state.todos));
    },
    toggleTodo: (state, action: PayloadAction<string>) => {
      const todo = state.todos.find((t) => t.id === action.payload);
      if (todo) todo.completed = !todo.completed;
      localStorage.setItem('redux-todos', JSON.stringify(state.todos));
    },
    deleteTodo: (state, action: PayloadAction<string>) => {
      state.todos = state.todos.filter((t) => t.id !== action.payload);
      localStorage.setItem('redux-todos', JSON.stringify(state.todos));
    },
  },
});

export const { addTodo, toggleTodo, deleteTodo } = todoSlice.actions;
export default todoSlice.reducer;