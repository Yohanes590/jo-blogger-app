export default function ChangingRoute(prop: string) {
      if (typeof window !== "undefined") {
        if (prop === "/dashboard") {
          window.location.href = "/admin/admin-dashboard";
        } else if (prop === "/add-post") {
          window.location.href = "/admin/add-post";
        } else if (prop === "/manage-post") {
          window.location.href = "/admin/manage-post";
        } else {
          window.location.href = "/";
        }
      }
    }
     