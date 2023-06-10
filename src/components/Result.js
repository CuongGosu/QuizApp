import AwardImage from '../imgs/award.png';
import TryAgainImage from '../imgs/tryagain.png';
import '../styles/Result.scss';
import { useNavigate, useLocation } from 'react-router-dom';
const Result = () => {
  const location = useLocation();
  const { score, dataAPI, elapsedTime, answerReview, questionsReview } =
    location.state;
  const imageSrc = score >= dataAPI.length / 2 ? AwardImage : TryAgainImage;
  const navigate = useNavigate();
  const handlePlayAgain = () => {
    navigate('/quiz');
  };
  const handleReview = () => {
    navigate('/review', {
      state: {
        dataAPI,
        answerReview,
        questionsReview,
      },
    });
  };
  return (
    <>
      <div className='container-result'>
        <img
          className='img'
          src={imageSrc}
          alt={score >= dataAPI.length / 2 ? 'GoodJob' : 'Try again'}
        />

        <p>
          {score >= dataAPI.length / 2
            ? 'You are amazing!!!'
            : 'Better luck next time!'}
        </p>
        <p>
          {score}/{dataAPI.length} correct answers in {elapsedTime} seconds
        </p>
        <div className='list-button'>
          <button className='button btn-review' onClick={handleReview}>
            Review
          </button>
          <button className='button btn-again' onClick={handlePlayAgain}>
            Play Again
          </button>
        </div>
      </div>
    </>
  );
};
export default Result;
