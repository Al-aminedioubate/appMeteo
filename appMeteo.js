//La ville par defaut.
let ville = "Laval";
recevoirTemperature(ville);

//Changement de ville.
let changerVille = document.querySelector('#changer');

changerVille.onclick = () => {
    ville = prompt('veuillez entree une ville de votre choix : ');
    recevoirTemperature(ville);
}

/* Recuperation des donnees avec AJAX
function recevoirTemperature(ville){
    //URL de L'API
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + ville + "&appid=16b9e74d554d14ba1926ae5b929f3f7f&units=metric";

    //Creation de la requete AJAX
    let requete = new XMLHttpRequest();
    requete.open('GET', url);
    requete.responseType = 'json';
    requete.send();

    requete.onload = function() {
        if(requete.readyState === XMLHttpRequest.DONE){
            if(requete.status === 200){
                let reponse = requete.response;
                let temperature = reponse.main.temp;
                let ville = reponse.name;
                document.querySelector('#temperature_label').textContent = temperature;
                document.querySelector("#ville").textContent = ville;
                document.querySelector("#pays_label").textContent = reponse.sys.country;
            }else{
                alert("Un probleme est survenu. Veuillez revenir S.V.P !");
            }
        }
    }
}*/

//Recuperation des donnees avec fetch

async function recevoirTemperature(ville){
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + ville + "&appid=16b9e74d554d14ba1926ae5b929f3f7f&units=metric";

    const requete = await fetch(url,{
        method: 'GET'
    });

    if(!requete.ok){
        alert("Desole un probleme est survenu");
    }else{
        let donnees = await requete.json();

        document.querySelector('#temperature_label').textContent = donnees.main.temp;
        document.querySelector("#ville").textContent = ville;
        document.querySelector("#pays_label").textContent = donnees.sys.country;
    }
}


