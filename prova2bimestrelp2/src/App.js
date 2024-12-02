import { BrowserRouter, Route, Routes } from "react-router-dom";
import { createContext, useState } from "react";
import { Provider } from "react-redux";
import store from "./redux/store";
import FormCadUsuario from './componentes/telas/formularios/FormCadUsuario';
import TelaCadUsuario from "./componentes/telas/TelaCadUsuario";
import BatePapoMensagem from "./componentes/telas/tabelas/BatePapoMensagem";

export const ContextoUsuario = createContext();

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<TelaCadUsuario />} />
            <Route path="/mensagens" element={<BatePapoMensagem />} />
          </Routes>
        </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;
