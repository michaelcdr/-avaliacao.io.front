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
import classnames from 'classnames';
import ListagemAlunos from '../Alunos/ListagemAlunos';
import ListagemCoordenadores from '../Coordenadores/ListagemCoordenadores';
import ListagemProfessores from '../Professores/ListagemProfessores';

class Cadastros extends Component {
  constructor(props){
    super(props);
    this.state = {
      activeTab: '1'
    }
  }

  toggle = tab => {
    if (this.state.activeTab !== tab) {
        this.setState({ activeTab: tab })
    }
  }

  render() {
    const { activeTab } = this.state;

    return <Container style={{ paddingTop: "20px" }}>
            <h3>Cadastro de Usuários</h3>
            <Nav style={{ cursor: 'pointer' }} tabs>
                <NavItem>
                    <NavLink
                        className={classnames({ active: activeTab === '1' })}
                        onClick={() => { this.toggle('1'); }}
                    >
                        Aluno
                    </NavLink>
                </NavItem>

                <NavItem>
                    <NavLink
                        className={classnames({ active: activeTab === '2' })}
                        onClick={() => { this.toggle('2'); }}
                    >
                        Coordenador
                    </NavLink>
                </NavItem>

                <NavItem>
                    <NavLink
                        className={classnames({ active: activeTab === '3' })}
                        onClick={() => { this.toggle('3'); }}
                    >
                        Professor
                    </NavLink>
                </NavItem>
            </Nav>

            <TabContent activeTab={activeTab}>
                <TabPane tabId="1">
                    <Row>
                        <Col sm="12">
                            <ListagemAlunos />
                        </Col>
                    </Row>
                </TabPane>

                <TabPane tabId="2">
                    <Row>
                        <Col sm="12">
                            <ListagemCoordenadores />
                        </Col>
                    </Row>
                </TabPane>

                <TabPane tabId="3">
                    <Row>
                        <Col sm="12">
                            <ListagemProfessores />
                        </Col>
                    </Row>
                </TabPane>
            </TabContent>
    </Container>;
  }
}
export default Cadastros;