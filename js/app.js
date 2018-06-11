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
  //rendezesArSzerintNovekvo(userDatas);
  torlesAholNull(userDatas);
  ertekModositas(userDatas);
  megjelenites(userDatas);
  adatokKiiratasa(userDatas);
}

function buborekos(tomb) {
  var csere = 0;
  var volt_csere = true;
  while (volt_csere) {
    volt_csere = false;
    for (i = 0; i < tomb.length - 1; ++i) {
      if (tomb[i].cost_in_credits > tomb[i + 1].cost_in_credits) { // ha nagyobb, akkor csere
        volt_csere = true;
        csere = tomb[i];
        tomb[i] = tomb[i + 1];
        tomb[i + 1] = csere;
      }
    }
  }
  console.log(tomb);
  return tomb;
}

// function rendezesArSzerintNovekvo(tomb) {
//   var nemSzam = [];
//   var szam = [];
//   var egyesitett = [];
//   for (var k in tomb) {
//     for (let i = 0; i < tomb.length; i++) {
//       if (tomb[k][i] == "unkonwn") {
//         nemSzam.push(tomb[k]);
//       } else {
//         szam.push(tomb[k]);
//       }

//     }
//   }
//   szam = buborekos(szam);
//   egyesitett = Object.assign(szam, nemSzam);
//   console.log(egyesitett);
//   return egyesitett;
// }


function torlesAholNull(tomb) {
  for (var i = 0; i < tomb.length; i++) {
    if (tomb[i].consumables == null) {
      tomb.splice(i, 1);
    }
  }
  console.log(tomb);
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
  console.log(tomb);
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

function adatokKiiratasa(tomb) {
  for (let i = 0; i < tomb.length; i++) {
    for (const key in tomb) {
      console.log(tomb[i][key].value);
    }
  }
}
getData('/json/spaceships.json', successAjax);