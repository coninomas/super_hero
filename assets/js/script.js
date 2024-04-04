$(document).ready(function () {
    $('button').click(function () {
        let nombreSuperheroe = $('#ingresoDatos').val();
        let regex = /^[0-9]+$/;
        buscarSuperheroe(nombreSuperheroe);

        if (regex.test(nombreSuperheroe)) {
            console.log("Dato ingresado es correcto");
        }
        else {
            alert('porfavor reintente su busqueda')
            console.log("Dato ingresado no es valido");
        }
        if (nombreSuperheroe > 731) {
            alert('porfavor reintente su busqueda')
            console.log('no se encuentra ID')
        }
    });
});

function buscarSuperheroe(nombreSuperheroe) {
    $.ajax({
        url: `https://www.superheroapi.com/api.php/4905856019427443/${nombreSuperheroe}`,
        method: "GET",
        datatype: "JSON",

        success: function (data) {
            $("#tarjeta").empty();
            let conexion = data.connections["group-affiliation"];
            let primeraAparicion = data.biography["first-appearance"];

            if (conexion == "-") {
                conexion = "No hay informacion disponible ";
            };
            if (primeraAparicion == "-") {
                primeraAparicion = "No hay informacion disponible ";
            };

            let card =
                `<div class="row m-3">
                  <div class="col-md-4">
                    <img src="${data.image.url}" class="img-fluid rounded-start" alt="${data.name}">
                  </div>
                  <div class="col-md-8 px-2">
                    <div class="card-body">
                    <h5>SuperHero Encontrado</h5>
                    <hr>
                      <h6 class="card-title">${data.name}</h6>
                      <p class="card-text">Conexiones: ${conexion}</p>
                      <p class="card-text"><small class="text-body-secondary">Publicado por: ${data.biography.publisher}</small></p>
                      <hr>
                      <p class="card-text"><small class="text-body-secondary">Ocupación: ${data.work.occupation}</small></p>
                      <hr>
                      <p class="card-text"><small class="text-body-secondary">Primera aparición: ${primeraAparicion}</small></p>
                      <hr>
                      <p class="card-text"><small class="text-body-secondary">Altura: ${data.appearance.height}</small></p>
                      <hr>
                      <p class="card-text"><small class="text-body-secondary">Peso: ${data.appearance.weight}</small></p>
                      <hr>
                      <p class="card-text"><small class="text-body-secondary">Alianzas: ${data.biography.aliases}</small></p>
                    </div>
                  </div>
                </div>
                `;

            $("#tarjeta").append(card);
            console.log(data.name);


            $("#charContainer").empty();
            if (data.powerstats.intelligence == "null") {
                alert ("No se encontraron datos para" + data.name)};
                
            var chart = new CanvasJS.Chart("chartContainer",
                {
                    animationEnabled: true,
                    theme: "light2",
                    title: {
                        text: "Estadísticas para " + data.name
                    },
                    data: [
                        {
                            type: "pie",
                            showInLegend: true,
                            legendText: "{indexLabel}",
                            toolTipContent: "{y} (#percent%)",
                            dataPoints: [
                                { y: data.powerstats.intelligence, indexLabel: "Inteligencia" },
                                { y: data.powerstats.strength, indexLabel: "Fuerza" },
                                { y: data.powerstats.speed, indexLabel: "Velocidad" },
                                { y: data.powerstats.durability, indexLabel: "Resistencia" },
                                { y: data.powerstats.power, indexLabel: "Poder" },
                                { y: data.powerstats.combat, indexLabel: "Combate" },
                            ]
                        }
                    ]
                });
            chart.render();
        },
    });
};




