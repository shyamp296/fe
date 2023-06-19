import React, { useEffect, useState } from "react";
import axios from "axios";

import { Link, useNavigate, useParams } from "react-router-dom";

const Userdetail = () => {
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
      const response = await axios.get(
        `https://mernstack2-bq2z.onrender.com/users/${id}`
      );
      setUser(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div class="container-xl px-4 mt-4">
        <div class="row">
          <div class="col-xl-4">
            <div class="card mb-4 mb-xl-0">
              <div class="card-header">Profile Picture</div>
              <div class="card-body text-center">
                <img
                  class="img-account-profile rounded-circle mb-2"
                  src={`https://mernstack2-bq2z.onrender.com/${user.profile}`}
                  alt="profile_picture"
                  style={{
                    height: "200px",
                    width: "200px",
                    
                  }}
                />
              </div>    
            </div>
          </div>
          <div class="col-xl-8">
            <div class="card mb-4">
              <div class="card-header">Account Details</div>
              <div class="card-body">
                <form>
                  <div class="mb-3">
                    <label class="small mb-1" for="inputUsername">
                      Username
                    </label>
                    <input
                      class="form-control"
                      disabled
                      id="inputUsername"
                      type="text"
                      placeholder="Enter your username"
                      value={user.firstname}
                    />
                  </div>

                  <div class="row gx-3 mb-3">
                    <div class="col-md-6">
                      <label class="small mb-1" for="inputFirstName">
                        First name
                      </label>
                      <input
                        class="form-control"
                        disabled
                        id="inputFirstName"
                        type="text"
                        placeholder="Enter your first name"
                        value={user.firstname}
                      />
                    </div>

                    <div class="col-md-6">
                      <label class="small mb-1" for="inputLastName">
                        Last name
                      </label>
                      <input
                        class="form-control"
                        id="inputLastName"
                        type="text"
                        disabled
                        placeholder="Enter your last name"
                        value={user.lastname}
                      />
                    </div>
                  </div>

                  <div class="row gx-3 mb-3">
                    <div class="col-md-6">
                      <label class="small mb-1" for="inputOrgName">
                        Gender
                      </label>
                      <input
                        class="form-control"
                        id="inputOrgName"
                        type="text"
                        disabled
                        placeholder="Enter your organization name"
                        value={user.gender}
                      />
                    </div>

                    <div class="col-md-6">
                      <label class="small mb-1" for="inputLocation">
                        Location
                      </label>
                      <input
                        class="form-control"
                        id="inputLocation"
                        type="text"
                        disabled
                        placeholder="Enter your location"
                        value={user.location}
                      />
                    </div>
                  </div>

                  <div class="mb-3">
                    <label class="small mb-1" for="inputEmailAddress">
                      Email address
                    </label>
                    <input
                      class="form-control"
                      id="inputEmailAddress"
                      type="email"
                      disabled
                      placeholder="Enter your email address"
                      value={user.email}
                    />
                  </div>

                  <div class="row gx-3 mb-3">
                    <div class="col-md-6">
                      <label class="small mb-1" for="inputPhone">
                        Phone number
                      </label>
                      <input
                        class="form-control"
                        id="inputPhone"
                        disabled
                        type="tel"
                        placeholder="Enter your phone number"
                        value={user.phone}
                      />
                    </div>

                    <div class="col-md-6">
                      <label class="small mb-1" for="inputBirthday">
                        Status
                      </label>
                      <input
                        class="form-control"
                        id="inputBirthday"
                        disabled
                        type="text"
                        name="birthday"
                        placeholder="Enter your birthday"
                        value={user.status}
                      />
                    </div>
                  </div>
                  <button
                    onClick={() => navigate("/")}
                    class="btn btn-danger"
                    type="button"
                  >
                    back
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Userdetail;
