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
        localStorage.removeItem('@login-avaliacao.io/username');//remove o usuario armazenado em local storage
        window.location.reload();
    }

    render() { 
        return <Navbar color="dark" dark expand="md">
            <NavbarBrand href="/">
                Avaliacao.Io
                {/* <img src="https://cdn.rd.gt/assets/images/global/redgate-logo--white.svg?v=1" 
                    width="128" className="d-inline-block align-top" alt="" /> */}
            </NavbarBrand>
            <NavbarToggler onClick={this.toggle} />
            <Collapse isOpen={this.state.isOpen} navbar>
                <Nav className="ml-auto" navbar>
                    <NavItem>
                        <NavLink href="/coordenador/cadastro">Coordenadores</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink href="/professor/cadastro">Professores</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink href="/aluno/cadastro">Alunos</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink href="/disciplinas">Disciplinas</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink href="/">Competencias</NavLink>
                    </NavItem>
                    <UncontrolledDropdown nav inNavbar>
                        <DropdownToggle nav caret>
                            Perfil
                        </DropdownToggle>
                        <DropdownMenu right>
                            <DropdownItem href="/">Usuário</DropdownItem>
                            <DropdownItem>Configurações</DropdownItem>
                            <DropdownItem onClick={() => this.handleLogout()}>Sair</DropdownItem>
                        </DropdownMenu>
                    </UncontrolledDropdown>
                </Nav>
            </Collapse>
        </Navbar>;
    }
}
export default AppHeader;