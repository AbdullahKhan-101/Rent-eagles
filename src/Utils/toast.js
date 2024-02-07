import { toast } from "react-toastify";

export function ToastSuccess(response) {
    toast.success(response?.data?.message[0])
}

export function ToastError(error) {
    toast.error(error?.response?.data?.message[0])
}

export function ToastLogout() {
    toast("You have been logged out")
}