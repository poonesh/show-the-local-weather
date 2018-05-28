document.addEventListener("DOMContentLoaded", function(event){

	let localWeather;
	function getLocation(){
		if(navigator.geolocation){
			navigator.geolocation.getCurrentPosition(showPosition);
		}else{
			console.log("Geolocation is not supported by this browser.");
		}
	}

	function showPosition(position){
		let latitude = position.coords.latitude;
		let longitude = position.coords.longitude;
		let localWeatherRequest = new XMLHttpRequest();
		localWeatherRequest.open("GET", 'http://api.openweathermap.org/data/2.5/weather?lat='+latitude+'&lon='+longitude+
				'&APPID=9492469ab458cfd72f7c962d1d6512ed');

		localWeatherRequest.onload = function(){
				localWeather = JSON.parse(localWeatherRequest.responseText);
				document.querySelector(".tempC").innerHTML = (Math.round(Number(localWeather.main.temp) - 273.15)+"C");
		};
		localWeatherRequest.send();
	}

	document.querySelector(".convertToF").addEventListener("click", function(){
		document.querySelector(".tempC").innerHTML = (Math.round(Number(localWeather.main.temp) - 273.15)*9/5+32+"F");	
	});

	getLocation();
		
});