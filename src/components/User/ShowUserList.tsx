import { useEffect, useState } from "react";
import { UserType } from "../../types/UserType";
import { deleteUser, getAllUsers } from "../../services/Users";
import { Link } from "react-router-dom";
import Loader from "../Common/Loader";

const ShowUserList = () => {

const [user, setUser] = useState<UserType[]>([]);
const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        getAllUser();
    }, []);

    const getAllUser = async() => {
        const userList = await getAllUsers();
        setUser(userList);
        setIsLoading(false);
        //console.log('brij data: ',userList);
        // axios.get(showUserApi)
        // .then((res) => {          
        //   setUser(res.data);
        //   console.log('brij data: ', res.data, '==',user);
        // })
        // .catch((err) => {
        //   console.log(err);
        // });
    }

    const handelDelete = async(id: number) => {
        setIsLoading(true);
        try {
          const response = await deleteUser(id);
          console.log('deleted successful', response);
          if (!response.ok) {
            setIsLoading(false);
            throw new Error("Failed to delete item");
          }
          setUser(user.filter((item) => item.id !== id));
        } catch (error) {
            setIsLoading(false);
          //setError(error.message);
        } finally {
          setIsLoading(false);
        }
    }

    

    if(user.length === 0) {
        return <h1>No User Found!</h1>
    } else {
        return (           
            <div>
                 { isLoading && <Loader /> }
                <table className="table table-striped">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            { user?.map((item: UserType, i: number) => {
                return (
                <tr key= {i + 1}>
                     <td>
                        {i + 1}
                    </td>
                    <td>
                        {item.name}
                    </td>
                    <td>
                        {item.email}
                    </td>
                    <td>
                        {item.phone}
                    </td>
                    <td>
                    <Link to={`/edit-user/${item.id}`}>
                      <span>Edit</span>
                      {/* <i className="fa fa-pencil" aria-hidden="true"></i> */}
                    </Link>
                    <Link to={`/user-detail/${item.id}`}>
                      <span>View</span>
                      {/* <i className="fa fa-eye" aria-hidden="true"></i> */}
                    </Link>
                    <button onClick={() => (item && item.id) && handelDelete(item.id)}>Delete</button>
                    {/* <i
                      className="fa fa-trash-o"
                      aria-hidden="true"
                      onClick={() => (item && item.id) && handelDelete(item.id)}
                    ></i> */}
                    </td>
                </tr>
                )
              })
            }
          </tbody>
          </table>
        </div>
        );
    }
};

export default ShowUserList;