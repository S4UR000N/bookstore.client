'use client'
import JwtService from "../services/JwtService";

export default function Auth({
    children,
    roles
  }: Readonly<{
    children: React.ReactNode;
    roles: string;
  }>) {
    let userRole = JwtService.getJwtToken();
    return (hasAccess(roles, userRole?.role)
        ? (<>{children}</>)
        : (<></>)
    );
  }

  function hasAccess(roles: string, userRole: string) {
    if (roles) {
        if (userRole) {
            if (!roles.includes(",")) {
                return roles == (userRole);
            }
            else {
                return roles
                    .split(",")
                    .map(role => role.trim())
                    .includes(userRole);
            }
        }
        return false
    }
    return true;
  }