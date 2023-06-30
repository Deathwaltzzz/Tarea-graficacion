const coords = [
    [25.441123, -100.992570],
    [25.440343, -100.991796],
    [25.384212, -100.981533],
    [25.426064, -101.009217],
    [25.422920, -101.011045]
  ];

  var map;
  

const key = 'Avyp6npYCoFmn2FcLcuSfyqyq8cxiI-ZAIp_WYxemAVFsoNJKqN8dfjqD3S-1Jzw'


function loadMapScenario(){

    let defaultLocation = new Microsoft.Maps.Location(25.441123, -100.992570);

    map = new Microsoft.Maps.Map('#myMap', {
        credentials: key,
        center: defaultLocation,
        zoom: 16
    });

    map.entities.push(loadPolygon());
    
}

$(() => {
    console.log("ola");
    $("#myMap").css("height", "600px");
  
    let buttons = $("button");
    console.log(buttons);
    buttons.each((index, button) => {
      button.addEventListener("click", () => {
        console.log(button.id);
        changePinMap(button.id);
      });
    });
  
    function changePinMap(buttonId) {
      var newLocation;
      var pin;
      var infoBox;
      var name;
      buttonId = parseInt(buttonId);
      switch (buttonId) {
        case 1:
          newLocation = new Microsoft.Maps.Location(coords[0][0], coords[0][1]);
          name = "Tecnologico";
          break;
        case 2:
          newLocation = new Microsoft.Maps.Location(coords[1][0], coords[1][1]);
          name = "Ateneo Fuente"
          break;
        case 3:
          newLocation = new Microsoft.Maps.Location(coords[2][0], coords[2][1]);
          name = "Conalep II"
          break;
        case 4:
          newLocation = new Microsoft.Maps.Location(coords[3][0], coords[3][1]);
          name = "Narvaez"
          break;
        case 5:
          newLocation = new Microsoft.Maps.Location(coords[4][0], coords[4][1]);
          name = "Valle Arizpe"
          break;
      }
      pin = new Microsoft.Maps.Pushpin(newLocation);
      if(infoBox != null) infoBox.setOptions({visible: false}); 
      infoBox = new Microsoft.Maps.Infobox(newLocation, {
        title: name,
        description:  "Latitud: " + newLocation.latitude + "<br>Longitud: " + newLocation.longitude,
        visible: true,
        offset: new Microsoft.Maps.Point(0, -30)
        });
      map.entities.clear();
      map.entities.push(pin);
      map.entities.push(loadPolygon());
      map.entities.push(infoBox);
      map.setView({ center: newLocation, zoom: 16 });
    }
  });
  

function loadPolygon(){
    var polygonCoords = coords.map(coords => new Microsoft.Maps.Location(coords[0], coords[1]));
    let polygon = new Microsoft.Maps.Polygon(polygonCoords, {
        fillColor: 'rgba(0, 255, 0, 0.5)',
        strokeColor: 'red',
        strokeThickness: 2
    });

    return polygon;
}