var query="Delhi";
window.onload=setup();
  $("#search-box").keyup( event => {
    if (event.keyCode == 13) {
      $("#search-img").click();
    }
  });
  $(document).on("keyup", ".custom", function(event){
    $("#search-img").click();
});
function searchData(){
	 query = document.getElementById('search-box').value;
	 console.log(query);
	 setup();
}

function setup(){
	
	 var theurl='https://api.openweathermap.org/data/2.5/weather?q='+query+'&appid=90c614fae9a83fdff03c81280b9044ba&units=imperial';
	const xhr = new XMLHttpRequest();
	xhr.open('GET',theurl,true);
	xhr.onload = function(){
		const data =JSON.parse(xhr.response)
		console.log(data)
		if(data.cod === "404")
			alert(data.message);
		
		else
			gotData(data);	
	};

	xhr.send(null);

 }

 function gotData(data){
 	document.getElementById('city').textContent=data.name+"," +" "+data.sys.country.toString();
 	var tag = document.createElement("sup");
 	var text = document.createTextNode(" °F");
 	tag.appendChild(text);
 	document.getElementById('temp').textContent=data.main.temp;
 	var element = document.getElementById("temp");
   	element.appendChild(tag);
  //  	document.getElementById('temp0').textContent = Math.round(((Number(data.main.temp)-32)*5/9)).toString();
  //  	var tag = document.createElement("sup");
 	// var text = document.createTextNode(" °C");
 	// tag.appendChild(text);
 	// var element = document.getElementById("temp0");
  //  	element.appendChild(tag);

   	var mm,ss;
   	var today = new Date();
   	if(today.getMinutes()<=9)
   		mm="0"+today.getMinutes().toString();
   	else{
   		mm=today.getMinutes()
   	}
   	if(today.getSeconds()<=9)
   		ss="0"+today.getSeconds().toString();
   	else{
   		ss=today.getSeconds();
   	}
	var time = today.getHours() + ":" + mm + ":" + ss;
   	document.getElementById('time').textContent = time;
   	document.getElementById('humidity').textContent = "Humidity : "+ data.main.humidity.toString() +" %";
   	document.getElementById('wind').textContent = "Wind : "+ data.wind.speed.toString() +" mph";
   	document.getElementById('des').textContent = data.weather[0].description;
   	const id = data.id;
   	getForecast(id)

 }

function getForecast(id){
	var uri = 'https://api.openweathermap.org/data/2.5/forecast?id='+id+'&appid=90c614fae9a83fdff03c81280b9044ba&units=imperial';

	var xhr = new XMLHttpRequest();
	xhr.open('GET',uri,true);
	xhr.onload = function(){
		const data = JSON.parse(xhr.response)
		console.log(data);
		gotForecast(data);
	}

	xhr.send(null);

}

function gotForecast(data){

	var today = new Date();
	// console.log(today)

	var arr = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
	document.getElementById('Today').textContent = arr[today.getDay()];
	var day=[];
	var j=0;
	for(var i=today.getDay();i<7;i++){

		day[j]=arr[i];
		j++;
	}
	for(var i=0;i<today.getDay();i++){
		day[j]=arr[i];
		j++;
	}

	console.log(day);
	document.getElementById('th1').textContent = day[0];
	document.getElementById('th2').textContent = day[1];
	document.getElementById('th3').textContent = day[2];
	document.getElementById('th4').textContent = day[3];
	document.getElementById('th5').textContent = day[4];
	console.log((data.list[0].dt_txt.charAt(8)) == today.getDate().toString().charAt(0))
	console.log((data.list[0].dt_txt.charAt(9)) == today.getDate().toString().charAt(1))
	// console.log(today.getDate().toString().charAt(0))
	// console.log(today.getDate().toString().charAt(1))
	for(var i=0;i<data.list.length;i++){
		if((data.list[i].dt_txt.charAt(8) == "0" || data.list[i].dt_txt.charAt(8) == today.getDate().toString().charAt(0)) && (data.list[i].dt_txt.charAt(9)==today.getDate().toString().charAt(1)) )
		{	document.getElementById('td1').textContent = data.list[i].main.temp_max;
			document.getElementById('td21').textContent = data.list[i].main.temp_min;
			
			for(var j=i+1;j<data.list.length;j++){
				if((data.list[j].dt_txt.charAt(8) == "0" || data.list[j].dt_txt.charAt(8) == (today.getDate()+1).toString().charAt(0)) && (data.list[j].dt_txt.charAt(9)==(today.getDate()+1).toString().charAt(1)) )
				{	document.getElementById('td2').textContent = data.list[j].main.temp_max;
					document.getElementById('td22').textContent = data.list[j].main.temp_min;
					
						for(var k=j+1;k<data.list.length;k++){

								if((data.list[k].dt_txt.charAt(8) == "0" || data.list[k].dt_txt.charAt(8) == (today.getDate()+2).toString().charAt(0)) && (data.list[k].dt_txt.charAt(9)==(today.getDate()+2).toString().charAt(1)) )
								{	document.getElementById('td3').textContent = data.list[k].main.temp_max;
									document.getElementById('td23').textContent = data.list[k].main.temp_min;
									
									for(var x=k+1;x<data.list.length;x++){
											if((data.list[x].dt_txt.charAt(8) == "0" || data.list[x].dt_txt.charAt(8) == (today.getDate()+3).toString().charAt(0)) && (data.list[x].dt_txt.charAt(9)==(today.getDate()+3).toString().charAt(1)) )
											{	document.getElementById('td4').textContent = data.list[x].main.temp_max;
												document.getElementById('td24').textContent = data.list[x].main.temp_min;
												
												for(var y=x+1;y<data.list.length;y++){
														if((data.list[y].dt_txt.charAt(8) == "0" || data.list[y].dt_txt.charAt(8) == (today.getDate()+4).toString().charAt(0)) && (data.list[y].dt_txt.charAt(9)==(today.getDate()+4).toString().charAt(1)) )
															{	document.getElementById('td5').textContent = data.list[y].main.temp_max;
																document.getElementById('td25').textContent = data.list[y].main.temp_min;
																
																return;

															}
												}

											}
									}

								}
						}

				}

			}

		}

	}
	


}