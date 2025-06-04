import { createClient } from '@supabase/supabase-js'

const supabase = createClient('https://lbagxsindniuqrinfyug.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxiYWd4c2luZG5pdXFyaW5meXVnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc5MTg3NDUsImV4cCI6MjA2MzQ5NDc0NX0.vJ4oWcxhWsvytyRGqaKowYPPQaU1hvMLOSSLPU0T4AU')

//------------------------------------------------------
let addbut = document.getElementById("addbut")
let form = document.getElementById("testform")
let exe = document.getElementById("exer")
let exlist = document.getElementById("exlist")
let planid = localStorage.getItem("CreateIdPlan")

//------------------------------------------------------
let token = await supabase.auth.getUser()
let uid = token.data.user.id
console.log(uid)

let user = await supabase        //buscar user
        .from('User')
        .select()
        .eq("user_id", uid)
     let userfinal = user.data[0].id

console.log(userfinal)
//----------------------------------------------------
let exercicio = await supabase
    .from('Exercicio')
    .select()
    console.log(exercicio.data)
    let exercicios = exercicio.data
    let exerarray = []
    exercicios.forEach(teste => {
        exerarray.push(teste.id)
       
    });
    console.log(exerarray)

//------------------------------------------------------------------------

addbut.addEventListener("click", async()=>{
    


for (let i = 0 ; i < exerarray.length ; i++){
    let teste = await supabase
    .from("Exercicio")
    .select()
    .eq ("id", exerarray[i] )
    console.log(teste.data[0].nome)

  let opt = document.createElement("option")
  opt.id = teste.data[0].id
  opt.textContent = teste.data[0].nome
  opt.value = teste.data[0].id
  

  exe.appendChild(opt)
}
 exe.addEventListener("change", function(event){
    let optid = event.target.value
    console.log(optid)

    let exinfoname 
    let exinfodesc 
    let exinfoobs

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

        let insert = await supabase
        .from('Plano-Exercicio')
        .insert({plano: planid, exercicio : optid})
        
      exlist.innerHTML += `<p>nome: ${exinfoname}, desc : ${exinfodesc}, obs : ${exinfoobs}</p>`
   }
  
  })


})