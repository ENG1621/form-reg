var form = document.getElementById("myForm"),
  userName = document.getElementById("name"),
  age = document.getElementById("age"),
  email = document.getElementById("email"),
  phone = document.getElementById("phone"),
  submitBtn = document.querySelector(".submit"),
  userInfo = document.getElementById("data"),
  modal = document.getElementById("userForm"),
  modalTitle = document.querySelector("#userForm .modal-title"),
  newUserBtn = document.querySelector(".newUser");

let getData = localStorage.getItem("userProfile")
  ? JSON.parse(localStorage.getItem("userProfile"))
  : [];

let isEdit = false,
  editId;
showInfo();

// open sms
newUserBtn.addEventListener("click", () => {
  (submitBtn.innerText = "Submit"), (modalTitle.innerText = "Fill the Form");
  // alert("fsormss")
  isEdit = false;
  
  form.reset();
  

});



function showInfo() {
  document.querySelectorAll(".employeeDetails")
    .forEach((info) => info.remove());
  getData.forEach((element, index) => {
    let createElement = `<tr class="employeeDetails">
            <td>${index + 1}</td>
            <td>${element.employeeName}</td>
            <td>${element.employeeAge}</td>
            <td>${element.employeeEmail}</td>
            <td>${element.employeePhone}</td>
            <td>
                <button class="btn btn-primary" onclick="editInfo(${index},'${element.employeeName}', '${element.employeeAge}','${element.employeeEmail}', '${element.employeePhone}')" data-bs-toggle="modal" data-bs-target="#userForm"><i class="bi bi-pencil-square"></i></button>

                <button class="btn btn-danger" onclick="deleteInfo(${index})"><i class="bi bi-trash"></i></button>
            </td>
        </tr>`;
    userInfo.innerHTML += createElement;
  });
}
showInfo();

function readInfo(name, age, email, phone) {
  (document.querySelector("#showName").value = name),
  (document.querySelector("#showAge").value = age),
   (document.querySelector("#showEmail").value = email),
   (document.querySelector("#showPhone").value = phone);

}

function editInfo(index, name, Age, Email, Phone) {
  isEdit = true;
  editId = index;
  userName.value = name;
  age.value = Age;
  (email.value = Email),
    (phone.value = Phone);


  submitBtn.innerText = "Update";
  modalTitle.innerText = "Update The Form";
}

function deleteInfo(index) {
  if (confirm("mahubtaa inaa tireeso xogtaan? ")) {
    getData.splice(index, 1);
    localStorage.setItem("userProfile", JSON.stringify(getData));
    showInfo();
  }
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
    modal.style.display = 'none'
    location.reload();
  const information = {
    employeeName: userName.value,
    employeeAge: age.value,
    employeeEmail: email.value,
    employeePhone: phone.value

  };

  if (!isEdit) {
    getData.push(information);
  } else {
    isEdit = false;
//    hideForm();
    getData[editId] = information;
  }

  localStorage.setItem("userProfile", JSON.stringify(getData));

  submitBtn.innerText = "Submit";
  modalTitle.innerHTML = "Fill The Form";

  showInfo();

  form.reset();
 
});

