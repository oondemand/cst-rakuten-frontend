import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

export function withRestriction(restrictedRoles, WrappedComponent) {
  function WithRestrictionWrapper(props) {
    const { user } = useAuth();

    if (restrictedRoles.includes(user?.tipo)) {
      return <Navigate to="/acesso-negado" />;
    }

    return <WrappedComponent {...props} />;
  }

  return WithRestrictionWrapper;
}
