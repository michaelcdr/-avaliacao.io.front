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
                        <NavLink href="/">Disciplinas</NavLink>
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
                        </DropdownMenu>
                    </UncontrolledDropdown>
                </Nav>
            </Collapse>
        </Navbar>;
    }
}
export default AppHeader;