import React from 'react'
import { create } from "react-test-renderer"
import SignUpForm from '../components/SignUpForm'
import axios from "axios"

jest.mock("axios")

describe("sign up form", () => {
  test("it posts to the API of the new user", async () => {
    const response = {
      data: {
        name: "TestName",
        id: "1",
        organisation: "TestOrganisation",
        job_title: "TestJob"
      }
    }
    axios.post.mockResolvedValue(response)
    const component = create(<SignUpForm />)
    const instance = component.getInstance()
    await instance.createUserRequest()
    expect(axios.post).toHaveBeenCalledTimes(1)
    expect(axios.post).toHaveBeenCalledWith(
      'http://localhost:3001/api/v1/sign_up', {
        name: "",
        email: "",
        organisation: "",
        job_title: "",
        mobile: "",
        password: "",
        passwordConfirmation: ""
      }
    )
  });
});
