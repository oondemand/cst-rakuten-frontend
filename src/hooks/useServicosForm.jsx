import { useState, createContext, useContext } from "react";
import { ServicoDialog } from "../components/servicoDialog";
import { toaster } from "../components/ui/toaster";
import { api } from "../config/api";
import { queryClient } from "../config/react-query";
import { useMutation } from "@tanstack/react-query";
import { useFilters } from "../hooks/useFilters";

const ServicoDialogContext = createContext({});

export const ServicoDialogProvider = ({ children }) => {
  const { filters } = useFilters({ key: "SERVICOS" });

  const [modalConfig, setModalConfig] = useState({
    visible: false,
    title: "",
    data: null,
    somenteLeitura: false,
  });

  const { mutateAsync: updateServicoMutation } = useMutation({
    mutationFn: async ({ id, body }) =>
      await api.patch(`servicos/${modalConfig.data._id}`, body),
    onSuccess(data) {
      setModalConfig((prev) => ({ ...prev, data: data.data.servico }));
      queryClient.refetchQueries(["listar-servicos", { filters }]);
      toaster.create({
        title: "Servico atualizado com sucesso",
        type: "success",
      });
    },
    onError: (error) => {
      toaster.create({
        title: "Ouve um erro ao atualizar o servico",
        type: "error",
      });
    },
  });

  const { mutateAsync: createServicoMutation } = useMutation({
    mutationFn: async ({ body }) => await api.post(`servicos`, body),
    onSuccess(data) {
      setModalConfig((prev) => ({ ...prev, data: data.data.servico }));
      queryClient.refetchQueries(["listar-servicos", { filters }]);
      toaster.create({
        title: "Serviço criado com sucesso",
        type: "success",
      });
    },
    onError: (error) => {
      toaster.create({
        title: "Ouve um erro ao criar um serviço",
        type: "error",
      });
    },
  });

  const onOpen = (title, data) => {
    setModalConfig((prev) => ({ ...prev, title, visible: true, data }));
  };

  const onClose = () => {
    setModalConfig((prev) => ({ ...prev, visible: false, data: null }));
  };

  return (
    <ServicoDialogContext.Provider value={{ onClose, onOpen }}>
      <ServicoDialog
        seOpen={onClose}
        visible={modalConfig.visible}
        title={modalConfig.title}
        createFn={createServicoMutation}
        updateFn={updateServicoMutation}
        data={modalConfig.data}
      />
      {children}
    </ServicoDialogContext.Provider>
  );
};

export const useServicoForm = () => {
  return useContext(ServicoDialogContext);
};
