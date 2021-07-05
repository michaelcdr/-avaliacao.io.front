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
import CadastroAluno from '../Usuarios/CadastroAluno';
import CadastroCoordenador from '../Usuarios/CadastroCoordenador';
import CadastroProfessor from '../Usuarios/CadastroProfessor';
import classnames from 'classnames';

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
                            <CadastroAluno />
                        </Col>
                    </Row>
                </TabPane>

                <TabPane tabId="2">
                    <Row>
                        <Col sm="12">
                            <CadastroCoordenador />
                        </Col>
                    </Row>
                </TabPane>

                <TabPane tabId="3">
                    <Row>
                        <Col sm="12">
                            <CadastroProfessor />
                        </Col>
                    </Row>
                </TabPane>
            </TabContent>
    </Container>;
  }
}
export default Cadastros;