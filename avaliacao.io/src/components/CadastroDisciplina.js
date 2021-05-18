import React, { Component } from 'react';
import {  Container, Button, FormGroup, Label, Input,Form } from 'reactstrap';
import { USERS_API_URL } from '../constants';
import { Link } from 'react-router-dom';

class CadastroDisciplina extends Component {
  constructor(props){
    super(props);

    this.stateInicial = {
      id: 0,
      nome: 'gdsgfsdaaaafgds',
      descritivo: '',
      professores : [],
      items: []
    }

    this.state = this.stateInicial;

  }
  

  componentDidMount(){
    this.obterProfessores();
  }

  obterProfessores() {
    fetch(USERS_API_URL + "professores")
      .then(res => res.json())
      .then(professoresResult => {
          this.setState({ professores: professoresResult });
        }
      )
      .catch(err => console.log(err));
  }



  salvar(e){
    e.preventDefault();
    console.log(this);
  }

  render() {
    const { nome, descritivo, professores} = this.state;
    return <Container style={{ paddingTop: "20px" }}>
        <Form onSubmit={ this.salvar }>
          <FormGroup>
            <Label for="nome">Nome:</Label>
            <Input type="text" name="nome" placeholder="Informe o nome da disciplina" value={nome} />
          </FormGroup>
          <FormGroup>
            <Label for="descritivo">Descritivo:</Label>
            <Input type="textarea" name="descritivo"/>
          </FormGroup>
          <FormGroup>
            <Label for="professores">Professores:</Label>
            <Input type="select" name="professores"  multiple> 
              {this.state.professores.map(opt => <option key={opt.id} value={opt.id}>{opt.nome}</option>)}
            </Input>
          </FormGroup>
          <Link className="btn btn-warning mr-2" to="/">Voltar</Link>
          <Button>Salvar</Button>
        </Form>
    </Container>;
  }
}
export default CadastroDisciplina;