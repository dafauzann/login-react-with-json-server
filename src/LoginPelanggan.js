import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const LoginPelanggan = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    useEffect(() => {
        sessionStorage.clear();
    }, []);

    const proceedLogin = (e) => {
        e.preventDefault();
        if (validate()) {
            fetch("http://localhost:8000/pelanggan/")
                .then((res) => res.json())
                .then((data) => {
                    const foundUser = data.pelanggan.find((user) => user.username === username && user.password === password);
                    if (foundUser) {
                        toast.success('Success');
                        sessionStorage.setItem('username', username);
                        navigate('/');
                    } else {
                        toast.error('Invalid credentials');
                    }
                })
                .catch((err) => {
                    toast.error('Error logging in: ' + err.message);
                });
        }
    };

    const validate = () => {
        let result = true;
        if (username === '' || username === null) {
            result = false;
            toast.warning('Please enter username');
        }
        if (password === '' || password === null) {
            result = false;
            toast.warning('Please enter password');
        }
        return result;
    };

    const redirectToAdminLogin = () => {
        navigate('/admin');
    };

    return (
        <div className="row">
            <div className="offset-lg-3 col-lg-6" style={{ marginTop: '100px' }}>
                <form onSubmit={proceedLogin} className="container">
                    <div className="card">
                        <div className="card-header">
                            <h2>User Login</h2>
                        </div>
                        <div className="card-body">
                            <div className="form-group">
                                <label>User Name <span className="errmsg">*</span></label>
                                <input value={username} onChange={e => setUsername(e.target.value)} className="form-control"></input>
                            </div>
                            <div className="form-group">
                                <label>Password <span className="errmsg">*</span></label>
                                <input type="password" value={password} onChange={e => setPassword(e.target.value)} className="form-control"></input>
                            </div>
                        </div>
                        <div className="card-footer">
                            <button type="submit" className="btn btn-primary">Login</button> |
                            <Link className="btn btn-success" to={'/register'}>New User</Link>
                            <button onClick={redirectToAdminLogin} className="btn btn-warning ml-2">Masuk sebagai admin</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default LoginPelanggan;
