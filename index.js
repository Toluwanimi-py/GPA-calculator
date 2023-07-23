// get the input where the number of courses is
const numberinput = document.getElementById("number-input");
const reesultsContainer = document.getElementById("info-con");
const resetBTN = document.getElementById("resetBTN");
const generatebtn = document.getElementById("generate-btn");
const out = document.getElementById("outRes");

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
    });
};

// function to add more inputs to the end of the given the number of courses
const appendFunc = (code, grade, unit) => {
  reesultsContainer.insertAdjacentHTML(
    "beforeend",
    ` <li>
      <span class="info-code">
        ${code}
      </span>
      <span class="info-grade">
        ${grade}
      </span>
      <span class="info-unit">
        ${unit}
      </span>
    </li>`
  );
};

// check if the input is changed and get what it changes to
numberinput.addEventListener("submit", (e) => {
  e.preventDefault();
  const codeInput = document.getElementById("codeInput");
  const gradeInput = document.getElementById("gradeInput");
  const unitInput = document.getElementById("unitInput");
  appendFunc(codeInput.value, gradeInput.value, unitInput.value);
  codeInput.value = "";
  gradeInput.value = "";
  unitInput.value = "";
  return false;
});

// reset btn
resetBTN.addEventListener("click", () => {
  reesultsContainer.innerHTML = "";
  codeInput.value = "";
  gradeInput.value = "";
  unitInput.value = "";
  out.innerText = "";
});

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
