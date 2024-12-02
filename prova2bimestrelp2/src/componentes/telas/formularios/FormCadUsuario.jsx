import { Container, Button, Col, Form, Row, Card } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { incluirUsuario, atualizarUsuario, } from '../../../redux/usuarioReducer';
import { useState } from 'react';

export default function FormCadUsuario(props) {
    const despachante = useDispatch();
    const [formValidado, setFormValidado] = useState(false);
    const [usuario, setUsuario] = useState(props.usuarioSelecionado);
    const usuarioVazio = {
        nickname: "",
        senha: "",
        urlAvatar: ""
    }

    function manipularSubmissao(evento) {
        const form = evento.currentTarget;
        if (form.checkValidity()) {
            if (!props.modoEdicao)
                despachante(incluirUsuario(usuario));
            else {
                despachante(atualizarUsuario(usuario));
                props.setModoEdicao(false);
            }
            props.setUsuarioSelecionado(usuarioVazio);
            props.setExibirTabela(true)
            setFormValidado(false);
        } else
            setFormValidado(true);
        evento.preventDefault();
        evento.stopPropagation();
    }

    function manipularMudanca(evento) {
        const elemento = evento.target.name;
        const valor = evento.target.value;
        setUsuario({ ...usuario, [elemento]: valor });
        console.log(`componente: ${elemento} : ${valor}`);
    }

    return (
        <Container className="mt-02 mb-02">
            <Row className="d-flex justify-content-center align-items-center">
                <Col md={10} lg={8} xs={12}>
                    <Card className="shadow">
                        <Form noValidate validated={formValidado} onSubmit={manipularSubmissao}>
                            <Row className="mb-3">
                                <Form.Group as={Col}>
                                    <Form.Label>Nickname</Form.Label>
                                    <Form.Control type="text" placeholder="nome de usuário" value={usuario.nickname} id='nickname' name='nickname' onChange={manipularMudanca} required />
                                </Form.Group>

                                <Form.Group as={Col} controlId="formGridPassword">
                                    <Form.Label>Senha</Form.Label>
                                    <Form.Control type="password" placeholder="senha" value={usuario.senha} id='senha' name='senha' onChange={manipularMudanca} required />
                                </Form.Group>
                            </Row>

                            <Form.Group as={Col} className="mb-3">
                                            <Form.Label className="text-center">URL do Avatar</Form.Label>
                                            <Form.Control
                                                type="text"
                                                id="urlAvatar"
                                                name="urlAvatar"
                                                placeholder="URL do Avatar"
                                                value={usuario.urlAvatar}
                                                onChange={manipularMudanca}
                                                required
                                            />
                                        </Form.Group>
                            <Col md={1}>
                                <div className="mb-2 mt-2">
                                    <Button type="submit">
                                        {
                                            props.modoEdicao ?
                                                "Alterar" :
                                                "Cadastrar"
                                        }
                                    </Button>
                                </div>
                            </Col>
                        </Form>
                    </Card>
                </Col>
            </Row >
        </Container >
    );
}
