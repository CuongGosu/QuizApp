import '../styles/Main.scss';
import LogoQuiz from '../imgs/logo_quiz.png';
import { Link } from 'react-router-dom';
function Main() {
  return (
    <div className='container'>
      <img src={LogoQuiz} className='logo-quiz' alt='Logo Quiz App' />
      <Link className='button btn-start' to={'quiz'}>
        Start Quiz!
      </Link>
    </div>
  );
}

export default Main;
