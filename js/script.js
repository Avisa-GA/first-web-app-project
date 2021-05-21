
/*----- constants -----*/
/*----- app's state (variables) -----*/
let weatherData;
/*----- cached element references -----*/
const apiAddress = `http://api.openweathermap.org/data/2.5/forecast?q=houston&cnt=5&appid=c8f827699e922be9a613a16ce1a00f37&units=imperial`
/*----- event listeners -----*/
/*----- functions -----*/

$('h1').addClass('text-center');

const response = $.ajax({url: 'http://api.openweathermap.org/data/2.5/forecast?q=houston&cnt=5&appid=c8f827699e922be9a613a16ce1a00f37&units=imperial'}).then( (data) => {
    // success
    console.log(data['city']['name'])

    data['list'].forEach(element => {
        console.log(element['main']['temp'])
        console.log(element['main']['feels_like'])
        element['weather'].forEach(function(elem) {
            console.log(elem['description'])
        })
    });

},
    (error) => {
        console.log('Bad Request: ', error)
    }
)

