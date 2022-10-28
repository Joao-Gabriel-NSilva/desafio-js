import { clientes } from "./clientes.js";
import { produtos } from "./produtos.js";

const codCli = document.querySelector("#fClientes > fieldset > #codCliente");
const nomeCli = document.querySelector("#fClientes > fieldset > #nomeCliente");
const dataCad = document.querySelector("#fClientes > fieldset > #dataCad");

const codProd = document.querySelector("#fProdutos > fieldset > #codProduto");
const descPro = document.querySelector("#fProdutos > fieldset > #descProduto");
const precoPro = document.querySelector("#fProdutos > fieldset > #precoProduto");
const quantPro = document.querySelector("#fProdutos > fieldset > #quantProduto");

const codClientePedido = document.querySelector("#fPedidos > fieldset > #codigoCliente")
const nomeDoClientePedido = document.querySelector("#fPedidos > fieldset > #nomeDoCliente")

const codItemPedido = document.querySelector("#fPedidos > .locProduto > .subDivLocProduto > #codigosItem");
const descItemPedido = document.querySelector("#fPedidos > .locProduto > .subDivLocProduto > #descItem");
const precoItemPedido = document.querySelector("#fPedidos > .locProduto > .subDivLocProduto > #precoItem");
const quantItemPedido = document.querySelector("#fPedidos > .locProduto > .subDivLocProduto > #quantItem");
const btnLancarItem = document.querySelector("#fPedidos > .locProduto > .subDivLocProduto > #lancarPedido");
const valorTotal = document.querySelector("#fPedidos > .itensPedido > #lblValorTotal")
let valorAux = 0

export const onload = () => {
    const formClientes = document.querySelector("#fClientes")
    const formProdutos = document.querySelector("#fProdutos")
    const formPedidos = document.querySelector("#fPedidos")
    const forms = {
        "#mostra-cliente": formClientes,
        "#mostra-produto": formProdutos,
        "#mostra-pedidos": formPedidos
    }


    let formAtivo = ""
    let labelCloseIcon = ""

    function mudaFormAtivo(formA) {
        formAtivo = formA
        labelCloseIcon = formAtivo.firstElementChild.lastElementChild
        labelCloseIcon.addEventListener("click", () => {
            labelCloseIcon.parentElement.parentElement.setAttribute("hidden", "true")
        })
        if (formAtivo == formPedidos) {
            codClientePedido.focus()
        }
    };

    for (const form in forms) {

        let outrosForms = { "form1": "", "form2": "" }

        if (form == "#mostra-cliente") {
            setCliente(0)
            outrosForms.form1 = formProdutos
            outrosForms.form2 = formPedidos
        }
        if (form == "#mostra-produto") {
            setProduto(0)
            outrosForms.form1 = formClientes
            outrosForms.form2 = formPedidos
        }
        if (form == "#mostra-pedidos") {
            outrosForms.form1 = formClientes
            outrosForms.form2 = formProdutos
        }

        document.querySelector(form).addEventListener("click", () => {
            if ((forms[form].hasAttribute("hidden"))) {
                for (const nF in outrosForms) {
                    if (!(outrosForms[nF].hasAttribute("hidden"))) {
                        outrosForms[nF].setAttribute("hidden", "true")
                    }
                }
                forms[form].removeAttribute("hidden")
                mudaFormAtivo(forms[form])
            }
        })
    }

    document.querySelector("#fClientes > .botoesCliente > #btnVoltar").addEventListener("click", () => {
        if ((codCli.getAttribute("value")) > 1) {
            setCliente(Number(codCli.getAttribute("value")) - 2)
        } else {
            alert("Último registro alcançado!")
        }
    });

    document.querySelector("#fClientes > .botoesCliente > #btnAvancar").addEventListener("click", () => {
        if ((codCli.getAttribute("value")) < clientes.length) {
            setCliente(Number(codCli.getAttribute("value")))
        } else {
            alert("Último registro alcançado!")
        }
    });

    document.querySelector("#fClientes > .botoesCliente > #btnNovo").addEventListener("click", () => {
        clearCliente()
        codCli.setAttribute("value", clientes.length + 1)
    });

    document.querySelector("#fClientes > .botoesCliente > #btnSalvar").addEventListener("click", () => {
        addCliente(codCli.value, nomeCli.value, dataCad.value)
    });

    document.querySelector("#fProdutos > .botoesProdutos > #btnVoltar").addEventListener("click", () => {
        if ((codProd.getAttribute("value")) > 1) {
            setProduto(Number(codProd.getAttribute("value")) - 2)
        } else {
            alert("Último registro alcançado!")
        }
    });

    document.querySelector("#fProdutos > .botoesProdutos > #btnAvancar").addEventListener("click", () => {
        if ((codProd.getAttribute("value")) < produtos.length) {
            setProduto(Number(codProd.getAttribute("value")))
        } else {
            alert("Último registro alcançado!")
        }
    });

    document.querySelector("#fProdutos > .botoesProdutos > #btnNovo").addEventListener("click", () => {
        clearProduto()
        codProd.setAttribute("value", produtos.length + 1)
    });

    document.querySelector("#fProdutos > .botoesProdutos > #btnSalvar").addEventListener("click", () => {
        addProduto(codProd.value, descPro.value, precoPro.value, quantPro.value)
    });

    codClientePedido.addEventListener("change", () => {
        setCliente(null, true)
        codItemPedido.focus()
    });

    codItemPedido.addEventListener("change", () => {
        if (codClientePedido.value !== "") {
            setProduto(null, true)
            quantItemPedido.focus()
        } else {
            alert("Você deve informar um cliente primeiro!")
            codItemPedido.value = codItemPedido.options[0]
            codClientePedido.focus()
        }

    });

    quantItemPedido.addEventListener("keypress", (event) => {
        if (event.key === "Enter") {
            btnLancarItem.focus()
        }

    })

    btnLancarItem.addEventListener("click", () => {
        try {
            if (!(codItemPedido.value.toString() == "") & !(quantItemPedido.value.toString().trim() == "")) {
                lancaItem()
            } else { alert("Preencha todas as informações!") }
        } catch (error) {

        }
    })

    document.querySelector("#barra-lateral > #btn-tema").addEventListener("click", () => {
        document.body.classList.toggle("dark");
    })

    atualizaProdutos()


}

