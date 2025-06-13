import { createClient } from '@supabase/supabase-js'

const supabase = createClient('https://lbagxsindniuqrinfyug.supabase.co','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxiYWd4c2luZG5pdXFyaW5meXVnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc5MTg3NDUsImV4cCI6MjA2MzQ5NDc0NX0.vJ4oWcxhWsvytyRGqaKowYPPQaU1hvMLOSSLPU0T4AU')

if("serviceWorker" in navigator){
    navigator.serviceWorker.register("./sw.js").then(function(){
        console.log("Service Worker is registered")
    })
  }

let screen = document.getElementById("frame")
let LogType = "login"
let Usertoken = null
//------------------------------------------

renderform()
//-------------------------------------------------------------------------------------------------------------------------------

function reloadDOM(){
    let singupBt = document.getElementById("signUpBt")
    let username = document.getElementById("usernameinput")
    let passInput = document.getElementById("password")
    let log_in_Bt = document.getElementById("logIn")
    let butdiv = document.getElementById("log-reg-bt")
    let emailInput = document.getElementById("email")

    singupBt.addEventListener("click",async ()=>{
            formchange()
    })

    //CRIA BUTAO E AREA DE INPUT DE REGISTRO
    if (LogType == "signup"){
            //so depois de criado posso criar variavel
            let signUp = document.getElementById("signUp")
            let userInput = document.getElementById("username")

            //CRIA CONTA
            signUp.addEventListener("click", async ()=>{
            const { data, error } = await supabase.auth.signUp({
                email: `${emailInput.value}`,
                password: `${passInput.value}`
            })
            if(error){
                alert("error")
                return
        }else

        //VER TOKEN DO USER CRIADO
        Usertoken = await supabase.auth.getUser()                       

        //CRIAR USER NA TABELA DE USER
        const usernew = await supabase 
        .from('User')
        
        //USER_ID É O NUMERO ASSOCIADO AO AUTH
        .insert({user_id: Usertoken.data.user.id, username: userInput.value})
        alert("guh2")
        window.location.reload()
        })
    }
    else if (LogType == "login"){
        log_in_Bt.addEventListener("click", async()=>{
            const { data, error } = await supabase.auth.signInWithPassword({
                email: emailInput.value,
                password: passInput.value
        })
        let token = await supabase.auth.getUser()
        let uid = token.data.user.id
        console.log(uid)
        let user = await supabase        //buscar user
                .from('User')
                .select()
                .eq("user_id", uid)
            
            let userData = user.data[0]
            console.log(userData.admin)


            if(error){
                alert("Email or Password is incorrect")
                console.log(error)
            }else if (userData.admin == true){
                alert("Bem vindo administrador")
                window.location.replace("../admin/index.html")
                return
            }else{
                //redireciona para a página principal
                alert("Bem vindo")
                window.location.replace("../Home/index.html")
            }
        })
    }
    

    
}

function formchange(){
    LogType = LogType === "login" ? "signup" : "login";
    console.log(LogType)
    renderform()
}

function renderform(){
    if (LogType == "login"){
        screen.innerHTML = `<div class="row1">
                                <img src="Img/Logo.png" width="272px" height="165px">
                                </div>

                                <form>
                                    <div class="row2">
                                        <div class="row3"> 
                                            <h5 class="text">Email:</h5>
                                            <input type="text" placeholder="Email" required id="email">
                                        </div>
                                        <div class="row3">
                                            <h5 class="text">Password:</h5>
                                            <input type="password" placeholder="Password" required id="password">
                                        </div>
                                        <div class="logInBt" id="log-reg-bt">
                                            <button type="button" class="login-btn" id="logIn">LogIn</button>   
                                        </div>
                                    </div>
                                </form>
                                <br>

                                <div class="tips">
                                    <div>
                                        <label>
                                        Don't have an account?
                                        <br>
                                        <a href="#" id="signUpBt" >Sign Up!</a>
                                        </label>
                                    </div>
                                    <div>
                                        <a href="#">Forgot Password?</a>
                                    </div>
                                </div>
                                
                                <div class="row4">
                                    <img src="" alt="">
                                </div>
                            </div>`
    }
    else if (LogType == "signup"){
        screen.innerHTML = `<div class="row1">
                                <img src="Img/Logo.png" width="272px" height="165px">
                                </div>

                                <form>
                                    <div class="row2">
                                        <div class="row3"> 
                                            <h5 class="text">Email:</h5>
                                            <input type="text" placeholder="Email" required id="email">
                                        </div>
                                        <div class="row3">
                                            <h5 class="text">Username:</h5>
                                            <input type="text" placeholder="Username" required id="username">
                                        </div>
                                        <div class="row3">
                                            <h5 class="text">Password:</h5>
                                            <input type="password" placeholder="Password" required id="password">
                                        </div>
                                        <div class="logInBt" id="log-reg-bt">
                                            <button type="button" class="login-btn" id="signUp">Sign Up</button>
                                        </div>
                                    </div>
                                </form>
                                <br>

                                <div class="tips">
                                    <div>
                                        <label>
                                        Already have an account?
                                        <br>
                                        <a href="#" id="signUpBt" >Log in!</a>
                                        </label>
                                    </div>
                                </div>
                                
                                <div class="row4">
                                    <img src="" alt="">
                                </div>
                            </div>`
    }
    reloadDOM()
}








