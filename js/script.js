
/*----- constants -----*/
/*----- app's state (variables) -----*/
let weatherData;
let temperature, feelsLike, descript, cityName
/*----- cached element references -----*/
const apiAddress = `http://api.openweathermap.org/data/2.5/forecast?q=houston&cnt=5&appid=c8f827699e922be9a613a16ce1a00f37&units=imperial`
const $table = $(`#homes tbody`)
/*----- event listeners -----*/
/*----- functions -----*/

$('h1').addClass('text-center');

const response = $.ajax({url: 'http://api.openweathermap.org/data/2.5/forecast?q=houston&cnt=5&appid=c8f827699e922be9a613a16ce1a00f37&units=imperial'}).then( (data) => {
    // success
   cityName = data['city']['name']

    data['list'].forEach(function(element, idx) {
        $table.append(`
        <tr>
        <td>Day ${idx + 1}</td>
        <td>${element['main']['temp']}</td>
        <td>${element['main']['feels_like']}</td>
        
      <td>${element['weather'].map(function(elem) {
            return elem['description']
        })
    }</td>`)

    });

    // $table.append(` 
    //     <tr>
    //     <td>${cityName}</td>
    //     <td>${temperature}</td>
    //     <td>${feelsLike}</td>
    //     <td>${descript}</td>
    // </tr>
    // `);

},
    (error) => {
        console.log('Bad Request: ', error)
    }
)

