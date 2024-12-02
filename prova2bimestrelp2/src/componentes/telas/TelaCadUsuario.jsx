import { Container } from "react-bootstrap";
import FormCadUsuario from "./formularios/FormCadUsuario";
import TabelaUsuarios from "./tabelas/TabelaUsuario";
import { useState } from "react";
import { Alert } from "react-bootstrap";


export default function TelaCadUsuario(props) {

    const [exibirTabela, setExibirTabela] = useState(true);
    const [modoEdicao, setModoEdicao] = useState(false);
    const [usuarioSelecionado, setUsuarioSelecionado] = useState({
        nickname: "",
        senha: "",
        urlAvatar: ""
    });

    return (
        <>
            <Container>
                <Alert className="mt-2 mb-2 text-center" variant="light">
                    <h2>
                        Usuários
                    </h2>
                    <a href="/mensagens">Bate Papo</a>
                </Alert>
            </Container>
            {
                exibirTabela ?
                    <TabelaUsuarios setModoEdicao={setModoEdicao}
                    setUsuarioSelecionado={setUsuarioSelecionado}
                    setExibirTabela={setExibirTabela}></TabelaUsuarios> : <FormCadUsuario modoEdicao={modoEdicao} setModoEdicao={setModoEdicao} usuarioSelecionado={usuarioSelecionado} setUsuarioSelecionado={setUsuarioSelecionado} setExibirTabela={setExibirTabela}></FormCadUsuario>
            }
        </>
    )
}