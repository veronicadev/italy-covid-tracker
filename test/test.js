//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();
let expect = chai.expect;


chai.use(chaiHttp);

describe('/POST api/data/national', function(){
    it('it should return the latest national data', function(done) {
    chai.request(server)
        .post('/api/data/national')
        .send({})
        .end(function(err, res) {
            expect(err).to.be.null;
            expect(res).to.have.status(200);
            res.body.should.be.a('object');
            expect(res.body).to.have.property("totale_positivi");
            expect(res.body).to.have.property("totale_ospedalizzati");
            expect(res.body).to.have.property("dimessi_guariti");
            expect(res.body).to.have.property("deceduti");
            done();                              
          });
    });
});
