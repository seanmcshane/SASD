window.onload = function(){
	insertToPG('webwork is not cool', 'webwork is cool');
}

//find index of where to insert the hint
function findIndex(sectionTitle, textArea){

	//find index of where section begins
	var sectionIndex = textArea.textContent.indexOf(sectionTitle);

	var insertIndex = -1;

	//find index of where to insert hint, starting after the section title 
	for(var i = (sectionIndex + sectionTitle.length); i < textArea.textContent.length; i++){	
		if(textArea.textContent.charAt(i) != '#' && textArea.textContent.charAt(i) != '\n'){
			insertIndex = i-1;
			break;
		}		
	}

	//return where to insert hint
	return insertIndex;
	
}

//method to split up text area and insert hint in between
function splitAndInsert(textArea, beginIndex, endIndex, hintStr){

	var beginText = textArea.textContent.substr(0, beginIndex);
	var endText = textArea.textContent.substr(beginIndex+1, endIndex);

	textArea.textContent = beginText + hintStr + endText;
}

//main method called when wanting to insert a hint to problem code
function insertToPG(hint1, hint2){

	hint1 = '\n' + hint1 + '\n';
	hint2 = '\n' + hint2 + '\n';

	//find main text area where problem text is held
	//webwork uses name instead of id... only 1 of this element
	var problemTextArea = document.getElementsByName('problemContents');
	problemTextArea = problemTextArea[0];

	//find where to insert the first part of hint
	var setupIndex = findIndex('Setup', problemTextArea);
	splitAndInsert(problemTextArea, setupIndex, problemTextArea.textContent.length, hint1);

	//find where to insert the second part of hint
	var endTextIndex = problemTextArea.textContent.indexOf('END_TEXT')-1;
	splitAndInsert(problemTextArea, endTextIndex, problemTextArea.textContent.length, hint2);

}
