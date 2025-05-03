"use client";
import { handleSignout } from "@/actions/users/signout";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { useSessionStore } from "@/store/session";

export function SignoutButton() {
    const { setIsLoggedAs } = useSessionStore();

    function handleClick() {
        setIsLoggedAs(null);
        handleSignout();
    }
    return (
        <DropdownMenuItem onClick={handleClick} className='flex justify-center'>
            logout
        </DropdownMenuItem>
    );
}
