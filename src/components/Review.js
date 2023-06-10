import { useState, useEffect, useReducer } from 'react';
import { nextQuestion, prevQuestion } from '../Redux/actions/actions.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCircle,
  faCircleCheck,
  faCircleXmark,
} from '@fortawesome/free-solid-svg-icons';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import quizReducer from '../Redux/reducers/quizReducer';
import '../styles/Review.scss';
const Review = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { dataAPI, answerReview, questionsReview } = location.state;
  const [options, setOptions] = useState([]);
  const [state, dispatch] = useReducer(quizReducer, {
    questions: [],
    currentQuestionIndex: 0,
  });
  console.log(questionsReview[state.currentQuestionIndex].questions);
  console.log(questionsReview[state.currentQuestionIndex].options);
  useEffect(() => {
    if (questionsReview && questionsReview.length > 0) {
      const question = questionsReview[state.currentQuestionIndex];
      setOptions(question.options);
      console.log(options);
    }
  }, [state.currentQuestionIndex, questionsReview]);

  const handleNextQuestion = () => {
    dispatch(nextQuestion());
  };
  const handlePrevQuestion = () => {
    dispatch(prevQuestion());
  };
  const handlePlayAgain = () => {
    navigate('/quiz');
  };

  return (
    <div className='container-review'>
      <h1 className='title-question'>
        Question {state.currentQuestionIndex + 1}/
        <span className='number-question'>{questionsReview.length}</span>
      </h1>
      <p className='text-questions'>
        {questionsReview[state.currentQuestionIndex].questions}
      </p>
      <ul className='list-answer'>
        {options.map((data, index) => {
          const isCorrectAnswer =
            data === dataAPI[state.currentQuestionIndex].correct_answer;
          const isSelectedAnswer =
            data === answerReview[state.currentQuestionIndex];
          console.log(isSelectedAnswer);
          const answerClass = isSelectedAnswer
            ? isCorrectAnswer
              ? 'correct'
              : 'incorrect'
            : isCorrectAnswer && !isSelectedAnswer
            ? 'correct'
            : '';

          return (
            <li className={`item-answer ${answerClass}`} key={index}>
              <button>
                <p className='text-option'>{data}</p>

                {!isSelectedAnswer && !isCorrectAnswer && (
                  <FontAwesomeIcon className='fa-circle' icon={faCircle} />
                )}
                {isSelectedAnswer && isCorrectAnswer && (
                  <FontAwesomeIcon
                    className='fa-circle-check'
                    icon={faCircleCheck}
                  />
                )}

                {isSelectedAnswer && !isCorrectAnswer && (
                  <FontAwesomeIcon
                    className='fa-circle-Xmark'
                    icon={faCircleXmark}
                  />
                )}
                {isSelectedAnswer === false && isCorrectAnswer && (
                  <FontAwesomeIcon
                    className='fa-circle-Xmark'
                    icon={faCircleCheck}
                  />
                )}
              </button>
            </li>
          );
        })}
      </ul>
      <div className='listButton'>
        <button
          className={`button btn-prev ${
            state.currentQuestionIndex == 0 ? 'disabled' : ''
          }`}
          onClick={handlePrevQuestion}
        >
          Prev
        </button>
        <button
          className={`button btn-prev ${
            state.currentQuestionIndex === questionsReview.length - 1
              ? 'disabled'
              : ''
          }`}
          onClick={handleNextQuestion}
        >
          Next
        </button>
        <button className='button btn-play-again' onClick={handlePlayAgain}>
          Play Again
        </button>
      </div>
    </div>
  );
};

export default Review;
