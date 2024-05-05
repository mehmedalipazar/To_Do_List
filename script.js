let sonuc;

let ul= document.getElementById("task-list");

let gorevlistesi= [
        {"id": 1, "gorevAdi" : "Gorev 1" , "durum" : "pending"},
        {"id": 2, "gorevAdi" : "Gorev 2" , "durum" : "completed"},
        {"id": 3, "gorevAdi" : "Gorev 3" , "durum" : "pending"},
        {"id": 4, "gorevAdi" : "Gorev 4" , "durum" : "completed"},
];

const taskInput = document.querySelector("#txtTaskName");
const clearBtn = document.querySelector("#clearBtn");

displayTasks();





function displayTasks(){

            ul.innerHTML="";

           for(let gorev of gorevlistesi){

            let completed = gorev.durum == "completed" ? "checked" : "";

                 li =`
                    <li class="task list-group-item">
                        <div class="form-check">
                            <input type="checkbox" onclick="updateStatus(this)" id="${gorev.id}" class="form-check-input" ${completed}>
                            <label for="${gorev.id}" class="form-check-label ${completed}">${gorev.gorevAdi}</label>
                        </div>
                        <div class="delete">
                        <a onclick="deleteTask(${gorev.id})" class="dropdown-item" href="#"><button type="button" class="btn-close" aria-label="Close"></button></a>
                        </div>
                    </li>   
                `;

                ul.insertAdjacentHTML("beforeend",li);
              
                   
            }
           
        }
        document.querySelector("#btnAddNewTask").addEventListener("click",newTask);

        document.querySelector("#txtTaskName").addEventListener("keypress", function() {
            if (event.key == "Enter") {

                event.preventDefault();
                document.getElementById("btnAddNewTask").click();
                
            }
        });


        function newTask(event){
    
            if(taskInput.value==""){
                alert("LUTFEN YAZI GIRINIZ.");
            }
            
            else{

                if (gorevlistesi.length==0) {

                    gorevlistesi.push({"id":1, "gorevAdi": taskInput.value});
                    displayTasks();
                    taskInput.value="";
                }
                else{

                    gorevlistesi.push({"id":gorevlistesi[gorevlistesi.length-1].id+1, "gorevAdi": taskInput.value});
                    displayTasks();
                    taskInput.value="";
                }
            }
            event.preventDefault();
        }


        function deleteTask(id){

            let deletedId;

            deletedId= gorevlistesi.findIndex(function(gorev){
                return gorev.id==id;
            });

            gorevlistesi.splice(deletedId, 1);
            displayTasks();

        }


        clearBtn.addEventListener("click", function(){

            gorevlistesi.splice(0,gorevlistesi.length);
            displayTasks();

        });


        function updateStatus(selectedTask){
            /* console.log(selectedTask.parentElement.l333astElementChild); 
            console.log(selectedTask.nextElementSibling); */                  //İkiside aynı yere işaret eder
            let label = selectedTask.nextElementSibling;

            if (selectedTask.checked) {
                label.classList.add("checked");
                durum = "completed";
            } else {
                label.classList.remove("checked");
                durum = "pending";
            }

            for(let gorev of gorevlistesi){
                if(gorev.id == selectedTask.id){
                    gorev.durum = durum;
                }
            }
}