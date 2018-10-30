module.exports = function(pool) {
  async function Regadd(regNumber) {
    let towns = await pool.query("select town_initials from licenceplate");

    let numplates = regNumber.substring(0, 2).trim();
    //console.log(numplates);
    if (regNumber !== "") {
      for (let i = 0; i < towns.rows.length; i++) {
        const element = towns.rows[i].town_initials;
        //console.log(element);
        if (regNumber.startsWith(element)) {
          let inspectReg = await pool.query(
            `select registration_numbers from regplates where registration_numbers = $1`,
            [regNumber]
          );
          // console.log(inspectReg.rowCount);
          if (inspectReg.rowCount === 0) {
            let Id_reg = await getidLoc(numplates);
            // console.log(Id_reg);
            await pool.query(
              `insert into regplates(registration_numbers, town_id) values($1, $2)`,
              [regNumber, Id_reg.id]
            );
            // console.log("awesome");
            return "awesome";
          } else {
            console.log("its in the database already");
          }
        }
      }
    }
  }

  async function getidLoc(id) {
    let LocID = await pool.query(
      "select id from licenceplate where town_initials = $1",
      [id]
    );

    return LocID.rows[0];
  }

  async function codes() {
    let code = await pool.query("select town_reg from licenceplate");
    return code.rows;
  }

  async function filtering(regplates) {
    let plates = await pool.query(
      " SELECT licenceplate.town_reg, regplates.registration_numbers FROM regplates INNER JOIN licenceplate on regplates.town_id = licenceplate.id WHERE town_reg = $1",
      [regplates]
    );
    return plates.rows;
  }

  async function getplates() {
    let choosereg = await pool.query(
      "select registration_numbers from regplates"
    );
    return choosereg.rows;
  }

  async function showplates() {
    let getLoc = await pool.query(
      "select town_reg, town_initials from licenceplate"
    );
    // console.log(getLoc.rows);
    return getLoc.rows;
  }

  async function clearPlates() {
    let clear = await pool.query("delete from regplates");
    //console.log(clear.rows);
    return clear[0];
  }

  return {
    Regadd,
    getidLoc,
    getplates,
    codes,
    clearPlates,
    filtering,
    showplates
  };
};
