import { createClient } from '@supabase/supabase-js'

const supabase = createClient('https://lbagxsindniuqrinfyug.supabase.co','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxiYWd4c2luZG5pdXFyaW5meXVnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc5MTg3NDUsImV4cCI6MjA2MzQ5NDc0NX0.vJ4oWcxhWsvytyRGqaKowYPPQaU1hvMLOSSLPU0T4AU')

let token = await supabase.auth.getUser()
let uid = token.data.user.id
console.log(uid)

let mainbody = document.getElementById("main-body")
let but = document.getElementById("but")


but.addEventListener("click", async() =>{   //buscar planos
  
   let user = await supabase
    .from('User')
    .select()
    .eq("user_id", uid)
    let userfinal = user.data[0].id

    let plano = await supabase
    .from("User-Planos")
    .select()
    .eq("user", userfinal)
   
    let array = []
    let planos = plano.data

    console.log(plano.data)

    planos.forEach(planos => {
        console.log(planos.planos)

        array.push(planos.planos)
        console.log(array)
    });

    let planoteste = await supabase
    .from("Planos")
    .select()
    .in('id', array)
    console.log(planoteste.data)
    
})
