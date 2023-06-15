import React, { useState, useEffect } from "react";
import { Card, Col, Form, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import "./MyButton.css";
import axios from "axios";

const RegistrationForm = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      fetchUser();
    }
  }, [id]);

  const fetchUser = async () => {
    try {
      const response = await axios.get(`https://mernstack2-bq2z.onrender.com/users/${id}`);
      setUser(response.data.data);
      console.log(response.data.data);
      formik.setValues(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };
  console.log(user);

  const initialValues = {
    firstname: user?.firstname || "",
    lastname: user?.lastname || "",
    email: user?.email || "",
    phone: user?.phone || "",
    gender: user?.gender || "male",
    location: user?.location || "",
    status: user?.status || "active",
    profile: user?.profile || null,
  };
  const validationSchema = Yup.object().shape({
    firstname: Yup.string().required("First Name is required"),
    lastname: Yup.string().required("Last Name is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    phone: Yup.string().required("Phone is required"),
    gender: Yup.string().required("Gender is required"),
    location: Yup.string(),
    status: Yup.string().required("Status is required"),
  });

  const onSubmit = async (values) => {
    try {
      if (id) {
        await axios.put(`https://mernstack2-bq2z.onrender.com/users/${id}`, values, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      } else {
        const response = await axios.post(
          "https://mernstack2-bq2z.onrender.com/users",
          values,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );
        console.log(response);
      }
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  return (
    <>
      <div>
        <h1 className="text-center">Register Your Details</h1>
      </div>
      <div className="d-flex justify-content-center align-items-center">
        <Col md={12} lg={10}>
          <Card>
            <Card.Body>
              <Form onSubmit={formik.handleSubmit}>
                <Row>
                  <Col md={6}>
                    <Form.Group controlId="firstname">
                      <Form.Label>First Name</Form.Label>
                      <Form.Control
                        type="text"
                        name="firstname"
                        placeholder="Enter First Name"
                        value={formik.values.firstname}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        isInvalid={
                          formik.touched.firstname && formik.errors.firstname
                        }
                      />
                      <Form.Control.Feedback type="invalid">
                        {formik.errors.firstname}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group controlId="lastname">
                      <Form.Label>Last Name</Form.Label>
                      <Form.Control
                        type="text"
                        name="lastname"
                        placeholder="Enter Last Name"
                        value={formik.values.lastname}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        isInvalid={
                          formik.touched.lastname && formik.errors.lastname
                        }
                      />
                      <Form.Control.Feedback type="invalid">
                        {formik.errors.lastname}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>

                <Row>
                  <Col md={6}>
                    <Form.Group controlId="email">
                      <Form.Label>Email Address</Form.Label>
                      <Form.Control
                        type="email"
                        name="email"
                        placeholder="Enter Email"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        isInvalid={formik.touched.email && formik.errors.email}
                      />
                      <Form.Control.Feedback type="invalid">
                        {formik.errors.email}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group controlId="phone">
                      <Form.Label>Phone</Form.Label>
                      <Form.Control
                        type="text"
                        name="phone"
                        placeholder="Enter Phone"
                        value={formik.values.phone}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        isInvalid={formik.touched.phone && formik.errors.phone}
                      />
                      <Form.Control.Feedback type="invalid">
                        {formik.errors.phone}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>

                <Row>
                  <Col md={6}>
                    <Form.Group controlId="gender">
                      <Form.Label>Gender</Form.Label>
                      <Form.Check
                        type="radio"
                        name="gender"
                        label="Male"
                        value="male"
                        checked={formik.values.gender === "male"}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        isInvalid={
                          formik.touched.gender && formik.errors.gender
                        }
                      />
                      <Form.Check
                        type="radio"
                        name="gender"
                        label="Female"
                        value="female"
                        checked={formik.values.gender === "female"}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        isInvalid={
                          formik.touched.gender && formik.errors.gender
                        }
                      />
                      <Form.Control.Feedback type="invalid">
                        {formik.errors.gender}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group controlId="status">
                      <Form.Label>Status</Form.Label>
                      <Form.Control
                        as="select"
                        name="status"
                        value={formik.values.status}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        isInvalid={
                          formik.touched.status && formik.errors.status
                        }
                      >
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                      </Form.Control>
                      <Form.Control.Feedback type="invalid">
                        {formik.errors.status}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <Form.Group controlId="profile">
                      <Form.Label>Profile</Form.Label>
                      <Form.Control
                        type="file"
                        name="profile"
                        onChange={(event) =>
                          formik.setFieldValue(
                            "profile",
                            event.currentTarget.files[0]
                          )
                        }
                        onBlur={formik.handleBlur}
                        isInvalid={
                          formik.touched.profile && formik.errors.profile
                        }
                      />
                      <Form.Control.Feedback type="invalid">
                        {formik.errors.profile}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group controlId="location">
                      <Form.Label>Location</Form.Label>
                      <Form.Control
                        type="text"
                        name="location"
                        placeholder="Enter Location"
                        value={formik.values.location}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        isInvalid={
                          formik.touched.location && formik.errors.location
                        }
                      />
                      <Form.Control.Feedback type="invalid">
                        {formik.errors.location}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <button type="submit" className="custom-button">
                    {id ? "Update" : "Submit"}
                  </button>
                </Row>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </div>
    </>
  );
};

export default RegistrationForm;
