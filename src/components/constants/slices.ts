import { NavLink } from "@/components/models/link";

export interface NavState {
  type: "main" | "gateway";
  index: "/" | "/gateway/pay";
  show: boolean;
  links: NavLink[];
}
