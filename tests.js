const chai = require('chai');
const chaiHttp = require('chai-http');

const app = require('./server');
const Models = require('./models');
const createData = require('./data/createData');

chai.use(chaiHttp);

const expect = chai.expect;

describe("Tests", function() {

  before(function() {
    const models = new Models();
    return models.sync().then(() => createData(models));
  });

  it("test", (done) => {
    chai.request(app)
      .get('/users')
      .end((err, res) => {
         expect(res.status).to.eql(200);
         expect(res.body.length).to.eql(1);
         expect(res.body[0].firstName).to.eql('John');
         done();
      });
   });
});
