const useEffect = React.useEffect;
const useState = React.useState;
const useCallback = React.useCallback;
const Select = antd.Select;

function AppRoot() {
    const [Assinantes, setAssinantes] = useState([]);
    const [listAssinantes, setlistAssinantes] = useState([]);

    function verificaSeAssinanteJaCadastrado(Cpf) {
        var found = listAssinantes.find(e => e.Cpf == Cpf);
        if (found) {
            return true;
        }
        else {
            return false;
        }
    }

    function handleAdicionarAssinantes(assinante) {
        var nextAssinantes = Assinantes.slice();
        assinante = assinante.split(" | ");

        if (assinante[0] == "" || assinante[1] == "" || assinante[2] == "") {
            FLUIGC.toast({
                title: "Assinante inválido!",
                message: "",
                type: "warning"
            });
        }
        else {
            assinante = {
                nome: assinante[0],
                email: assinante[1],
                cpf: assinante[2],
                tipo: "E",
                status: 'Pendente'
            }

            //Verifica se o assinante ja esta na Lista de Assinantes
            var found = Assinantes.find(e => e.cpf == assinante.cpf);

            if (!found) {
                //Caso não esteja insere o assinante na Lista
                nextAssinantes.push(assinante);
                setAssinantes(nextAssinantes);
                $("#jsonSigner").val(JSON.stringify(nextAssinantes));
            } else {
                //Caso esteja informa que o assinante já está incluido
                FLUIGC.toast({
                    title: "Assinante já incluido!",
                    message: "",
                    type: "warning"
                });
            }
        }

    }

    function handleExcluirAssinante(cpf) {
        var nextAssinantes = Assinantes.slice();
        nextAssinantes= nextAssinantes.filter((Assinante) => Assinante.cpf != cpf);
        $("#jsonSigner").val(JSON.stringify(nextAssinantes));
        setAssinantes(nextAssinantes);
    }

    function handleCadastrarAssinante(e) {
        if (verificaSeAssinanteJaCadastrado(e.Cpf)) {
            FLUIGC.toast({
                title: "CPF já Cadastrado!",
                message: "",
                type: "warning"
            });
        }
        else {
            var nextListAssinantes = listAssinantes.slice();
            nextListAssinantes.push(e);
            setlistAssinantes(nextListAssinantes);
            CadastraAssinante(e.Nome, e.Email, e.Cpf);
        }

    }

    function renderOptionsAssinantes() {
        var options = [];
        for (const assinante of listAssinantes) {
            options.push({
                value: assinante.Nome + " | " + assinante.Email + " | " + assinante.Cpf,
                label: assinante.Nome + " | " + assinante.Email + " | " + assinante.Cpf
            });
        }

        return options;
    }

    return (
        <div className="panel panel-primary">
            <div className="panel-heading">
                <h3 className="panel-title">Assinatura Eletrônica</h3>
            </div>
            <div className="panel-body">
                <div className="row">
                    <div className="col-md-6">
                        <AnexadorDeDocumentos />
                    </div>
                    <div className="col-md-6">
                        <SelecionadorDeAssinantes Assinantes={Assinantes} onAdicionarAssinante={(assinante) => handleAdicionarAssinantes(assinante)} onExcluirAssinante={(e) => handleExcluirAssinante(e)} onCadastrarAssinante={(e) => handleCadastrarAssinante(e)} listaAssinantes={renderOptionsAssinantes()} />
                        <br />
                    </div>
                </div>
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
            $("#docId").val(result[0]);
            setDescricaoDocumento(result[1]);
        }).catch();*/
    }

    return (
        <div>
            <label htmlFor="">Selecione o Documento: </label>
            <br />
            <a className="file-input-wrapper btn btn-primary">
                <i className="flaticon flaticon-upload icon-sm"></i>
                <span>Publicar documento</span>
                <input type="file" className="btn btn-default btn-sm btn-block" title="Carregar documentos" onChange={(e) => handleOnChangeFile(e)} />
            </a>
            <span style={{ marginLeft: "10px" }}>{DescricaoDocumento}</span>
        </div>
    );
}

function Assinante({ nome, email, cpf, onExcluirAssinante }) {
    return (
        <div className="card" style={{ borderColor: "gray" }}>
            <div className="card-body">
                <h3 class="card-title">{nome}</h3>
                <p class="card-text">{email}</p>
                <p class="card-text">{cpf}</p>
                <button className="btn btn-danger" onClick={() => onExcluirAssinante(cpf)}>
                    Remover <i class="flaticon flaticon-trash icon-sm" aria-hidden="true"></i>
                </button>
            </div>
        </div>
    );
}

