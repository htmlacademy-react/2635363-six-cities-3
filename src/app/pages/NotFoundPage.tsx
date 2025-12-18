import { Link } from 'react-router-dom';

const NotFoundPage: React.FC = () => (
  <div style={{ padding: '40px', textAlign: 'center' }}>
    <h1>404 Not Found</h1>
    <p>Страница не существует</p>
    <Link to="/">Вернуться на главную</Link>
  </div>
);

export default NotFoundPage;
