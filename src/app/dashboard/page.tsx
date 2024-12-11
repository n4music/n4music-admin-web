import { DEFINE_ROUTE } from "@/constants/router";
import { redirect } from "next/navigation";

export default function page() {
  return (
    redirect(DEFINE_ROUTE.userManager)
  )
}