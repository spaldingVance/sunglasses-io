let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../app/server');

let should = chai.should();

chai.use(chaiHttp);

describe('sunglasses', () => {
  describe('/GET brands', () => {
    it('it should GET all the brands', done => {
      chai
        .request(server)
        .get('/api/brands')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.an('array');
          res.body.length.should.be.eql(5);
          done();
        });
    });
  });
  describe('/POST login', () => {
    it('it should log a user into the system', done => {
      let login = {
        "username": "yellowleopard753",
        "password": "jonjon",
        "salt": "eNuMvema",
        "md5": "a8be2a69c8c91684588f4e1a29442dd7",
        "sha1": "f9a60bbf8b550c10712e470d713784c3ba78a68e",
        "sha256": "4dca9535634c102fbadbe62dc5b37cd608f9f3ced9aacf42a5669e5a312690a0"
      };
      chai
        .request(server)
        .post('/api/login')
        .send(login)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('string');
          done();
        })
    })
  })
  describe('/GET products', () => {
    it('it should get all products', done => {
      chai
        .request(server)
        .get('/api/products')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.an('array');
          res.body.length.should.be.eql(11);
          done();
        })
    })
  })
  describe('/GET products from brandID', () => {
    it('it should get all products from a given brand', done => {
      let brandId = 2;
      chai
        .request(server)
        .get(`/api/brands/${brandId}/products`)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.an('array');
          res.body.length.should.be.eql(2);
          done();
        })
    })
  })
  describe('/GET me/cart', () => {
    it('it should get all items in a users cart', done => {
      let login = {
        "username": "yellowleopard753",
        "password": "jonjon",
        "salt": "eNuMvema",
        "md5": "a8be2a69c8c91684588f4e1a29442dd7",
        "sha1": "f9a60bbf8b550c10712e470d713784c3ba78a68e",
        "sha256": "4dca9535634c102fbadbe62dc5b37cd608f9f3ced9aacf42a5669e5a312690a0"
      };
      chai
        .request(server)
        .post('/api/login')
        .send(login)
        .end((err, res) => {
          let accessToken = res.body;
          chai
            .request(server)
            .get(`/api/me/cart?accessToken=${accessToken}`)
            .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.an('array');
            res.body.length.should.be.eql(0);
            done();
        })
        })
      

    })
  })
})