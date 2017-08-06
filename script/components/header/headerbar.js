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
      {/*
			<div className="header-box">
				<ul className="header-list">
					<li
						className="header-item"
						onClick={() => {this.props.onClick(0)}}
					>
						Enter Emails
					</li>
					<li
						className="header-item"
						onClick={() => {this.props.onClick(1)}}
					>
						Apply Via Scraper
					</li>
					<li
						className="header-item"
						onClick={() => {console.log('HERE!#!@$@#$');this.props.onClick(2)}}
					>
						Application History
					</li>
				</ul>
          */}
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
