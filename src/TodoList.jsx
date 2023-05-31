import React ,{useState} from "react";
import './TodoList.css';

function TodoList() {

    const [lista, setLista] = useState ([]);
    const [novoItem, setNovoItem] = useState ("");

    function adicionarItem(form){
        form.preventDefault
    }

    return (
        <div>
            <div className="lista-container">
                <h1>Lista de tarefas</h1>
                <div className="listaTarefas">
                    <div className='item'>
                        <span>Tarefa</span>
                        <button>Deletar</button>
                    </div>

                    <div className='item concluido'>
                        <span>Tarefa</span>
                        <button>Deletar</button>
                    </div>

                    <form onSubmit={adicionarItem}>
                        <input type="text" 
                        value={novoItem}
                        onChange={(e)=>{setNovoItem(e.target.value)}}
                        placeholder="Adicione uma tarefa" 
                        />
                        <button class="add-btn" type="submit">Adicionar</button>
                    </form>
                    <button className="del-btn">Deletar Todos</button>
                </div>
            </div>

        </div>
    )
}

export default TodoList