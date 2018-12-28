export const isMobile = () => {
	if (navigator.userAgent.match(/Android/i)
	|| navigator.userAgent.match(/webOS/i)
	|| navigator.userAgent.match(/iPhone/i)
	|| navigator.userAgent.match(/iPad/i)
	|| navigator.userAgent.match(/iPod/i)
	|| navigator.userAgent.match(/BlackBerry/i)
	|| navigator.userAgent.match(/Windows Phone/i) ){

		return true;

	} else {

		return false;

	}
};

// extracting property from object
export const getLength = (obj,chamber,mobile,prop) => {
	return obj.filter(d => {
		return (d.chamber === chamber) &&
			   (d.isMobile === mobile);
		   })[0][prop];
};

export const partyDict = {
	Democratic: "#3574B2",
	Republican: "#C3423F",
	Independent: "#F4D107",
	Progressive: "#9BC53D"
};

export const chamberDict = {
	House: "Rep.",
	Senate: "Sen."
};
