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

class AvaliacaoHabilidades extends Component {
    constructor(props){
        super(props);
        this.state = {
            alunoId: props.alunoId,
            competenciaId: props.competenciaId,
            habilidades: [],
            activeTab: '1'
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
        const { alunoId, competenciaId, habilidades, activeTab } = this.state;

        return <Container style={styles.form}>
            <h6>Avaliar habilidades</h6>
            <Nav style={{ cursor: 'pointer' }} tabs>
                {habilidades.map(habilidade => (
                    <NavItem style={{ alignContent: 'center' }}>
                        <NavLink
                            className={classnames({ active: activeTab === `${habilidade.id}` })}
                            onClick={() => { this.toggle(`${habilidade.id}`); }}
                        >
                            {habilidade.nome}
                        </NavLink>
                    </NavItem>
                ))}
            </Nav>

            <TabContent activeTab={activeTab}>
                {habilidades.map(habilidade => (
                    <TabPane tabId={`${habilidade.id}`}>
                        <Row>
                            <Col sm="12">
                                <Form>
                                    {habilidade.dimensoes.map(dimensao => (
                                        <FormGroup key={dimensao.id}>
                                            <Label for={dimensao.id}>{dimensao.nome}</Label>
                                            <Input 
                                                onChange={e => this.atualizarNota(e.target)}
                                                type="select" 
                                                name={dimensao.id}
                                                id={dimensao.id}
                                            >
                                                <option>0</option>
                                                <option>1</option>
                                                <option>2</option>
                                            </Input>
                                        </FormGroup>
                                    ))}
                                </Form>
                            </Col>
                        </Row>
                    </TabPane>  
                ))}
            </TabContent>
        </Container>;
    }
}
export default AvaliacaoHabilidades;

const styles = {
    form: {
        padding: '15px',
        background: '#ffffff',
        borderRadius: '10px'
    }
};