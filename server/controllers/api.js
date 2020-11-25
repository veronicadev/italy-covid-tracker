
const https = require('https');
const moment = require('moment');
const csv = require('csvtojson');
const request=require('request');

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
  let date = req.body.date;
  let regionId = +req.body.regionId;
  /* TO FIX: dati dal repository non sono corretti */
  if(regionId && (regionId==21 || regionId==22)) {
    regionId=4;
  }
  if(date){
    date = moment(date).format("YYYYMMDD");
  }else{
    const error = new Error("Date is not valid");
    error.statusCode = 400;
    throw error;
  }
  const PROVINCE = `${process.env.DATASOURCE_HOST}${process.env.DATASOURCE_BASE_URL}/dati-province/dpc-covid19-ita-province-${date}.csv`;
  let result = [];
  csv()
    .fromStream(request.get(PROVINCE))
      .subscribe((provincia)=>{
        if(!regionId || (regionId && +provincia.codice_regione === regionId)){
            result.push(provincia);
          }
      },
      function(error){
        console.log(error)
      },
      function(){
        res.status(200).json(result);
      })
}

exports.getRegionData = async (req, res, next) => {
  let date = req.body.date;
  const regionId = +req.body.regionId;
  console.log("getRegionData")
  console.log(regionId)
  if(date){
    date = moment(date).format("YYYYMMDD");
  }else{
    const error = new Error("Date is not valid");
    error.statusCode = 400;
    throw error;
  }
  const REGION = `${process.env.DATASOURCE_HOST}${process.env.DATASOURCE_BASE_URL}/dati-regioni/dpc-covid19-ita-regioni-${date}.csv`;
  let result = {};
  csv()
    .fromStream(request.get(REGION))
      .subscribe((region)=>{
        if(!regionId || (regionId && +region.codice_regione === regionId)){
          console.log(region)
            result = region;
          }
      },
      function(error){
        console.log(error)
      },
      function(){
        res.status(200).json(result);
      })
}