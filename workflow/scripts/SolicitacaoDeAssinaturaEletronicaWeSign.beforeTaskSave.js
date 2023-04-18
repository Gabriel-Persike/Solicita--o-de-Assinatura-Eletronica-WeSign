function beforeTaskSave(colleagueId, nextSequenceId, userList) {

    if (hAPI.getCardValue("atividade") == 5) {
        CriaAssinatura();
    }

}

function CriaAssinatura() {
    var NomeArquivo = hAPI.getCardValue("docName");
    var IdArquivo = hAPI.getCardValue("docId");
    var CodRemetente = hAPI.getCardValue("solicitante");

    var ds = DatasetFactory.getDataset("ds_auxiliar_wesign", null, [
        DatasetFactory.createConstraint("nmArquivo", NomeArquivo, NomeArquivo, ConstraintType.MUST),
        DatasetFactory.createConstraint("codArquivo", IdArquivo, IdArquivo, ConstraintType.MUST),
        DatasetFactory.createConstraint("vrArquivo", "1000", "1000", ConstraintType.MUST),
        DatasetFactory.createConstraint("codPasta", "655172", "655172", ConstraintType.MUST),
        DatasetFactory.createConstraint("codRemetente", CodRemetente, CodRemetente, ConstraintType.MUST),
        DatasetFactory.createConstraint("nmRemetente", BuscaNomeUsuario(CodRemetente), BuscaNomeUsuario(CodRemetente), ConstraintType.MUST),
        DatasetFactory.createConstraint("status", "Enviando para assinatura", "Enviando para assinatura", ConstraintType.MUST),
        DatasetFactory.createConstraint("metodo", "create", "create", ConstraintType.MUST),
        DatasetFactory.createConstraint("jsonSigners", hAPI.getCardValue("jsonSigner"), hAPI.getCardValue("jsonSigner"), ConstraintType.MUST),
        DatasetFactory.createConstraint("numSolic", getValue("WKNumProces"), getValue("WKNumProces"), ConstraintType.MUST)
    ], null);

    if (dsAux.rowsCount > 0) {
        if (ds.getValue(0, "Result") === "OK") {
            return true;
        }
    }

    throw "Erro ao Criar a Assinatura Eletrôncia!";
}


function BuscaNomeUsuario(CodUsuario) {
    var ds = DatasetFactory.getDataset("colleague", ["colleagueName"], [
        DatasetFactory.createConstraint("colleagueId", CodUsuario, CodUsuario, ConstraintType.MUST)
    ], null);

    return ds.getValue(0, "colleagueName");
}