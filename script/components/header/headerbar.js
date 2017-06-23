import React from 'react';

class HeaderBar extends React.Component {

	constructor(props){
		super(props);

	}

	render() {
		return (
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
						onClick={() => {alert("COMING SOON")}}
					>
						Application History
					</li>
				</ul>
			</div>
		);
	}
} 

export default HeaderBar