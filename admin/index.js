import { createClient } from '@supabase/supabase-js'

const supabase = createClient('https://lbagxsindniuqrinfyug.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxiYWd4c2luZG5pdXFyaW5meXVnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc5MTg3NDUsImV4cCI6MjA2MzQ5NDc0NX0.vJ4oWcxhWsvytyRGqaKowYPPQaU1hvMLOSSLPU0T4AU')

//Variaveis HTML
//----------------------------------------------------
let logout = document.getElementById("logout")
let body = document.getElementById("list")
let profilebut = document.getElementById("profileclick")
//-----------------------------------------------------

//Info do user
//-------------------------------------------------
let token = await supabase.auth.getUser()
let uid = token.data.user.id
console.log(uid)
let user = await supabase        //buscar user
                .from('User')
                .select()
                .eq("user_id", uid)
            
            let userData = user.data[0]
            console.log(userData)
//------------------------------------------------------

//Info de todos os users para o admin ver
//------------------------------------------------------
let users = await supabase
    .from("User")
    .select()
    console.log(users.data)
    let userlist = users.data

    for (let i = 0 ; i < userlist.length; i++){
     
    console.log(userlist[i])
    let info = userlist[i]

    const div = document.createElement('div')
    div.classList = 'lista-item'
    div.innerHTML = `
                        <div class="info">
                            <div id="${info.id}" class="nome-desc">
                            <label class="nome">${info.username}</label>
                            <label class="descricao">${info.telephone}</label>
                            
                        </div>
                            <label class="obs">${info.age_birth}</label>
                        </div>
                        <div class="image">
                            <img src="https://firstbenefits.org/wp-content/uploads/2017/10/placeholder-300x300.png" alt="placeholder" />
                        </div>`

    body.append(div)

    let div1 = document.getElementById(`${info.id}`)
    let bt = document.createElement("button")
    bt.type = "button"
    bt.innerText = "Delete"
    bt.id = `${info.id}`
    bt.addEventListener('click', function(event) {
        let btnid = event.target.id
        console.log(btnid)

        remove()
        async function remove() {
            let delUser = await supabase
            .from("User")
            .select()
            .eq("id" ,btnid)
            console.log(delUser.data[0].user_id)
            let useruid = delUser.data[0].user_id
            let deleteUser = await supabase.auth.admin.deleteUser(`${useruid}`)
            console.log(deleteUser)
            let deleteUser2 = await supabase
            .from('User')
            .delete()
            .eq("id", btnid)
            
        }
       window.location.reload()
    })
    div1.appendChild(bt)
    

}







//Butão para ir para tela de perfil
//--------------------------------------------------------
profilebut.addEventListener("click", async()=>{
    window.location.replace("../Profile/index.html")
})
//--------------------------------------------------------


//Butão para Logout
//------------------------------------------------------
logout.addEventListener("click", async()=>{
    const { error } = await supabase.auth.signOut()
    window.location.replace("../index.html")
    window.localStorage.clear()
})
//------------------------------------------------------