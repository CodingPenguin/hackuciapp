import Form from './components/form/Form';
import Petr from './components/petr/Petr';
import './App.css';
import { toast } from 'react-toastify';

function App() {
  return (
    <div className='app'>
      <Form/>
      <Petr />
    </div>
  );
}

export default App;
