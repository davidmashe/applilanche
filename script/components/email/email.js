import React from 'react';
import EmailSubmitList from './emailSubmitList';

class Email extends React.Component {

	constructor(props){
		super(props);

		// this.handleClick = (event) => {
		// 	this.props.meaninglessAction();
		// };
	}

	render() {
		return (
			<div>
				<h1>Apply By Email</h1>
				<button>Apply</button>
				<EmailSubmitList 
					coverLetters={this.props.coverLetters}
				/>
			</div>
		);
	}
} 

export default Email