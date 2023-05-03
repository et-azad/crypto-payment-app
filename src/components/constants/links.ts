import { NavLink } from "../models/link";

export const SETUP_NAVS: NavLink[] = [
    {
        lable: "Home",
        href: "/"
    },
    {
        lable: "Pay Now",
        href: "/setup/pay"
    }
]

export const GATEWAY_NAVS: NavLink[] = [
    {
        lable: "Supported Networks",
        href: "/gateway/supported-networks"
    },
    {
        lable: "Cancel Payment",
        href: "/gateway/cancel"
    }
]