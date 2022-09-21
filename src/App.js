import './App.css';

import Header from './Components/Leyouts/Header';
import Conteiner from './Components/Leyouts/Conteiner';
import ContentPlanner from './Components/Leyouts/ContentPlanner';

function App() {
  return (
    <>
      <Header />
      <Conteiner>
        <ContentPlanner />
      </Conteiner>
    </>
  );
}

export default App;
