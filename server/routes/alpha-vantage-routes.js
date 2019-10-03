
const request = require('request');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));

app.get( '/cotization', (req, res) => {



    const url = "https://www.alphavantage.co/query?";
    let myFn = "TIME_SERIES_DAILY";
    let sym = req.body.company;
    let query = `${url}function=${myFn}&symbol=${sym}&outputsize=compact&apikey=2UWJHXTSHOIQRGV2`;

    let companies = ["FB", "AAPL", "MSFT", "GOOGL", "AMZN"];
    if( companies.indexOf(sym) < 0 ) {
        res.status(401).json({
            ok: false,
            message:`El símbolo ${sym} no es válido`
        });
    } else {
        let today = getToday().toString();
        let prev = getPrevious().toString();

        let todayValue;
        let previousValue;
        let dif;

        let salida = {
            "symbol": sym,
            "value": todayValue || 0,
            "previous": previousValue || 0,
            "change_percent": 0,
            "change_value": 0,
            "color_code": "green",
        };


        request.get(query, (err, resp, data) => {

            // #region comentada
            // if ( err ) return res.status(400).json({
                //     ok: false,
                //     message: "No se encontró valor para las acciones de la empresa solicitada"
            // });
            // return res.status(200).json({
                //     ok: true,
                //     data
                // });

                // console.log("value: ", (JSON.parse(data)["Time Series (Daily)"][today]["4. close"]) );
                // console.log("previous: ", JSON.parse(data)["Time Series (Daily)"][prev]["4. close"]);

            // #endregion

            if ( err ) console.log(err);

            todayValue = ( JSON.parse(resp.body)["Time Series (Daily)"][today]["4. close"] );
            previousValue = ( JSON.parse(resp.body)["Time Series (Daily)"][prev]["4. close"] );
            dif = todayValue-previousValue; // dif = previousValue-todayValue;

            let out = {
                "symbol": sym,
                "value": todayValue,
                "previous": previousValue,
                "change_percent": ( (dif)/previousValue*100 ).toFixed(2),
                "change_value": (dif).toFixed(2),
                "color_code": ( (dif) >= 0 ? "green" : "red" ),
            };
            console.log(out);
            // resp.send(out);
        });
        res.status(200).send(salida);
    }
});







function getToday(){
    let today = new Date();
    let fDate = parseDate(today);
    return `${fDate.year}-${fDate.month}-${fDate.day}`;
}

function getPrevious(){
    let previous = new Date( new Date().getTime() - (1*1000*60*60*24) ) ;
    let fDate = parseDate(previous);
    return `${fDate.year}-${fDate.month}-${fDate.day}`;

}

function parseDate(date){

    return {
        year: date.getFullYear(),
        month: ( (date.getMonth().toString().length > 9) ? `0${date.getMonth()+1}` : date.getMonth()+1 ),
        day: ( (date.getDate().toString().length === 1) ? `0${date.getDay()-1}` : date.getDay()-1 )

    };
}







module.exports = app;