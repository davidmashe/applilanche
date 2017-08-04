import React from 'react';
import EmailSubmitList from './emailSubmitList.js';
import EmailUpload from './emailUpload.js';
import { filterEmailsObject } from '../../lib/util.js';
import { Tab, Tabs } from 'react-bootstrap';

class Email extends React.Component {

	constructor(props){
		super(props);
	}

	render() {

		const { handleTextInput, handleRadioCheck, emailSubmitData,
			tabSelected, emailTabChange, submitEmailsToAPI, testGet
			} = this.props;

		return (
  		<Tabs defaultActiveKey={1} id="enter-email-tabs">
				<Tab eventKey={1} title="Submit Emails">
					<div>
					<h1>Apply By Email</h1>
					<button
						onClick={() => {
								const filtered =
									filterEmailsObject(emailSubmitData);
								submitEmailsToAPI(filtered);
							}
						}
					>
						Apply
					</button>
					<button
						onClick={() => { testGet() }}
					>
						Test
					</button>
					<EmailSubmitList
						coverLetters={this.props.coverLetters}
						handleTextInput={handleTextInput}
						handleRadioCheck={handleRadioCheck}
						emailSubmitData={emailSubmitData}
					/>
					</div>
				</Tab>
				<Tab eventKey={2} title="Upload Spreadsheet">
					<div>
					<h1>Upload CSV</h1>
					<button onClick={() => alert("coming soon!")}>
						Choose File
					</button>
					<EmailUpload
						coverLetters={this.props.coverLetters}
						handleTextInput={handleTextInput}
						handleRadioCheck={handleRadioCheck}
						emailSubmitData={emailSubmitData}
					/>
					</div>
				</Tab>
			</Tabs>
		);
	}
}

export default Email
