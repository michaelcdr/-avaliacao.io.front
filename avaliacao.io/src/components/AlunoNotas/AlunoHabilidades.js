import React, { Component } from 'react';
import { 
    Nav, 
    NavItem, 
    NavLink, 
    TabContent,
    TabPane,
    Container, 
    Row, 
    Form, 
    FormGroup,  
    Label, 
    Input, 
    Col } from 'reactstrap';
import { USERS_API_URL } from '../../constants';
import classnames from 'classnames';

class AlunoHabilidades extends Component {
    constructor(props){
        super(props);
        this.state = {
            disciplinaId: props.disciplinaId,
            alunoId: props.alunoId,
            competenciaId: props.competenciaId,
            habilidades: [],
            notas: props.notas,
            hablidadesNota: []
        }
            
        this.token =  localStorage.getItem('@login-avaliacao.io/token');

        this.atualizarNota = this.atualizarNota.bind(this);
    }

    componentDidMount() {
        this.getHabilidades();
    }

    async getHabilidades() {
        await fetch(`${USERS_API_URL}Habilidades/ObterTodasPorCompetencia/${this.state.competenciaId}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${this.token}`,
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.json())
        .then(habilidades => this.setState({ habilidades: habilidades }))
        .catch(err => console.log(err));
    }

    async atualizarNota(e) {
        await fetch(`${USERS_API_URL}Alunos/Avaliar`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${this.token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                usuarioId: this.state.alunoId,
                idDimensao: e.name,
                nota: e.value,
                semestre: '1'
            })
        })
        .then(res => res.json())
        .then(body => {
            console.log(body);
        })
        .catch(err => console.log('Erro ao atualizar competência: ' + err));
    }

    toggle = tab => {
        if (this.state.activeTab !== tab) {
            this.setState({ activeTab: tab })
        }
    }

    render() {
        const { habilidades, activeTab, notas } = this.state;

        return <Container style={styles.form}>
            <h6>Avaliação</h6>
            {notas.map(nota => (
                <Row>
                    <Col>
                        <h6>{nota.competencia}</h6>
                    </Col>
                    <Col>
                        <Form>
                            <FormGroup key={nota.habilidadeId}>
                                <Label for={`${nota.dimensaoId}`}>{nota.dimensao}</Label>
                                <Input 
                                    type="select" 
                                    name={nota.dimensaoId}
                                    id={nota.dimensaoId}
                                    value={nota.nota}
                                >
                                    <option value='Insuficiente'>Insuficiente</option>
                                    <option value='Aptidão'>Aptidão</option>
                                    <option value='Aptidão Plena'>Aptidão Plena</option>
                                </Input>
                            </FormGroup>
                        </Form>
                    </Col>
                </Row>
            ))}
                        
        </Container>;
    }
}
export default AlunoHabilidades;

const styles = {
    form: {
        padding: '15px',
        background: '#ffffff',
        borderRadius: '10px'
    }
};