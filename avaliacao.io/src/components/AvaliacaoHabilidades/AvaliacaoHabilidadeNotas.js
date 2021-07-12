import React, { Component } from 'react';
import { 
    Container, 
    Row,  
    Label, 
    Input } from 'reactstrap';
import { USERS_API_URL } from '../../constants';

class AvaliacaoHabilidadeNotas extends Component {
    constructor(props){
        super(props);
        this.state = {
            alunoId: props.alunoId,
            habilidadeId: props.habilidadeId,
            notas: []
        }

        this.dimensoes = props.dimensoes;
            
        this.token =  localStorage.getItem('@login-avaliacao.io/token');

        this.atualizarNota = this.atualizarNota.bind(this);
        this.getNotas = this.getNotas.bind(this);
    }

    componentDidMount() {
        this.getNotas();
    }

    async getNotas() {
        await fetch(`${USERS_API_URL}Alunos/ObterNotasDaHabilidade/${this.state.alunoId}/${this.state.habilidadeId}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${this.token}`,
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.json())
        .then(body => {
            this.dimensoes.forEach((dimensao, i) => {
                const dimensaoEncontrada = body.dados.notasDTO.filter(nota => nota.dimensao === dimensao.nome);

                if (dimensaoEncontrada[0]) {
                    this.dimensoes[i].nota = dimensaoEncontrada[0].nota;
                }
            });

            this.setState({ 
                notas: body.dados.notasDTO
            });
        })
        .catch(err => console.log(err));
    }

    toggle = tab => {
        if (this.state.activeTab !== tab) {
            this.setState({ activeTab: tab })
        }
    }

    async atualizarNota(e) {
        var avaliacao;
        if (e.value === 'Insuficiente') {
            avaliacao = '0';
        } else if (e.value === 'Aptidão') {
            avaliacao = '1';
        } else if (e.value === 'Aptidão Plena') {
            avaliacao = '2';
        }

        await fetch(`${USERS_API_URL}Alunos/Avaliar`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${this.token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                usuarioId: this.state.alunoId,
                idDimensao: e.name,
                nota: avaliacao,
                semestre: '1'
            })
        })
        .then(res => res.json())
        .then(body => {
            console.log(body);
        })
        .catch(err => console.log('Erro ao atualizar competência: ' + err));
    }

    render() {
        const dimensoes = this.dimensoes;

        return <Container style={styles.form}>
            {dimensoes.map(dimensao => (
                <Row key={dimensao.id}>
                    <Label for={`${dimensao.id}`}>{dimensao.nome}</Label>
                    <Input 
                        onChange={e => this.atualizarNota(e.target)}
                        type="select" 
                        name={dimensao.id}
                        id={dimensao.id}
                        value={dimensao.nota}
                    >
                        <option value='Insuficiente'>Insuficiente</option>
                        <option value='Aptidão'>Aptidão</option>
                        <option value='Aptidão Plena'>Aptidão Plena</option>
                    </Input>
                </Row>
            ))}
            
        </Container>;
    }
}
export default AvaliacaoHabilidadeNotas;

const styles = {
    form: {
        padding: '15px',
        background: '#ffffff',
        borderRadius: '10px'
    },

    row: { 
        marginTop: '10px',
        textAlign: 'center'
    }
};

/*
<Form>
                                    {habilidade.dimensoes.map(dimensao => (
                                        <FormGroup key={dimensao.id}>
                                            <Label for={`${dimensao.id}`}>{dimensao.nome}</Label>
                                            <Input 
                                                onChange={e => this.atualizarNota(e.target)}
                                                type="select" 
                                                name={dimensao.id}
                                                id={dimensao.id}
                                            >
                                                <option value='0'>Insuficiente</option>
                                                <option value='1'>Aptidão</option>
                                                <option value='2'>Aptidão Plena</option>
                                            </Input>
                                        </FormGroup>
                                    ))}
                                </Form>
*/