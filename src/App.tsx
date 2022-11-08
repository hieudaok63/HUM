import React, { useLayoutEffect, useState } from "react";
import "./App.css";
import { fetchAvailability, fetchTypology } from "./store/todo-actions";
import { useAppDispatch, useExternalId } from "./hooks";
import { Desktop } from "./Pages";

export const App = () => {
  const [requested, setRequested] = useState(false);
  const [requestedTypology, setRequestedTypology] = useState(false);
  const dispatch = useAppDispatch();
  const externalId = useExternalId();

  useLayoutEffect(() => {
    if (!requested)
      dispatch(
        fetchAvailability("767")
      );

    setRequested(true);
  }, [dispatch, requested]);

  useLayoutEffect(() => {
    if(externalId && !requestedTypology){
      dispatch(
        fetchTypology()
      );
      setRequestedTypology(true);
    }
  }, [dispatch, externalId, requested, requestedTypology]);


  return <Desktop />;
};
