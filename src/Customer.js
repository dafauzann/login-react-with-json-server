import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Customer = () => {
    const [custlist, custupdate] = useState([]);
    const [haveedit, editchange] = useState(false);
    const [haveview, viewchange] = useState(false);
    const [haveadd, addchange] = useState(false);
    const [haveremove, removechange] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        GetUserAccess();
        loadcustomer();
    }, []);

    const loadcustomer = () => {
        fetch("http://localhost:8000/doctors")
            .then((res) => {
                if (!res.ok) {
                    return false;
                }
                return res.json();
            })
            .then((res) => {
                custupdate(res);
            });
    };

    const GetUserAccess = () => {
        const userrole = sessionStorage.getItem("userrole") != null ? sessionStorage.getItem("userrole").toString() : "";
        fetch(`http://localhost:8000/roleaccess?role=${userrole}&menu=doctors`)
            .then((res) => {
                if (!res.ok) {
                    navigate("/");
                    toast.warning("Anda tidak diizinkan untuk mengakses");
                    return false;
                }
                return res.json();
            })
            .then((res) => {
                console.log(res);
                if (res.length > 0) {
                    viewchange(true);
                    let userobj = res[0];
                    editchange(userobj.haveedit);
                    addchange(userobj.haveadd);
                    removechange(userobj.havedelete);
                } else {
                    navigate("/");
                    toast.warning("Anda tidak diizinkan untuk mengakses");
                }
            });
    };

    const handleAddDoctor = () => {
        if (haveadd) {
            navigate("/add-doctor");
        } else {
            toast.warning("Anda tidak memiliki akses untuk menambahkan");
        }
    };

    const handleEditDoctor = (code) => {
        if (haveedit) {
            navigate(`/edit-doctor/${code}`);
        } else {
            toast.warning("Anda tidak memiliki akses untuk mengedit");
        }
    };

    const handleRemoveDoctor = (code) => {
        if (haveremove) {
            fetch(`http://localhost:8000/doctors/${code}`, {
                method: "DELETE",
            })
                .then(() => {
                    loadcustomer();
                    toast.success("Dokter berhasil dihapus");
                })
                .catch((error) => {
                    toast.error("Terjadi kesalahan saat menghapus dokter");
                    console.error("Error:", error);
                });
        } else {
            toast.warning("Anda tidak memiliki akses untuk menghapus");
        }
    };

    return (
        <div className="container">
            <div className="card">
                <div className="card-header">
                    <h3>Customer Listing</h3>
                </div>
                <div className="card-body">
                    <button onClick={handleAddDoctor} className="btn btn-success">
                        Add (+)
                    </button>
                    <br></br>
                    <table className="table table-bordered">
                        <thead className="bg-dark text-white">
                            <tr>
                                <th>Code</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {custlist &&
                                custlist.map((item) => (
                                    <tr key={item.code}>
                                        <td>{item.code}</td>
                                        <td>{item.name}</td>
                                        <td>{item.email}</td>
                                        <td>
                                            <button onClick={() => handleEditDoctor(item.code)} className="btn btn-primary">
                                                Edit
                                            </button>{" "}
                                            |{" "}
                                            <button onClick={() => handleRemoveDoctor(item.code)} className="btn btn-danger">
                                                Remove
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Customer;
