// get the input where the number of courses is
const numberinput = document.getElementById("number-input");
const reesultsContainer = document.getElementById("info-con");
const resetBTN = document.getElementById("resetBTN");
const generatebtn = document.getElementById("generate-btn");
const out = document.getElementById("outRes");
const resTable =  document.getElementById("res-table");
// let delBtn =  document.getElementsByClassName("delBtn");

// api request
const postToAPI = (data) => {
  const url = "https://toluwanimi.pythonanywhere.com/";
  fetch(url, {
    method: "post",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then(function (resp) {
      return resp.json();
    })
    .then(function (data) {
      out.innerText = data.data;
      return data;
    })
    .catch(function (error) {
      console.log("Request failed", error);
      out.innerText = 'ERROR!! invalid input, reset and re-enter inputs.';
    });
};

// function to add more inputs to the end of the given the number of courses
const appendFunc = (code, grade, unit, id) => {
  reesultsContainer.insertAdjacentHTML(
    "beforeend",
    `  <tr id='${id}'>
    <td>${code}</td>
    <td class='info-grade'>${grade}</td>
    <td class='info-unit'>${unit}</td>
  </tr>`
  // <td class='action'><span title="Remove Row" class="delBtn" id='del-${id}'>Remove</div></td>
  );
};

// check if the input is changed and get what it changes to
numberinput.addEventListener("submit", (e) => {
  e.preventDefault();
  const codeInput = document.getElementById("codeInput");
  const gradeInput = document.getElementById("gradeInput");
  const unitInput = document.getElementById("unitInput");
  resTable.style.display = 'block'
  generatebtn.style.display = 'block'
  const uid = Date.now()
  appendFunc(codeInput.value, gradeInput.value, unitInput.value, uid);
  codeInput.value = "";
  gradeInput.value = "";
  unitInput.value = "";
  return false;
});

// reset btn
resetBTN.addEventListener("click", () => {
  resTable.style.display = 'none'
  generatebtn.style.display = 'none'
  reesultsContainer.innerHTML = "";
  codeInput.value = "";
  gradeInput.value = "";
  unitInput.value = "";
  out.innerText = "";
});

// delete btn
// delBtn.addEventListener('click', (e)=>{
//   console.log(e);
// }) 

// getting all the grades and units accepted from the user and putting them into arrays
generatebtn.addEventListener("click", () => {
  // getting the grade and unit inputs
  const gradeValues = document.getElementsByClassName("info-grade");
  const unitValues = document.getElementsByClassName("info-unit");

  //   putting their values int arrays
  const gradesArr = [...gradeValues].map((single) => single.innerText.trim());
  const unitsArr = [...unitValues].map((single) =>
    parseInt(single.innerText.trim())
  );
  const data = { grades: gradesArr, units: unitsArr };
  postToAPI(data);
});
