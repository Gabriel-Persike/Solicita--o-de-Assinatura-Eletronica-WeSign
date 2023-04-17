const useState = React.useState;

function AppRoot() {
    const [Assinantes, setAssinantes] = useState([]);

    function handleAdicionarAssinantes(assinante){
        var assinantes = Assinantes.slice();
        assinantes.push(assinante);
        setAssinantes(assinantes);
    }

    return (
        <div className="row">
            <div className="col-md-6">
                <AnexadorDeDocumentos />
            </div>
            <div className="col-md-6">
                <SelecionadorDeAssinantes Assinantes={Assinantes} onAdicionarAssinantes={(assinante)=>handleAdicionarAssinantes(assinante)} />
                <br />
            </div>
        </div>
    );
}

function AnexadorDeDocumentos() {
    const [DescricaoDocumento, setDescricaoDocumento] = useState("");

    function handleOnChangeFile(e) {
        setDescricaoDocumento("Carregando.....");

        setTimeout(() => {
            setDescricaoDocumento(e.target.files[0].name);
        }, 2000);

        /*criaDocNoFluig(e.target.files[0]).then((result)={

        }).catch();*/
    }

    return (
        <div className="panel panel-primary">
            <div className="panel-heading">
                <h3 className="panel-title">Anexar Documento</h3>
            </div>
            <div className="panel-body">
                <label htmlFor="">Selecione o Documento: </label>
                <br />
                <a className="file-input-wrapper btn btn-primary">
                    <i className="flaticon flaticon-upload icon-sm"></i>
                    <span>Publicar documento</span>
                    <input type="file" className="btn btn-default btn-sm btn-block" title="Carregar documentos" onChange={(e) => handleOnChangeFile(e)} />
                </a>
                <span>{DescricaoDocumento}</span>
            </div>
        </div>
    );
}

function Assinante({ nome, email, cpf, onExcluirAssinante }) {
    return (
        <div className="card" style={{borderColor: "gray"}}>
            <div className="card-body">
                <h3 class="card-title">{nome}</h3>
                <p class="card-text">{email}</p>
                <p class="card-text">{cpf}</p>
                <button className="btn btn-danger">
                    Remover <i class="flaticon flaticon-trash icon-sm" aria-hidden="true"></i>
                </button>
            </div>
        </div>
    );
}

function SelecionadorDeAssinantes({Assinantes, onAdicionarAssinantes}) {


    return (
        <div className="panel panel-primary">
            <div className="panel-heading">
                <h3 className="panel-title">Selecionar Assinantes</h3>
            </div>
            <div className="panel-body">
                <label htmlFor="">Selecione o assinante: </label>

                <div style={{ display: "flex", alignItems: "center" }}>
                    <select name="" id="" className="form-control"></select>
                    <button className="btn btn-success" onClick={onAdicionarAssinantes({nome: "Gabriel Persike", email:"gabriel.persike@gmail.com" ,cpf:"098.560.269-46",} )}>Selecionar</button>
                    <button className="btn btn-info">Cadastrar Novo</button>
                </div>
                <br />



                {Assinantes.map(assinante=>{

                    <Assinante nome={assinante.nome} email={assinantes.email} cpf={assinante.cpf} />


                })}

            </div>
        </div>
    );
}
