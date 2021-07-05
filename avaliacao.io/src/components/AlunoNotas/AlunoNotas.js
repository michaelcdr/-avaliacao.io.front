import React, { Component } from 'react';
import { Col, Container, Row, Form, FormGroup, Label, Input } from 'reactstrap';
import { USERS_API_URL } from '../../constants';
import { Link } from "react-router-dom";
import AlunoHabilidades from './AlunoHabilidades';

class AlunoNotas extends Component {
    constructor(props){
        super(props);
        this.state = {
            alunoId: 0,
            disciplinaId: 0,
            competencias: [],
            notas: []
        }
        
        this.token =  localStorage.getItem('@login-avaliacao.io/token');
        
        this.componentDidMount = this.componentDidMount.bind(this);
        this.getCompetencias = this.getCompetencias.bind(this);
        this.getNotas = this.getNotas.bind(this);
    }

    componentDidMount() {
        const { alunoId, disciplinaId } = this.props.match.params;
        this.setState({
            alunoId,
            disciplinaId
        });

        this.getCompetencias(disciplinaId);
        this.getNotas(alunoId, disciplinaId);
    }

    async getCompetencias(id) {
        await fetch(`${USERS_API_URL}Competencias/ObterTodasPorDisciplina/${id}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${this.token}`,
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.json())
        .then(competencias => this.setState({ competencias: competencias }))
        .catch(err => console.log(err));
    }    

    async getNotas(alunoId, disciplinaId) {
        await fetch(`${USERS_API_URL}Alunos/ObterNotas/${alunoId}/${disciplinaId}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${this.token}`,
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.json())
        .then(notas => {
            this.setState({ notas: notas.dados });
            console.log(notas)
        })
        .catch(err => console.log(err));
    }

    render() {
        const { alunoId, disciplinaId, competencias, notas } = this.state;
        return <Container style={styles.form}>
            <h6>Avaliação</h6>
            {notas.map(nota => (
                <Row>
                    <Col>
                        <h6>Competência{nota.competencia}</h6>
                        <p>Habilidade: {nota.habilidade}</p>
                    </Col>
                    <Col>
                        <Form>
                            <FormGroup key={nota.habilidadeId}>
                                <Label for={`${nota.dimensaoId}`}>{nota.dimensao}</Label>
                                <Input 
                                    readOnly
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
        return (
        <Container style={{ paddingTop: "20px" }}>
            <Row>
            <Col>
                <h3>Competências</h3>
            </Col>
            </Row>
            <hr></hr>
            {competencias.map(competencia => (
                <Row  style={styles.form} key={competencia.id}>
                    <Col>
                        <h5>{competencia.nome}</h5>
                    </Col>
                    <Col>
                        <AlunoHabilidades notas={notas} disciplinaId={disciplinaId} alunoId={alunoId} competenciaId={competencia.id} />
                    </Col>

                    <hr></hr>
                </Row>
            ))}
            <Link className="btn btn-light" to={`/disciplinas/professor/${disciplinaId}`}>Voltar</Link>
        </Container>
        );
    }
}

export default AlunoNotas;



const styles = {
    form: {
        marginTop: '20px', 
        marginBottom: '20px', 
        padding: '15px',
        background: '#f2f2f2',
        borderRadius: '10px'
    }
};