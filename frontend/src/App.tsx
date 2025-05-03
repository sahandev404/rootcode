import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Post from './pages/Post'
import Home from './pages/Home'
import NewPost from './pages/NewPost'
import EditPost from './pages/EditPost'

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/post/:id" element={<Post />} />
        <Route path="/new" element={<NewPost />} />
        <Route path="/edit/:id" element={<EditPost />} />
      </Routes>
    </Router>
  )
}

export default App
