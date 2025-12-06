# React TodoList 项目教程

## 项目简介

这是一个基于 React 18 和 TypeScript 的 TodoList 应用，展示了三种不同的状态管理方案（Zustand、Context API、Redux Toolkit），并提供了完整的表单验证功能。

## 技术栈

- **前端框架**: React 18 + TypeScript
- **构建工具**: Vite
- **UI 组件库**: Ant Design
- **路由管理**: React Router 6
- **状态管理方案**:
  - Zustand (轻量级状态管理)
  - React Context API (React 原生状态管理)
  - Redux Toolkit (完整的 Redux 解决方案)
- **样式**: CSS Modules + Ant Design 主题
- **数据持久化**: localStorage

## 功能特点

### 1. TodoList 功能
- ✅ 添加新的待办事项
- ✅ 编辑现有待办事项
- ✅ 删除待办事项
- ✅ 切换待办事项完成状态
- ✅ 清除所有已完成的待办事项
- ✅ 在三种状态管理方案间切换
- ✅ 数据自动保存到本地存储

### 2. 表单验证功能
- ✅ 用户名、邮箱、手机号等常见字段验证
- ✅ 自定义正则表达式验证
- ✅ 表单提交前全量验证
- ✅ 文件上传功能
- ✅ 多选、单选、日期选择等多种表单控件

## 项目结构

```
src/
├── pages/            # 页面组件
│   ├── TodoList.tsx  # TodoList 页面
│   └── FormPage.tsx  # 表单验证页面
├── store/            # 状态管理
│   ├── todoStore.ts      # Zustand 状态管理
│   ├── TodoContext.tsx   # Context API 状态管理
│   ├── todoSlice.ts      # Redux Toolkit 状态管理
│   ├── index.ts          # Redux Store 配置
│   └── hooks.ts          # Redux 自定义 Hooks
├── components/       # 公共组件（预留）
├── utils/            # 工具函数（预留）
├── assets/           # 静态资源
├── App.tsx           # 应用入口组件
└── main.tsx          # 应用渲染入口
```

## 安装与运行

### 前置条件

- Node.js (推荐 v18.18.0+ 或 v20.0.0+) - 注意：项目构建已测试通过，但开发服务器可能需要较新版本的 Node.js
- npm 或 yarn

### 安装步骤

1. 克隆项目或下载源代码

2. 安装依赖

```bash
npm install
# 或
yarn install
```

3. 构建项目

```bash
npm run build
# 或
yarn build
```

4. 启动开发服务器

```bash
npm run dev
# 或
yarn dev
```

5. 预览生产版本

```bash
npm run preview
# 或
yarn preview
```

## 使用指南

### TodoList 页面

1. **状态管理切换**：在页面顶部可以选择使用 Zustand、Context API 或 Redux Toolkit 进行状态管理

2. **添加待办事项**：在输入框中输入内容，点击「添加」按钮或按回车键

3. **编辑待办事项**：点击待办事项旁边的「编辑」按钮，修改内容后点击「保存」

4. **完成待办事项**：点击待办事项前面的复选框

5. **删除待办事项**：点击待办事项旁边的「删除」按钮

6. **清除已完成**：点击页面底部的「清除已完成」按钮

### 表单验证页面

1. **填写表单**：按照要求填写各项内容

2. **实时验证**：表单字段会进行实时验证，错误时会显示提示信息

3. **自定义验证**：
   - 手机号：必须是11位有效的手机号码
   - 用户名：长度至少为3个字符
   - 邮箱：必须是有效的邮箱格式

4. **提交表单**：点击「提交」按钮，会进行全量验证并显示提交结果

## 三种状态管理方案对比

### 1. Zustand

**优点**：
- 轻量级，API 简洁
- 不需要 Provider 包裹组件
- 内置中间件支持（如持久化）
- 易于使用，学习成本低

**使用方式**：
```typescript
import useTodoStore from '../store/todoStore';

const TodoList = () => {
  const todos = useTodoStore(state => state.todos);
  const addTodo = useTodoStore(state => state.addTodo);
  // ...
};
```

### 2. Context API

**优点**：
- React 原生支持，无需额外依赖
- 适合中小型应用
- 组件树中的数据共享

**使用方式**：
```typescript
import { useTodoContext } from '../store/TodoContext';

const TodoList = () => {
  const { todos, addTodo } = useTodoContext();
  // ...
};
```

### 3. Redux Toolkit

**优点**：
- 完整的状态管理解决方案
- 中间件支持（Thunk、Saga 等）
- 开发工具支持
- 适合大型复杂应用

**使用方式**：
```typescript
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { addTodo, toggleTodo } from '../store/todoSlice';

const TodoList = () => {
  const todos = useAppSelector(state => state.todos.todos);
  const dispatch = useAppDispatch();
  
  const handleAdd = () => {
    dispatch(addTodo({ text: '新待办' }));
  };
  // ...
};
```

## 数据持久化

项目中所有状态管理方案都实现了通过 localStorage 进行数据持久化：

- **Zustand**：使用 persist 中间件
- **Context API**：使用 useEffect 和 localStorage API
- **Redux Toolkit**：在 createAsyncThunk 中实现数据加载和保存

## 性能优化

1. **按需导入**：使用 Ant Design 的按需导入功能，减小打包体积
2. **组件拆分**：将页面拆分为可复用的小组件
3. **状态分离**：不同功能的状态分开管理
4. **避免不必要的重渲染**：使用 React.memo、useMemo 等优化渲染性能

## 开发建议

1. **选择合适的状态管理方案**：
   - 小型应用或独立功能：Zustand
   - 中等复杂度应用：Context API
   - 大型复杂应用：Redux Toolkit

2. **TypeScript 类型定义**：为所有状态和组件 props 定义清晰的类型

3. **代码组织**：
   - 按功能模块组织文件
   - 保持组件的单一职责
   - 抽取可复用的逻辑到 hooks 或 utils 中

4. **测试建议**：
   - 为表单验证逻辑编写单元测试
   - 为状态管理的核心功能编写测试
   - 使用 React Testing Library 进行组件测试

## 常见问题

1. **开发服务器启动失败**
   - 问题：可能是 Node.js 版本过低
   - 解决：建议升级 Node.js 到 v18.18.0+ 或使用构建后的版本

2. **数据持久化不工作**
   - 问题：可能是 localStorage 存储空间不足或被禁用
   - 解决：检查浏览器隐私设置，确保 localStorage 可用

3. **状态管理切换后数据丢失**
   - 问题：三种状态管理方案使用不同的存储键
   - 解决：可以修改代码使用统一的存储键，或在切换时进行数据迁移

## 扩展方向

1. 添加用户认证和授权功能
2. 实现服务器端数据同步
3. 添加更多的筛选和排序功能
4. 集成拖拽排序功能
5. 添加主题切换功能

## License

MIT License