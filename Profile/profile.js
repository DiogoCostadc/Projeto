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
let logout = document.getElementById("logout")
let back = document.getElementById("back")
//--------------------------------------------------------------

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
    email.innerHTML = uemail
    age.innerHTML = (`Data de nascimento : ${userData.age_birth}`)
    phone.innerHTML = (`Telemovel : ${userData.telephone}`) 
  
    weight.innerHTML = (`Peso : ${userData.weight}Kg`)
    cal.innerHTML = (`Calorias perdidas : ${userData.calories} `) 
}

Abt.addEventListener("click", async()=>{
    
    addDataInput()

    
})

Pbt.addEventListener("click", async()=>{
    
    addTelinput()

    

})

Wbt.addEventListener("click", async()=>{
    weight.innerHTML = ""

    let anchor = document.createElement("input")
    anchor.type = "number"
    anchor.id = "value"
    weight.appendChild(anchor)

    let butanchor = document.createElement("button")
    butanchor.type = "button"
    butanchor.id = "butid"
    butanchor.innerText = "confimar"
    weight.appendChild(butanchor)
    
    butanchor.addEventListener("click", async()=>{
        let valueinput = document.getElementById("value")
        console.log(valueinput.value)
        const {data, error} = await supabase
        .from("User")
        .upsert({id : userfinalid, weight : valueinput.value})
        weight.innerHTML = ""
        window.location.reload()
    })
})

Cbt.addEventListener("click", async()=>{
    cal.innerHTML = ""

    let anchor = document.createElement("input")
    anchor.type = "number"
    anchor.id = "value"
    cal.appendChild(anchor)
    
    let butanchor = document.createElement("button")
    butanchor.type = "button"
    butanchor.id = "butid"
    butanchor.innerText = "confimar"
    cal.appendChild(butanchor)

    butanchor.addEventListener("click", async()=>{
        let valueinput = document.getElementById("value")
        console.log(valueinput.value)
        const {data, error} = await supabase
        .from("User")
        .upsert({id : userfinalid, calories : valueinput.value})
        cal.innerHTML = ""
        window.location.reload()
    })
})

Ebt.addEventListener("click", async()=>{
    
    addemailinput()

  
})

logout.addEventListener("click", async()=>{
    const { error } = await supabase.auth.signOut()
    window.location.replace("../index.html")
    window.localStorage.clear()
})

function addemailinput(){
    email.innerHTML = ""

    let anchor = document.createElement("input")
    anchor.type = "email"
    anchor.id = "value"
    email.appendChild(anchor)

    let butanchor = document.createElement("button")
    butanchor.type = "button"
    butanchor.id = "butid"
    butanchor.innerText = "confimar"
    email.appendChild(butanchor)

    butanchor.addEventListener("click", async()=>{
        let valueinput = document.getElementById("value")
        console.log(valueinput.value)
        const { data, error } = await supabase.auth.updateUser({
        email: `${valueinput.value}`
        })
        console.log(data)
        console.log(error)
        email.innerHTML = ""
        window.location.reload()
    })
}

function addTelinput(){
    phone.innerHTML = ""

    let anchor = document.createElement("input")
    anchor.type = "tel"
    anchor.id = "value"
    anchor.placeholder = "***-***-***"
    anchor.maxLength = "9"
    phone.appendChild(anchor)

    let butanchor = document.createElement("button")
    butanchor.type = "button"
    butanchor.id = "butid"
    butanchor.innerText = "confimar"
    phone.appendChild(butanchor)

    butanchor.addEventListener("click", async()=>{
        let valueinput = document.getElementById("value")
        console.log(valueinput.value)
        const {data, error} = await supabase
        .from("User")
        .upsert({id : userfinalid, telephone : valueinput.value})
        phone.innerHTML = ""
        window.location.reload()
    })

}

function addDataInput(){
    age.innerHTML = ""
    let anchor = document.createElement("input")
    anchor.type = "date"
    anchor.id = "value"
    age.appendChild(anchor)

    let butanchor = document.createElement("button")
    butanchor.type = "button"
    butanchor.id = "butid"
    butanchor.innerText = "confimar"
    age.appendChild(butanchor)

    butanchor.addEventListener("click", async()=>{
        let valueinput = document.getElementById("value")
        console.log(valueinput.value)
        const {data, error} = await supabase
        .from("User")
        .upsert({id : userfinalid, age_birth : valueinput.value})
        age.innerHTML = ""
        window.location.reload()
    })
}

back.addEventListener("click", async()=>{
    if(userData.admin == true){
        window.location.replace("../admin/index.html")
    }else{
        window.location.replace("../Home/index.html")
    }
    
})

Sbt.addEventListener("click", async()=>{
    window.location.replace("../Subscription/index.html")
})
