function getData(url, callbackFunc) {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      callbackFunc(this);
    }
  };
  xhttp.open("GET", url, true);
  xhttp.send();
}

function successAjax(xhttp) {
  // Innen lesz elérhető a JSON file tartalma, tehát az adatok amikkel dolgoznod kell
  var userDatas = JSON.parse(xhttp.responseText);


  buborekos(userDatas);
  rendezesArSzerintNovekvo(userDatas);
  torlesAholNull(userDatas);
  ertekModositas(userDatas);
  megjelenites(userDatas);
  statisztika(userDatas);
}

function buborekos(tomb) {
  var csere = 0;
  var volt_csere = true;
  while (volt_csere) {
    volt_csere = false;
    for (i = 0; i < tomb.length - 1; ++i) {
      if (parseInt(tomb[i].cost_in_credits) > parseInt(tomb[i + 1].cost_in_credits)) { // ha nagyobb, akkor csere
        volt_csere = true;
        csere = tomb[i];
        tomb[i] = tomb[i + 1];
        tomb[i + 1] = csere;
      }
    }
  }
  //console.log(tomb);
  return tomb;
}

function rendezesArSzerintNovekvo(tomb) {
  var costNull = [];
  var costNot = [];
  var egyesitett = [];

  for (let i = 0; i < tomb.length; i++) {
    if (tomb[i].cost_in_credits == null) {
      costNull.push(tomb[i]);
    } else {
      costNot.push(tomb[i]);
    }
  }
  var costNotNull = buborekos(costNot);
  egyesitett = costNotNull.concat(costNull);
  console.log(egyesitett);
  //return egyesitett;
}

document.querySelector("#search-button").addEventListener('click', function kereses(userDatas) {
  var inputMezo = document.querySelector("#search-text").value;
  var keresettHajo = {};
  var talalat = true;
  for (let i = 0; i < userDatas.length; i++) {
    if (userDatas[i].toLowerCase().model == inputMezo.toLowerCase() && talalat) {
      keresettHajo += userDatas[i];
      talalat = false;
    }
  }
  alert(keresettHajo);

});

function torlesAholNull(tomb) {
  for (var i = 0; i < tomb.length; i++) {
    if (tomb[i].consumables == null) {
      tomb.splice(i, 1);
    }
  }
  //console.log(tomb);
  return tomb;
}

function ertekModositas(tomb) {
  for (let i = 0; i < tomb.length; i++) {
    for (const key in tomb[i]) {
      if (tomb[i][key] == null) {
        tomb[i][key] = "unknown";

      }
    }

  }
  //console.log(tomb);
  return tomb;
}

function megjelenites(tomb) {
  for (var i = 0; i < tomb.length; i++) {
    var img = document.createElement("img");
    var div = document.createElement("div");
    var hajoAdatok = document.createElement("div");
    var adatok = "";
    img.className = "imgclass";
    img.id = tomb[i].id;
    div.id = "ez" + i;
    div.className = "divclass";
    hajoAdatok.className = "adatok";
    img.src = "img\/" + tomb[i].image;
    img.alt = tomb[i].model;
    document.querySelector(".shapceship-list").appendChild(div);
    document.getElementById("ez" + i).appendChild(img);
    for (var j in tomb[i]) {
      adatok += j + ": " + tomb[i][j] + "<br>";
      hajoAdatok.innerHTML = adatok;
    }
    div.appendChild(hajoAdatok);
  }
  // for (let k = 0; k < tomb.length; k++) {
  //   for (let j = 0; j < tomb[k].length; j++) {
  //     var p = document.createElement("p");
  //     p.textContent = tomb[k][j].value;
  //     p.className = "pclass";
  //     document.getElementById("ez" + k).appendChild(p);
  //   }
  // }
}
// Készítened kell egy statisztikát, mely a shapceship-list class-ű div aljára a következő adatokat fogja beleírni:
// * Egy fős (crew = 1) legénységgel rendelkező hajók darabszáma.
// * A legnagyobb cargo_capacity-vel rendelkező hajó neve (model)
// * Az összes hajó utasainak (passengers) összesített száma
// * A leghosszabb(lengthiness) hajó képe
function statisztika(tomb) {
  var darabszam = 0;
  var legnagyobbHajo = tomb[0];
  var legnagyobbHajoNeve = "";
  var osszesUtas = 0;
  var leghosszabbHajo = tomb[0];
  for (let i = 0; i < tomb.length; i++) {
    if (tomb[i].crew == 1) {
      darabszam += 1;
    }
  }
  for (let i = 0; i < tomb.length; i++) {
    if (tomb[i].cargo_capacity > legnagyobbHajo.cargo_capacity) {
      legnagyobbHajo = tomb[i];
      legnagyobbHajoNeve = tomb[i].model;
    }
  }
  for (let i = 0; i < tomb.length; i++) {
    if (tomb[i].passengers !== "unknown")
      osszesUtas += parseInt(tomb[i].passengers);
  }
  for (let i = 0; i < tomb.length; i++) {
    if (tomb[i].lengthiness > leghosszabbHajo.lengthiness) {
      leghosszabbHajo = tomb[i];
      leghosszabbHajoKepe = tomb[i].image;
    }
  }
  var statisztikaDiv = document.createElement("div");
  var statisztikaP = document.createElement("p");
  var leghosszabbHajoKepe = document.createElement("img");
  statisztikaDiv.id = "statisztika";
  statisztikaP.innerHTML = "Egy fős legénységgel rendelkező hajók darabszáma:" + darabszam + "<br>" + "A legnagyobb cargo_capacity-vel rendelkező hajó neve: " + legnagyobbHajoNeve + "<br>" +
    "Az összes hajó utasainak összesített száma: " + osszesUtas;
  leghosszabbHajoKepe.src = "img\/" + leghosszabbHajo.image;
  leghosszabbHajoKepe.alt = leghosszabbHajo.model;
  document.querySelector(".shapceship-list").appendChild(statisztikaDiv);
  document.getElementById("statisztika").appendChild(statisztikaP);
  document.getElementById("statisztika").appendChild(leghosszabbHajoKepe);
}

function kereses(tomb) {
  var inputMezo = document.querySelector("#search-text").value;
  var keresettHajo = {};
  var talalat = true;
  for (let i = 0; i < tomb.length; i++) {
    if (tomb[i].toLowerCase().model == inputMezo.toLowerCase() && talalat) {
      keresettHajo += tomb[i];
      talalat = false;
    }
  }
  alert(keresettHajo.model);
}


getData('/json/spaceships.json', successAjax);