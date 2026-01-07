// To display numbered (chronological) todos, we need to use an <ol> instead of <ul>
// and add `list-decimal` for Tailwind. We'll also want to use `list-inside` to align numbers nicely.
// To accomplish correct ordering, we keep the `todos` as-is (as they are in creation order),
// and simply render them indexed with <ol> and no bullets.

// [No logic change needed here; visual change in rendering]
// -- The below modified code block should be inserted in the return block of App,
//    replacing <ul>...</ul> with <ol>...</ol> for numbers.

//
// ORIGINAL:
// <ul className="space-y-3">
//   {todos.map(todo => ( ... ))}
// </ul>
//

//
// UPDATED FOR NUMBERED LIST:
//
/*
<ol className="space-y-3 list-decimal list-inside">
  {todos.map(todo => (
    <li
      key={todo.id}
      className="flex items-center gap-2 bg-gray-800 p-3 rounded shadow"
    >
      {todo.isEditing ? (
        <>
          <input
            className="flex-1 px-2 py-1 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none"
            value={editInput[todo.id] ?? ''}
            onChange={e =>
              setEditInput({ ...editInput, [todo.id]: e.target.value })
            }
            onKeyDown={e => handleEditKeyDown(e, todo.id)}
            autoFocus
          />
          <button
            className="bg-green-500 hover:bg-green-600 text-white px-2 py-1 rounded"
            onClick={() => saveEditTodo(todo.id)}
            aria-label="Save"
          >
            Save
          </button>
          <button
            className="bg-gray-500 hover:bg-gray-600 text-white px-2 py-1 rounded"
            onClick={() => cancelEditTodo(todo.id)}
            aria-label="Cancel"
          >
            Cancel
          </button>
        </>
      ) : (
        <>
          <span className="flex-1 text-white break-words">{todo.text}</span>
          <button
            className="bg-yellow-500 hover:bg-yellow-600 text-white px-2 py-1 rounded"
            onClick={() => startEditTodo(todo.id, todo.text)}
            aria-label="Edit"
          >
            Edit
          </button>
          <button
            className="bg-red-600 hover:bg-red-700 text-white px-2 py-1 rounded"
            onClick={() => deleteTodo(todo.id)}
            aria-label="Delete"
          >
            Delete
          </button>
        </>
      )}
    </li>
  ))}
</ol>
*/


import { useState, useRef } from 'react'
import './App.css'

type Todo = {
  id: number
  text: string
  isEditing?: boolean
}


function App() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [input, setInput] = useState('')
  const [editInput, setEditInput] = useState<{[key:number]: string}>({})
  const nextId = useRef(1)

  const addTodo = () => {
    const trimmed = input.trim()
    if (!trimmed) return

    setTodos([
      ...todos,
      {
        id: nextId.current++,
        text: trimmed,
      },
    ])
    setInput('')
  }

  const deleteTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id))
  }

  const startEditTodo = (id: number, text: string) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, isEditing: true } : todo
    ))
    setEditInput({ ...editInput, [id]: text })
  }

  const cancelEditTodo = (id: number) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, isEditing: false } : todo
    ))
  }

  const saveEditTodo = (id: number) => {
    const trimmed = (editInput[id] ?? '').trim()
    if (!trimmed) return
    setTodos(todos.map(todo =>
      todo.id === id
        ? { ...todo, text: trimmed, isEditing: false }
        : todo
    ))
  }

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') addTodo()
  }

  const handleEditKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, id: number) => {
    if (e.key === 'Enter') saveEditTodo(id)
    if (e.key === 'Escape') cancelEditTodo(id)
  }

  return (
    <div>
    <div className="min-h-screen bg-gray-900 flex flex-col items-center px-4 py-8">
      <div className="w-full max-w-md">
        <h1 className="text-3xl font-bold text-white mb-6 text-center">To-Do App</h1>
        <div className="flex mb-6 gap-2">
          <input
            className="flex-1 px-4 py-2 rounded bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring focus:border-blue-500"
            type="text"
            placeholder="Add a new to-do"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleInputKeyDown}
            aria-label="New to-do"
          />
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
            onClick={addTodo}
            aria-label="Add to-do"
            type="button"
          >
            Add
          </button>
        </div>
        <ul className="space-y-3">
          {todos.map(todo => (
            <li
              key={todo.id}
              className="flex items-center gap-2 bg-gray-800 p-3 rounded shadow"
            >
              {todo.isEditing ? (
                <>
                  <input
                    className="flex-1 px-2 py-1 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none"
                    value={editInput[todo.id] ?? ''}
                    onChange={e =>
                      setEditInput({ ...editInput, [todo.id]: e.target.value })
                    }
                    onKeyDown={e => handleEditKeyDown(e, todo.id)}
                    autoFocus
                  />
                  <button
                    className="bg-green-500 hover:bg-green-600 text-white px-2 py-1 rounded"
                    onClick={() => saveEditTodo(todo.id)}
                    aria-label="Save"
                  >
                    Save
                  </button>
                  <button
                    className="bg-gray-500 hover:bg-gray-600 text-white px-2 py-1 rounded"
                    onClick={() => cancelEditTodo(todo.id)}
                    aria-label="Cancel"
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <>
                  <span className="flex-1 text-white break-words">{todo.text}</span>
                  <button
                    className="bg-yellow-500 hover:bg-yellow-600 text-white px-2 py-1 rounded"
                    onClick={() => startEditTodo(todo.id, todo.text)}
                    aria-label="Edit"
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-600 hover:bg-red-700 text-white px-2 py-1 rounded"
                    onClick={() => deleteTodo(todo.id)}
                    aria-label="Delete"
                  >
                    Delete
                  </button>
                </>
              )}
            </li>
          ))}
        </ul>
        {todos.length === 0 && (
          <div className="text-gray-400 text-center mt-8">No to-dos yet. Add one above!</div>
        )}
      </div>
    </div>
    </div>
  )
}

export default App


