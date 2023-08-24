var selectedRow = null

function onFormSubmit() {
    if (validate()) {
        var formData = readFormData();
        if (selectedRow == null)
            insertNewRecord(formData);
        else
            updateRecord(formData);
        resetForm();
    }
}

function readFormData() {
    var formData = {};
    formData["fullName"] = document.getElementById("fullName").value;
    formData["website"] = document.getElementById("website").value;
    formData["phone"] = document.getElementById("phone").value;
    formData["email"] = document.getElementById("email").value;

    // Handle Skills Checkboxes
    var skillsCheckboxes = document.getElementsByName("skills");
    var selectedSkills = [];
    for (var i = 0; i < skillsCheckboxes.length; i++) {
        if (skillsCheckboxes[i].checked) {
            selectedSkills.push(skillsCheckboxes[i].value);
        }
    }
    formData["skills"] = selectedSkills.join(", ");

    return formData;
}


function insertNewRecord(data) {
    var table = document.getElementById("employeeList").getElementsByTagName('tbody')[0];
    var newRow = table.insertRow(table.length);
    cell1 = newRow.insertCell(0);
    cell1.innerHTML = data.fullName;
    cell2 = newRow.insertCell(1);
    cell2.innerHTML = data.website;
    cell3 = newRow.insertCell(2);
    cell3.innerHTML = data.phone;
    cell4 = newRow.insertCell(3);
    cell4.innerHTML = data.email;
    cell5 = newRow.insertCell(4);
    cell5.innerHTML = data.skills;
    cell6 = newRow.insertCell(5);
    cell7.innerHTML = `<a onClick="onEdit(this)">Edit</a>
                       <a onClick="onDelete(this)">Delete</a>`;
}

function resetForm() {
    document.getElementById("fullName").value = "";
    document.getElementById("website").value = "";
    document.getElementById("phone").value = "";
    document.getElementById("email").value = "";
    document.getElementById("skills").value = "";
    selectedRow = null;
}

function onEdit(td) {
    selectedRow = td.parentElement.parentElement;
    document.getElementById("fullName").value = selectedRow.cells[0].innerHTML;
    document.getElementById("website").value = selectedRow.cells[1].innerHTML;
    document.getElementById("phone").value = selectedRow.cells[2].innerHTML;
    document.getElementById("email").value = selectedRow.cells[3].innerHTML;
    document.getElementById("skills").value = selectedRow.cells[4].innerHTML;
}

function updateRecord(formData) {
    selectedRow.cells[0].innerHTML = formData.fullName;
    selectedRow.cells[1].innerHTML = formData.website;
    selectedRow.cells[2].innerHTML = formData.phone;
    selectedRow.cells[3].innerHTML = formData.email;
    selectedRow.cells[4].innerHTML = formData.skills;
}

function onDelete(td) {

    row = td.parentElement.parentElement;
    document.getElementById("employeeList").deleteRow(row.rowIndex);
    resetForm();
}

function validate() {
    isValid = true;
    if (document.getElementById("fullName").value == "") {
        isValid = false;
        document.getElementById("fullNameValidationError").classList.remove("hide");
    } else {
        isValid = true;
        if (!document.getElementById("fullNameValidationError").classList.contains("hide"))
            document.getElementById("fullNameValidationError").classList.add("hide");
    }
    return isValid;
}

