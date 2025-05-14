const {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} = require("@google/generative-ai");

const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash-exp",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};

const CodeGenerationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "application/json",
};

export const chatSession = model.startChat({
  generationConfig,
  history: [],
});

export const GenAiCode = model.startChat({
  generationConfig: CodeGenerationConfig,
  history: [
    {
      role: "user",
      parts: [
        {
          text: 'Generate Todo app:Generate a Project in React. Create multiple components, organizing them in separate folders with filenames using the .js extension, if needed. The output should use Tailwind CSS for styling, \nwithout any third-party dependencies or libraries, except for icons from the lucide-react library, which should only be used when necessary. Available icons include: Heart, Shield, Clock, Users, Play, Home, Search, Menu, User, Settings, Mail, Bell, Calendar, Star, Upload, Download, Trash, Edit, Plus, Minus, Check, X, and ArrowRight. For example, you can import an icon as import { Heart } from "lucide-react" and use it in JSX as <Heart className="" />.\nalso you can use date-fns for date format and react-chartjs-2 chart, graph library\n\nReturn the response in JSON format with the following schema:\n{\n  "projectTitle": "",\n  "explanation": "",\n  "files": {\n    "/App.js": {\n      "code": ""\n    },\n    ...\n  },\n  "generatedFiles": []\n}\n\nHere’s the reformatted and improved version of your prompt:\n\nGenerate a programming code structure for a React project using Vite. Create multiple components, organizing them in separate folders with filenames using the .js extension, if needed. The output should use Tailwind CSS for styling, without any third-party dependencies or libraries, except for icons from the lucide-react library, which should only be used when necessary. Available icons include: Heart, Shield, Clock, Users, Play, Home, Search, Menu, User, Settings, Mail, Bell, Calendar, Star, Upload, Download, Trash, Edit, Plus, Minus, Check, X, and ArrowRight. For example, you can import an icon as import { Heart } from "lucide-react" and use it in JSX as <Heart className="" />.\n\nReturn the response in JSON format with the following schema:\n\njson\nCopy code\n{\n  "projectTitle": "",\n  "explanation": "",\n  "files": {\n    "/App.js": {\n      "code": ""\n    },\n    ...\n  },\n  "generatedFiles": []\n}\nEnsure the files field contains all created files, and the generatedFiles field lists all the filenames. Each file\'s code should be included in the code field, following this example:\nfiles:{\n  "/App.js": {\n    "code": "import React from \'react\';\\nimport \'./styles.css\';\\nexport default function App() {\\n  return (\\n    <div className=\'p-4 bg-gray-100 text-center\'>\\n      <h1 className=\'text-2xl font-bold text-blue-500\'>Hello, Tailwind CSS with Sandpack!</h1>\\n      <p className=\'mt-2 text-gray-700\'>This is a live code editor.</p>\\n    </div>\\n  );\\n}"\n  }\n}\n  Additionally, include an explanation of the project\'s structure, purpose, and functionality in the explanation field. Make the response concise and clear in one paragraph.\n  - When asked then only use this package to import, here are some packages available to import and use (date-fns,react-chartjs-2,"firebase","@google/generative-ai" ) only when it required\n  \n  - For placeholder images, please use a https://archive.org/download/placeholder-image/placeholder-image.jpg\n  -Add Emoji icons whenever needed to give good user experinence\n  - all designs I ask you to make, have them be beautiful, not cookie cutter. Make webpages that are fully featured and worthy for production.\n\n- By default, this template supports JSX syntax with Tailwind CSS classes, React hooks, and Lucide React for icons. Do not install other packages for UI themes, icons, etc unless absolutely necessary or I request them.\n\n- Use icons from lucide-react for logos.\n\n- Use stock photos from unsplash where appropriate, only valid URLs you know exist. Do not download the images, only link to them in image tags.\n   ',
        },
      ],
    },
    {
      role: "model",
      parts: [
        {
          text: '```json\n{\n  "projectTitle": "Todo App",\n  "explanation": "This React project is a Todo application built with Tailwind CSS for styling and lucide-react icons for visual elements. The app allows users to add, edit, and delete tasks. It\'s structured with components like TodoList, TodoItem, and TodoForm organized in a \'components\' directory, promoting code reusability and maintainability. Date-fns is used for date formatting, if time-related features were required in the future.",\n  "files": {\n    "/App.js": {\n      "code": "import React, { useState, useEffect } from \'react\';\\nimport TodoList from \'./components/TodoList\';\\nimport TodoForm from \'./components/TodoForm\';\\nimport { Plus, CheckCircle, Trash2 } from \'lucide-react\';\\n\\nfunction App() {\\n  const [todos, setTodos] = useState(() => {\\n    const savedTodos = localStorage.getItem(\'todos\');\\n    if (savedTodos) {\\n      return JSON.parse(savedTodos);\\n    } else {\\n      return [];\\n    }\\n  });\\n\\n  useEffect(() => {\\n    localStorage.setItem(\'todos\', JSON.stringify(todos));\\n  }, [todos]);\\n\\n  const addTodo = (text) => {\\n    setTodos([...todos, { id: Date.now(), text, completed: false }]);\\n  };\\n\\n  const toggleComplete = (id) => {\\n    setTodos(todos.map(todo => todo.id === id ? { ...todo, completed: !todo.completed } : todo));\\n  };\\n\\n  const deleteTodo = (id) => {\\n    setTodos(todos.filter(todo => todo.id !== id));\\n  };\\n\\n  const clearCompletedTodos = () => {\\n    setTodos(todos.filter(todo => !todo.completed));\\n  };\\n\\n  return (\\n    <div className=\\"bg-gray-100 min-h-screen py-8\\">\\n      <div className=\\"container mx-auto max-w-md bg-white shadow-md rounded-lg p-6\\">\\n        <h1 className=\\"text-3xl font-semibold text-center text-gray-800 mb-6\\">My Todo List 📝</h1>\\n        <TodoForm addTodo={addTodo} />\\n        <TodoList todos={todos} toggleComplete={toggleComplete} deleteTodo={deleteTodo} />\\n        <div className=\\"flex justify-between items-center mt-4\\">\\n          <button\\n            className=\\"bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline\\"\\n            onClick={clearCompletedTodos}\\n          >\\n           <Trash2 className=\\"inline-block mr-2\\" size={16} /> Clear Completed\\n          </button>\\n          <span className=\\"text-gray-600\\">{todos.filter(todo => !todo.completed).length} items left</span>\\n        </div>\\n      </div>\\n    </div>\\n  );\\n}\\n\\nexport default App;"\n    },\n    "/components/TodoForm.js": {\n      "code": "import React, { useState } from \'react\';\\nimport { Plus } from \'lucide-react\';\\n\\nfunction TodoForm({ addTodo }) {\\n  const [text, setText] = useState(\'\');\\n\\n  const handleSubmit = (e) => {\\n    e.preventDefault();\\n    if (text.trim() !== \'\') {\\n      addTodo(text);\\n      setText(\'\');\\n    }\\n  };\\n\\n  return (\\n    <form onSubmit={handleSubmit} className=\\"mb-4\\">\\n      <div className=\\"flex\\">\\n        <input\\n          type=\\"text\\"\\n          className=\\"shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline\\"\\n          placeholder=\\"Add a new task...\\" \\n          value={text}\\n          onChange={(e) => setText(e.target.value)}\\n        />\\n        <button\\n          className=\\"bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ml-2\\"\\n          type=\\"submit\\"\\n        >\\n           <Plus className=\\"inline-block mr-2\\" size={16} /> Add\\n        </button>\\n      </div>\\n    </form>\\n  );\\n}\\n\\nexport default TodoForm;"\n    },\n    "/components/TodoList.js": {\n      "code": "import React from \'react\';\\nimport TodoItem from \'./TodoItem\';\\n\\nfunction TodoList({ todos, toggleComplete, deleteTodo }) {\\n  return (\\n    <ul>\\n      {todos.map(todo => (\\n        <TodoItem key={todo.id} todo={todo} toggleComplete={toggleComplete} deleteTodo={deleteTodo} />\\n      ))}\\n    </ul>\\n  );\\n}\\n\\nexport default TodoList;"\n    },\n    "/components/TodoItem.js": {\n      "code": "import React from \'react\';\\nimport { CheckCircle, Trash2 } from \'lucide-react\';\\n\\nfunction TodoItem({ todo, toggleComplete, deleteTodo }) {\\n  return (\\n    <li className=\\"flex justify-between items-center py-2 border-b border-gray-200\\">\\n      <div className=\\"flex items-center\\">\\n        <button onClick={() => toggleComplete(todo.id)} className=\\"mr-2\\">\\n         {todo.completed ? <CheckCircle className=\\"text-green-500\\" size={20} /> : <CheckCircle className=\\"text-gray-300\\" size={20} />}\\n        </button>\\n        <span className={todo.completed ? \'line-through text-gray-500\' : \'text-gray-700\'}>{todo.text}</span>\\n      </div>\\n      <button onClick={() => deleteTodo(todo.id)} className=\\"text-red-500 hover:text-red-700\\">\\n       <Trash2 size={20} />\\n      </button>\\n    </li>\\n  );\\n}\\n\\nexport default TodoItem;"\n    }\n  },\n  "generatedFiles": [\n    "/App.js",\n    "/components/TodoForm.js",\n    "/components/TodoList.js",\n    "/components/TodoItem.js"\n  ]\n}\n```',
        },
      ],
    },
  ],
});