function SelecionadorDeAssinantes({ Assinantes, onAdicionarAssinante, onExcluirAssinante, onCadastrarAssinante, listaAssinantes }) {
    const [AssinanteSelecionado, setAssinanteSelecionado] = useState("");

    function renderListaAssinantes() {
        var ListAssinantes = Assinantes.map((assinante) => <Assinante key={assinante.cpf} nome={assinante.nome} email={assinante.email} cpf={assinante.cpf} onExcluirAssinante={(e) => onExcluirAssinante(e)} />);
        return ListAssinantes;
    }

    return (
        <div>
            <label htmlFor="">Selecione o assinante: </label>

            <div style={{ display: "flex", alignItems: "center" }}>
                <Select style={{ width: "100%" }} options={listaAssinantes} value={AssinanteSelecionado} onChange={(e) => setAssinanteSelecionado(e)} filterOption={(input, option) => (option?.label ?? "").toLowerCase().includes(input.toLowerCase())} showSearch />
                <button className="btn btn-success" onClick={(e) => { onAdicionarAssinante(AssinanteSelecionado); setAssinanteSelecionado(""); }}>
                    Selecionar
                </button>
                <button className="btn btn-info" onClick={() => AbreModalNovoAssinante(onCadastrarAssinante)}>
                    Cadastrar Novo
                </button>
            </div>
            <br />

            {renderListaAssinantes()}
        </div>
    );
}

class CadastroNovoAssinante extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            Nome: "",
            Email: "",
            Cpf: ""
        };

        this.handleCriaAssinante = this.handleCriaAssinante.bind(this);
    }

    componentDidMount() {
        $("[btn-criar-novo-assinante]").on("click", { onCriaAssinante: this.handleCriaAssinante }, function (e) {
            e.data.onCriaAssinante();
        });
    }

    handleCriaAssinante() {
        if (this.state.Nome == "") {
            FLUIGC.toast({
                title: "Nome do Assinante não preenchido!",
                message: "",
                type: "warning"
            });
        } else if (this.state.Email == "") {
            FLUIGC.toast({
                title: "E-mail do Assinante não preenchido!",
                message: "",
                type: "warning"
            });
        } else if (!validaEmail(this.state.Email)) {
            FLUIGC.toast({
                title: "E-mail inválido!",
                message: "",
                type: "warning"
            });
        } else if (this.state.Cpf == "") {
            FLUIGC.toast({
                title: "CPF do Assinante não preenchido!",
                message: "",
                type: "warning"
            });
        }
        else {
            console.log("Cadastrar");
            this.props.onCadastrarAssinante({
                Nome: this.state.Nome.trim(),
                Email: this.state.Email.trim(),
                Cpf: this.state.Cpf
            });
            ModalNovoAssinante.remove();
        }
    }

    render() {
        return (
            <div>
                <div>
                    <label>Nome:</label>
                    <input type="text" className="form-control" value={this.state.Nome} onChange={(e) => this.setState({ Nome: e.target.value })} />
                </div>
                <br />
                <div>
                    <label>E-mail:</label>
                    <input type="text" className="form-control" value={this.state.Email} onChange={(e) => this.setState({ Email: e.target.value })} />
                </div>
                <br />
                <div>
                    <label>CPF:</label>
                    <CpfInput onChange={(e) => this.setState({ Cpf: e })} value={this.state.Cpf} />
                </div>
            </div>
        );
    }
}

function CpfInput({ onChange, value }) {
    const handleCpfChange = (event) => {
        let value = event.target.value.replace(/\D/g, "");

        if (value.length > 11) {
            value = value.slice(0, 11);
        }

        value = value
            .replace(/(\d{3})(\d)/, "$1.$2")
            .replace(/(\d{3})(\d)/, "$1.$2")
            .replace(/(\d{3})(\d{1,2})$/, "$1-$2");

        onChange(value);
    };

    const validateCpf = (value) => {
        const cleanCpf = value.replace(/\D/g, "");

        if (cleanCpf.length !== 11) {
            return false;
        }

        let sum = 0;
        let rest;

        for (let i = 1; i <= 9; i++) {
            sum += parseInt(cleanCpf.substring(i - 1, i)) * (11 - i);
        }

        rest = (sum * 10) % 11;

        if (rest === 10 || rest === 11) {
            rest = 0;
        }

        if (rest !== parseInt(cleanCpf.substring(9, 10))) {
            return false;
        }

        sum = 0;

        for (let i = 1; i <= 10; i++) {
            sum += parseInt(cleanCpf.substring(i - 1, i)) * (12 - i);
        }

        rest = (sum * 10) % 11;

        if (rest === 10 || rest === 11) {
            rest = 0;
        }

        if (rest !== parseInt(cleanCpf.substring(10, 11))) {
            return false;
        }

        return true;
    };

    const handleBlur = () => {
        if (!validateCpf(value)) {
            FLUIGC.toast({
                title: "CPF inválido!",
                message: "",
                type: "warning"
            });
            onChange("");
        }
    };

    return (
        <div>
            <input type="text" id="cpf" name="cpf" value={value} onChange={handleCpfChange} onBlur={handleBlur} maxLength="14" className="form-control" />
        </div>
    );
};
