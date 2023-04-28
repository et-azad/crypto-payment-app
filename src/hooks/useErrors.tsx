import { useEffect } from "react";
import useToast from "@/hooks/useToast";

export default function useErrors(error: any) {
  const { pushToast } = useToast();

  useEffect(() => {
    const cleanUp = setTimeout(() => {
      console.log(error);
      if (error) {
        if (error.name) {
          switch (error.name) {
            case "UserRejectedRequestError":
              pushToast("error", "Connection request rejected");
              break;
            case "ConnectorAlreadyConnectedError":
              pushToast("warning", "You have already connected");
              break;
            default:
              pushToast("error", error.name);
              break;
          }
        }
      }
    }, 200);
    return () => clearTimeout(cleanUp);
  }, [error, pushToast])
}