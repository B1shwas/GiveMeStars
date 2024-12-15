import ReviewCarousel from "./ReviewCarousel";
import ReviewsCard from "./ReviewsCard";
import Title from "./Title";

const LatestReviews = () => {
  return (
    <div className="bg-white">
      <div className="container pt-14 pb-8">
        <Title
          title="Latest Reviews"
          subtitle="Based on your recent searches"
          link="/"
        />
        <ReviewCarousel />
      </div>
    </div>
  );
};

export default LatestReviews;
