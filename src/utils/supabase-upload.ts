/* eslint-disable @typescript-eslint/no-unused-vars */

import { supabase } from "@/config/supabase";
import crypto from "crypto";

export async function supabaseUpload(file: File) {
    try {
        const ext = file.name.split(".").pop();
        const fileName = crypto
            .randomBytes(new Date().toString().length)
            .toString("hex");
        const filePath = `${fileName}.${ext}`;
        const { data, error } = await supabase.storage
            .from("toline-storage")
            .upload(filePath, file);

        if (error) {
            return error;
        }

        const { data: url } = supabase.storage
            .from("toline-storage")
            .getPublicUrl(filePath);

        return url.publicUrl || null;
    } catch (error) {
        return null;
    }
}
