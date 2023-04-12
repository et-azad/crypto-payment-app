import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { addAlert } from "@/store/slices/alert";

export default function useToast(): {
  pushToast: (type: "warning" | "error" | "success", message: string) => void;
} {
  const dispatch = useDispatch();
  const pushToast = useCallback(
    (type: "warning" | "error" | "success", message: string) => {
      dispatch(
        addAlert({
          id: Math.floor(Math.random() * 100000) + 1,
          visible: true,
          type: type,
          message: message,
        })
      );
    },
    [dispatch]
  );

  return {
    pushToast,
  };
}
