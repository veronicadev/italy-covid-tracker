
const csv = require('csvtojson');
const request=require('request');

exports.getLatestNationalData = async (req, res, next) => {
  let date = req.body.date;
  const NAZIONALE_LATEST =`${process.env.DATASOURCE_HOST}${process.env.DATASOURCE_BASE_URL}/dati-andamento-nazionale/dpc-covid19-ita-andamento-nazionale-${date}.csv`;
  console.log(`** START: getLatestNationalData: ${date} **`);
  let result = [];
  csv()
    .fromStream(request.get(NAZIONALE_LATEST))
      .subscribe((data)=>{
          result.push(data);
      },
      function(error){
        console.log(error);
      },
      function(){
        console.log(`** END: getLatestNationalData: ${date} **`);
        res.status(200).json(result[0]);
      });
}

exports.getProvinceData = async (req, res, next) => {
  let date = req.body.date;
  let regionId = +req.body.regionId;
  /* TO FIX: dati dal repository non sono corretti */
  if(regionId && (regionId==21 || regionId==22)) {
    regionId = 4;
  }
  const PROVINCE = `${process.env.DATASOURCE_HOST}${process.env.DATASOURCE_BASE_URL}/dati-province/dpc-covid19-ita-province-${date}.csv`;
  console.log(`** START: getProvinceData: ${date} - ${regionId} **`);
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
        console.log(`** END: getProvinceData: ${date} - ${regionId} **`);
        res.status(200).json(result);
      });
}

exports.getRegionData = async (req, res, next) => {
  let date = req.body.date;
  const regionId = +req.body.regionId;
  const REGION = `${process.env.DATASOURCE_HOST}${process.env.DATASOURCE_BASE_URL}/dati-regioni/dpc-covid19-ita-regioni-${date}.csv`;
  console.log(`** START: getRegionData: ${date} - ${regionId} **`);
  let result = {};
  csv()
    .fromStream(request.get(REGION))
      .subscribe((region)=>{
        if(!regionId || (regionId && +region.codice_regione === regionId)){
            result = region;
          }
      },
      function(error){
        console.log(error)
      },
      function(){
        console.log(`** END: getRegionData: ${date} - ${regionId} **`);
        res.status(200).json(result);
      });
}

exports.getRegionsData = async (req, res, next) => {
  let date = req.body.date;
  const REGION = `${process.env.DATASOURCE_HOST}${process.env.DATASOURCE_BASE_URL}/dati-regioni/dpc-covid19-ita-regioni-${date}.csv`;
  console.log(`** START: getRegionsData: ${date} **`);
  let result = [];
  csv()
    .fromStream(request.get(REGION))
      .subscribe((region)=>{
          result.push(region);
      },
      function(error){
        console.log(error)
      },
      function(){
        let sortedArray = [];
        if(result && result.length>0){
          result.sort(function(a, b){
            return b.totale_positivi - a.totale_positivi || b.deceduti - a.deceduti || b.dimessi_guariti - a.dimessi_guariti;
          }) 
        }
        console.log(result)
        console.log(`** END: getRegionsData: ${date} **`);
        res.status(200).json(result);
      });
}