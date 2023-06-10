import '../styles/App.scss';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Main from './Main';
import Quiz from './Quiz';
import Result from './Result';
import Review from './Review';
const router = createBrowserRouter([
  {
    path: '/',
    element: <Main />,
  },
  {
    path: '/quiz',
    element: <Quiz />,
  },
  {
    path: '/result',
    element: <Result />,
  },
  {
    path: '/review',
    element: <Review />,
  },
]);

function App() {
  return (
    <>
      <div className='App'>
        <RouterProvider router={router} />
      </div>
    </>
  );
}
export default App;
