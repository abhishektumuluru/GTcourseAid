var contextMenu = {
	"id": "critique",
	"title": "Course critique",
	"contexts": ["selection"]
};

chrome.contextMenus.create(contextMenu);

chrome.contextMenus.onClicked.addListener(function(text) {
	if (text.menuItemId == "critique" && text.selectionText) {
		if (isValidCourse(text.selectionText)) {
			openCritique(text.selectionText);
		} else {
			alert("That's not a valid course number");
		}
	}
});

function isValidCourse(string) {
	var regex = /^[a-z].*[0-9]$/;
	return regex.test(string);
}

function isValidProfessor(string) {
	var regex = /[a-z]/;
	return regex.test(string);
}

function openRateMyProfessor(professor) {
	if (isValidProfessor(professor)) {
	    chrome.tabs.create({url: "" + course});	
	}
}

function openCritique(course) {
	course = course.replace(/\s+/g, '');
    chrome.tabs.create({url: "https://critique.gatech.edu/course.php?id=" + course});	
}

