import { useState, createContext, useContext } from "react";
import { PrestadorDialog } from "../components/prestadorDialog";
import { toaster } from "../components/ui/toaster";
import { api } from "../config/api";
import { queryClient } from "../config/react-query";
import { useMutation } from "@tanstack/react-query";
import { useFilters } from "../hooks/useFilters";

const PrestadorDialogContext = createContext({});

export const PrestadorDialogProvider = ({ children }) => {
  const { filters } = useFilters({ key: "PRESTADORES" });

  const [modalConfig, setModalConfig] = useState({
    visible: false,
    title: "",
    data: null,
    somenteLeitura: false,
  });

  const { mutateAsync: updatePrestadorMutation } = useMutation({
    mutationFn: async ({ id, body }) =>
      await api.patch(`prestadores/${modalConfig.data._id}`, body),
    onSuccess(data) {
      setModalConfig((prev) => ({ ...prev, data: data.data.prestador }));
      queryClient.refetchQueries(["listar-prestadores", { filters }]);
      toaster.create({
        title: "Prestador atualizado com sucesso",
        type: "success",
      });
    },
    onError: (error) => {
      toaster.create({
        title: "Ouve um erro ao atualizar o prestador",
        type: "error",
      });
    },
  });

  const { mutateAsync: createPrestadorMutation } = useMutation({
    mutationFn: async ({ body }) => await api.post(`prestadores`, body),
    onSuccess(data) {
      setModalConfig((prev) => ({ ...prev, data: data.data.prestador }));
      queryClient.refetchQueries(["listar-prestadores", { filters }]);
      toaster.create({
        title: "Prestador criado com sucesso",
        type: "success",
      });
    },
    onError: (error) => {
      toaster.create({
        title: "Ouve um erro ao criar um prestador",
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
    <PrestadorDialogContext.Provider value={{ onClose, onOpen }}>
      <PrestadorDialog
        seOpen={onClose}
        visible={modalConfig.visible}
        title={modalConfig.title}
        createFn={createPrestadorMutation}
        updateFn={updatePrestadorMutation}
        data={modalConfig.data}
      />
      {children}
    </PrestadorDialogContext.Provider>
  );
};

export const usePrestadorForm = () => {
  return useContext(PrestadorDialogContext);
};
