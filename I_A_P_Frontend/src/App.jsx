import { useState } from 'react'
import './App.css'
import ApplicationForm from './components/ApplicationForm';



function App() {
  const [count, setCount] = useState(0)

return (
<div className="min-h-screen bg-gray-100">
<ApplicationForm />
</div>
);
}

export default App;

