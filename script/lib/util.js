export const filterEmailsObject = (emailsArray) => {

	console.log("filterEmailsObject");

	return emailsArray.filter((subArray) => {

		if (subArray && 
			(subArray[0] || subArray[1] || subArray[2]) 
				&& subArray[3]) {
					return true;
		}
		return false;
	});
};