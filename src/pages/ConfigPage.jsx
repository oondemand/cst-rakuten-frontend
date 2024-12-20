// src/pages/ConfigPage.js
import React from "react";
import ConfigTabs from "../components/configuracoes/ConfigTabs";

const ConfigPage = () => {
  return (
    <>
      <main className="flex-grow p-4">
        <h1 style={{ fontSize: "1.8rem", fontWeight: "bold", marginBottom: '2rem' }}>
          Configurações
        </h1>
        <ConfigTabs />
      </main>
    </>
  );
};

export default ConfigPage;
