import React from 'react';

// inner class used by EmailSubmitList
class EmailSubmit extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			email:"",
			description:"",
			note:""
		};
	}

	getRadioButtons() {
		return (
			<div>
				<label value="cover letter:">cover letter -></label>
				&nbsp;&nbsp;&nbsp;&nbsp;
				{this.props.coverLetters.map((element,index) => {
					return (
						<span>
							<label value={element}>{element}</label>
							<input 
								type="radio" 
								onChange={this.props.handleRadioCheck}
							/>
						</span>	
					)
				})}	
			</div>
		);
	}

	render() {

		const { coverLetterTypes, handleType } = this.props;

		return (
			<div className="email-submit-box">
				<input 
					type="text" 
					placeholder="email"
					onChange={(event) => handleType(0, event.target.value)}
				/>
				<input 
					type="text" 
					placeholder="company or opportunity"
					onChange={(event) => handleType(1, event.target.value)}
				/>
				{this.getRadioButtons()}
				<input 
					type="text" 
					placeholder="notes (optional)"
					onChange={(event) => handleType(2, event.target.value)}
				/>
			</div>
		);
	}

}

const EmailSubmitList = (props) => {

	const { coverLetters, handleRadioCheck, handleTextInput } = props;

	const array = [0,1,2,3,4];

	return (
		<div>
			{array.map((element) => {
				return (
					<EmailSubmit 
						key={"email-submit-" + element}
						id={"email-submit-" + element} 
						coverLetters={coverLetters}
						handleRadioCheck={handleRadioCheck}
						index={element}
						handleType={handleTextInput}
					/>
				);
			})}
		</div>
	);
}

export default EmailSubmitList