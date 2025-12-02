import { Input, Button, List, Typography, Radio } from 'antd';
import { useState } from 'react';

// Zustand
import { useTodoStore } from '../store/todoStore';

// Context API
import { useTodoContext } from '../store/TodoContext';

// Redux
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { addTodo as reduxAddTodo, toggleTodo as reduxToggleTodo, deleteTodo as reduxDeleteTodo } from '../store/todoSlice';

import './TodoList.css';

const { Title } = Typography;

type StateManager = 'zustand' | 'context' | 'redux';

const TodoListPage = () => {
  const [inputValue, setInputValue] = useState('');
  const [stateManager, setStateManager] = useState<StateManager>('zustand');

  /* ---------------- Zustand ---------------- */
  const zustandTodos = useTodoStore((state) => state.todos);
  const zustandAdd = useTodoStore((state) => state.addTodo);
  const zustandToggle = useTodoStore((state) => state.toggleTodo);
  const zustandDelete = useTodoStore((state) => state.deleteTodo);

  /* ---------------- Context ---------------- */
  const contextStore = useTodoContext();

  /* ---------------- Redux ---------------- */
  const dispatch = useAppDispatch();
  const reduxTodos = useAppSelector((state) => state.todos.todos);

  const reduxStore = {
    todos: reduxTodos,
    addTodo: (title: string) => dispatch(reduxAddTodo(title)),
    toggleTodo: (id: number) => dispatch(reduxToggleTodo(id)),
    deleteTodo: (id: number) => dispatch(reduxDeleteTodo(id)),
  };

  /* ---------------- 统一 store getter ---------------- */
  const getStore = () => {
    switch (stateManager) {
      case 'zustand':
        return {
          todos: zustandTodos,
          addTodo: zustandAdd,
          toggleTodo: zustandToggle,
          deleteTodo: zustandDelete,
        };

      case 'context':
        return {
          todos: contextStore.todos,
          addTodo: contextStore.addTodo,
          toggleTodo: contextStore.toggleTodo,
          deleteTodo: contextStore.deleteTodo,
        };

      case 'redux':
        return reduxStore;

      default:
        return reduxStore;
    }
  };

  const { todos, addTodo, toggleTodo, deleteTodo: removeTodo } = getStore();

  /* ---------------- 添加任务 ---------------- */
  const handleAdd = () => {
    if (!inputValue.trim()) return;
    addTodo(inputValue);
    setInputValue('');
  };

  return (
    <div className="todo-container">
      <Title level={3}>Todo List</Title>

      {/* 状态管理切换 */}
      <Radio.Group
        value={stateManager}
        onChange={(e) => setStateManager(e.target.value)}
        style={{ marginBottom: 20 }}
      >
        <Radio.Button value="zustand">Zustand</Radio.Button>
        <Radio.Button value="context">Context API</Radio.Button>
        <Radio.Button value="redux">Redux</Radio.Button>
      </Radio.Group>

      <div className="input-area">
        <Input
          placeholder="输入任务..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <Button type="primary" onClick={handleAdd}>
          添加
        </Button>
      </div>

      <List
        bordered
        dataSource={todos}
        renderItem={(todo) => (
          <List.Item>
            <div className="list-item-content">
              <span className={todo.completed ? 'todo-completed' : ''}>
                {todo.title}
              </span>
              <div>
                <Button type="link" onClick={() => toggleTodo(todo.id)}>
                  {todo.completed ? '取消完成' : '完成'}
                </Button>
                <Button danger type="link" onClick={() => removeTodo(todo.id)}>
                  删除
                </Button>
              </div>
            </div>
          </List.Item>
        )}
      />
    </div>
  );
};

export default TodoListPage;