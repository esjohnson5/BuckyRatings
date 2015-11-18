
var professor = [];
var prof_count = 0;

function crawl(){
	var table = document.querySelector('.sectionDetailList');
	var tbody = table.querySelector('tbody');
	var row = tbody.rows;
	var row_no = tbody.rows.length;
	var prof_row = []; //keeps the row where a professor is found by index
	
//searching through every row in the table of lectures and discussions	
	for (var i = 1; i < row_no; i++){
		var cell = row[i].cells;
		if(cell[1].innerText.indexOf('LEC') != -1){
			professor[prof_count] = cell[5].innerText; //creates list of professors
			reorder(prof_count); //re-ordering proessor name
			prof_row[prof_count] = i; //storing the row index of the professor names for later use
			prof_count++;
		}
	}
	//building button to click
	for(var j = 0; j < prof_count; j++){
		var cell = row[prof_row[j]].cells;
		var btn = document.createElement('a');
		var text = document.createTextNode("RMP");
		btn.type = "button";
		btn.className = "ratingBtn";
		btn.searchURL = 'http://www.ratemyprofessors.com/search.jsp?queryBy=teacherName&schoolName=university+of+wisconsin+madison&queryoption=HEADER&query=' + professor[j] + '&facetSearch=true';
		btn.appendChild(text);
		btn.id = professor[j];
		cell[7].appendChild(btn);
		//btn.addEventListener('mouseover', openRatings);

	}
//alert("finished crawl");
}
//flips first and last names
function reorder(index){
	var split_name = professor[index].split(',');
	var first = split_name[1];
	first = first.replace(/\s+/g, '');
	var last = split_name[0];
	var name = first + " " + last;
	professor[index] = name;
}
//hovercard implementation

$(document).ready(function(){
	 $('.ratingBtn').each(function() {     
		var hoverHTMLDemoBasic = 'look at all this DATA';     
		var id = $(this).attr('id');     
		$('.ratingBtn').hovercard({         
			detailsHTML: hoverHTMLDemoBasic,         
			width: 400     
		}); 
	});
});


crawl();

//http://www.ratemyprofessors.com/search.jsp?queryBy=teacherName&schoolName=university+of+wisconsin+madison&queryoption=HEADER&query=