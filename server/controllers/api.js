
const https = require('https')



exports.getNationalData = async (req, res, next) => {
    console.log("getNationalData");
    const options = {
        hostname: process.env.DATASOURCE_HOST,
        path: `${process.env.DATASOURCE_BASE_URL}/dati-json/dpc-covid19-ita-andamento-nazionale-latest.json`,
        method: 'GET'
      }
      
      callback = function(response) {
        let str = "";
        response.on('data', function (chunk) {
          str += chunk;
        });
      
        response.on('end', function () {
          console.log(request.data);
          res.status(200).json(JSON.parse(str));
          // your code here if you want to use the results !
        });
      }
      
      var request = https.get(options.hostname+options.path, callback).end();
}

exports.getRegionData = async (req, res, next) => {
    const regionId = req.params.regionId;
    console.log("getRegionData", regionId);
}