import React, { useState, useEffect } from "react";
import './TodoList.css';
import img from './img/img.png'

function TodoList() {

    const listaStorage = localStorage.getItem('Lista'); //local Storage utilizado para guardar as informações no navegador

    const [lista, setLista] = useState(listaStorage ? JSON.parse(listaStorage) : []); //JSON.parse  Transforma texto em objeto
    const [novoItem, setNovoItem] = useState("");

    useEffect(() => { //Use effect é um efeito colateral ao fazer a mudança de um estado
        localStorage.setItem('Lista', JSON.stringify(lista)); //JSON.stringify Transforma Objeto em texto
    }, [lista]) // Define o estado que o UseEffect vai monitorar

    function adicionarItem(form) {
        form.preventDefault() //para não disparar o formulário e atualizar a página
        if (!novoItem) {
            return;
        }

        setLista([...lista, { text: novoItem, isCompleted: false }]);
        //[...lista] cria uma cópia do array lista usando o spread operator (...). Essa cópia é importante porque, em React, devemos evitar mutar o estado diretamente. Ao criar uma cópia, garantimos que estamos trabalhando com um novo array.
        setNovoItem(""); //esvazia setNovoitem
        document.getElementById("input-text").focus(); //Deixa o elemento input-text com focus

    }

    function click(index) {
        const listaCop = [...lista];
        listaCop[index].isCompleted = !listaCop[index].isCompleted;
        setLista(listaCop);
    }

    function deletar(index) {
        const listaCop = [...lista];
        listaCop.splice(index, 1); //O método splice é usado para adicionar, remover ou substituir elementos em um array, primeiro indice é a posição que vai deletar, osegundo é a quantidade
        setLista(listaCop);
    }

    function deletAll(){
        setLista([])
    }
    

    return (
        <div>
            <div className="lista-container">
                <h1>Lista de tarefas</h1>
                <div className="listaTarefas">
                    {
                        lista.length < 1
                            ?
                            <div class="img-div">
                                <img src={img} />
                                
                            </div>
                            :
                            lista.map((item, index) => (
                                <div key={index} /* Key Declara como se fosse um "id" para a div e o React diferenciar uma da outra  */
                                    className={item.isCompleted ? "item concluido" : "item"}>

                                    <span onClick={() => { click(index) }}>
                                        {item.text}
                                    </span>
                                    <button onClick={() => { deletar(index) }}>Deletar</button>
                                </div>
                            ))

                    }

                    <form onSubmit={adicionarItem}>
                        <input type="text"
                            id="input-text"
                            value={novoItem}
                            onChange={(e) => { setNovoItem(e.target.value) }}
                            placeholder="Adicione uma tarefa"
                        />
                        <button class="add-btn" type="submit">Adicionar</button>
                    </form>
                    {
                        lista.length > 0 &&
                        <button className="del-btn" onClick={() => { deletAll() }}>Deletar Todos</button>
                    }
                </div>
            </div>

        </div>
    )
}

export default TodoList