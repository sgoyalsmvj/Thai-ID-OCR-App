
import './App.css'
import ImageUploadForm from './components/ImageUploadForm'
import axios from 'axios';
axios.defaults.baseURL = "https://thai-id-ocr-app-production.up.railway.app/";
axios.defaults.withCredentials = true;
function App() {
  return (
    <div>
      <h1>Thai ID OCR App</h1>
      <ImageUploadForm/>
    </div>
  )
}

export default App
