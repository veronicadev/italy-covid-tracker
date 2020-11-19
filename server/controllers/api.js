
const https = require('https');


exports.getLatestNationalData = async (req, res, next) => {
  const NAZIONALE_LATEST = process.env.DATASOURCE_BASE_URL+'/dati-json/dpc-covid19-ita-andamento-nazionale-latest.json';
  console.log("getLatestNationalData");
  callback = function(response) {
    let str = "";
    response.on('data', function (chunk) {
      str += chunk;
    });
    
    response.on('end', function () {
      res.status(200).json(JSON.parse(str)[0]);
    });
  }
      
  let request = https.get(`${process.env.DATASOURCE_HOST}${NAZIONALE_LATEST}`, callback).end();
}

exports.getProvinceData = async (req, res, next) => {
  const PROVINCE = process.env.DATASOURCE_BASE_URL+'/dati-json/dpc-covid19-ita-province-latest.json';
  //const date = req.body.date;
  const regionId = req.body.regionId;
  console.log("getProvinceData");
    callback = function(response) {
      let str = "";
      response.on('data', function (chunk) {
        str += chunk;
      });
    
      response.on('end', function () {
        let province = JSON.parse(str);
        let result = province;
        if(regionId){
          console.log(regionId)
          result = province.filter(prov => prov.codice_regione === +regionId);
        }
        res.status(200).json(result);
      });
    }
    
    let request = https.get(`${process.env.DATASOURCE_HOST}${PROVINCE}`, callback).end();
}