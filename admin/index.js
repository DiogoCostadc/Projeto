import { createClient } from '@supabase/supabase-js'

const supabase = createClient('https://lbagxsindniuqrinfyug.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxiYWd4c2luZG5pdXFyaW5meXVnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc5MTg3NDUsImV4cCI6MjA2MzQ5NDc0NX0.vJ4oWcxhWsvytyRGqaKowYPPQaU1hvMLOSSLPU0T4AU')
//----------------------------------------------------
let logout = document.getElementById("logout")
let body = document.getElementById("list")
//-----------------------------------------------------
let token = await supabase.auth.getUser()
let uid = token.data.user.id
console.log(uid)
let user = await supabase        //buscar user
                .from('User')
                .select()
                .eq("user_id", uid)
            
            let userData = user.data[0]
            console.log(userData)

let users = await supabase
    .from("User")
    .select()
    console.log(users.data)
    let userlist = users.data

    for (let i = 0 ; i < userlist.length; i++){
     
    console.log(userlist[i])
    let info = userlist[i]

    body.innerHTML += `<div class="lista-item">
                        <div class="info">
                            <div class="nome-desc">
                            <label class="nome">${info.username}</label>
                            <label class="descricao">${info.telephone}</label>
                        </div>
                            <label class="obs">${info.age_birth }</label>
                        </div>
                        <div class="image">
                            <img src="https://firstbenefits.org/wp-content/uploads/2017/10/placeholder-300x300.png" alt="placeholder" />
                        </div>
                    </div>`
}

logout.addEventListener("click", async()=>{
    const { error } = await supabase.auth.signOut()
    window.location.replace("../index.html")
    window.localStorage.clear()
})