import { createClient } from '@supabase/supabase-js'


const supabase = createClient('https://lbagxsindniuqrinfyug.supabase.co','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxiYWd4c2luZG5pdXFyaW5meXVnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc5MTg3NDUsImV4cCI6MjA2MzQ5NDc0NX0.vJ4oWcxhWsvytyRGqaKowYPPQaU1hvMLOSSLPU0T4AU')

//---------------------------------------------------------------
let name = document.getElementById("name")
let email = document.getElementById("email")
let age = document.getElementById("age")
let phone = document.getElementById("phonenumber")
let subscription = document.getElementById("subscription")
let weight = document.getElementById("weight")
let cal = document.getElementById("calories")
let Ebt = document.getElementById("Echange")
let Abt = document.getElementById("Achange")
let Pbt = document.getElementById("Pchange") 
let Sbt = document.getElementById("Schange")
let Wbt = document.getElementById("Wchange")
let Cbt = document.getElementById("Cchange")
let input = document.getElementById("prompt")

//---------------------------------------------------------------

let token = await supabase.auth.getUser()
let uid = token.data.user.id
console.log(uid)
let uemail = token.data.user.email

let user = await supabase        //buscar user
        .from('User')
        .select()
        .eq("user_id", uid)
     let userfinalid = user.data[0].id
     let userData = user.data[0]
console.log(userfinalid)
console.log(userData)

//------------------------------------------------------------------------
loadinfo()
function loadinfo() {
    name.innerHTML = userData.username
    //email.innerHTML = 
    age.innerHTML = (`Data de nascimento : ${userData.age_birth}`)
    phone.innerHTML = (`Telemovel : ${userData.telephone}`) 
  
    weight.innerHTML = (`Peso : ${userData.weight}Kg`)
    cal.innerHTML = (`Calorias perdidas : ${userData.calories} `) 
}

Abt.addEventListener("click", async()=>{
    
    let anchor = document.createElement("input")
    anchor.type = "date"
    anchor.id = "value"
    input.appendChild(anchor)
    let butanchor = document.createElement("button")
    butanchor.type = "button"
    butanchor.id = "butid"
    butanchor.innerText = "confimar"
    input.appendChild(butanchor)

    butanchor.addEventListener("click", async()=>{
        let valueinput = document.getElementById("value")
        console.log(valueinput.value)
        const {data, error} = await supabase
        .from("User")
        .upsert({id : userfinalid, age_birth : valueinput.value})
        input.innerHTML = ""
        window.location.reload()
    })
})

Pbt.addEventListener("click", async()=>{
    let anchor = document.createElement("input")
    anchor.type = "tel"
    anchor.id = "value"
    anchor.placeholder = "***-***-***"
    anchor.maxLength = "9"
    input.appendChild(anchor)
    let butanchor = document.createElement("button")
    butanchor.type = "button"
    butanchor.id = "butid"
    butanchor.innerText = "confimar"
    input.appendChild(butanchor)

    butanchor.addEventListener("click", async()=>{
        let valueinput = document.getElementById("value")
        console.log(valueinput.value)
        const {data, error} = await supabase
        .from("User")
        .upsert({id : userfinalid, telephone : valueinput.value})
        input.innerHTML = ""
        window.location.reload()
    })

})

Wbt.addEventListener("click", async()=>{
    let anchor = document.createElement("input")
    anchor.type = "number"
    anchor.id = "value"
    
    input.appendChild(anchor)
    let butanchor = document.createElement("button")
    butanchor.type = "button"
    butanchor.id = "butid"
    butanchor.innerText = "confimar"
    input.appendChild(butanchor)

     butanchor.addEventListener("click", async()=>{
        let valueinput = document.getElementById("value")
        console.log(valueinput.value)
        const {data, error} = await supabase
        .from("User")
        .upsert({id : userfinalid, weight : valueinput.value})
        input.innerHTML = ""
        window.location.reload()
    })
})

Cbt.addEventListener("click", async()=>{
    let anchor = document.createElement("input")
    anchor.type = "number"
    anchor.id = "value"
    
    input.appendChild(anchor)
    let butanchor = document.createElement("button")
    butanchor.type = "button"
    butanchor.id = "butid"
    butanchor.innerText = "confimar"
    input.appendChild(butanchor)

    butanchor.addEventListener("click", async()=>{
        let valueinput = document.getElementById("value")
        console.log(valueinput.value)
        const {data, error} = await supabase
        .from("User")
        .upsert({id : userfinalid, calories : valueinput.value})
        input.innerHTML = ""
        window.location.reload()
    })
})

Ebt.addEventListener("click", async()=>{
    let anchor = document.createElement("input")
    anchor.type = "email"
    anchor.id = "value"

    input.appendChild(anchor)
    let butanchor = document.createElement("button")
    butanchor.type = "button"
    butanchor.id = "butid"
    butanchor.innerText = "confimar"
    input.appendChild(butanchor)

   butanchor.addEventListener("click", async()=>{
        let valueinput = document.getElementById("value")
        console.log(valueinput.value)
       const { data, error } = await supabase.auth.updateUser({
        email: `${valueinput.value}`
        })
        console.log(data)
        input.innerHTML = ""
        window.location.reload()
    })
})



