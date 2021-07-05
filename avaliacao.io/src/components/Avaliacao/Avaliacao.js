import React, { Component } from 'react';
import { Col, Container, Row } from 'reactstrap';
import { USERS_API_URL } from '../../constants';
import { Link } from "react-router-dom";
import AvaliacaoHabilidades from '../AvaliacaoHabilidades/AvaliacaoHabilidades';

class Avaliacao extends Component {
    constructor(props){
        super(props);
        this.state = {
            alunoId: 0,
            disciplinaId: 0,
            competencias: []
        }
        
        this.token =  localStorage.getItem('@login-avaliacao.io/token');
        
        this.componentDidMount = this.componentDidMount.bind(this);
        this.getCompetencias = this.getCompetencias.bind(this);
    }

    componentDidMount() {
        const { alunoId, disciplinaId } = this.props.match.params;
        this.setState({
            alunoId,
            disciplinaId
        });

        this.getCompetencias(disciplinaId);
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

    render() {
        const { alunoId, disciplinaId, competencias } = this.state;
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
                        <AvaliacaoHabilidades alunoId={alunoId} competenciaId={competencia.id} />
                    </Col>

                    <hr></hr>
                </Row>
            ))}
            <Link className="btn btn-light" to={`/disciplinas/professor/${disciplinaId}`}>Voltar</Link>
        </Container>
        );
    }
}

export default Avaliacao;



const styles = {
    form: {
        marginTop: '20px', 
        marginBottom: '20px', 
        padding: '15px',
        background: '#f2f2f2',
        borderRadius: '10px'
    }
};