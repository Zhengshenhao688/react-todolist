import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import TodoListPage from './pages/TodoList';
import FormPage from './pages/FormPage';

const App = () => {
  return (
    <>
      <Layout />
      <Routes>
        <Route path="/" element={<TodoListPage />} />
        <Route path="/form" element={<FormPage />} />
      </Routes>
    </>
  );
};

export default App;