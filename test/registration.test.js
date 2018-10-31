let assert = require("assert");
const RegiStration = require("../registration_number.js");
const pg = require("pg");
const Pool = pg.Pool;

const connectionString =
  process.env.DATABASE_URL ||
  "postgresql://coder:coder123@localhost:5432/registration";

const pool = new Pool({
  connectionString
});

describe(" registration", function() {
  beforeEach(async function() {
    await pool.query("delete from regplates;");
  });

  it(" must show registration is from Cape Town", async function() {
    var regTown = RegiStration(pool);
    await regTown.Regadd("CA 565-334");
    assert.equal(
      await regTown.getplates("CA")[{ registration_numbers: "CA 565-334" }]
    );
  });

  it(" must show registration is from Bellville", async function() {
    var regTown = RegiStration(pool);
    await regTown.Regadd("CY 653-976");
    assert.equal(
      await regTown.getplates("CY")[{ registration_numbers: "CY 653-976" }]
    );
  });

  it(" must show registration is from Mamelsberry", async function() {
    var regTown = RegiStration(pool);
    await regTown.Regadd("CK 667-765");
    assert.equal(
      await regTown.getplates("CK")[{ registration_numbers: "CK 667-765" }]
    );
  });

  it(" must filter registration from ", async function() {
    var regTown = RegiStration(pool);
    await regTown.Regadd("CK 667-765");
    await regTown.Regadd("CY 653-976");
    await regTown.Regadd("CA 565-334");
    assert.equal(
      await regTown.filtering("CA")[{ registration_numbers: "CA 565-334" }]
    );
  });

  it(" must show the data has been cleared", async function() {
    var regTown = RegiStration(pool);
    await regTown.Regadd("CK 667-765");
    assert.equal(
      await regTown.clearPlates()[{ registration_numbers: "CK 667-765" }]
    );
  });

  after(async function() {
    await pool.end();
  });
});
