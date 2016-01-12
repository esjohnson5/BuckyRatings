
var professor = [];
var prof_count = 0;

function main(){
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
			var name = reorder(prof_count); //re-ordering proessor name
			prof_row[prof_count] = i; //storing the row index of the professor names for later use
			var newcell = row[i].insertCell(8);
			buildBtn(newcell,name);
			prof_count++;
		}
	}
}
function buildBtn(cell,name){
	//building button to click
		var btn = document.createElement('a');
		var text = document.createTextNode("Show Rating");
		var searchName = name.replace(' ','+');
		//console.log(searchName);
		btn.type = "button";
		btn.className = "ratingBtn";
		btn.searchURL = 'http://www.ratemyprofessors.com/search.jsp?queryBy=teacherName&schoolName=university+of+wisconsin+madison&queryoption=HEADER&query=' + searchName + '&facetSearch=true';
		btn.appendChild(text);	
		btn.id = name;
		//console.log(professor[j]);
		cell.appendChild(btn);
		btn.addEventListener('click', openRatings);
}
//flips first and last names
function reorder(index){
	var split_name = professor[index].split(',');
	var first = split_name[1];
	first = first.replace(/\s+/g, '');
	var last = split_name[0];
	var name = first.toLowerCase() + " " + last.toLowerCase();
	professor[index] = name;
	return name;
}

function openRatings(){
	 if (this.clicked == true) { //happens when button was clicked while active
        this.innerHTML = '';
        //this.innerHTML = '<input class="ratingBtn" type="button" value="Show Rating" />';
        this.clicked = false;
    } else { //happens when button was clicked while inactive
        this.clicked = true;
        this.innerHTML = '<input class="ratingBtn" type="button" value="Hide Rating />';
        var firstName = this.id;
        var popup = document.createElement('div');
        popup.className = 'popup';
        popup.innerText = 'Loading...';
        popup.position = 'block';

        this.appendChild(popup);

        chrome.runtime.sendMessage({
            url: this.searchURL
        }, function(responseText) {
            //responseText = responseText.replace('http://blog.ratemyprofessors.com/wp-content/uploads/2015/01/WNOs6.5_RMP_72x72.jpg', '');
            //responseText = responseText.replace('/assets/chilis/warm-chili.png', '');
            //responseText = responseText.replace('/assets/chilis/cold-chili.png', '');
            getProfInfo(popup, firstName, responseText);
        });
    }
}
function getProfInfo(popup,name,response){

	var data = document.createElement('div');
	data.innerHTML = response;
	var proflist = data.getElementsByClassName('listing PROFESSOR');
	console.log(proflist.length);




}

main();
//http://www.ratemyprofessors.com/search.jsp?queryBy=teacherName&schoolName=university+of+wisconsin+madison&queryoption=HEADER&query=