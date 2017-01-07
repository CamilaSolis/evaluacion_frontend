$("#boton1").click(function validateForm(){

	var capi1 = $("#ciudad1 option:selected").val();
	var capi2 = $("#ciudad2 option:selected").val();


	if (capi1 == "" || capi2 ==""){

		swal("Error", "Por favor llene ambos campos", "error");
	}

	else{

		if (capi1 == capi2)
		{
			swal("Error", "Las dos ciudades no pueden ser iguales", "error");
		}

		else {
			$('.nodisplay').fadeIn(1000, function () {
            });
            $('#ciudad1').prop('disabled', 'disabled');
            $('#ciudad2').prop('disabled', 'disabled');

            var capitales = get_regiones();

            for (var i = 0; capitales.length > i;i++)
            {
            	if (capitales[i].name== capi1)
            	{
            		var lugar1 = capitales[i].distance;
            	}

            	else if (capitales[i].name == capi2)
            	{
            		var lugar2 = capitales[i].distance;
            	}
            }

            var distancia = kilometros (lugar1 , lugar2);

            var vehiculos = get_carros();

            var transPre = [0,0,0,0];

            for (var i = 0; vehiculos.length > i; i++)
            {	
            	var kml = vehiculos[i].kml;
            	transPre[i] = precio(distancia,kml, 673);
            }

            $("#precio1").text("$"+transPre[0].toFixed());
            $("#precio2").text("$"+transPre[1].toFixed());
            $("#precio3").text("$"+transPre[2].toFixed());
            $("#precio4").text("$"+transPre[3].toFixed());

			$("#map").css("height","130%");

			return;

		}
	}

});
//botones
$(document).ready(function(){
	$( "#boton" ).click(function() {
		var input = document.getElementById("caja");
		var vehiculos = get_carros();


		 for (var i = 0; vehiculos.length > i;i++)
    {

    	if($('input:radio[name=group1]:checked').val() == vehiculos[i].name){
			var maxnum = vehiculos[i].pasajeros;        	//$('#select-table > .roomNumber').attr('enabled',false);
    	}
	}
		var movil = $( "input:radio[name=group1]:checked" ).val();
		var vehiculos = get_carros();
		var personas = $("#caja").val();
		
		if(!movil){

			swal("Error", "Por favor seleccione un vehiculo", "error");



		}

		else{
				if(personas> maxnum )
			{
				var maxim = maxnum.toString();
				var num = "Por favor seleccione un maximo de " + maxim; 
				swal("Error", num + " personas." , "error");

			}

			else{

			if(movil == "automovil")
		{
			var precio = $("#precio2").text();
			precio = precio.substr(1);
			precio = precio.toString();;
			Number(precio);

			var total = Number(precio) / personas;
			var foto = "dist/img/auto.jpg";
		}

		else if(movil == "motocicleta")
		{
			var precio = $("#precio1").text();
			precio = precio.substr(1);
			precio = precio.toString();;
			Number(precio);

			var total = Number(precio) / personas;
			var foto = "dist/img/moto.jpg";
		}
		
		else if(movil == "minivan")
		{
			var precio = $("#precio3").text();
			precio = precio.substr(1);
			precio = precio.toString();;
			Number(precio);

			var total = Number(precio) / personas;
			var foto = "dist/img/van.jpg";
		}

		else if(movil == "camion" )
		{
			var precio = $("#precio4").text();
			precio = precio.substr(1);
			precio = precio.toString();;
			Number(precio);

			var total = Number(precio) / personas;
			var foto = "dist/img/camion.jpg";
		}

			}
		}



  swal({   title: "$"+total.toFixed(),   text: "Costo por persona", imageUrl: foto });
});
});



var t = false



$('input').blur(function () {
    if (t != false) {
        window.clearInterval(t)
        t = false;
    }
})

function kilometros (lugar1 , lugar2)
{

	    if ((lugar1 > 0 && lugar2 > 0) || (lugar1 < 0 && lugar2 < 0))
		{
			lugar1 = Math.abs(lugar1);
			lugar2 = Math.abs(lugar2);

			if (lugar1 < lugar2)
			{
				var resultado = lugar2 - lugar1;
			}

			if (lugar1 > lugar2)
			{
				var resultado = lugar1 - lugar2;
			}
		}

			else 
			{
				lugar1 = Math.abs(lugar1);
				lugar2 = Math.abs(lugar2);

				var resultado = lugar1 + lugar2;
			}
			return resultado;

}

function precio (kilometros, kml, precio)
{

	var pesos = (kilometros / kml)*precio;
	return pesos;

}

function persona (precio, cantidad_personas)
{

	return (precio / cantidad_personas);

}

$("#product1 input[name='group1']").click(function(){


var vehiculo = get_carros();
var input = document.getElementById("caja");


    for (var i = 0; vehiculo.length > i;i++)
    {

    	if($('input:radio[name=group1]:checked').val() == vehiculo[i].name){
        	input.setAttribute("max",vehiculo[i].pasajeros);
        	//$('#select-table > .roomNumber').attr('enabled',false);
    	}
	}

});

//mapa

function initMap() {
  var directionsService = new google.maps.DirectionsService;
  var directionsDisplay = new google.maps.DirectionsRenderer;
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 9,
	center: {lat: -33.437384, lng: -70.650473}
  });
  directionsDisplay.setMap(map);

  var onChangeHandler = function() {
    calculateAndDisplayRoute(directionsService, directionsDisplay);
  };
  document.getElementById('ciudad1').addEventListener('change', onChangeHandler);
  document.getElementById('ciudad2').addEventListener('change', onChangeHandler);
}

function calculateAndDisplayRoute(directionsService, directionsDisplay) {
  directionsService.route({
    origin: document.getElementById('ciudad1').value,
    destination: document.getElementById('ciudad2').value,
    travelMode: google.maps.TravelMode.DRIVING
  }, function(response, status) {
    if (status === google.maps.DirectionsStatus.OK) {
      directionsDisplay.setDirections(response);
    } else {
    }
  });
}

//tamaño mapa
