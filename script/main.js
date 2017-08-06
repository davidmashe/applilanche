import React from 'react';
import HeaderBar from './components/header/headerbar.js';
import Email from './components/email/emailContainer.js';
import Scraper from './components/scraper/scraperContainer.js';
import AuthScreen from './components/auth/authScreen.js';
import History from './components/history/history.js';

class Main extends React.Component {

	componentWillMount() {
		this.props.getAuth();
	}

	constructor(props){
		super(props);

		this.handleClick = (event) => {
			this.props.meaninglessAction();
		};

		this.handleHeaderTabChange = (target) => {
			this.props.handleHeaderTabChange(target);
		};
	}

	getBodyContent() {

		switch (this.props.headerSelected) {
			case 0:
				return <Email />
			case 1:
				return <Scraper />
			case 2:
				return <History />
			default:
				return <div>default content goes here</div>
		}
	}

	render() {

		const { authURL, wipeAuth } = this.props;

		return (
			<div>
				<HeaderBar onClick={this.handleHeaderTabChange} />
				{
					(this.props.authURL)
						? <AuthScreen
							authURL={authURL}
							wipeAuth={wipeAuth}
						/>
							: this.getBodyContent()
				}
			</div>
		);
	}
}

export default Main
