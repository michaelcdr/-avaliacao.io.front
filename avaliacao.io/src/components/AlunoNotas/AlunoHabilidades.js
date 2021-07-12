import React, { Component } from 'react';
import { 
    Nav, 
    NavItem, 
    NavLink, 
    TabContent,
    TabPane,
    Container, 
    Row, 
    Col } from 'reactstrap';
import { USERS_API_URL } from '../../constants';
import classnames from 'classnames';
import AlunoNotasHabilidade from './AlunoNotasHabilidade';

class AlunoHabilidades extends Component {
    constructor(props){
        super(props);
        this.state = {
            disciplinaId: props.disciplinaId,
            alunoId: props.alunoId,
            competenciaId: props.competenciaId,
            habilidades: [],
            activeTab: ''
        }
            
        this.token =  localStorage.getItem('@login-avaliacao.io/token');
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
        .then(habilidades => {
            this.setState({ 
                habilidades: habilidades
            });

            if (habilidades[0]) {
                this.toggle(habilidades[0].id);
            }
        })
        .catch(err => console.log(err));

    }

    toggle = tab => {
        if (this.state.activeTab !== tab) {
            this.setState({ activeTab: tab })
        }
    }

    render() {
        const { alunoId, habilidades, activeTab } = this.state;

        return <Container style={styles.form}>
            <h6>Avaliação</h6>
            <Nav style={{ cursor: 'pointer' }} tabs>
                {habilidades.map(habilidade => (
                    <NavItem key={habilidade.id} style={{ alignContent: 'center' }}>
                        <NavLink
                            className={classnames({ active: activeTab === habilidade.id })}
                            onClick={() => { this.toggle(habilidade.id) }}
                        >
                            {habilidade.nome}
                        </NavLink>
                    </NavItem>
                ))}
            </Nav>

            <TabContent activeTab={activeTab}>
            {habilidades.map(habilidade => (
                <TabPane key={habilidade.id} tabId={habilidade.id}>
                    <Row>
                        <Col>
                            <AlunoNotasHabilidade alunoId={alunoId} habilidadeId={habilidade.id} />
                        </Col>
                    </Row>
                </TabPane>
            ))}
            </TabContent>     
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