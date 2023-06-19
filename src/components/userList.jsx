import React, { useState, useEffect } from "react";
import axios from "axios";
import "./MyButton.css";
import { Table, Dropdown, Button, Col, Card, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [total, setTotal] = useState(0);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchUsers();
  }, [page, limit, search]);

  const fetchUsers = async () => {
    try {
      const response = await axios.get(
        `https://mernstack2-bq2z.onrender.com/users?page=${page}&limit=${limit}&search=${search}`
      );
      setUsers(response.data.data);
      setTotal(response.data.total);
    } catch (error) {
      console.error(error);
    }
  };

  const handleInputChange = (event) => {
    setSearch(event.target.value);
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const handleLimitChange = (newLimit) => {
    setLimit(newLimit);
    setPage(1);
  };

  const handleExport = () => {
    axios
      .get("https://mernstack2-bq2z.onrender.com/exportCsv", {
        responseType: "blob",
      })
      .then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "export.csv");
        document.body.appendChild(link);
        link.click();
      })
      .catch((error) => {
        console.error("Error exporting data to CSV:", error);
      });
  };

  const handleDelete = async (id) => {
    try {
      console.log("Delete item with ID:", id);
      const response = await axios.delete(
        `https://mernstack2-bq2z.onrender.com/users/${id}`
      );
      console.log(response.data);
      fetchUsers();
      setUsers((prevUsers) => prevUsers.filter((user) => user._id !== id));
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  return (
    <>
      <div className="my-4 ">
        <Row className="justify-content-between mx-5">
          <Col
            xs={12}
            md={8}
            lg={6}
            className="d-flex flex-row justify-content-center justify-content-md-start"
          >
            <input
              className="w-100 w-md-75 mx-3 form-control"
              type="text"
              value={search}
              onChange={handleInputChange}
              placeholder="Search Here..."
            />
            <Button type="submit" variant="danger" className="">
              Search
            </Button>
          </Col>
          <Col xs={12} md={4} lg={6} className="text-right">
            <Button
              type="submit"
              variant="danger"
              as={Link}
              to={"/addEditFrom"}
              className="mx-2 "
            >
              + Add User
            </Button>
            <Button
              type="submit"
              variant="danger"
              onClick={handleExport}
              className="mx-2"
            >
              Export To Csv
            </Button>
          </Col>
        </Row>
      </div>

      <div className="d-flex justify-content-center align-items-center">
        <Col xs={12} lg={10}>
          <Card>
            <Card.Body>
              <Table striped hover responsive>
                <thead className="thead-dark">
                  <tr>
                    <th>FullName</th>
                    <th>Email</th>
                    <th>Gender</th>
                    <th>Status</th>
                    <th>Profile</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user._id}>
                      <td>
                        {user.firstname} {user.lastname}
                      </td>
                      <td>{user.email}</td>
                      <td>{user.gender}</td>
                      <td>
                        <Dropdown>
                          <Dropdown.Toggle variant="danger" id="dropdown-basic">
                            {user.status}
                          </Dropdown.Toggle>

                          <Dropdown.Menu>
                            <Dropdown.Item href="/action">active</Dropdown.Item>
                            <Dropdown.Item href="#/action-2">
                              Inactive
                            </Dropdown.Item>
                          </Dropdown.Menu>
                        </Dropdown>
                      </td>
                      <td>
                        {user.profile && (
                          <img
                            src={`https://mernstack2-bq2z.onrender.com/${user.profile}`}
                            alt="Profile"
                            style={{
                              height: "40px",
                              width: "40px",
                              borderRadius: "50%",
                            }}
                          />
                        )}
                      </td>
                      <td>
                        <Dropdown>
                          <Dropdown.Toggle variant="secondary">
                            <i className="bi-three-dots-vertical"></i>
                          </Dropdown.Toggle>
                          <Dropdown.Menu>
                            <Dropdown.Item
                              as={Link}
                              to={`/addEditFrom/${user._id}`}
                            >
                              Edit
                            </Dropdown.Item>
                            <Dropdown.Item
                              as={Link}
                              to={`/userDetail/${user._id}`}
                            >
                              View
                            </Dropdown.Item>
                            <Dropdown.Item
                              onClick={() => handleDelete(user._id)}
                            >
                              Delete
                            </Dropdown.Item>
                          </Dropdown.Menu>
                        </Dropdown>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>

              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <span>Page:</span>
                  <button
                    onClick={() => handlePageChange(page - 1)}
                    disabled={page === 1}
                  >
                    Previous
                  </button>
                  <span>{page}</span>
                  <button
                    onClick={() => handlePageChange(page + 1)}
                    disabled={page === Math.ceil(total / limit)}
                  >
                    Next
                  </button>
                </div>
                <div>
                  <span>Items per page:</span>
                  <select
                    value={limit}
                    onChange={(e) =>
                      handleLimitChange(parseInt(e.target.value))
                    }
                  >
                    <option value={10}>10</option>
                    <option value={20}>20</option>
                    <option value={50}>50</option>
                  </select>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </div>
    </>
  );
};

export default UserList;
