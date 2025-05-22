import Cookies from "js-cookie"
export function ChangingRoute(prop: string) {
      if (prop === "/dashboard") {
            window.location.href="/admin/admin-dashboard"
      } else if (prop === "/add-post") {
            window.location.href="/admin/add-post"
      } else if (prop === "/manage-post") {
            window.location.href="/admin/manage-post"
      } else {
            window.location.href="/"
      }
}