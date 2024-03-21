export const publicRoutes = ["/", "/logout"];
export const protectedRoutes = {
    "/home": ["Admin", "Librarian", "Customer"],
    "/user/:id": ["Admin", "Librarian"],

    hasRoute(route: string): boolean {
        if (this[route] === undefined) {
            return false;
        }
        return true;
    },
    hasAccess(route: string, role: string): boolean {
        if (this.hasRoute(this.formattedRoute(route)) && this[this.formattedRoute(route)].includes(role)) {
            return true;
        }
        return false;
    },
    formattedRoute(route: string): string {
        return route.replace(/\/\d+/g, "/:id");
    }
};
export const authRoutes = ["/login", "/register"];