import { Routes, Route } from "react-router-dom"

import Header from '../components/Header/Header'
import Footer from '../components/Footer/Footer'

import App from "../templates/App/App"
import Home from "../templates/Home/Home"
import SobreNos from "../templates/Z_Extra/SobreNos/SobreNos"

import ForgotPass from "../templates/Login/ForgotPass"
import Login from "../templates/Login/Login"

import Mensagem from "../templates/Mensagem/Mensagem"
import MensagemLer from "../templates/Mensagem/MensagemLer"

import Usuario from "../templates/Usuario/Usuario"
import UsuarioEditar from "../templates/Usuario/UsuarioEditar"
import UsuarioNovo from "../templates/Usuario/UsuarioNovo"
import UsuariosLista from "../templates/Usuario/UsuariosLista"

import CriarPasseio from '../templates/CriarPasseio/CriarPasseio'

import NotFound from "../templates/NotFound/NotFound"

const AppRoutes = () => {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/home" element={<Home />} />
        <Route path="/aboutUs" element={<SobreNos />} />

        <Route path="/login" element={<Login />}  />
        <Route path="/forgotPass" element={<ForgotPass />} />

        <Route path="/mensagem" element={<Mensagem />} />
        <Route path="/mensagemLer" element={<MensagemLer />} />


        <Route path="/usuario" element={<Usuario />} />
        <Route path="/usuarioslista" element={<UsuariosLista />} />
        <Route path="/usuarionovo" element={<UsuarioNovo />} />
        <Route path="/usuarioeditar/:id" element={<UsuarioEditar />} />

        <Route path="/criarPasseio" element={<CriarPasseio />} />

        <Route path='*' element ={<NotFound/>} />

      </Routes>
      <Footer />
    </div>
  )
}
export default AppRoutes