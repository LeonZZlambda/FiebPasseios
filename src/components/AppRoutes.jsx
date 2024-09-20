import { Routes, Route } from "react-router-dom"

import Header from '../components/Header/Header'
import Footer from '../components/Footer/Footer'

import App from "../templates/App/App"
import Home from "../templates/Home/Home"
import HomeAdmin from "../templates/HomeAdmin/HomeAdmin"

import ForgotPassAluno from "../templates/LoginAluno/ForgotPassAluno"
import LoginAluno from "../templates/LoginAluno/LoginAluno"

import ForgotPassAdmin from "../templates/LoginAdmin/ForgotPassAdmin"
import LoginAdmin from "../templates/LoginAdmin/LoginAdmin"

import Mensagem from "../templates/Mensagem/Mensagem"
import MensagemLer from "../templates/Mensagem/MensagemLer"

import Usuario from "../templates/Usuario/Usuario"
import UsuarioEditar from "../templates/Usuario/UsuarioEditar"
import UsuarioNovo from "../templates/Usuario/UsuarioNovo"
import UsuariosLista from "../templates/Usuario/UsuariosLista"

import NotFound from "../templates/NotFound/NotFound"

const AppRoutes = () => {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/home" element={<Home />} />
        <Route path="/homeAdmin" element={<HomeAdmin />} />
        
        <Route path="/loginAluno" element={<LoginAluno />} />
        <Route path="/forgotpass" element={<ForgotPassAluno />} />

        <Route path="/loginAdmin" element={<LoginAdmin />}  />
        <Route path="/forgotpassAdmin" element={<ForgotPassAdmin />} />

        <Route path="/mensagem" element={<Mensagem />} />
        <Route path="/mensagemler" element={<MensagemLer />} />


        <Route path="/usuario" element={<Usuario />} />
        <Route path="/usuarioslista" element={<UsuariosLista />} />
        <Route path="/usuarionovo" element={<UsuarioNovo />} />
        <Route path="/usuarioeditar/:id" element={<UsuarioEditar />} />

        <Route path='*' element ={<NotFound/>} />

      </Routes>
      <Footer />
    </div>
  )
}
export default AppRoutes