function setCliente(codigo, ehFormPedido = false) {
    if (!ehFormPedido) {
        let data = clientes[codigo].dataCadCli;
        let ano = data.substring(6);
        let mes = data.substring(3, 5);
        let dia = data.substring(0, 2);
        let dataCli = `${ano}-${mes}-${dia}`;

        codCli.setAttribute("value", clientes[codigo].codCliente)
        nomeCli.setAttribute("value", clientes[codigo].nomeCliente)
        nomeCli.value = clientes[codigo].nomeCliente
        dataCad.setAttribute("value", dataCli)
        dataCad.value = dataCli
    } else {
        try {
            let cliente = getCliente((codClientePedido.options[codClientePedido.selectedIndex].value) - 1)
            nomeDoClientePedido.setAttribute("value", cliente.nomeCliente)
            nomeDoClientePedido.value = cliente.nomeCliente
        } catch (error) {
            clearCliente(true)
        }

    }

}

function getCliente(i) {
    return clientes[i]
}

function addCliente(cod, nome, data) {
    clientes.push({
        "codCliente": Number(cod),
        "nomeCliente": nome,
        "dataCadCli": `${data.substring(8, 10)}/${data.substring(5, 7)}/${data.substring(0, 4)}`,
    });
    clearCliente()
    setCliente(0)
    adicionaNovoCliente(Number(cod))
}

function clearCliente(ehFormPedido = false) {
    if (!ehFormPedido) {
        codCli.setAttribute("value", "")
        nomeCli.setAttribute("value", "")
        nomeCli.value = ""
        dataCad.setAttribute("value", "")
        dataCad.value = ""
    } else {
        nomeDoClientePedido.setAttribute("value", "")
        nomeDoClientePedido.value = ""
    }

}

