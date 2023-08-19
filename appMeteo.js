//La ville par defaut.
let villeChoisie;

//si le personne refuse l'autorisation de la geolocalisation dans ce cas il verras just une ville predefinie.
function erreur(){
    villeChoisie = "Laval";
    recevoirTemperature(villeChoisie);
}

//Detectons la geolocalisation de notre appareil, si l'utilisateur autorise.
if("geolocation" in navigator){
    navigator.geolocation.watchPosition((position) => {

        const url = "https://api.openweathermap.org/data/2.5/weather?lat=" + position.coords.latitude + "&lon=" + position.coords.longitude + "&appid=16b9e74d554d14ba1926ae5b929f3f7f&units=metric";

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
    }, erreur, options);

}else{
    villeChoisie = 'Laval';
    recevoirTemperature(villeChoisie);
}
var options = {
    enableHighAccuracy: true
}

//Changement de ville.
let changerVille = document.querySelector('#changer');
changerVille.addEventListener('click', () => {
    villeChoisie = prompt('veuillez entree une ville de votre choix : ');
    recevoirTemperature(villeChoisie);
})

//Recuperation des donnees avec fetch
async function recevoirTemperature(villeChoisie){
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + villeChoisie + "&appid=16b9e74d554d14ba1926ae5b929f3f7f&units=metric";

    const requete = await fetch(url,{
        method: 'GET'
    });

    if(!requete.ok){
        alert("Desole un probleme est survenu, veuillez revenir plus tard!");
    }else{
        let donnees = await requete.json();

        document.querySelector('#temperature_label').textContent = donnees.main.temp;
        document.querySelector("#ville").textContent = villeChoisie;
        document.querySelector("#pays_label").textContent = donnees.sys.country;
    }
}


