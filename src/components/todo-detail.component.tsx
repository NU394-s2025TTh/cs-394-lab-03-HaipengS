// src/components/TodoDetail.tsx

import React, { useEffect, useState } from 'react';

import { Todo } from '../types/todo-type';
interface TodoDetailProps {
  todoId: number;
}
/**
 * TodoDetail component fetches and displays the details of a specific todo item based on the provided todoId.
 * It uses the useEffect hook to fetch the todo details from the API when the component mounts or when the todoId changes.
 * @param todoId - The ID of the todo item to fetch and display.
 */
export const TodoDetail: React.FC<TodoDetailProps> = ({ todoId }) => {
  const [todo, setTodo] = useState<Todo | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTodoDetail = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(
          `https://jsonplaceholder.typicode.com/todos/${todoId}`,
        );
        if (!response.ok) throw new Error('Failed to fetch todo detail');
        const data: Todo = await response.json();
        setTodo(data);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchTodoDetail();
  }, [todoId]);

  if (loading) {
    return <div className="todo-detail">Loading...</div>;
  }

  if (error) {
    return (
      <div className="todo-detail" style={{ color: 'red' }}>
        Error loading todo: {error}
      </div>
    );
  }

  if (!todo) {
    return <div className="todo-detail">No data found.</div>;
  }

  return (
    <div className="todo-detail">
      <h2>Todo Detail</h2>
      <p>
        <strong>ID:</strong> {todo.id}
      </p>
      <p>
        <strong>Title:</strong> {todo.title}
      </p>
      <p>
        <strong>Status:</strong> {todo.completed ? 'Completed' : 'Incomplete'}
      </p>
    </div>
  );
};
