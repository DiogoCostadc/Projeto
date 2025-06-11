import { createClient } from '@supabase/supabase-js'

const supabase = createClient('https://lbagxsindniuqrinfyug.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxiYWd4c2luZG5pdXFyaW5meXVnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc5MTg3NDUsImV4cCI6MjA2MzQ5NDc0NX0.vJ4oWcxhWsvytyRGqaKowYPPQaU1hvMLOSSLPU0T4AU')

let currentPlan = localStorage.getItem("currentPlan")
let header = document.getElementById("header")
let body = document.getElementById("list")
let share = document.getElementById("share")
let backbut = document.getElementById("backbut")

let plano = await supabase
.from("Planos")
.select()
.eq("id", currentPlan)
let planName = plano.data[0].nome


let exercicio = await supabase
.from("Plano-Exercicio")
.select()
.eq("plano", currentPlan)

console.log(exercicio.data)

let exerarray = []              //guarda o id dos exercicios do plano

    exercicio.data.forEach(exercicio => {
        console.log(exercicio.exercicio)
        exerarray.push(exercicio.exercicio)
    });
    console.log(exerarray)

    let exercicioinfo = await supabase      //procura info do exercicio
    .from("Exercicio")
    .select()
    .in("id", exerarray)
    console.log(exercicioinfo.data)
    let exinfo = exercicioinfo.data

    
    

planinfo()
async function planinfo() {
    header.innerHTML = `${planName}`

for (let i = 0 ; i < exinfo.length; i++){
     let exercicioinfo = await supabase      //procura info do exercicio
    .from("Exercicio")
    .select()
    .in("id", exerarray)
    console.log(exercicioinfo.data[i])
    let info = exercicioinfo.data[i]
   


    

    //` <p>nome : ${info.nome}, descrição : ${info.desc}, observação : ${info.obs}</p>` 

    body.innerHTML += `<div class="lista-item">
                        <div class="info">
                            <div class="nome-desc">
                            <label class="nome">${info.nome}</label>
                            <label class="descricao">${info.desc}</label>
                        </div>
                            <label class="obs">${info.obs}</label>
                        </div>
                        <div class="image">
                            <img src="https://firstbenefits.org/wp-content/uploads/2017/10/placeholder-300x300.png" alt="placeholder" />
                        </div>
                    </div>`
}



}

share.addEventListener("click", async()=>{
    let {data, error} = await supabase
    .from("Partilhados")
    .select()
    .eq("plano", currentPlan)
    console.log(data)
    if(data.length > 0){

        alert("Plano Já partilhado")

    }else{
    let shareplan = await supabase
    .from("Partilhados")
    .insert({plano: currentPlan})
    alert("Plano Partilhado")
    }
})

backbut.addEventListener("click", async()=>{
    window.location.replace("../Home/index.html")
})