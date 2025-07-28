import { DefaultField } from "../../../../../components/buildForm/filds/default";
import { CurrencyField } from "../../../../../components/buildForm/filds/currencyField";
import { DateField } from "../../../../../components/buildForm/filds/dateField";

// import { preprocessEmptyToUndefined } from "../../utils/zodHelpers";
import { CpfCnpjField } from "../../../../../components/buildForm/filds/cpfCnpjField";
// import { SelectListaField } from "../../components/buildForm/filds/selectListaField";
// import { CepField } from "../../components/buildForm/filds/cepField";
// import { SelectEstadoField } from "../../components/buildForm/filds/selectEstadoField";
// import { SelectBancoField } from "../../components/buildForm/filds/selectBancoField";
// import { SelectField } from "../../components/buildForm/filds/selectField";
// import { LISTA_PAISES_OMIE } from "../../constants/omie";
// import { PisPasepField } from "../../components/buildForm/filds/pisField";
// import { dateValidation } from "../../utils/zodHelpers";

// const ContaPagarSchema = new mongoose.Schema({
//   baseOmie: { type: Schema.Types.ObjectId, ref: "BaseOmie" },
//   codigo_lancamento_omie: { type: Number },
//   codigo_lancamento_integracao: { type: String },
//   data_vencimento: { type: String },
//   valor_documento: { type: Number },
//   numero_documento_fiscal: { type: String },
//   data_emissao: { type: String },
//   numero_documento: { type: String },
//   numero_parcela: { type: String },
//   status_titulo: { type: String },
//   valor_pag: { type: Number },
// });

export const createDynamicFormFields = () => {
  return [
    {
      accessorKey: "prestador.nome",
      label: "Prestador",
      render: DefaultField,
      colSpan: 2,
    },
    {
      accessorKey: "prestador.documento",
      label: "Documento",
      render: CpfCnpjField,
      colSpan: 1,
    },
    {
      accessorKey: "prestador.sid",
      label: "Sid",
      render: DefaultField,
      colSpan: 1,
    },
    {
      accessorKey: "valor_documento",
      label: "Valor",
      render: CurrencyField,
      colSpan: 1,
    },
    {
      accessorKey: "status_titulo",
      label: "Status",
      render: DefaultField,
      colSpan: 1,
    },
    {
      accessorKey: "data_emissao",
      label: "Data de emissão",
      render: DateField,
      colSpan: 1,
    },
    {
      accessorKey: "data_vencimento",
      label: "Data de vencimento",
      render: DateField,
      colSpan: 1,
    },
  ];
};
