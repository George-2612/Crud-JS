// Validate form inputus before submiting data
function validateForm(){
    var name = document.getElementById("name").value;
    var age = document.getElementById("age").value;
    var address = document.getElementById("address").value;
    var email = document.getElementById("email").value;

    if(name == ""){
        alert("Name is requred");
        return false;
    }

    if(age == ""){
        alert("Age is requred");
        return false;
    }
    else if(age < 1){
        alert("Age must not be zero or less than zero");
        return false;
    }

    if(address ==""){
        alert("Address is required");
        return false;
    }

    if(email == ""){
        alert("Email is required");
        return false;
    }
    else if (!email.includes("@")){
        alert("Invalid email address");
        return false;
    }

    return true;
}

// function to show data from local storage 
function showData(){
    var peoplelist;
    if(localStorage.getItem("peoplelist") == null){
        peoplelist = [];
    }
    else{
        peoplelist = JSON.parse(localStorage.getItem("peoplelist"));
    }

    var html = "";

    peoplelist.forEach(function (element, index){
        html += "<tr>";
        html += "<td>" + element.name + "</td>"; 
        html += "<td>" + element.age + "</td>"; 
        html += "<td>" + element.address + "</td>"; 
        html += "<td>" + element.email + "</td>"; 
        html += '<td><button onclick="deleteData('+index+')" class="btn btn-danger">Delete</button><button onclick="updateData('+index+')" class="btn btn-warning m-2">Edit</button></td>';
        html +="</tr>"
    });

    document.querySelector("#crudTable tbody").innerHTML = html;
}

// Loads all data from local storage when document or page loaded
document.onload = showData()

// function to add data to local storage

function AddData(){
    // if form is validate
    if(validateForm() == true){
        var name = document.getElementById("name").value;
        var age = document.getElementById("age").value;
        var address = document.getElementById("address").value;
        var email = document.getElementById("email").value;
        
        var peoplelist;
        if(localStorage.getItem("peoplelist") == null){
            peoplelist = [];
        }
        else{
            peoplelist = JSON.parse(localStorage.getItem("peoplelist"));
        }

        peoplelist.push({
            name: name,
            age: age,
            address: address,
            email: email, 
        });

        localStorage.setItem("peoplelist", JSON.stringify(peoplelist));
        showData();
        document.getElementById("name").value = "";
        document.getElementById("age").value = "";
        document.getElementById("address").value = "";
        document.getElementById("email").value = "";
    }
}

// Function to delete  data from local storage
function deleteData(index){
    var peoplelist;
    if(localStorage.getItem("peoplelist") == null){
        peoplelist = [];
    }
    else{
        peoplelist = JSON.parse(localStorage.getItem("peoplelist"));
    }

    peoplelist.splice(index, 1);
    localStorage.setItem("peoplelist", JSON.stringify
    (peoplelist));
    showData();
}

// Function to update/edit data in local storage

function updateData(index){
    // Submit button will hide and Update button will show for updating of data in local storage
    document.getElementById("submit").style.display = "none";
    document.getElementById("update").style.display = "block";
    
    var peoplelist;
    if(localStorage.getItem("peoplelist") == null){
        peoplelist = [];
    }
    else{
        peoplelist = JSON.parse(localStorage.getItem("peoplelist"));
    }

    document.getElementById("name").value = peoplelist[index].name;
    document.getElementById("age").value = peoplelist[index].age;
    document.getElementById("address").value = peoplelist[index].address;
    document.getElementById("email").value = peoplelist[index].email;

    document.querySelector("#update").onclick = function(){
        if(validateForm() == true){
            peoplelist[index].name = document.getElementById("name").value;
            peoplelist[index].age = document.getElementById("age").value;
            peoplelist[index].address = document.getElementById("address").value;
            peoplelist[index].email = document.getElementById("email").value;

            localStorage.setItem("peoplelist", JSON.stringify(peoplelist));

            showData();
            
            document.getElementById("name").value = "";
            document.getElementById("age").value = "";
            document.getElementById("address").value = "";
            document.getElementById("email").value = "";

            // Update button will hide and submit button will show
            document.getElementById("submit").style.display = "block";
            document.getElementById("update").style.display = "none";
        }
    }
}