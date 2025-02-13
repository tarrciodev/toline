import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import { Projects } from "@/components/projects";
import { WhyUs } from "@/components/why-us";

export default async function Home() {
    return (
        <div className='bg-gray-50 min-h-screen'>
            <Header />
            <Hero />
            <WhyUs />
            <Projects />
            <Footer />
        </div>
    );
}
