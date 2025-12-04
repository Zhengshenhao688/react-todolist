import React, { useState } from "react";
import { Input, Button, Space, Typography, Radio, Card, message, Checkbox } from "antd";
import { PlusOutlined, DeleteOutlined, EditOutlined } from "@ant-design/icons";

import { useTodoStore } from "../store/todoStore";
import { useTodoContext } from "../store/TodoContext";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import {
  addTodo,
  deleteTodo,
  updateTodo,
  clearCompleted,
} from "../store/todoSlice";

const { Title, Text } = Typography;
const { Search } = Input;

type StateManagementType = "zustand" | "context" | "redux";

const TodoList: React.FC = () => {
  const [stateManagement, setStateManagement] =
    useState<StateManagementType>("zustand");
  const [newTodo, setNewTodo] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingText, setEditingText] = useState("");

  // Zustand
  const zustandStore = useTodoStore();

  // Context API
  const contextStore = useTodoContext();

  // Redux
  const reduxTodos = useAppSelector((s) => s.todos.todos);
  const dispatch = useAppDispatch();

  const getStore = () => {
    switch (stateManagement) {
      case "zustand":
        return {
          todos: zustandStore.todos,
          addTodo: zustandStore.addTodo,
          deleteTodo: zustandStore.deleteTodo,
          updateTodo: zustandStore.updateTodo,
          clearCompleted: zustandStore.clearCompleted,
          toggleTodo: zustandStore.toggleTodo,
        };
      case "context":
        return {
          todos: contextStore.todos,
          addTodo: contextStore.addTodo,
          deleteTodo: contextStore.deleteTodo,
          updateTodo: contextStore.updateTodo,
          clearCompleted: contextStore.clearCompleted,
          toggleTodo: contextStore.toggleTodo,
        };
      case "redux":
        return {
          todos: reduxTodos,
          addTodo: (title: string) => dispatch(addTodo(title)),
          deleteTodo: (id: string) => dispatch(deleteTodo(id)),
          updateTodo: (id: string, title: string) =>
            dispatch(updateTodo({ id, title })),
          clearCompleted: () => dispatch(clearCompleted()),
          toggleTodo: (id: string) => dispatch(updateTodo({ id, title: "" })), // placeholder for toggle
        };
      default:
        return {
          todos: zustandStore.todos,
          addTodo: zustandStore.addTodo,
          deleteTodo: zustandStore.deleteTodo,
          updateTodo: zustandStore.updateTodo,
          clearCompleted: zustandStore.clearCompleted,
          toggleTodo: zustandStore.toggleTodo,
        };
    }
  };

  const {
    todos,
    addTodo: addTodoMethod,
    deleteTodo: deleteTodoMethod,
    updateTodo: updateTodoMethod,
    clearCompleted: clearCompletedMethod,
    toggleTodo: toggleTodoMethod,
  } = getStore();

  const handleAddTodo = () => {
    if (!newTodo.trim()) return message.error("任务内容不能为空");
    addTodoMethod(newTodo);
    setNewTodo("");
    message.success("任务添加成功");
  };

  const handleEdit = (todo: {
    id: string;
    title: string;
    completed: boolean;
    createdAt: string | Date;
  }) => {
    setEditingId(todo.id);
    setEditingText(todo.title);
  };

  const handleSaveEdit = () => {
    if (!editingText.trim()) return message.error("内容不能为空");
    if (editingId) updateTodoMethod(editingId, editingText);
    setEditingId(null);
    setEditingText("");
    message.success("修改成功");
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditingText("");
  };

  const completedCount = todos.filter((t) => t.completed).length;

  return (
    <div style={{ maxWidth: 800, margin: "0 auto", padding: 20 }}>
      <Title level={2}>Todo List App</Title>

      <Card style={{ marginBottom: 20 }}>
        <Space direction="vertical" style={{ width: "100%" }}>
          <Radio.Group
            value={stateManagement}
            onChange={(e) => setStateManagement(e.target.value)}
            buttonStyle="solid"
          >
            <Radio.Button value="zustand">Zustand</Radio.Button>
            <Radio.Button value="context">Context API</Radio.Button>
            <Radio.Button value="redux">Redux Toolkit</Radio.Button>
          </Radio.Group>

          <Space style={{ width: "100%" }}>
            <Search
              placeholder="输入新任务"
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
              onSearch={handleAddTodo}
              enterButton
              style={{ flex: 1 }}
            />
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={handleAddTodo}
            >
              添加
            </Button>
          </Space>

          <Space style={{ justifyContent: "space-between", width: "100%" }}>
            <Text type="secondary">
              已完成 {completedCount} / 总计 {todos.length}
            </Text>
            <Button
              danger
              disabled={completedCount === 0}
              onClick={clearCompletedMethod}
            >
              清除已完成
            </Button>
          </Space>
        </Space>
      </Card>

      <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        {todos.map((todo) => (
          <Card
            key={todo.id}
            style={{
              borderRadius: "16px",
              background: "#fafafa",
            }}
            bodyStyle={{
              padding: "28px 32px",
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: "32px",
            }}
          >
            {/* 左侧：勾选框 */}
            <div style={{ marginRight: "20px" }}>
              <Checkbox
                checked={todo.completed}
                onChange={() => toggleTodoMethod(todo.id)}
              />
            </div>

            {/* 中间：标题 + 文本 */}
            <div style={{ flex: 1 }}>
              {editingId === todo.id ? (
                <Space>
                  <Input
                    value={editingText}
                    autoFocus
                    onChange={(e) => setEditingText(e.target.value)}
                    onPressEnter={handleSaveEdit}
                  />
                  <Button type="primary" size="small" onClick={handleSaveEdit}>
                    保存
                  </Button>
                  <Button size="small" onClick={handleCancelEdit}>
                    取消
                  </Button>
                </Space>
              ) : (
                <>
                  <div
                    style={{
                      fontSize: "18px",
                      fontWeight: 600,
                      marginBottom: "6px",
                      textDecoration: todo.completed ? "line-through" : "none",
                      opacity: todo.completed ? 0.6 : 1,
                    }}
                  >
                    {todo.title}
                  </div>
                  <Text type="secondary" style={{ fontSize: "13px" }}>
                    创建于：{new Date(todo.createdAt).toLocaleString()}
                  </Text>
                </>
              )}
            </div>

            {/* 右侧：编辑 + 删除 */}
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <Button
                icon={<EditOutlined />}
                shape="circle"
                onClick={() => handleEdit(todo)}
                disabled={editingId !== null && editingId !== todo.id}
              />

              <Button
                icon={<DeleteOutlined />}
                shape="circle"
                danger
                onClick={() => deleteTodoMethod(todo.id)}
              />
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default TodoList;
