ModalNovoAssinante = null;

function criaDocNoFluig(file) {
    return new Promise((resolve, reject) => {
        var reader = new FileReader();
        reader.onload = function () {
            var bytes = reader.result.split("base64,")[1];
            var nomeArquivo = file.name;

            DatasetFactory.getDataset("CriacaoDocumentosFluig", null, [
                DatasetFactory.createConstraint("conteudo", bytes, bytes, ConstraintType.MUST),
                DatasetFactory.createConstraint("nome", nomeArquivo, nomeArquivo, ConstraintType.SHOULD),
                DatasetFactory.createConstraint("descricao", nomeArquivo, nomeArquivo, ConstraintType.SHOULD),
                DatasetFactory.createConstraint("pasta", 655172, 655172, ConstraintType.SHOULD)
            ], null, {
                success: (res => {
                    if (!res || res == "" || res == null) {
                        FLUIGC.toast({
                            title: "Houve um erro na comunicação com o webservice de criação de documentos. Tente novamente!",
                            message: "",
                            type: "warning"
                        });
                        console.error("Houve um erro na comunicação com o webservice de criação de documentos. Tente novamente!");
                        reject();
                    }
                    else {
                        if (res.values[0][0] == "false") {
                            FLUIGC.toast({
                                title: "Erro ao criar arquivo. Favor entrar em contato com o administrador do sistema. Mensagem: " + res.values[0][1],
                                message: "",
                                type: "warning"
                            });
                            console.error("Erro ao criar arquivo. Favor entrar em contato com o administrador do sistema. Mensagem: " + res.values[0][1]);
                            reject();
                        }
                        else {
                            console.log("### GEROU docID = " + res.values[0].Resultado);
                            resolve(res.values[0].Resultado, nomeArquivo);
                        }
                    }
                })
            });
        };

        reader.readAsDataURL(file);
    });
}

function AbreModalNovoAssinante(onCadastrarAssinante) {
    ModalNovoAssinante = FLUIGC.modal({
        title: 'Cadastrar Novo Assinante',
        content: '<div id="rootNovoAssinante"></div>',
        id: 'ModalNovoAssinante',
        actions: [{
            'label': 'Cadastrar Assinante',
            "classType": "btn-success",
            'bind': 'btn-Criar-Novo-Assinante',
        }, {
            'label': 'Cancelar',
            'autoClose': true
        }]
    }, function (err, data) {
        if (err) {
            // do error handling
        } else {
            ReactDOM.render(React.createElement(CadastroNovoAssinante, { onCadastrarAssinante: onCadastrarAssinante }), document.querySelector('#rootNovoAssinante'));
        }
    });
}

function validaEmail(email) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
}

function CadastraAssinante(nome, email, cpf) {
    /*var ds = DatasetFactory.getDataset('ds_auxiliar_wesign', null, [
        DatasetFactory.createConstraint("nome", nome, nome, ConstraintType.MUST),
        DatasetFactory.createConstraint("email", email, email, ConstraintType.MUST),
        DatasetFactory.createConstraint("cEmail", email, email, ConstraintType.MUST),
        DatasetFactory.createConstraint("tipo", "E", "E", ConstraintType.MUST),
        DatasetFactory.createConstraint("cpf", cpf, cpf, ConstraintType.MUST),
        DatasetFactory.createConstraint("cCpf", cpf, cpf, ConstraintType.MUST),
        DatasetFactory.createConstraint("titulo", "", "", ConstraintType.MUST),
        DatasetFactory.createConstraint("empresa", "", "", ConstraintType.MUST),
        DatasetFactory.createConstraint("metodo", "createSigner", "createSigner", ConstraintType.MUST)
    ], null);

    if (ds.values[0].Result == "OK") {

    }*/
}
