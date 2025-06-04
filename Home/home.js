import { createClient } from '@supabase/supabase-js'

const supabase = createClient('https://lbagxsindniuqrinfyug.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxiYWd4c2luZG5pdXFyaW5meXVnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc5MTg3NDUsImV4cCI6MjA2MzQ5NDc0NX0.vJ4oWcxhWsvytyRGqaKowYPPQaU1hvMLOSSLPU0T4AU')

let token = await supabase.auth.getUser()
let uid = token.data.user.id
console.log(uid)

let createplan = document.getElementById("create")
let page = 1
let body = document.getElementById("screen-body")
document.querySelectorAll('#change').forEach(link => {
    link.addEventListener('click', function(event) {
        pagechange();
    });
});

CurrentPage()

function CurrentPage(){
    if (page == 1){
        body.innerHTML = `<div class="screen-space" id="main-body">
                        <h2 class="text-maincolor" style="text-align: center;">What's new?</h1>
                        <div class="news-board"> <!-- What's new board -->
                            <label>A melhor app entre a turma toda 100% confiavel</label>
                        </div>
                        <hr>
                        <div class="list"> <!-- Lista -->
                            <div id="col-1" class="cols"> <!-- Coluna 1 -->
                            </div>
                            <div id="col-2" class="cols"> <!-- Coluna 2 -->
                            </div>
                        </div>
                    </div>`
    }
    else{
        body.innerHTML = `<div class="screen-space" id="main-body">
                        <div class="list"> <!-- Lista -->
                            <div id="col-1" class="cols"> <!-- Coluna 1 -->
                            </div>
                            <div id="col-2" class="cols"> <!-- Coluna 2 -->
                            </div>
                        </div>
                    </div>`
    }
    Render()
}

async function Render() {
    let col1 = document.getElementById("col-1")
    let col2 = document.getElementById("col-2")
    let user = await supabase        //buscar user
    .from('User')
    .select()
    .eq("user_id", uid)
    let userfinal = user.data[0].id

    let planos = await supabase
        .from("User-Planos")            //procura planos com o id do user
        .select()
        .eq("user", userfinal)

    let array = []                  //id dos planos num array
    let planosid = planos.data

    console.log(planos.data)

    planosid.forEach(planosid => {
        console.log(planosid.planos)

        array.push(planosid.planos)       //mete os ids no array
        console.log(array)
    });

    let planoinfo = await supabase
        .from("Planos")                     //procura info de cada plano do array
        .select()
        .in('id', array)
    console.log(planoinfo.data)

    let array2 = planoinfo.data


    for (let i = 0; i < array2.length; i++) {       //adiciona os planos num butão
        let plan = array2[i];
        console.log(plan.nome);
        console.log(plan);

        let label = document.createElement("label");
        label.textContent = plan.nome;
        
        let click = document.createElement("a")
        
        let div1 = document.createElement("div")
        div1.id = plan.id
        div1.classList.add("plan")
        let div2 = document.createElement("div")
        div2.classList.add("plan-gui")
        
        div2.appendChild(label)
        div1.appendChild(div2)
        click.appendChild(div1)

        let planlayout = click

        if ((i % 2) == 0 ){
            col1.appendChild(planlayout)
        }
        else{
            col2.appendChild(planlayout)
        }
        
        
        div1.addEventListener("click", function(event) {        
            let btnid = event.target.id
            console.log(btnid)                  
            teste()
            async function teste(){
                let planoteste = await supabase     //procura na planos-exercicios por exercicios no id do plano
                .from("Plano-Exercicio")
                .select()
                .eq("plano", btnid)
            console.log(planoteste.data)
            
            let exerarray = []              //guarda o id dos exercicios do plano

            planoteste.data.forEach(exercicio => {
                console.log(exercicio.exercicio)
                exerarray.push(exercicio.exercicio)
            });
            console.log(exerarray)

            let exercicioinfo = await supabase      //procura info do exercicio
            .from("Exercicio")
            .select()
            .in("id", exerarray)
            console.log(exercicioinfo.data)

            
            }
        }) 
    }
}

function pagechange(){
    page = page === 1 ? 2 : 1;
    CurrentPage()
    console.log("triggered")
}



/*
array2.forEach(planos => {              //cria butao como nome de cada array
    console.log(planos.nome)
    console.log(planos)
    mainbody.innerHTML += `<button id="${planos.id}" onclick="teste()" type="button">${planos.nome}</button>`



    //document.getElementById(`${planos.id}`).addEventListener("click", async () => {
    //  console.log(event.srcElement.id)
    //})
    
});*/

// async function teste() {
    //  console.log(event.srcElement.id)
//}

createplan.addEventListener("click", async()=>{

let user = await supabase        //buscar user
        .from('User')
        .select()
        .eq("user_id", uid)
     let userfinal = user.data[0].id

    let planname = prompt("Nome do plano")
    console.log(userfinal)

    let addplan = await supabase
        .from('Planos')
        .insert({nome:planname})
        .select()
    let planid = addplan.data[0].id
        

    let add = await supabase
    .from('User-Planos')
    .insert({user: userfinal, planos: planid})
    .select()
    console.log(add.data)
    localStorage.setItem("CreateIdPlan", planid)
    window.location.replace("../CreatePlan/create.html")
})
