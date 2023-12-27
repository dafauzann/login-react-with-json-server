import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Login = () => {
    const [username, usernameupdate] = useState('');
    const [password, passwordupdate] = useState('');

    const navigate = useNavigate();

//     useEffect(()=>{
// sessionStorage.clear();
//     },[]);

    const ProceedLogin = (e) => {
        e.preventDefault();
        if (validate()) {
            const inputObj = { "username": username, "password": password };
            fetch("http://localhost:3000/user/").then((res) => {
                return res.json();
            }).then((resp) => {
                const user = resp.find((item) => {
                    if (item.username === inputObj.username && item.password === inputObj.password) {
                        toast.success('Success');
                        sessionStorage.setItem('username', username);
                        sessionStorage.setItem('userrole', item.role);
                        navigate('/');
                    } else {
                        console.log('Login Failed');
                        toast.error('Please Enter valid credentials');
                    }
                });
                console.log(user);
            }).catch((err) => {
                toast.error('Login Failed due to :' + err.message);
            });
        }
    }

    // const ProceedLoginusingAPI = (e) => {
    //     e.preventDefault();
    //     if (validate()) {
    //         let inputobj = { "username": username, "password": password };
    //         fetch("https://localhost:3000/user/"+username,{
    //             method:'POST',
    //             headers:{
    //                 'Content-Type':'application/json'
    //             },
    //             body:JSON.stringify(inputobj)
    //         }).then((res) => {
    //             return res.json();
    //         }).then((resp) => {
    //             //cari username dan password yang sama dengan inputObj, jika ada tampilkan toast success jika tidak tampilkan toast error
    //             // console.log(resp);
    //             if (Object.keys(resp).length === 0) {
    //                 toast.error('Please Enter valid username');
    //             } else {
    //                 if (resp.password === password) {
    //                     toast.success('Success');
    //                     sessionStorage.setItem('username',username);
    //                     navigate('/')
    //                 }else{
    //                     toast.error('Please Enter valid credentials');
    //                 }
    //             }
    //         }).catch((err) => {
    //             toast.error('Login Failed due to :' + err.message);
    //         });


    //     }
    // }
    const validate = () => {
        let result = true;
        if (username === '' || username === null) {
            result = false;
            toast.warning('Please Enter Username');
        }
        if (password === '' || password === null) {
            result = false;
            toast.warning('Please Enter Password');
        }
        return result;
    }
    return (
        <div className="row">
            <div className="offset-lg-3 col-lg-6" style={{ marginTop: '100px' }}>
                <form onSubmit={ProceedLogin} className="container">
                    <div className="card">
                        <div className="card-header">
                            <h2>Admin Login</h2>
                        </div>
                        <div className="card-body">
                            <div className="form-group">
                                <label>User Name <span className="errmsg">*</span></label>
                                <input value={username} onChange={e => usernameupdate(e.target.value)} className="form-control"></input>
                            </div>
                            <div className="form-group">
                                <label>Password <span className="errmsg">*</span></label>
                                <input type="password" value={password} onChange={e => passwordupdate(e.target.value)} className="form-control"></input>
                            </div>
                        </div>
                        <div className="card-footer">
                            <button type="submit" className="btn btn-primary">Login</button> |
                            <Link className="btn btn-success" to={'/register'}>New User</Link>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login;