export const onload = () => {
    const usuario  = document.querySelector("#nomeUsuario")
    const senha    = document.querySelector("#senhaUsuario")
    const btnLogin = document.querySelector("#btnLogin")

    btnLogin.addEventListener("click", async () => {
        verificaLogin(usuario.value, senha.value)

    })

    senha.addEventListener("keypress", (event) => {
        if(event.key == "Enter") {
            btnLogin.click()
        }
    })
};

async function verificaLogin(user, pws) {
    let url = "./script/usuario.json";
    try {
        let dadosFetch = await fetch(url);
        let dadosJson = await dadosFetch.json();

        let usuarioCerto = false
        let senhaCerta = false

        for (const login of dadosJson.users) {
            for (const key in login) {
                if(usuarioCerto == false) {
                    usuarioCerto = (key == "user") & (login[key] == user) ? true : false
                }
                if(senhaCerta == false) {
                    senhaCerta = (key == "pws") & (login[key] == pws) ? true : false
                }
            }
        }
        usuarioCerto & senhaCerta ? window.location.href = "http://127.0.0.1:5500/flash%20JS/panel.html" 
                                  : alert("Credenciais incorretas!")
    } catch (error) {
        console.log(error);
    }
}