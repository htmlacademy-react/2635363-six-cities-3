import { Review } from '../../types/types';
import ReviewItem from './ReviewItem';
import ReviewForm from './ReviewForm';

interface ReviewListProps {
  reviews: Review[];
}

const ReviewList: React.FC<ReviewListProps> = ({ reviews }) => (
  <section className="offer__reviews reviews">
    <h2 className="reviews__title">
      Reviews &middot;
      <span className="reviews__amount">{reviews.length}</span>
    </h2>
    <ul className="reviews__list">
      {reviews.map((review) => (
        <ReviewItem key={review.id} review={review} />
      ))}

    </ul>
    <ReviewForm />
  </section>
);

export default ReviewList;
