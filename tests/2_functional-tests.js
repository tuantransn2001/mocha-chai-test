var chai = require("chai");
var assert = chai.assert;

var server = require("../server");
var chaiHttp = require("chai-http");
chai.use(chaiHttp);

suite("Functional Tests", function () {
  test("Asynchronous test #example", function (done) {
    setTimeout(function () {
      assert.isOk("Async test !!");
      done();
    }, 500);
  });

  suite("Integration tests with chai-http", function () {
    suite('GET /hello?name=[name] => "hello [name]"', function () {
      test("#example - ?name=John", function (done) {
        chai
          .request(server)
          .get("/hello?name=John")
          .end(function (err, res) {
            assert.equal(res.status, 200, "response status should be 200");
            assert.equal(
              res.text,
              "hello John",
              'response should be "hello John"'
            );
            done();
          });
      });

      test("Test GET /hello with no name", function (done) {
        chai
          .request(server)
          .get("/hello")
          .end(function (err, res) {
            assert.equal(res.status, 200);
            assert.equal(res.text, "hello Guest");
            done();
          });
      });

      test("Test GET /hello with your name", function (done) {
        chai
          .request(server)
          .get("/hello?name=dev")
          .end(function (err, res) {
            assert.equal(res.status, 200);
            assert.equal(res.text, "hello dev");
            done();
          });
      });
    });

    suite("PUT /travellers", function () {
      test('#example - responds with appropriate JSON data when sending {surname: "Polo"}', function (done) {
        chai
          .request(server)
          .put("/travellers")
          .send({ surname: "Polo" })
          .end(function (err, res) {
            assert.equal(res.status, 200, "response status should be 200");
            assert.equal(
              res.type,
              "application/json",
              "Response should be json"
            );
            assert.equal(
              res.body.name,
              "Marco",
              'res.body.name should be "Marco"'
            );
            assert.equal(
              res.body.surname,
              "Polo",
              'res.body.surname should be "Polo"'
            );
            done();
          });
      });

      test('send {surname: "Colombo"}', function (done) {
        chai
          .request(server)
          .put("/travellers")
          .send({ surname: "Colombo" })
          .end(function (err, res) {
            assert.equal(res.status, 200, "response status should be 200");
            assert.equal(
              res.type,
              "application/json",
              "Response should be json"
            );
            assert.equal(
              res.body.name,
              "Cristoforo",
              'res.body.name should be "Cristoforo"'
            );
            assert.equal(
              res.body.surname,
              "Colombo",
              'res.body.surname should be "Colombo"'
            );
            done();
          });
      });

      test('send {surname: "da Verrazzano"}', function (done) {
        chai
          .request(server)
          .put("/travellers")
          .send({ surname: "da Verrazzano" })
          .end(function (err, res) {
            assert.equal(res.status, 200, "response status should be 200");
            assert.equal(
              res.type,
              "application/json",
              "Response should be json"
            );
            assert.equal(
              res.body.name,
              "Giovanni",
              'res.body.name should be "Giovanni"'
            );
            assert.equal(
              res.body.surname,
              "da Verrazzano",
              'res.body.surname should be "da Verrazzano"'
            );
            done();
          });
      });
    });
  });

  var Browser = require("zombie");

  Browser.site = "https://calm-cocoa.glitch.me";

  suite("e2e Testing with Zombie.js", function () {
    const browser = new Browser();

    suiteSetup(function (done) {
      return browser.visit("/", done);
    });

    suite('"Famous Italian Explorers" form', function () {
      test('submit "surname" : "Polo"', function (done) {
        browser.fill("surname", "Polo").pressButton("submit", function () {
          browser.assert.success();
          browser.assert.text("span#name", "Marco");
          browser.assert.text("span#surname", "Polo");
          browser.assert.element("span#dates", 1);
          done();
        });
      });

      test('submit "surname" : "Colombo"', function (done) {
        browser.fill("surname", "Colombo").pressButton("submit", function () {
          browser.assert.success();
          browser.assert.text("span#name", "Cristoforo");
          browser.assert.text("span#surname", "Colombo");
          browser.assert.element("span#dates", 1);
          done();
        });
      });

      test('submit "surname" : "Vespucci"', function (done) {
        browser.fill("surname", "Vespucci").pressButton("submit", function () {
          browser.assert.success();
          browser.assert.text("span#name", "Amerigo");
          browser.assert.text("span#surname", "Vespucci");
          browser.assert.element("span#dates", 1);
          done();
        });
      });
    });
  });
});
