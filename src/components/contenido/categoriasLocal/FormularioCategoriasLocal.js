import React, { Component } from 'react';
import firebase from 'firebase';
import db from '../../../firebase'
//import FileUploader from 'react-firebase-file-uploader';
//import { db } from 'firebase'
import {InputText} from '../../camposFormulario/InputText'
import {InputImage} from '../../camposFormulario/InputImage'
import {PhotoEditor} from '../../componentesEspeciales/PhotoEditor'
import {Select} from '../../camposFormulario/Select'

export class FormularioCategoriasLocal extends Component{
	constructor(props) {
    super(props);
    this.state = {objGuardar:{}};
  }
	_retornoCampo = (campo, valor) =>{
		this.state.objGuardar[campo] = valor
  }
	_cancelFormulario=(e)=>{
		this.props.onResults("listado")
	}
	_saveFormulario=(e)=>{
		let user = firebase.auth().currentUser;

		const storageRef = firebase.storage().ref()
		if(this.props.parametros == null){//hace un nuevo
			db.collection("categoriasLocal").add(this.state.objGuardar)
			.then((docRef) => {//.then((user) => {
			    console.log("Categoria AÑADIDA OK: ", docRef.id);
					this.props.onResults("listado")
			})
			.catch(function(error) {
			    console.error("ERROR AL AÑADIR", error);
			});
		}else{//hace un update
			console.log("CREA EDICION!!!!!!!!!");
			db.collection("categoriasLocal").doc(this.props.parametros.id).set(this.state.objGuardar, { merge: true })
			.then(()=> {
					this.props.onResults("listado")
			    console.log("Document successfully written!");
			})
			.catch(function(error) {
			    console.error("Error writing document: ", error);
			});
		}
	}

	render(){
    return(
	        <div className="box margenes-box-listado">
						<ul>
							<li><InputText onResults={this._retornoCampo} obligatorio={true} tituloCampo={"Código"} campo={"codigo"} valor={this.props.parametros != null? this.props.parametros.codigo : null} maxLength={5}/></li>
							<li><InputText onResults={this._retornoCampo} obligatorio={true} tituloCampo={"Nombre Categoria"} campo={"nombre"} valor={this.props.parametros != null? this.props.parametros.nombre : null} maxLength={100}/></li>
							<li><InputText onResults={this._retornoCampo} obligatorio={true} tituloCampo={"Observaciones"} campo={"observaciones"} valor={this.props.parametros != null? this.props.parametros.observaciones : null}/></li>
							<li><Select onResults={this._retornoCampo} obligatorio={false} tituloCampo={"Categoría Padre"} campo={"idCategoriaLocalPadre"} url={"categoriasLocal"} filtro={["idCategoriaLocalPadre","==",null]} camposMostrar={["codigo", "nombre"]} valor={this.props.parametros != null? this.props.parametros.idCategoriaLocalPadre : null}/></li>
							<li><InputImage onResults={this._retornoCampo} valor={this.props.parametros != null? this.props.parametros.pathImage : null}/></li>

						</ul>
						<div className="columns">
						  <div className="column is-half">
								<button className="button is-primary boton-save" onClick={
			                    ((e) => this._saveFormulario(e))
			                  }>Guardar</button>
							</div>
						  <div className="column is-half">
								<button className="button is-danger boton-cancel" onClick={
			                    ((e) => this._cancelFormulario(e))
			                  }>Cancelar</button>
							</div>
						</div>
					</div>
    )
  }
}
