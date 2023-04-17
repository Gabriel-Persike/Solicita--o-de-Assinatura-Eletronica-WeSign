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
                DatasetFactory.createConstraint("pasta", 266779, 266779, ConstraintType.SHOULD)
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
