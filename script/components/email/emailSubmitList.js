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
								value={element} 
								onChange={
									(event) => {
										const i = this.props.index;
										this.props.handleRadioCheck(i,element);
									}
								}
								checked={this.props.data[3] === element}
							/>
						</span>	
					)
				})}	
			</div>
		);
	}

	render() {

		const { coverLetterTypes, index, data } = this.props;

		const handleType = this.props.handleTextInput;

		console.log(data);

		return (
			<div className="email-submit-box">
				<input 
					type="text" 
					placeholder="email (required)"
					onChange={
						(event) => {
							handleType(index, 0, event.target.value)
						}
					}
					value={data[0]}
				/>
				<input 
					type="text" 
					placeholder="company or opportunity (required)"
					onChange={
						(event) => {
							handleType(index, 1, event.target.value)
						}
					}
					value={data[1]}
				/>
				<input 
					type="text" 
					placeholder="job title (required)"
					onChange={
						(event) => {
							handleType(index, 2, event.target.value)
						}
					}
					value={data[2]}
				/>				
				{this.getRadioButtons()}
				<input 
					type="text" 
					placeholder="notes (optional)"
					onChange={
						(event) => {
							handleType(index, 4, event.target.value)
						}
					}
					value={data[4]}
				/>
			</div>
		);
	}

}

const EmailSubmitList = (props) => {

	const { coverLetters, handleRadioCheck, handleTextInput,
		emailSubmitData } = props;

	const array = [0,1,2,3,4];

	//console.log(emailSubmitData);

	return (
		<div>
			{array.map((element,index) => {

				if (index > 0) { // submit one email at a time, for now
					return '';
				}

				return (
					<EmailSubmit 
						key={"email-submit-" + element}
						id={"email-submit-" + element} 
						coverLetters={coverLetters}
						handleRadioCheck={handleRadioCheck}
						index={element}
						handleTextInput={handleTextInput}
						data={emailSubmitData[element]}
					/>
				);
			})}
		</div>
	);
}

export default EmailSubmitList