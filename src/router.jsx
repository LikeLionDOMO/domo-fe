import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import Home from './page/Home';
import Recs from './page/Recs';
import RecsInfo from './page/RecsInfo';
import RecsResult from './page/RecsResult';
import RecsSave from './page/RecsSave';
import Benefix from './page/Benefix';
import NotFoundPage from './NotFoundPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <NotFoundPage />,
    children: [
      { index: true, element: <Home /> },
      { path: 'recs', element: <Recs /> },
      { path: 'recs/info', element: <RecsInfo /> },
      { path: 'recs/result', element: <RecsResult /> },
      { path: 'recs/save', element: <RecsSave /> },
      { path: 'benefix', element: <Benefix /> },
    ],
  },
]);
