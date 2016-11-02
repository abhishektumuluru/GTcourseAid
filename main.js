var contextMenu = {
	"id": "critique",
	"title": "Course Critique",
	"contexts": ["selection"]
};
var rateProf = {
	"id": "rateprof",
	"title" : "Rate My Professors",
	"contexts" : ["selection"]
}
var showinoscar = {
	"id": "showinoscar",
	"title" : "Show in Oscar",
	"contexts" : ["selection"]
}
chrome.contextMenus.create(contextMenu);
chrome.contextMenus.create(rateProf);
chrome.contextMenus.create(showinoscar);
chrome.contextMenus.onClicked.addListener(function(text) {
	if (text.menuItemId == "critique" && text.selectionText) {
		if (isValidCourse(text.selectionText)) {
			openCritique(text.selectionText);
		} else {
			alert("That's not a valid course number");
		}
	} else if (text.menuItemId == "rateprof" && text.selectionText)  {
		openRateMyProfessor(text.selectionText);
	} else if (text.menuItemId == "showinoscar" && text.selectionText) {
		//if (isValidCourse(text.selectionText)) {
			openOscar(text.selectionText);
		//} else {
			//alert("That's not a valid course number");
		//}
	}
});

function isValidCourse(string) {
	var regex = /^[a-zA-Z].*[0-9]$/;
	return regex.test(string);
}

function isValidProfessor(string) {
	var regex = /[a-z]/;
	return regex.test(string);
}

// function openRateMyProfessor(professor) {
// 	if (isValidProfessor(professor)) {
// 	    chrome.tabs.create({url: "" + course});	
// 	}
// }

function openCritique(course) {
	course = course.replace(/[^a-zA-Z0-9]/g, '');
    chrome.tabs.create({url: "https://critique.gatech.edu/course.php?id=" + course});	
}

function openRateMyProfessor(profName) {
	//course = course.replace(/[^a-zA-Z0-9]/g, '');
    chrome.tabs.create({url: "http://www.ratemyprofessors.com/search.jsp?queryoption=HEADER&queryBy=teacherName&schoolName=Georgia+Institute+of+Technology&schoolID=361&query=" + profName});	
}

function openOscar(course) {
	course = course.replace(/[^a-zA-Z0-9]/g, '');
	var courseName = course.slice(0,course.length-4);
	courseName = courseName.toUpperCase();
	var courseNumber = course.slice(course.length-4,course.length);
    chrome.tabs.create({url: ("https://oscar.gatech.edu/pls/bprod/bwckctlg.p_disp_course_detail?cat_term_in=201702&subj_code_in=" + courseName + "&crse_numb_in=" + courseNumber)});	
}
