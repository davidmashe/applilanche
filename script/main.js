import React from 'react';
import HeaderBar from './components/header/headerbar.js';
import Email from './components/email/emailContainer.js';
import Scraper from './components/scraper/scraperContainer.js';

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
			default:
				return <div>default content goes here</div>	
		}
	}

	render() {
		return (
			<div>
				<HeaderBar onClick={this.handleHeaderTabChange} />
				{this.getBodyContent()}
			</div>
		);
	}
} 

export default Main