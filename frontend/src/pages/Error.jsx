import { Link } from 'react-router-dom';
import '../styles/error.css';

const Error = () => {
  return (
    <div className="error-page">
      <h1>404</h1>
      <h2>Page Not Found</h2>
      <p>The page you are looking for does not exist.</p>
      <Link to="/dashboard" className="error-link">
        Go to Dashboard
      </Link>
    </div>
  );
};

export default Error;