
import './App.css'
import {HomePage} from './Pages/Home/HomePage';
import {BookMarkPage} from './Pages/BookMark/BookMarkPage';
import {Routes, Route} from 'react-router';
function App() {

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path= "/bookmarks" element={<BookMarkPage />} />
    </Routes>
  )
}

export default App
