export const publicRoutes = ["/"];
export const protectedRoutes = {
    "/home": ["Admin", "Librarian", "Customer"],

    hasRoute(route: string): boolean {
        if (this[route] === undefined) {
            return false;
        }
        return true;
    },
    hasAccess(route: string, role: string): boolean {
        console.log("HAS ACCESS???");
        console.log(this.hasRoute(route));
        console.log(route);
        console.log(this[route].includes(role));
        if (this.hasRoute(route) && this[route].includes(role)) {
            console.log("true");
            return true;
        }
        console.log("false");
        return false;
    }
};
export const authRoutes = ["/login", "/register"];