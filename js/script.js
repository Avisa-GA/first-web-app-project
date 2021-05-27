$(function () {
    /*----- constants -----*/
    const $table = $(`#homes tbody`)
    const $cityName = $(`th#city`)
    const $mainContent = $('tbody#dataBody')
    const $mainBody = $('body')
    const defaultCities = [ 
        {lat: 32.779167, lng: -96.808891},
        {lat: 40.6976637, lng: -74.119763},
        {lat: 29.749907, lng: -95.358421},
        {lat: 39.099724, lng: -94.578331},
        {lat:34.0522, lng: -118.2437}
    ]
    /*----- app's state (variables) -----*/
    let weatherData, userInput;
     
    /*----- cached element references -----*/
    let randomValue = defaultCities[Math.floor(Math.random() * defaultCities.length)]
    /*----- event listeners -----*/

    $('form').on('submit', handleGetData)

    /*----- functions -----*/


    init()

    initMap(randomValue.lat, randomValue.lng)

    function init() {
        $('h1').addClass('text-center');
    }

    function handleGetData(event) {

        $mainContent.empty()

        event.preventDefault()

        userInput = $('input#search').val()

        const response = $.ajax({
            url: `https://api.openweathermap.org/data/2.5/forecast?q=${userInput}&cnt=5&appid=c8f827699e922be9a613a16ce1a00f37&units=imperial`
        }).then((data) => {

                // success
                weatherData = data
                render()
                initMap(weatherData['city']['coord']['lat'], weatherData['city']['coord']['lon'])
            },
            (error) => {
                console.log('Bad Request: ', error)
            }
        )
        $('input#search').val('')
    }


    function render() {

        $cityName.text(`${weatherData['city']['name']}`)

        weatherData['list'].forEach(function (element, idx) {
            $table.append(`
        <tr>
        <td>${idx + 1} )</td>
        <td>${element['main']['temp']}</td>
        <td>${element['main']['feels_like']}</td>
      <td>${element['weather'].map(function(elem) {
            return elem['description']
        })
        }</td>
    </tr>`)

        });
    }


    function initMap(latitude, longitude) {

        let place = {
            lat: latitude,
            lng: longitude
        }

        let map = new google.maps.Map(document.getElementById("map"), {
            zoom: 10,
            center: place
        })
       try {
        new google.maps.Marker( {
            position: place,
            map
        })
    } catch (error) {
           console.log('can not catch the location')
    }
    }


})