const chai = require('chai')
const expect = chai.expect
const chaiHttp = require('chai-http')
const app = require('../index')

chai.use(chaiHttp)

describe("Product test", () => {

    it("check get", done => {

        chai.request(app)
            .get('/api/products').use((req, next) => {
                console.log(req);
                console.log(next)
                req.dynamoConnector = "123";
            })
            .end((err, res) => {

                expect(res).to.have.status(400)
                done()
            })
    })
})