import Hero from "@/components/Hero";
import LatestReviews from "@/components/LatestReviews";
import Navbar from "@/components/Navbar";
import TopSearched from "@/components/TopSearched";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <TopSearched />
      <LatestReviews />
    </>
  );
}
