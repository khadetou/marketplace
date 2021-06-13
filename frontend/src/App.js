import Navbar from './components/Layouts/Navbar';
import {Route} from 'react-router-dom';
import Landing from './components/Layouts/Landing';
const App=()=> {
  return (
    <>
        <Navbar/>
        <Route exact path='/' component={Landing}/>
    </>
  );
}

export default App;
