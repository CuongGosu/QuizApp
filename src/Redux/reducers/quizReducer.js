const quizReducer = (state, action) => {
  switch (action.type) {
    case 'SET_QUESTIONS':
      return {
        ...state,
        questions: action.payload,
      };
    case 'NEXT_QUESTION':
      return {
        ...state,
        currentQuestionIndex: state.currentQuestionIndex + 1,
      };
    case 'PREV_QUESTION':
      return {
        ...state,
        currentQuestionIndex: state.currentQuestionIndex - 1,
      };
    case 'INCREMENT_SCORE':
      return {
        ...state,
        score: state.score + 1,
      };
    default:
      return state;
  }
};

export default quizReducer;
