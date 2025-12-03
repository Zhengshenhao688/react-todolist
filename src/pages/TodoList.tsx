import { useState } from 'react';
import { Input, Button, Card, Typography, Segmented } from 'antd';
import { CheckOutlined, DeleteOutlined } from '@ant-design/icons';

import { useTodoStore } from '../store/todoStore';
import { useTodoContext } from '../store/TodoContext';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { addTodo as reduxAdd, toggleTodo as reduxToggle, deleteTodo as reduxDelete } from '../store/todoSlice';

const { Title, Text } = Typography;

type Mode = 'Zustand' | 'Context' | 'Redux';

export default function TodoList() {
  const [mode, setMode] = useState<Mode>('Zustand');
  const [input, setInput] = useState('');

  // Zustand
  const zTodos = useTodoStore(s => s.todos);
  const zAdd = useTodoStore(s => s.addTodo);
  const zToggle = useTodoStore(s => s.toggleTodo);
  const zDelete = useTodoStore(s => s.deleteTodo);

  // Context
  const ctx = useTodoContext();

  // Redux
  const dispatch = useAppDispatch();
  const rTodos = useAppSelector(s => s.todos.todos);
  const rStore = {
    todos: rTodos,
    addTodo: (t: string) => dispatch(reduxAdd(t)),
    toggleTodo: (id: string) => dispatch(reduxToggle(id)),
    deleteTodo: (id: string) => dispatch(reduxDelete(id)),
  };

  const store =
    mode === 'Zustand'
      ? { todos: zTodos, addTodo: zAdd, toggleTodo: zToggle, deleteTodo: zDelete }
      : mode === 'Context'
      ? ctx
      : rStore;

  const handleAdd = () => {
    if (!input.trim()) return;
    store.addTodo(input);
    setInput('');
  };

  return (
    <div style={{ maxWidth: '680px', margin: '40px auto' }}>
      <Title level={2} style={{ textAlign: 'center', marginBottom: '16px' }}>Todo List App</Title>

      <Segmented
        options={['Zustand', 'Context', 'Redux']}
        value={mode}
        onChange={v => setMode(v as Mode)}
        style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}
      />

      <Card style={{ padding: '20px' }}>
        <div style={{ display: 'flex', gap: '12px', marginBottom: '16px' }}>
          <Input
            placeholder="输入新任务..."
            value={input}
            onChange={e => setInput(e.target.value)}
            onPressEnter={handleAdd}
          />
          <Button type="primary" onClick={handleAdd}>添加</Button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {store.todos.map(todo => (
            <Card key={todo.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => store.toggleTodo(todo.id)}
                />
                <span
                  style={{
                    textDecoration: todo.completed ? 'line-through' : 'none',
                    color: todo.completed ? '#999' : 'inherit'
                  }}
                >
                  {todo.title}
                </span>
                <Text style={{ fontSize: '12px' }}>
                  {`创建于：${new Date(todo.createdAt).toLocaleString()}`}
                </Text>
              </div>

              <div className="todo-actions">
                <Button
                  icon={<CheckOutlined />}
                  type="text"
                  onClick={() => store.toggleTodo(todo.id)}
                  style={{ marginLeft: '4px' }}
                />
                <Button
                  icon={<DeleteOutlined />}
                  danger
                  type="text"
                  onClick={() => store.deleteTodo(todo.id)}
                  style={{ marginLeft: '4px' }}
                />
              </div>
            </Card>
          ))}
        </div>
      </Card>
    </div>
  );
}