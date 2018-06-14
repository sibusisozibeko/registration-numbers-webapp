//referencing
var textElem = document.querySelector('.myTextarea')
var btnElem = document.querySelector('.btnAdd')
var resetElem = document.querySelector('.Reset')
var displayElement = document.querySelector('.display')
var radioElem = document.querySelector('.radioz')
var showElem = document.querySelector('.Show')

var storing = localStorage.getItem('users') ? JSON.parse(localStorage.getItem('users')) : {};
// console.log(storing);
//instance
var enteredReg = RegiStration(storing)

//function for list of regnumbers
function btnClicked(regList) {

  if (regList !== '') {

    var createList = document.createElement("li");
    //li with the content assigned to parameter
    createList.textContent = regList;
    //displaying another entered text inside the list
    displayElement.appendChild(createList)

    localStorage.setItem('users', JSON.stringify(enteredReg.regMap()));

  }
  //creation of "li" element
  textElem.value = "";

}

function radioClicked() {
  var radio = document.querySelector(("input[name='radio']:checked")).value;
  var radioselect = enteredReg.filtering(radio);
  for (var i = 0; i < radioselect.length; i++) {
    btnClicked(radioselect[i]);
  }
  // displayElement.innerHTML = storing;
}

function resetBtnClick() {
  localStorage.clear()
  location.reload();
}

//addEventListener
btnElem.addEventListener('click', function() {
  var entered = textElem.value;
  if (enteredReg.Regadd(entered)) {

    btnClicked(entered);
  }

});

resetElem.addEventListener('click', resetBtnClick);

showElem.addEventListener('click', function() {
  radioClicked()
});

// radioElem.addEventListener('click', function() {
// radioClicked()
// });
