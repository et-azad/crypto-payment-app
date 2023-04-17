import { useCallback, useEffect, useMemo } from "react";
import { useDispatch } from "react-redux";
import { AlertOptions } from "@/components/models/alert";
import { removeAlert } from "@/store/slices/alert";

export default function ToastCard({ alert }: { alert: AlertOptions }) {
    const dispatch = useDispatch();
    const alertType = useMemo(() => ({
        warning:
            <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 rounded-lg bg-orange-700 text-orange-200">
                <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd"></path></svg>
                <span className="sr-only">Warning icon</span>
            </div>,
        error:
            <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 rounded-lg bg-red-800 text-red-200">
                <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                <span className="sr-only">Error icon</span>
            </div>,
        success:
            <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 rounded-lg bg-green-800 text-green-200">
                <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                <span className="sr-only">Success icon</span>
            </div>
    }), [])
    const removeThisAlert = useCallback(() => dispatch(removeAlert(alert.id)), [alert, dispatch])

    useEffect(() => {
        const cleanUp = setTimeout(() => {
            removeThisAlert();
        }, 3000);

        return () => clearTimeout(cleanUp)
    }, [removeThisAlert])

    return (
        <div className="flex items-center w-full max-w-fit p-4 text-gray-500 bg-orange-200 rounded-lg shadow cursor-pointer gap-1" role="alert" onClick={removeThisAlert}>
            {alertType[alert.type]}
            <div className="ml-3 text-sm font-normal">{alert.message}</div>
            <button type="button" className="ml-auto -mx-1.5 -my-1.5 bg-orange-200 text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-orange-300 inline-flex h-8 w-8" aria-label="Close" onClick={removeThisAlert}>
                <span className="sr-only">Close</span>
                <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
            </button>
        </div>
    )
}