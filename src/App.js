import { Link } from 'react-router-dom';

function App() {
    return (
        <div>
            <div>
                <Link to='/'>Home</Link> <br />
                <Link to='/products'>Products</Link>
            </div>
        </div>
    );
}

export default App;
