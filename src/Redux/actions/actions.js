export const setQuestions = (questions) => {
  return {
    type: 'SET_QUESTIONS',
    payload: questions,
  };
};

export const nextQuestion = () => {
  return {
    type: 'NEXT_QUESTION',
  };
};
export const prevQuestion = () => {
  return {
    type: 'PREV_QUESTION',
  };
};

export const incrementScore = () => {
  return {
    type: 'INCREMENT_SCORE',
  };
};
