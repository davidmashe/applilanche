import React from 'react';

import { Nav, NavItem } from 'react-bootstrap';

class HeaderBar extends React.Component {

	constructor(props){
		super(props);
		this.state = {
			selected: '0'
		}
		this.handleSelect = this.handleSelect.bind(this);
	}

	handleSelect(eventKey){
		event.preventDefault();
		this.setState({ selected: eventKey });
		eventKey === '2' ? alert("COMING SOON") : this.props.onClick(+eventKey);
	}

	render() {
		return (
		   <div>
				<Nav bsStyle="tabs" activeKey={this.state.selected} onSelect={this.handleSelect}>
	        		<NavItem eventKey="0">Enter Emails</NavItem>
	        		<NavItem eventKey="1">Apply Via Scraper</NavItem>
	        		<NavItem eventKey="2">Application History</NavItem>
	      		</Nav>
			</div>
		);
	}
}

export default HeaderBar
