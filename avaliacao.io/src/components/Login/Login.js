import React, { Component } from 'react'
import { USERS_API_URL } from '../../constants';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router';
import {Button,
    Col,
    Form, 
    FormGroup, 
    Label, 
    Input, 
    Container,
    FormText } from 'reactstrap'; 

class Login extends Component {
  
    constructor(props){
        super(props);
        this.state = {
            password: '',
            login: ''
        }
    }


    changeHeadler = e => {
        this.setState({ [e.target.name]: e.target.value})
    }
  
    /*Armazena os dados de login no navegador*/
    handleSubmit = (e) => {
        e.preventDefault();
        const username = e.target.elements.login.value;
        localStorage.setItem('@login-avaliacao.io/username', username);
        //console.log(this.state)
        window.location.reload();
    }

    /*quando sair remove os dados que foram armazenados do login*/
    handleLogout = () => {
        localStorage.removeItem('@login-avaliacao.io/username');
        window.location.reload();
    }

    render() {
        const { login,password } = this.state;
        const username = localStorage.getItem('@login-avaliacao.io/username');
        if (username !== null) {
            return (
                <div style={styles.container}>
                <p>Bem vindo {username}</p>
                <Button onClick={this.handleLogout} color='success' type="submit" >Sair</Button>
                </div>
            );
        }
        return (
            <Form style={styles.container} onSubmit={this.handleSubmit}>
                <h1>Avaliação.io</h1>
                <hr></hr>
            <FormGroup row>
                <Label for="login" sm={2}>Login:</Label>
                <Col sm = {4}>
                <Input style={styles.username}
                    type="text" 
                    name="login" 
                    placeholder="Informe seu usuário" 
                    onChange={this.changeHeadler} 
                    required 
                    value={login}/>
                </Col>
            </FormGroup>
            <FormGroup row>
                <Label for="password" sm={2}>Senha:</Label>
                <Col sm = {4}>
                <Input style={styles.username}
                    type="password" 
                    name="password" 
                    placeholder="Informe a senha" 
                    onChange={this.changeHeadler} 
                    required 
                    value={password}/>
                </Col>
            </FormGroup>
            <Button color='success' type="submit" >Entrar</Button>
            </Form>
    );
  }
}

const styles = {
  container: {
    /*display: 'flex',*/
    textAlign: 'center',
    flexDirection: 'column',
    minWidth: '300px',
    boxShadow: 'rgba(0, 0, 0, 0.1) 0px 0px 20px',
    background: 'rgb(255, 255, 255)',
    borderRadius: '4px',
    padding: '30px 20px'
  },
  submitButton: {
    height: '40px',
    textAlign: 'center',
    alignItems: 'center',
    borderRadius: '4px',
    fontWeight: 'bold',
    fontSize: '14px',
    border: 0,
    color: '#fff',
    background: '#009587',
    marginTop: '5px',
  },
  username: {
    height: '40px',
    padding: '0 15px',
    border: '1px solid #eee',
    borderRadius: '4px',
    marginBottom: '10px',
    color: '#444',
    size: '20'
  }
}

export default Login;