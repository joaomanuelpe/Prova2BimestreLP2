import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import ESTADO from "./estados";
import { alterarMensagem , consultarMensagem , excluirMensagem , gravarMensagem } from "../servicos/servicoMensagem";

export const apagarMensagem = createAsyncThunk('apagarMensagem', async (mensagem) => {
    const resultado = await excluirMensagem(mensagem);
    try {
        return {
            "status": resultado.status,
            "mensagem": resultado.mensagem,
            mensagem
        };
    } catch (erro) {
        return {
            "status": false,
            "mensagem": "Erro: " + erro.mensagem
        };
    };
});

export const atualizarMensagem = createAsyncThunk('atualizarMensagem', async (mensagem) => {
    const resultado = await alterarMensagem(mensagem);
    try {
        return {
            "status": resultado.status,
            "mensagem": resultado.mensagem,
            mensagem
        };
    } catch (erro) {
        return {
            "status": false,
            "mensagem": "Erro: " + erro.mensagem
        };
    };
});

export const buscarMensagens = createAsyncThunk('buscarMensagens', async () => {
    const resultado = await consultarMensagem();
    try {
        if (Array.isArray(resultado.listaMensagens)) {
            return {
                "status": true,
                "mensagem": "Mensagems recuperadas com sucesso",
                "listaDeMensagens": resultado
            };
        } else {
            return {
                "status": false,
                "mensagem": "Erro ao recuperar os Mensagems do backend",
                "listaDeMensagens": []
            }
        };
    } catch (erro) {
        return {
            "status": false,
            "mensagem": "Erro: " + erro.mensagem,
            "listaDeMensagens": []
        };
    };
});

export const incluirMensagem = createAsyncThunk('incluirMensagem' , async (mensagem) => {
    const resultado = await gravarMensagem(mensagem);
    try {
        return {
            "status": resultado.status,
            "mensagem": resultado.mensagem,
            mensagem
        };
    } catch (erro) {
        return {
            "status": false,
            "mensagem": "Erro: " + erro.mensagem
        };
    };
});

const MensagemReducer = createSlice({
    name: 'Mensagem',
    initialState: {
        estado: ESTADO.OCIOSO,
        mensagem: "",
        listaDeMensagens: []
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(buscarMensagens.pending, (state, action) => {
                state.estado = ESTADO.PENDENTE;
                state.mensagem = "Processando requisição (Buscando Mensagems)";
            })
            .addCase(buscarMensagens.fulfilled, (state, action) => {
                if (action.payload.status) {
                    state.estado = ESTADO.OCIOSO;
                    state.mensagem = action.payload.mensagem;
                    state.listaDeMensagens = action.payload.listaDeMensagens;
                } else {
                    state.estado = ESTADO.ERRO;
                    state.mensagem = action.payload.mensagem;
                }
            })
            .addCase(buscarMensagens.rejected, (state, action) => {
                state.estado = ESTADO.ERRO;
                state.mensagem = action.payload.mensagem;
            })

            .addCase(apagarMensagem.pending, (state, action) => {
                state.estado = ESTADO.PENDENTE;
                state.mensagem = "Processando requisição (Excluindo Mensagem)";
            })
            .addCase(apagarMensagem.fulfilled, (state, action) => {
                if (action.payload.status) {
                    state.estado = ESTADO.OCIOSO;
                    state.mensagem = action.payload.mensagem;
                    state.listaDeMensagens = state.listaDeMensagens.filter((mensagem) =>
                        mensagem.codigo !== action.payload.mensagem.codigo
                    );
                } else {
                    state.estado = ESTADO.ERRO;
                    state.mensagem = action.payload.mensagem;
                }
            })
            .addCase(apagarMensagem.rejected, (state, action) => {
                state.estado = ESTADO.ERRO;
                state.mensagem = action.payload.mensagem;
            })

            .addCase(incluirMensagem.pending, (state, action) => {
                state.estado = ESTADO.PENDENTE;
                state.mensagem = "Processando requisição (Incluindo Mensagem)";
            })
            .addCase(incluirMensagem.fulfilled, (state, action) => {
                if (action.payload.status) {
                    state.estado = ESTADO.OCIOSO;
                    state.mensagem = action.payload.mensagem;
                    state.listaDeMensagens.listaMensagens.push(action.payload.mensagem);
                } else {
                    state.estado = ESTADO.ERRO;
                    state.mensagem = action.payload.mensagem;
                }
            })
            .addCase(incluirMensagem.rejected, (state, action) => {
                state.estado = ESTADO.ERRO;
                state.mensagem = action.payload.mensagem;
            })

            .addCase(atualizarMensagem.pending, (state, action) => {
                state.estado = ESTADO.PENDENTE;
                state.mensagem = "Processando requisição (Atualizando Mensagem)";
            })
            .addCase(atualizarMensagem.fulfilled, (state, action) => {
                if (action.payload.status) {
                    state.estado = ESTADO.OCIOSO;
                    state.mensagem = action.payload.mensagem;
                    const i = state.listaDeMensagens.findIndex((mensagem) => mensagem.codigo === action.payload.mensagem.codigo);
                    state.listaDeMensagens[i] = action.payload.mensagem;
                } else {
                    state.estado = ESTADO.ERRO;
                    state.mensagem = action.payload.mensagem;
                }
            })
            .addCase(atualizarMensagem.rejected, (state, action) => {
                state.estado = ESTADO.ERRO;
                state.mensagem = action.payload.mensagem;
            })
    }
});

export default MensagemReducer.reducer;