import { createClient } from "@supabase/supabase-js";

// const supabaseUrl = process.env.SUPABASE_URL as string;
// const supabaseKey = process.env.SUPABASE_KEY as string;
export const supabase = createClient(
    "https://pvpkvfzhfukbkyudiqic.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB2cGt2ZnpoZnVrYmt5dWRpcWljIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzM5MDg0MzAsImV4cCI6MjA0OTQ4NDQzMH0.v4pFYurmkR4Y-MhBLauI-G7sLyi_u0db8jI9i8pbNXs"
);
