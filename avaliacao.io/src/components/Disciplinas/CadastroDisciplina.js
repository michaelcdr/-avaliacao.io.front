import React, { Component } from 'react';
import {  Container, Button, FormGroup, Label, Input,Form } from 'reactstrap';
import { USERS_API_URL } from '../../constants';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router';

class CadastroDisciplina extends Component {
  constructor(props){
    super(props);
    this.state = {
      id: 0,
      nome: '',
      descritivo: '',
      horario: '',
      professores : [],
      professoresResult: [],
      redirect: false
    }

    this.token =  localStorage.getItem('@login-avaliacao.io/token');

    this.setField = this.setField.bind(this);
    this.setProfessores = this.setProfessores.bind(this);
    this.salvar = this.salvar.bind(this);
  }

  componentDidMount(){
    this.obterProfessores();
  }

  async obterProfessores() {
    await fetch(`${USERS_API_URL}Professores`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${this.token}`,
        'Content-Type': 'application/json'
      }
    })
      .then(res => res.json())
      .then(professoresResult => {
          this.setState({ professoresResult: professoresResult });
      })
      .catch(err => console.log(err));
  }

  setField(e) {
    let {name: fieldName, value} = e.target;

    this.setState({
      [fieldName]: value
    });
  };

  setProfessores(e) {
    let opts = [], opt;
    for (let i = 0, len = e.target.options.length; i < len; i++) {
        opt = e.target.options[i];
        if (opt.selected) {
            opts.push(opt.value);
        }
    }

    this.setState({
        professores: opts
    });
  }

  async salvar (e) {
    e.preventDefault();
    await fetch(`${USERS_API_URL}Disciplinas`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
          nome: this.state.nome,
          descritivo: this.state.descritivo,
          horario: this.state.horario,
          professores: this.state.professores
      })
    })
    .then(res => res.json())
    .then((body) => {
        this.setState({ redirect: true });
    })
    .catch(err => console.log(err));
  }

  render() {
    const { nome, descritivo, horario, professoresResult, redirect } = this.state;

    if (redirect) {
      return <Redirect to="/disciplinas"/>;
    }

    return <Container style={{ paddingTop: "20px" }}>
        <Form onSubmit={e => this.salvar(e)}>
          <FormGroup>
            <Label for="nome">Nome:</Label>
            <Input onChange={e => this.setField(e)} type="text" name="nome" placeholder="Informe o nome da disciplina" value={nome}/>
          </FormGroup>
          <FormGroup>
            <Label for="descritivo">Descritivo:</Label>
            <Input onChange={e => this.setField(e)} type="textarea" name="descritivo" placeholder="Informe o descritivo da disciplina" value={descritivo}/>
          </FormGroup>
          <FormGroup>
            <Label for="horario">Horário:</Label>
            <Input onChange={e => this.setField(e)} type="time" name="horario" value={horario}/>
          </FormGroup>
          <FormGroup>
            <Label for="professores">Professores:</Label>
            <Input type="select" name="professores" onChange={e => this.setProfessores(e)} multiple> 
              {professoresResult.map(opt => <option key={opt.id} value={opt.id}>{opt.nome}</option>)}
            </Input>
          </FormGroup>
          <Link className="btn btn-light mr-2" to="/disciplinas">Voltar</Link>
          <Button color='success'>Salvar</Button>
        </Form>
    </Container>;
  }
}
export default CadastroDisciplina;