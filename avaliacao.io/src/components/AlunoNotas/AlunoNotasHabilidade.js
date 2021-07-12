import React, { Component } from 'react';
import { 
    Container, 
    Row,  
    Label, 
    Input } from 'reactstrap';
import { USERS_API_URL } from '../../constants';

class AlunoNotasHabilidades extends Component {
    constructor(props){
        super(props);
        this.state = {
            alunoId: props.alunoId,
            habilidadeId: props.habilidadeId,
            nome: '',
            notas: []
        }
            
        this.token =  localStorage.getItem('@login-avaliacao.io/token');
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
            this.setState({ 
                notas: body.dados.notasDTO,
                nome: body.dados.nome
            });
        })
        .catch(err => console.log(err));
    }

    toggle = tab => {
        if (this.state.activeTab !== tab) {
            this.setState({ activeTab: tab })
        }
    }

    render() {
        const { notas } = this.state;

        return <Container style={styles.form}>
            {!notas || notas.length === 0 ? 
                <Row style={styles.row}>
                    <b>Avaliação indisponível no momento</b>
                </Row>
            :
                notas.map(nota => (
                    <Row key={nota.dimensaoId}>
                        <Label for={`${nota.dimensaoId}`}>{nota.dimensao}</Label>
                        <Input 
                            type="select" 
                            name={nota.dimensaoId}
                            id={nota.dimensaoId}
                            value={nota.nota}
                            readOnly
                        >
                            <option value='Insuficiente'>Insuficiente</option>
                            <option value='Aptidão'>Aptidão</option>
                            <option value='Aptidão Plena'>Aptidão Plena</option>
                        </Input>
                    </Row>
                ))
            }
            
        </Container>;
    }
}
export default AlunoNotasHabilidades;

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