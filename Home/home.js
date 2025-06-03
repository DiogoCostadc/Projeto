import { createClient } from '@supabase/supabase-js'

const supabase = createClient('https://lbagxsindniuqrinfyug.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxiYWd4c2luZG5pdXFyaW5meXVnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc5MTg3NDUsImV4cCI6MjA2MzQ5NDc0NX0.vJ4oWcxhWsvytyRGqaKowYPPQaU1hvMLOSSLPU0T4AU')

let token = await supabase.auth.getUser()
let uid = token.data.user.id
console.log(uid)

let mainbody = document.getElementById("main-body")
let myplans = document.getElementById("but")

myplans.addEventListener("click", async () => {   //buscar planos

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

        let btn = document.createElement("button");
        btn.id = plan.id;
        btn.textContent = plan.nome;

        btn.addEventListener("click", function(event) {        
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

        mainbody.appendChild(btn);
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

})
