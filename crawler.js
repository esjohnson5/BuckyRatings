
var professor = [];
var prof_count = 0;

function crawl(){
	var table = document.querySelector('.sectionDetailList');
	var tbody = table.querySelector('tbody');
	var row = tbody.rows;
	var row_no = tbody.rows.length;
	
//searching through every row in the table of lectures and discussions	
	for (var i = 1; i < row_no; i++){
		var cell = row[i].cells;
		if(cell[1].innerText.indexOf('LEC') != -1){
			professor[prof_count] = cell[5].innerText; //creates list of professors
			reorder(professor,prof_count);
			prof_count++;
		}

	}
alert("finished crawl");
}

function reorder(professor,index){



}
crawl();
