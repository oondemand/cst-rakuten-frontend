import { useState, createContext, useContext } from "react";
import { TicketModal } from "../components/ticketModal";
import { queryClient } from "../config/react-query";

const TicketModalContext = createContext({});

export const TicketModalProvider = ({ children }) => {
  const [modalConfig, setModalConfig] = useState({
    visible: false,
    data: {},
  });

  const onOpen = (data) => {
    setModalConfig((prev) => ({ ...prev, visible: true, data }));
  };

  const onClose = () => {
    setModalConfig((prev) => ({ ...prev, visible: false }));
    queryClient.refetchQueries(["listar-tickets"]);
  };

  return (
    <TicketModalContext.Provider value={{ onOpen, onClose }}>
      <TicketModal
        data={modalConfig.data}
        visible={modalConfig.visible}
        handleClose={onClose}
      />
      {children}
    </TicketModalContext.Provider>
  );
};

export const useTicketModal = () => {
  return useContext(TicketModalContext);
};
