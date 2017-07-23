import React from 'react';

class AuthScreen extends React.Component {

	constructor(props) {
		super(props);
	}

	render() {

		const { authURL, wipeAuth } = this.props;

		console.log("authScreen authURL:");
		console.log(authURL);

		return (
			<div>
				<div>
					<h1>
						Applilanche wants to redirect you to Google for OAuth
					</h1>
					<p>If you ignore auth, sending email will be disabled.</p>
				</div>
				<button
					onClick={() => window.location.href = authURL}
				>
					Go To Google OAuth Screen
				</button>
				<button
					onClick={wipeAuth}
				>
					Ignore Auth
				</button>	
			</div>
		);
	}
}

export default AuthScreen