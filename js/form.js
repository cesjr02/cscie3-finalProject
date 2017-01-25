window.onload = function() {
"use strict";

// get input fields
var myForm = document.forms[0];
var userField = myForm.username;
var firstPasswordField = myForm.pwd1;
var secondPasswordField = myForm.pwd2;
var addressField = myForm.address;
var emailField = myForm.email;
var phoneField = myForm.phone;

// span ids for user helper text
var userHint = document.getElementById("userHint");
var pwd1Hint = document.getElementById("pwd1Hint");
var pwd2Hint = document.getElementById("pwd2Hint");
var phoneHint = document.getElementById("phoneHint");
var emailHint = document.getElementById("emailHint");
var zipHint = document.getElementById("zipHint");
var submitHint = document.getElementById("submitHint");
var submitHelp = document.getElementById("submitHelp");

// span ids for "ok" checkmark
var userOk = document.getElementById("userOk");
var pwd1Ok = document.getElementById("pwd1Ok");
var pwd2Ok = document.getElementById("pwd2Ok");
var phoneOk = document.getElementById("phoneOk");
var emailOk = document.getElementById("emailOk");






// USER & PASSWORD FORM VALIDATION
// userField behavior on input
userField.addEventListener("input", function() {
	// check first username length
	if (userField.value.length < 8) {
		userHint.style.display = "block";
		userOk.style.display = "none";
	} else {
		userHint.style.display = "none";
		userOk.style.display = "block";
	}
	// if user deletes input field, ok status and warning displays as none
	if (userField.value == "") {
		userHint.style.display = "none";
		userOk.style.display = "none";
	}
});


// firstPasswordField behavior on input
// check first password length and validity
firstPasswordField.addEventListener("input", function() {
	// check if not valid
	if (!this.validity.valid) {
		pwd1Hint.style.display = "block";
		pwd1Ok.style.display = "none";
	// check length
	} else if (firstPasswordField.value.length < 8) {
		pwd1Hint.style.display = "block";
		pwd1Ok.style.display = "none";
	// check to see if firstPassword matches the second
	} else if (firstPasswordField.value == secondPasswordField.value) {
		pwd1Hint.style.display = "none";
		pwd1Ok.style.display = "block";
		pwd2Hint.style.display = "none";
		pwd2Ok.style.display = "block";
	} else {
		pwd1Hint.style.display = "none";
		pwd1Ok.style.display = "block";

	}
	if (firstPasswordField.value == "" && secondPasswordField) {
		pwd2Hint.style.display = "block";
		pwd2Ok.style.display = "none";
		pwd1Ok.style.display = "none";
	// if user deletes input field, ok status and warning displays as none
	} else if (firstPasswordField.value == "") {
		pwd1Hint.style.display = "none";
		pwd1Ok.style.display = "none";
		pwd2Ok.style.display = "none";
	} else {
		// do nothing
	}
	if (firstPasswordField.value == "" && secondPasswordField.value == "") {
		pwd2Hint.style.display = "none";
		pwd1Hint.style.display = "none";
		pwd1Ok.style.display = "none";
		pwd2Ok.style.display = "none";
	}
});


// secondPasswordField behavior on input
secondPasswordField.addEventListener("input", function() {
	// check if second password matches the first
	if (secondPasswordField.value == firstPasswordField.value) {
		pwd2Hint.style.display = "none";
		pwd2Ok.style.display = "block";
	} else {
		pwd2Hint.style.display = "block";
		pwd2Ok.style.display = "none";
	}
	if (firstPasswordField.value == "" && secondPasswordField.value == "") {
		pwd2Hint.style.display = "none";
		pwd1Hint.style.display = "none";
		pwd1Ok.style.display = "none";
		pwd2Ok.style.display = "none";
	}
	if (secondPasswordField.value == "" && firstPasswordField) {
		pwd2Hint.style.display = "block";
	// if user deletes input field, ok status and warning displays as none
	} else if (secondPasswordField.value == "") {
		pwd2Hint.style.display = "none";
		pwd2Ok.style.display = "none";
	}
});


// secondPasswordField behavior on blur
secondPasswordField.addEventListener("blur", function() {
	if (secondPasswordField.value == "" && firstPasswordField.value == "") {
		pwd2Hint.style.display = "none";
	} else if (secondPasswordField.value == firstPasswordField.value) {
		pwd2Hint.style.display = "none";
	} else {
		pwd2Hint.style.display = "block";
	}
});


// emailField behavior on blur
emailField.addEventListener("blur", function() {
	// validate email address
	if (!this.validity.valid) {
		emailHint.style.display = "block";
		emailOk.style.display = "none";
		window.localStorage.removeItem("emailStorage");
	} else {
		// if valid store in local storage
		window.localStorage.setItem("emailStorage",  emailField.value);
		emailHint.style.display = "none";
		emailOk.style.display = "block";
	}
	if (emailField.value == "") {
		emailHint.style.display = "none";
		emailOk.style.display = "none";
		window.localStorage.removeItem("emailStorage");
	} else {
		submitHelp.style.display = "none";
	}
	if (phoneField == true || emailField == true) {
		submitHelp.style.display = "none";
	}
});


// emailField behavior on input
emailField.addEventListener("input", function() {
	if (emailField.value == "" && phoneField) {
		submitHelp.style.display = "none";
		emailOk.style.display = "none";
	// if user deletes input field set emailHint display to none
	} else if (emailField.value == "") {
		emailHint.style.display = "none";
		emailOk.style.display = "none";
		submitHelp.style.display = "block";
	}
});


// emailField behavior on focus
// shows helper text when user focuses on the email field and phone field is empty
emailField.addEventListener("focus", function() {
	submitHint.style.display = "none";
	if (phoneField.value == "" && emailField.value == "") {
		submitHelp.style.display = "block";
	} else if (emailField) {
		submitHelp.style.display = "none";
	} else {
		// do nothing
	}
});






// VALIDATE/REFORMAT PHONE NUMBER, STORE IN LOCAL STORAGE
var phone = document.getElementById("phone");
// add event handler
phone.addEventListener("change", reformat);
function reformat() {
	// check for regex match xxxxxxxxxx
	if (phoneField.value.match(/^(\d{3})(\d{3})(\d{4})$/)) {
		// hide phoneHint
		phoneHint.style.display = "none";
		// reformat number using .replace
        phoneField.value = phoneField.value.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3');
	        // put in local storage
			window.localStorage.setItem("phoneStorage",  phoneField.value);
			phoneOk.style.display = "block";
    // check for regex match xxx-xxx-xxxx
    } else if (phoneField.value.match(/^(\d{3})-(\d{3})-(\d{4})$/)) {
        // do nothing, already the correct format
        phoneHint.style.display = "none";
        	// put in local storage
			window.localStorage.setItem("phoneStorage",  phoneField.value);
			phoneOk.style.display = "block";
    // check for regex match (xxx)xxx-xxxx
    } else if (phoneField.value.match(/^\((\d{3})\)(\d{3})-(\d{4})$/)) {
    	phoneHint.style.display = "none";
    	phoneField.value = phoneField.value.replace(/\((\d{3})\)(\d{3})-(\d{4})/, '$1-$2-$3');
    		// put in local storage
			window.localStorage.setItem("phoneStorage",  phoneField.value);
			phoneOk.style.display = "block";
    } else {
    	// show phoneHint
    	phoneHint.style.display = "block";
    	phoneOk.style.display = "none";
    }
}

// phone behavior on input
// if user deletes input field set phoneHint display to none
phone.addEventListener("input", function() {
	if (phoneField.value == "" && emailField) {
		submitHelp.style.display = "none";
		phoneOk.style.display = "none";
	} else if (phoneField.value == "") {
		phoneHint.style.display = "none";
		phoneOk.style.display = "none";
		submitHelp.style.display = "block";
	}
});


// phone behavior on blur
phone.addEventListener("blur", function() {
	// removes hint if user deletes phoneField field and tabs to another field
	if (phoneField.value == "") {
		phoneHint.style.display = "none";
		phoneOk.style.display = "none";
		// remove from local storage
		window.localStorage.removeItem("phoneStorage");
	}
	if (phoneField.valid) {
		submitHelp.style.display = "none";
		phoneOk.style.display = "block";
	}
});


// phone behavior on focus
phone.addEventListener("focus", function() {
	submitHint.style.display = "none";
	if (emailField.value == "" && phoneField.value == "") {
		submitHelp.style.display = "block";
	} else if (phoneField.value == true) {
		submitHelp.style.display = "none";
	} else {
		// do nothing
	}
});






// GOOGLE MAP API GEOLOCATION LOOKUP - AJAX & PARSING JSON DATA
/*  gets formatted location based on user input of zip code */
var zip = document.getElementById("zip");
var citySate = document.getElementById("cityState");
var zipField = myForm.zip;

zip.addEventListener("blur", getLocation);
function getLocation(e) {
	// check if valid and input value is not empty
	if (this.validity.valid && !zipField.value == "") {
		// clear remaining zipHint from previous failed attempts
		zipHint.style.display = "none";
		// make an send an XmlHttpRequest
			var x = new XMLHttpRequest();
			x.open("GET","http://maps.googleapis.com/maps/api/geocode/json?address="+this.value,true);
			x.send();
			// set up a listener for the response
			x.onreadystatechange = function() {
				if (this.readyState == 4 && this.status == 200) {
					console.log(this.response);
					var formattedAddress = JSON.parse(this.response).results[0].formatted_address;
					if (formattedAddress) {
						cityState.value = formattedAddress;
						// put in local storage
						window.localStorage.setItem("locationStorage",  cityState.value);
					}
				}
			}
	} else {
		zipHint.style.display = "block";
		citySate.value = "";
	}
} // end of getLocation function

// zip behavior on input
zip.addEventListener("input", function() {
	// if user deletes input field all warnings and location data are removed.
	if (zipField.value == "") {
		zipHint.style.display = "none";
		citySate.value = "";
	}
});


// zip behavior on blur
zip.addEventListener("blur", function() {
	// removes hint if user deletes zipField field and tabs to another field
	if (zipField.value == "") {
		zipHint.style.display = "none";

	}
});






// RESET FORM BUTTON (also clears local storage)
var resetForm = document.getElementById("resetForm");

resetForm.addEventListener("click", function() {

	// clear local storage
	localStorage.clear();

	// reset username field
	userField.value = "";
	userHint.style.display = "none";
	userOk.style.display = "none";

	// reset password 1 field
	firstPasswordField.value = "";
	pwd1Hint.style.display = "none";
	pwd1Ok.style.display = "none";

	// reset password 2 field
	secondPasswordField.value = "";
	pwd2Hint.style.display = "none";
	pwd2Ok.style.display = "none";

	// reset zip & location field
	citySate.value = "";
	zipField.value = "";
	zipHint.style.display = "none";

	// reset address field
	addressField.value = "";

	// reset phone field
	phoneField.value = "";
	phoneOk.style.display = "none";
	phoneHint.style.display = "none";

	// reset email field
	emailField.value = "";
	emailOk.style.display = "none";
	emailHint.style.display = "none";

	// reset submission warning
	submitHint.style.display = "none";
	submitHelp.style.display = "none";
});






// LOCAL STORAGE IMPLIMENTATION
/* For security concerns password fields are not stored in local storage */
// store username
userField.addEventListener("blur", function() {
	if(this.validity.valid) {
		window.localStorage.setItem("usernameStorage", userField.value);
	} else if (userField.value == "") {
		// remove username from local storage if user deletes userField value.
		window.localStorage.removeItem("usernameStorage");
	} else {
		// do nothing
	}
});


// retrieve username from local storage
var retrieveUsername = window.localStorage.getItem("usernameStorage");
if (retrieveUsername) {
	userField.value = retrieveUsername;
	userOk.style.display = "block";
}


// store address
addressField.addEventListener("blur", function() {
	if (addressField.value) {
		window.localStorage.setItem("addressStorage", addressField.value);
	} else if (addressField.value == "") {
		window.localStorage.removeItem("addressStorage");
	} else {
		// do nothing
	}
});


// retrieve address from local storage
var retrieveAddress = window.localStorage.getItem("addressStorage");
if (retrieveAddress) {
	addressField.value = retrieveAddress;
}


// store zip code
zipField.addEventListener("blur", function() {
	if(this.validity.valid && !zipField.value == "") {
		window.localStorage.setItem("zipStorage", zipField.value);
	} else if (zipField.value == "") {
		// removes zip and location data from local storage if user deletes zipField field.
		window.localStorage.removeItem("zipStorage");
		window.localStorage.removeItem("locationStorage");
	} else {
		// do nothing
	}
});


// retrieve zipcode from local storage
var retrieveZipCode = window.localStorage.getItem("zipStorage");
if (retrieveZipCode) {
	zipField.value = retrieveZipCode;
}


// retrieve formatted location form local storage
var retrieveLocation = window.localStorage.getItem("locationStorage");
if (retrieveLocation) {
	cityState.value = retrieveLocation;
}


// retrieve phone number from local storage
var retrievePhone = window.localStorage.getItem("phoneStorage");
if (retrievePhone) {
	phoneField.value = retrievePhone;
	phoneOk.style.display = "block";
}


// retrieve email address from local storage
var retrieveEmail = window.localStorage.getItem("emailStorage");
if (retrieveEmail) {
	emailField.value = retrieveEmail;
	emailOk.style.display = "block";
}






// SUBMIT BUTTON VALIDATION
// add listener to submit button
myForm.addEventListener("submit", function(e) {
	// if both values are empty prevent default and display hint
	if (emailField.value == "" && phoneField.value == "") {
		submitHint.style.display = "block";
		submitHelp.style.display = "none";
		e.preventDefault();

	// else, check if email or phone field is valid. If so, submit.
	} else if (emailField.valid || phoneField.value.match(/^(\d{3})-(\d{3})-(\d{4})$/)) {
		submitHint.style.display = "none";
	} else {
		// no nothing
	}

});


} // end
