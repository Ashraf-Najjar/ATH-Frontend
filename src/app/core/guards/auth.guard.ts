import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { AuthService } from "src/app/auth/services/auth.service";

/**
 * Extracts the value of a given key from an object and ensures it is returned as an array.
 * - If the value is already an array, it is returned as is. Otherwise, the value is wrapped in an array.
 * This utility simplifies code for extracting `allowedAccessTokens` and `allowedTypes`.
 * @param data
 * @param key
 */
const extractDataAsArray = <T = string>(data: { [key: string]: string | string[] }, key: string): T[] | undefined => {
    return data[key] ? <T[]>(Array.isArray(data[key]) ? data[key] : [data[key]]) : undefined;
}

export const authGuard: CanActivateFn = async (route, state) => {
    const authService = inject(AuthService);
    const user = authService.getUser();
    const router = inject(Router);
    const allowedTypes = extractDataAsArray(route.data, "allowedTypes");
    console.log('allowedTypes ', allowedTypes)
    if(allowedTypes?.includes(user?.role?.toUpperCase() ?? "")) return true;
    return router.navigate(['/auth/login']);
}