import { openPopUpKamera } from "@/features/modals/PopUpKameraSlice";
import React, { useCallback, useState } from "react";
import { useDispatch } from "react-redux";

const useStartAbsen = () => {
  const dispatch = useDispatch();
  const [absenType, setAbsenType] = useState(null);

  const handleStartAbsen = useCallback(
    (type) => {
      setAbsenType(type);
      dispatch(openPopUpKamera(type));
    },
    [dispatch]
  );

  return {
    absenType,
    setAbsenType,
    handleStartAbsen,
  };
};
export default useStartAbsen;
