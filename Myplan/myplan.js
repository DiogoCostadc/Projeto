import { createClient } from '@supabase/supabase-js'

const supabase = createClient('https://lbagxsindniuqrinfyug.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxiYWd4c2luZG5pdXFyaW5meXVnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc5MTg3NDUsImV4cCI6MjA2MzQ5NDc0NX0.vJ4oWcxhWsvytyRGqaKowYPPQaU1hvMLOSSLPU0T4AU')

//Variaveis do HTML
//-----------------------------------------------------------------------
let currentPlan = localStorage.getItem("currentPlan") //id do plano atual
let header = document.getElementById("header")      
let body = document.getElementById("list")
let share = document.getElementById("share")
let backbut = document.getElementById("backbut")
let deleteplan = document.getElementById("deletebut")
console.log(currentPlan)
//------------------------------------------------------------------------
//Nome do plano
let plano = await supabase
.from("Planos")
.select()
.eq("id", currentPlan)
let planName = plano.data[0].nome
//-----------------------------------------------

//Array com relação exercicio-plano
let exercicio = await supabase
.from("Plano-Exercicio")
.select()
.eq("plano", currentPlan)
console.log(exercicio.data)
//------------------------------------------

//exerarray guarda os ids dos exercicios 
    let exerarray = []             
    //-------------------------------------
    exercicio.data.forEach(exercicio => {
        console.log(exercicio.exercicio)
        exerarray.push(exercicio.exercicio)
    });
    console.log(exerarray)
    //-------------------------------------

    let exercicioinfo = await supabase //procura info do exercicio
    .from("Exercicio")
    .select()
    .in("id", exerarray)
    console.log(exercicioinfo.data) //array com informação de todos os exercicios do plano
    let exinfo = exercicioinfo.data
//-------------------------------------------------------------
    
//Função para mostrar os exercicios
//------------------------------------------------------------------
planinfo()
async function planinfo() {
    header.innerHTML = `${planName}`
let exercicioinfo = await supabase      //procura info do exercicio
    .from("Exercicio")
    .select()
    .in("id", exerarray)

//For cria e adiciona html com a informação de cada plano
//--------------------------------------------------------------------
for (let i = 0 ; i < exinfo.length; i++){
     
    console.log(exercicioinfo.data[i])
    let info = exercicioinfo.data[i]

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
//--------------------------------------------------------------
}

//Butão de partilha para adicionar plano a uma tabela com todos os planos partilhados por utilizadores
//--------------------------------------------------------------
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
//------------------------------------------------------------

//Butão para voltar para o menu principal
//--------------------------------------------------------------
backbut.addEventListener("click", async()=>{
    homepage()
})
//----------------------------------------------

//Butão para apagar o plano
//-----------------------------------------------
deleteplan.addEventListener("click", async()=>{
    let deleteplan = await supabase
  .from('Planos')
  .delete()
  .eq('id', currentPlan )
    
    let deletefav = await supabase
    .from('Partilhados')
    .delete()
    .eq('plano', currentPlan)

 console.log(deleteplan) 
 homepage()
})
//------------------------------------------------

//Função para voltar ao menu principal
//------------------------------------------------
function homepage(){
window.location.replace("../Home/index.html")
}
//-------------------------------------------------
