import React, { Component } from 'react'; 
import {
    Navbar,
    NavbarBrand,
    NavbarToggler,
    Collapse,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem
} from 'reactstrap'; 

class AppHeader extends Component {
    state = { 
        isOpen: false
    };
    toggle = this.toggle.bind(this); 
    toggle() { 
        this.setState({
            isOpen: !this.state.isOpen
        })
    }

    //Funçao para fazer logout
    handleLogout = () => {
        localStorage.removeItem('@login-avaliacao.io/id');
        localStorage.removeItem('@login-avaliacao.io/token');
        localStorage.removeItem('@login-avaliacao.io/username');
        localStorage.removeItem('@login-avaliacao.io/nome');
        localStorage.removeItem('@login-avaliacao.io/email');
        localStorage.removeItem('@login-avaliacao.io/tipo');
        window.location.reload();
    }

    render() {
        const tipo = localStorage.getItem('@login-avaliacao.io/tipo');
        var navitems;

        if (tipo === 'Coordenador') {
            navitems = <Nav className="ml-auto" navbar>
                <NavItem>
                    <NavLink href="/cadastro">Usuários</NavLink>
                </NavItem>

                <NavItem>
                    <NavLink href="/disciplinas">Disciplinas</NavLink>
                </NavItem>

                <UncontrolledDropdown nav inNavbar>
                    <DropdownToggle nav caret>
                        Perfil
                    </DropdownToggle>
                    <DropdownMenu right>
                        <DropdownItem href="/">Usuário</DropdownItem>
                        <DropdownItem onClick={() => this.handleLogout()}>Sair</DropdownItem>
                    </DropdownMenu>
                </UncontrolledDropdown>
            </Nav>;
        } else if (tipo === 'Professor') {
            navitems = <Nav className="ml-auto" navbar>
                <NavItem>
                    <NavLink href="/disciplinas/professor">Minhas Disciplinas</NavLink>
                </NavItem>

                <UncontrolledDropdown nav inNavbar>
                    <DropdownToggle nav caret>
                        Perfil
                    </DropdownToggle>
                    <DropdownMenu right>
                        <DropdownItem href="/">Usuário</DropdownItem>
                        <DropdownItem onClick={() => this.handleLogout()}>Sair</DropdownItem>
                    </DropdownMenu>
                </UncontrolledDropdown>
            </Nav>;
        } else if (tipo === 'Aluno') {
            navitems = <Nav className="ml-auto" navbar>
                <NavItem>
                    <NavLink href="/disciplinas/aluno">Minhas Disciplinas</NavLink>
                </NavItem>

                <UncontrolledDropdown nav inNavbar>
                    <DropdownToggle nav caret>
                        Perfil
                    </DropdownToggle>
                    <DropdownMenu right>
                        <DropdownItem href="/">Usuário</DropdownItem>
                        <DropdownItem onClick={() => this.handleLogout()}>Sair</DropdownItem>
                    </DropdownMenu>
                </UncontrolledDropdown>
            </Nav>;
        }

        return <Navbar color="dark" dark expand="md">
            <NavbarBrand href="/">
                Avaliacao.Io {' '}
                <img 
                    src="http://localhost:3000/logo.png" 
                    width="30" 
                    className="d-inline-block align-top" 
                    alt="avaliacao.io" 
                />
            </NavbarBrand>
            <NavbarToggler onClick={this.toggle} />
            <Collapse isOpen={this.state.isOpen} navbar>
                <Nav className="ml-auto" navbar>
                    {navitems}
                </Nav>
            </Collapse>
        </Navbar>;
    }
}
export default AppHeader;