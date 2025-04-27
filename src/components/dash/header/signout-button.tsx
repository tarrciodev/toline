"use client";
import { handleSignout } from "@/actions/users/signout";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";

export function SignoutButton() {
    return (
        <DropdownMenuItem
            onClick={() => handleSignout()}
            className='flex justify-center'
        >
            logout
        </DropdownMenuItem>
    );
}
