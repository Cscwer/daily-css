// main.js
function drawDC(data){

	
	
	var dailyCSSList = `
		{{ get (item, idx) >>>> list2 }}
			<span> {{ item }} </span>
		{{ teg }}

		<ul>
			{{ get (item, idx) >>>> list }}
			<li> {{ item }} </li>
			{{ teg }}
		</ul>
	`; 

	

	var DCRender = tpl.fromStr(dailyCSSList); 

	var result = DCRender(data); 

	$('.container').html(result);

}

