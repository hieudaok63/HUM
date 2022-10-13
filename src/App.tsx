import React, { useLayoutEffect, useState } from "react";
import "./App.css";
import { fetchAvailability } from "./store/todo-actions";
import { useAppDispatch } from "./hooks";
import { Desktop } from "./Pages";

export const App = () => {
  const [requested, setRequested] = useState(false);
  const dispatch = useAppDispatch();

  useLayoutEffect(() => {
    if (!requested)
      dispatch(
        fetchAvailability("9768b832-db87-4ada-8ff0-ecace5c5315d", "767")
      );

    setRequested(true);
  }, [dispatch, requested]);

  return <Desktop />;
};
