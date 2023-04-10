import { useSelector } from "react-redux"
import { Alert, AlertOptions } from "@/components/models/alert";
import ToastCard from "@/components/shared/ToastCard";

export default function Toast() {
    const alerts = useSelector(({ alert }: { alert: Alert }) => alert.alerts);

    return (
        <div className="grid gap-1 fixed top-24 right-3">
            {alerts.map((alert: AlertOptions) => <ToastCard key={alert.id} alert={alert} />)}
        </div>
    )
}