import { Input, Button, List, Typography } from 'antd';
import { useState } from 'react';
import { useTodoStore } from '../store/todoStore';
import './TodoList.css';

const { Title } = Typography;

const TodoListPage = () => {
  const [inputValue, setInputValue] = useState('');

  const todos = useTodoStore((state) => state.todos);
  const addTodo = useTodoStore((state) => state.addTodo);
  const toggleTodo = useTodoStore((state) => state.toggleTodo);
  const deleteTodo = useTodoStore((state) => state.deleteTodo);

  const handleAdd = () => {
    if (!inputValue.trim()) return;
    addTodo(inputValue);
    setInputValue('');
  };

  return (
    <div className="todo-container">
      <Title level={3}>Todo List</Title>

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
                <Button danger type="link" onClick={() => deleteTodo(todo.id)}>
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