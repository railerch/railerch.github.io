// PERMISO PARA ACCEDER A LA GEOLOCALIZACION DEL CLIENTE
let dat = {};
let watchID;
const apiKey = "b5895369101cb95d025601ac7b6dd28c";

// 0 = Estatica  1 = Dinamica
let tipoConsulta = 0;

const ubicacion_por_coords = (apiKey, lat, lon) => {
    fetch(`http://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&appid=${apiKey}`)
        .then(res => res.json())
        .then(res => {
            dat.origin = `${res[0].name} - ${res[0].country}`
        }).catch(err => console.log(err))
}

const renderizar_valores = (dat, res) => {
    dat.temp = res.main.temp;
    dat.desc = res.weather[0].description;
    dat.icon = `https://openweathermap.org/img/wn/${res.weather[0].icon}@2x.png`;
    dat.windSp = res.wind.speed

    console.log(dat);

    for (let col in dat) {
        if (col != "icon") {
            document.getElementById(col).innerText = dat[col];
        } else {
            document.getElementById(col).setAttribute("src", dat[col]);
        }
    }
}

const cunsulta_geo_estatica = apiKey => {
    navigator.geolocation.getCurrentPosition(p => {
        const lat = p.coords.latitude;
        const lon = p.coords.longitude;

        // Ubicacion
        ubicacion_por_coords(apiKey, lat, lon);

        // Consultar clima
        fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`)
            .then(res => res.json())
            .then(res => {
                renderizar_valores(dat, res);
            }).catch(err => console.log(err));
    })
}

const consulta_geo_dinamica = apiKey => {
    return navigator.geolocation.watchPosition(p => {
        const lat = p.coords.latitude;
        const lon = p.coords.longitude;

        // LLAMADA A LA API
        fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`)
            .then(res => res.json())
            .then(res => {
                renderizar_valores(dat, res);
            }).catch(err => console.log(err));
    })
}

if ("geolocation" in navigator) {
    // INICIAR CONSULTA
    console.info("Consulta estatica activa!");

    document.querySelector("details").style.display = "block";
    cunsulta_geo_estatica(apiKey);

    // Activar/desactivar localizacion dinamica
    document.getElementById("loc-dinamica-btn").addEventListener("click", evt => {
        tipoConsulta = tipoConsulta == 0 ? 1 : 0;
        evt.target.innerText = tipoConsulta == 0 ? "Start dinamic localization" : "Stop dinamic localization";
        evt.target.classList.toggle("clima_dinamico");

        switch (tipoConsulta) {
            case 0:
                console.warn("Consulta estatica activa!");
                navigator.geolocation.clearWatch(watchID);
                cunsulta_geo_estatica(apiKey);
                break;
            case 1:
                watchID = consulta_geo_dinamica(apiKey);
                console.warn("Consulta dinamica activa!");
                console.log("WatchID: " + watchID);
                break;
        }
    })
} else {
    document.getElementById("aviso-no-geo").style.display = "block"
    document.getElementById("tags-div").style.display = "none"
}




