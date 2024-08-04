import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Forms from './componentes/Formulário';

function App() {
  return (
   
      <Router>
        <Routes>
          <Route path='/' element={<Forms/>}/>
        </Routes>
      </Router>
  
  );
}


export default App;