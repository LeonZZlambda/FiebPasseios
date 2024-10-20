import { useState } from 'react'
import { Link } from 'react-router-dom'
import './App.css'

import home from '../../assets/images/logo.png'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className='container'>

      <nav className='fieb-logo'>
              <img src={home} alt="fieb" />
              <h2 className='title1'>Seja Bem-vindo(a) <br />
              à FIEB TOURS EDUCATIVOS</h2>
          <div>
              <h4 className='title2'>Selecione uma opção de login:</h4>
              <Link to={'/login'}><button className="btn fw-medium shadow-sm btn_fieb" type="button" onCLick >#SouAdmin</button> </Link>
          </div>
        </nav>

    </div>
  ) 
}

export default App;
