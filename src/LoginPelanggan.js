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

    const redirectToAdmin = () => {
       //redirect to admin login
       navigate('/admin');
    }

    

    const proceedLogin = (e) => {
        e.preventDefault();
        //ambil value username dan password lalu jadikan objek
        const inputObj = {
            "username": username,
            "password": password
        };
        console.log(inputObj);
        //validasi inputObj apakah sama dengan username dan password yang ada di database
        if (validate()) {
            fetch("http://localhost:3000/pelanggan/").then((res) => {
                return res.json();
            }).then((resp) => {
                console.log(resp);
                const user = resp.find((item) => {
                    if (item.username === inputObj.username && item.password === inputObj.password) {
                        toast.success('Success');
                        sessionStorage.setItem('username', username);
                        sessionStorage.setItem('userrole', item.role);
                        navigate('/');
                        return true;
                    } else {
                        console.log('Login Failed');
                        toast.error('Please Enter valid credentials');
                        return false;
                    }
                });
                console.log(user);
                
                
            }).catch((err) => {
                toast.error('Login Failed due to :' + err.message);
                // toast.error('Please Enter valid credentials');
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
                            <button type="button" className="btn btn-warning ml-2" onClick={() => redirectToAdmin()}>Masuk sebagai admin</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default LoginPelanggan;
