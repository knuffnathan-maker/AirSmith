import { LandingPage } from "@/components/landing-page";
import { createClient } from "@/lib/supabase/server";

type HomeProps = {
  searchParams: Promise<{ error?: string }>;
};

export default async function Home({ searchParams }: HomeProps) {
  const params = await searchParams;
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <LandingPage user={user} authError={params.error === "auth"} />
  );
}
