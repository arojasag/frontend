import CategoryBar from "~/app/_components/feedPage/CategoryBar";
import HeroCarousel from "~/app/_components/feedPage/HeroCarousel";
import HorizontalScrollList from "~/app/_components/feedPage/HorizontalScrollList";
import Footer from "~/app/_components/landingPage/Footer";
// import { api } from "~/trpc/react"; // uncomment when using the actual API and remove sample data

// sample data for demonstration purposes
import { sampleEvents, featuredEvents, samplecategories } from "~/constants";

export default function FeedPage() {
  // Uncomment the following part when using the actual API, I put this here as an example
  // const [featuredEvents, popularEvents, recentEvents] = await Promise.all([
  //   api.events.getFeatured.query(),
  //   api.events.getPopular.query(),
  //   api.events.getRecent.query(),
  // ]);

  return (
    <>
      <div className="space-y-10 px-2 py-8 md:px-16">
        <HeroCarousel items={featuredEvents} />
        <CategoryBar categories={samplecategories} />
        <HorizontalScrollList title="Eventos Populares" events={sampleEvents} />
        <HorizontalScrollList
          title="Eventos Recién Añadidos"
          events={sampleEvents}
        />
      </div>
      <Footer />
    </>
  );
}
