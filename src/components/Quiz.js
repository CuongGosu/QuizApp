import { useState, useEffect, useReducer } from 'react';
import useAxios from '../hooks/useAxios.js';
import { CircularProgress } from '@mui/material';
import '../styles/Quiz.scss';
import { useNavigate, Link } from 'react-router-dom';

import quizReducer from '../Redux/reducers/quizReducer';
import { nextQuestion, incrementScore } from '../Redux/actions/actions.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCircle,
  faCircleCheck,
  faCircleXmark,
  faHouse,
} from '@fortawesome/free-solid-svg-icons';

const Quiz = () => {
  const [state, dispatch] = useReducer(quizReducer, {
    questions: [],
    currentQuestionIndex: 0,
    score: 0,
  });
  const navigate = useNavigate();

  const [checked, setChecked] = useState(false);
  const [options, setOptions] = useState([]);
  const [finalQuestions, setFinalQuestions] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showCorrectAnswer, setShowCorrectAnswer] = useState(false);
  const [answerReview, setAnswerReview] = useState([]);
  const [questionsReview, setQuestionsReview] = useState([]);
  const [elapsedTime, setElapsedTime] = useState(0);
  const { response, loading } = useAxios({
    url: 'https://opentdb.com/api.php?amount=5',
  });
  const [startTime, setStartTime] = useState(null);
  const getRandomInt = (max) => {
    return Math.floor(Math.random() * Math.floor(max));
  };

  useEffect(() => {
    if (response && response.results.length > 0) {
      const question = response.results[state.currentQuestionIndex];
      let answers = [...question.incorrect_answers];
      answers.splice(
        getRandomInt(question.incorrect_answers.length),
        0,
        question.correct_answer
      );
      setOptions(answers);
      if (state.currentQuestionIndex + 1 === response.results.length) {
        setFinalQuestions(true);
      }
    }
  }, [response, state.currentQuestionIndex, navigate, startTime]);
  useEffect(() => {
    if (response && response.results.length > 0) {
      setStartTime(new Date().getTime());
    }
  }, [response]);
  if (loading) {
    return <CircularProgress />;
  }
  const handleSelect = (e) => {
    if (selectedAnswer == null) {
      const textElement = e.target.querySelector('.text-option');
      const question = response.results[state.currentQuestionIndex];
      setQuestionsReview((prevQuestions) => [
        ...prevQuestions,
        { questions: question.question, options },
      ]);
      if (textElement) {
        const SelectAnswer =
          textElement.textContent ===
          response.results[state.currentQuestionIndex].correct_answer;

        setAnswerReview((prevAnswer) => [
          ...prevAnswer,
          textElement.textContent,
        ]);
        setSelectedAnswer(textElement.textContent);
        if (SelectAnswer) {
          dispatch(incrementScore());
        } else {
          textElement.parentElement.classList.add('correct');
        }
        setShowCorrectAnswer(true);
        setChecked(true);
        if (state.currentQuestionIndex + 1 === response.results.length) {
          const endTime = new Date().getTime();
          const elapsedTimeInSeconds = Math.floor((endTime - startTime) / 1000);
          setElapsedTime(elapsedTimeInSeconds);
        }
      }
    } else {
      console.log('none');
    }
  };

  const handleNextQuestion = () => {
    dispatch(nextQuestion());
    setShowCorrectAnswer(false);
    setSelectedAnswer(null);
    setChecked(false);
  };
  const handleResults = () => {
    if (state.currentQuestionIndex + 1 === response.results.length) {
      navigate('/result', {
        state: {
          score: state.score,
          dataAPI: response.results,
          elapsedTime: elapsedTime,
          answerReview: answerReview,
          questionsReview: questionsReview,
        },
      });
    }
  };
  const handleBackHome = () => {
    console.log('.');
    navigate('/');
  };
  return (
    <div className='container'>
      <div className='btn-home' to={'main'}>
        <FontAwesomeIcon
          onClick={handleBackHome}
          className='icon-home'
          icon={faHouse}
        />
      </div>
      <h1 className='title-question'>
        Question {state.currentQuestionIndex + 1}/
        <span className='number-question'>{response.results.length}</span>
      </h1>
      <p className='text-questions'>
        {response.results[state.currentQuestionIndex].question}
      </p>
      <ul className='list-answer'>
        {options.map((data, index) => {
          const isCorrectAnswer =
            data ===
            response.results[state.currentQuestionIndex].correct_answer;
          const isSelectedAnswer = data === selectedAnswer;
          const answerClass = isSelectedAnswer
            ? isCorrectAnswer
              ? 'correct'
              : 'incorrect'
            : isCorrectAnswer && !isSelectedAnswer && showCorrectAnswer
            ? 'correct'
            : '';

          return (
            <li className={`item-answer ${answerClass}`} key={index}>
              <button onClick={handleSelect}>
                <p className='text-option'>{data}</p>
                {!showCorrectAnswer && !isSelectedAnswer && (
                  <FontAwesomeIcon className='fa-circle' icon={faCircle} />
                )}
                {showCorrectAnswer && !isSelectedAnswer && !isCorrectAnswer && (
                  <FontAwesomeIcon className='fa-circle' icon={faCircle} />
                )}
                {showCorrectAnswer && isSelectedAnswer && isCorrectAnswer && (
                  <FontAwesomeIcon
                    className='fa-circle-check'
                    icon={faCircleCheck}
                  />
                )}

                {showCorrectAnswer && isSelectedAnswer && !isCorrectAnswer && (
                  <FontAwesomeIcon
                    className='fa-circle-Xmark'
                    icon={faCircleXmark}
                  />
                )}
                {showCorrectAnswer &&
                  isSelectedAnswer === false &&
                  isCorrectAnswer && (
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
      {!finalQuestions && (
        <button
          className={`button btn-next ${!checked ? 'disabled' : ''}`}
          onClick={handleNextQuestion}
        >
          Next
        </button>
      )}
      {finalQuestions && (
        <button
          className={`button btn-result ${!checked ? 'disabled' : ''}`}
          onClick={handleResults}
        >
          Results
        </button>
      )}
    </div>
  );
};

export default Quiz;
