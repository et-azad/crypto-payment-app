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
            case "ConnectorNotFoundError":
              pushToast("warning", "Please use different connector");
              break;
            case "SwitchChainError":
              pushToast("warning", "Unable to switch Network");
              break;
            default:
              pushToast("error", error.name);
              break;
          }
        } else if (error.code) {
          switch (error.code) {
            case -32000:
              pushToast("error", "You does not have sufficient funds for complete transaction");
              break;
            case -32603:
              pushToast("error", "You does not have sufficient funds for complete transaction");
              break;
            default:
              pushToast("error", error.message);
              break;
          }
        }
      }
    }, 200);
    return () => clearTimeout(cleanUp);
  }, [error, pushToast])
}