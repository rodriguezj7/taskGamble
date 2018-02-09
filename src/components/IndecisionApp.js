import React from 'react';
import AddOption from './AddOption';
import Options from './Options';
import Action from './Action';
import Header from './Header';

class IndecisionApp extends React.Component {
	constructor(props) {
		super(props);
		this.handleDeleteOptions = this.handleDeleteOptions.bind(this);
		this.handlePick = this.handlePick.bind(this);
		this.handleAddOption = this.handleAddOption.bind(this);
		this.handleDeleteOption = this.handleDeleteOption.bind(this);
		this.state= { 
			options: props.options
		}
	}

	componentDidMount() {
		try {
			const json = localStorage.getItem('options');
			const options  = JSON.parse(json);

			if (options){
				this.setState(() => ({ options }));
			}

		} catch (e) {
			console.log(e);
		}
	}

	componentDidUpdate(prevProps, prevState) {
		if(prevState.options.length !== this.state.options.length){
			const json = JSON.stringify( this.state.options );
			localStorage.setItem('options', json);
		}
	}

	componentWillUnmount() {

	}

	handleDeleteOptions() {
		this.setState(() => ({ options: [] }));
	}

	handleDeleteOption(optionToRemove){
		this.setState((prevState) => ({ options: prevState.options.filter((option) => optionToRemove !== option)
		}));
	}

	handleAddOption(option) {
		if( !option ){
			return 'Enter valid string';
		} else if (this.state.options.indexOf(option) > -1){
			return 'This option already exists';
		}

		this.setState( (prevState) => ({ 
			options: prevState.options.concat([option])
		}) );
	}

	handlePick() {
		const randNum = Math.floor(Math.random() * this.state.options.length);
		const option = this.state.options[randNum];
		alert(option);
	}
	render() {
		const title = 'Indecision App';
		const subtitle = 'What will you do today?';
		return (
			<div>
				<Header title={title} subtitle={subtitle}/>
				<Action hasOptions={this.state.options.length > 0} handlePick={this.handlePick} />
				<Options handleDeleteOptions={this.handleDeleteOptions} handleDeleteOption={this.handleDeleteOption} options={this.state.options}/>
				<AddOption handleAddOption={this.handleAddOption} />
			</div>
		);
	}
}

IndecisionApp.defaultProps = {
	options: []
}

export default IndecisionApp;