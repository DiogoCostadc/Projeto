import { createClient } from '@supabase/supabase-js'

const supabase = createClient('https://lbagxsindniuqrinfyug.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxiYWd4c2luZG5pdXFyaW5meXVnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc5MTg3NDUsImV4cCI6MjA2MzQ5NDc0NX0.vJ4oWcxhWsvytyRGqaKowYPPQaU1hvMLOSSLPU0T4AU')

//Variaveis HTML
//------------------------------------------------------
let addbut = document.getElementById("addbut")
let exlist = document.getElementById("exlist")
let planid = localStorage.getItem("CreateIdPlan")
let arrayexercicio = []
let but = document.getElementById("but")
let cancelbut = document.getElementById("cancel")
let body = document.getElementById("select")
let exinfoname 
let exinfodesc 
let exinfoobs
//------------------------------------------------------

//Informação do utilizador como Uid, ID e ID do plano criado
//------------------------------------------------------
let token = await supabase.auth.getUser()
let uid = token.data.user.id
console.log(uid)
console.log(planid)

let user = await supabase        //buscar user
        .from('User')
        .select()
        .eq("user_id", uid)
     let userfinal = user.data[0].id

console.log(userfinal)
//----------------------------------------------------

//criação de array com info de todos os exercicios e um array com o id de cada exercicio
//----------------------------------------------------
let exercicio = await supabase
    .from('Exercicio')
    .select()
    console.log(exercicio.data)
    let exercicios = exercicio.data
    

//------------------------------------------------------------------------

//Butão para criar a lista de exercicios para o utilizador escolher
//------------------------------------------------------------------------
addbut.addEventListener("click", async()=>{
//for para adicionar os planos a um select no html
//-------------------------------------------------

  body.innerHTML += `<hr>
                      <select name="exe" id="exer">                  
                      </select>`

  let exe = document.getElementById("exer")
  for (let i = 0 ; i < exercicios.length ; i++){ 
  console.log(exercicios[i].nome)

    let opt = document.createElement("option")
    opt.id = exercicios[i].id
    opt.textContent = exercicios[i].nome
    opt.value = exercicios[i].id
    exe.appendChild(opt)
  }
//---------------------------------------------------

//Sempre que houver mudança no select 
//-------------------------------------------------------
//Adiciona exercicio escolhido a um array
 exe.addEventListener("change", function(event){
    let optid = event.target.value
    console.log(optid)
  arrayexercicio.push(optid)
console.log(arrayexercicio)

//Procura info de exercicio escolhido e adiciona ao html 
//-------------------------------------------------------
    teste()
   async function teste() {
        let ex = await supabase
        .from('Exercicio')
        .select()
        .eq("id", optid)
        console.log(ex.data)

        exinfoname = ex.data[0].nome
        exinfodesc = ex.data[0].desc
        exinfoobs = ex.data[0].obs
 
      exlist.innerHTML += `<div class="lista-item">
                            <div>
                                <div class="info">
                                    <div class="nome-desc">
                                    <label class="nome">${exinfoname}</label>
                                    <label class="descricao">${exinfodesc}</label>
                                    <button>Delete</button>
                                </div>
                                    <label class="obs">${exinfoobs}</label>
                                </div>
                            </div>
                            <div class="image">
                                <img src="https://firstbenefits.org/wp-content/uploads/2017/10/placeholder-300x300.png" alt="placeholder" />
                            </div>
                        </div>`
      body.innerHTML = ``
   }
   //-------------------Fim da procura de info do plano------------------------------------------------------
  })
  //--------------------Fim da função do select-------------------------------------------------------
})
//----------------------Fim da função principal que adiciona planos ao select-----------------------------------------------------

//Butão para confimar e adicionar os exercicios selecionados ao plano
//-------------------------------------------------------------------------------------------------
but.addEventListener("click", async()=>{

  console.log(arrayexercicio)
  let addPlanArray = []
  arrayexercicio.forEach(exerID => {
    addPlanArray.push({plano: planid, exercicio : exerID})
  });
  console.log(addPlanArray)
  let insert = await supabase
  .from('Plano-Exercicio')
  .insert(addPlanArray)

  alert("Plano criado")
  homepage()
})
//------------------------------------------------------------------------------------------------------

//Butão para cancelar a apagar o plano que está a ser criado
//------------------------------------------------------------------------------------------------------
cancelbut.addEventListener("click", async()=>{
  let deleteplan = await supabase
  .from('Planos')
  .delete()
  .eq('id', planid )

  homepage()
})
//-------------------------------------------------------------------------------------------------------

//Função para voltar para a homepage
//-------------------------------------------------------------------------------------------------------
function homepage(){
window.location.replace("../Home/index.html")
}