function setProduto(codigo, ehFormPedido = false) {
    if (!ehFormPedido) {
        codProd.setAttribute("value", produtos[codigo].codProduto)
        descPro.setAttribute("value", produtos[codigo].descProduto)
        descPro.value = produtos[codigo].descProduto
        precoPro.setAttribute("value", produtos[codigo].precoProduto)
        precoPro.value = produtos[codigo].precoProduto
        quantPro.setAttribute("value", produtos[codigo].qtdEstoqueProd)
        quantPro.value = produtos[codigo].qtdEstoqueProd
    } else {
        try {
            let produto = getProduto((codItemPedido.options[codItemPedido.selectedIndex].value) - 1)
            descItemPedido.setAttribute("value", produto.descProduto)
            descItemPedido.value = produto.descProduto
            precoItemPedido.setAttribute("value", produto.precoProduto)
            precoItemPedido.value = produto.precoProduto
        } catch (error) {
            clearProduto(true)
        }

    }

}

function getProduto(i) {
    return produtos[i]
}

function addProduto(cod, desc, preco, quanti) {
    produtos.push({
        "codProduto": Number(cod),
        "descProduto": desc,
        "precoProduto": Number(preco),
        "qtdEstoqueProd": Number(quanti),
    });
    clearProduto()
    setProduto(0)
    adicionaNovoProduto(Number(cod))
}

function clearProduto(ehFormPedido = false) {
    if (!ehFormPedido) {
        codProd.setAttribute("value", "")
        descPro.setAttribute("value", "")
        descPro.value = ""
        precoPro.setAttribute("value", "")
        precoPro.value = ""
        quantPro.setAttribute("value", "")
        quantPro.value = ""
    } else {
        descItemPedido.setAttribute("value", "")
        descItemPedido.value = ""
        precoItemPedido.setAttribute("value", "")
        precoItemPedido.value = ""
        quantItemPedido.setAttribute("value", "")
        quantItemPedido.value = ""
        codItemPedido.value = codItemPedido.options[0]
    }

}

function atualizaProdutos() {

    for (const c of clientes) {
        let op = document.createElement("option")
        op.setAttribute("id", c.codCliente)
        op.textContent = c.codCliente
        codClientePedido.appendChild(op)
    }

    for (const p of produtos) {
        let op = document.createElement("option")
        op.setAttribute("id", p.codProduto)
        op.textContent = p.codProduto
        codItemPedido.appendChild(op)
    }
}

function adicionaNovoProduto(codigo) {
    let op = document.createElement("option")
    op.setAttribute("id", codigo)
    op.textContent = codigo
    codItemPedido.appendChild(op)
}
function adicionaNovoCliente(codigo) {
    let op = document.createElement("option")
    op.setAttribute("id", codigo)
    op.textContent = codigo
    codClientePedido.appendChild(op)
}

let codItensNaLista = []
function lancaItem() {
    let estaNaLista = false
    for (const index of codItensNaLista) {
        if (index == Number(codItemPedido.value)) {
            estaNaLista = true
        }
    }

    if (!estaNaLista) {
        let produto = getProduto(Number(codItemPedido.value) - 1)
        if (produto.qtdEstoqueProd >= Number(quantItemPedido.value)) {
            let tableBody = document.querySelector("#fPedidos > .itensPedido > table > tbody")
            let linha = document.createElement("tr")
            tableBody.appendChild(linha)

            let id = document.createElement("td")
            id.textContent = Number(codItemPedido.value)

            let nome = document.createElement("td")
            nome.textContent = descItemPedido.value

            let preco = document.createElement("td")
            preco.textContent = precoItemPedido.value

            let quantidade = document.createElement("td")
            quantidade.textContent = quantItemPedido.value

            let subTotal = document.createElement("td")
            subTotal.textContent = (Number(quantidade.textContent) * Number(preco.textContent)).toFixed(2)

            linha.appendChild(id)
            linha.appendChild(nome)
            linha.appendChild(preco)
            linha.appendChild(quantidade)
            linha.appendChild(subTotal)

            valorAux += Number(subTotal.textContent)
            valorTotal.textContent = `R$ ${valorAux.toFixed(2)}`
            codItensNaLista.push(Number(codItemPedido.value))

            clearProduto(true)
            codItemPedido.focus()
        } else {
            alert(`Quantidade em estoque insuficiente para o item ${produto.codProduto} - ${produto.descProduto}!`)
        }
    } else {
        alert("O item já está na lista!")
        clearProduto(true)
        codItemPedido.focus()
    }

}
