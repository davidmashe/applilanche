import React from 'react';
import EmailSubmitList from './emailSubmitList';

class Email extends React.Component {

	constructor(props){
		super(props);
	}

	render() {

		const { handleTextInput, handleRadioCheck,
			emailSubmitData } = this.props;

			console.log(emailSubmitData);

		return (
			<div>
				<h1>Apply By Email</h1>
				<button>Apply</button>
				<EmailSubmitList 
					coverLetters={this.props.coverLetters}
					handleTextInput={handleTextInput}
					handleRadioCheck={handleRadioCheck}
					emailSubmitData={emailSubmitData}
				/>
			</div>
		);
	}
} 

export default Email