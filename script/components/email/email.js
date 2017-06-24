import React from 'react';
import EmailSubmitList from './emailSubmitList.js';
import EmailUpload from './emailUpload.js';

class Email extends React.Component {

	constructor(props){
		super(props);
	}

	render() {

		const { handleTextInput, handleRadioCheck, emailSubmitData, 
			tabSelected, emailTabChange, submitEmailsToAPI } = this.props;

			console.log(emailSubmitData);

		return (
			<div>
				<ul className="header-list">
					<li 
						className="header-item"
						onClick={() => {emailTabChange("submit")}} 
					>
						Submit Emails
					</li>
					<li 
						className="header-item"
						onClick={() => {emailTabChange("upload")}} 
					>
						Upload Spreadsheet
					</li>
				</ul>
				{ (tabSelected === "submit") ?
					<div>
					<h1>Apply By Email</h1>
					<button 
						onClick={() => { submitEmailsToAPI(emailSubmitData) }} 
					>
						Apply
					</button>
					<EmailSubmitList 
						coverLetters={this.props.coverLetters}
						handleTextInput={handleTextInput}
						handleRadioCheck={handleRadioCheck}
						emailSubmitData={emailSubmitData}
					/>
					</div>
					: <div></div> 
				}					
				{ (tabSelected === "upload") ?
					<div>
					<h1>Upload CSV</h1>
					<button>Choose File</button>
					<EmailUpload 
						coverLetters={this.props.coverLetters}
						handleTextInput={handleTextInput}
						handleRadioCheck={handleRadioCheck}
						emailSubmitData={emailSubmitData}
					/>
					</div>
					: <div></div>
				}
			</div>
		);
	}
} 

export default Email