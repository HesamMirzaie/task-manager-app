import { Link } from 'react-router-dom';

function PageNotFound() {
  return (
    <div>
      404 PageNotFound
      <Link to="/">HomePage</Link>
    </div>
  );
}

export default PageNotFound;
