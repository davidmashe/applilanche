import React from 'react';

class Main extends React.Component {

	constructor(props){
		super(props);

		this.handleClick = (event) => {
			this.props.meaninglessAction();
		}
	}

	render() {
		return (
			<div>
				<br />
				<div>{this.props.count}</div>
				<br />
				<button onClick={this.handleClick}>click</button>
			</div>
		);
	}
} 

export default Main