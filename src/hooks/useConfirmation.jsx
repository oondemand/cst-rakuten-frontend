import { useState, createContext, useContext } from "react";
import { ConfirmationModal } from "../components/confirmationModal";

const ConfirmationContext = createContext({});

let replyWith;

export const ConfirmationProvider = ({ children }) => {
  const [modalConfig, setModalConfig] = useState({
    visible: false,
    title: "",
    description: "",
  });

  const onConfirm = () => {
    setModalConfig((prev) => ({ ...prev, visible: false }));
    replyWith({ action: "confirmed" });
  };

  const onClose = () => {
    setModalConfig((prev) => ({ ...prev, visible: false }));
    replyWith({ action: "canceled" });
  };

  const requestConfirmation = async ({ title, description }) => {
    setModalConfig({
      title,
      description,
      visible: true,
    });

    return new Promise((resolve) => {
      replyWith = resolve;
      return replyWith;
    });
  };

  return (
    <ConfirmationContext.Provider value={{ requestConfirmation }}>
      <ConfirmationModal
        title={modalConfig.title}
        description={modalConfig.description}
        visible={modalConfig.visible}
        handleConfirm={onConfirm}
        handleClose={onClose}
      />
      {children}
    </ConfirmationContext.Provider>
  );
};

export const useConfirmation = () => {
  return useContext(ConfirmationContext);
};
