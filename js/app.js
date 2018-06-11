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



  rendezesArSzerintNovekvo(userDatas);
  console.log(userDatas);
}

function rendezesArSzerintNovekvo(tomb) {
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
  return tomb;
}

function torlesAholNull(tomb) {
  for (var i = 0; i < array.length; i++) {
    if (tomb[i].consumables == null) {
      tomb.splice(i, 1);
    }
  }
  return tomb;
}
getData('/json/spaceships.json', successAjax);