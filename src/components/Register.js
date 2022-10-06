import {
  faCheckCircle,
  faCircleInfo,
  faCircleXmark,
  faMessage,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import autoprefixer from "autoprefixer";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  evaluateUserName,
  evaluateName,
  evaluatePassword,
  evaluateMatchPassword,
} from "../store/registerSlice";

const Register = () => {
  const dispatch = useDispatch();
  const {
    isEmptyUserName,
    isEmptyName,
    isEmptyPass,
    isEmptyConfPass,
    isValidUserName,
    isValidPassword,
    isPassMatch,
    isValidPwLength,
    isValidUserLength,
    isUserNoSc,
    isPwHasLow,
    isPwHasUpp,
    isPwHasNumber,
    isPwHasSc,

    isSubmitAvailable,
  } = useSelector((store) => store.register);

  const inputs = [
    {
      label: "Username",
      icon: isEmptyUserName ? "hidden" : "block",
      condition: isValidUserName,
      errorMessages: [
        !isUserNoSc && "Must be letter, number and underscore only",
        !isValidUserLength && "Minimum of 3 and maximum of 24 characters",
      ],
      type: "text",
    },
    {
      label: "Name",
      icon: isEmptyName ? "hidden" : "block",
      condition: true,
      errorMessages: [],
      type: "text",
    },
    {
      label: "Password",
      icon: isEmptyPass ? "hidden" : "block",
      condition: isValidPassword,
      errorMessages: [
        !isPwHasLow && "Must have lowercase letter",
        !isPwHasUpp && "Must have uppercase letter",
        !isPwHasNumber && "Must have number",
        !isPwHasSc && "Must have any of this special characters [*&^!@#$%]",
        !isValidPwLength && "Minimum of 8 and maximum of 24 characters",
      ],
      type: "password",
    },
    {
      label: "Confirm Password",
      icon: isEmptyConfPass ? "hidden" : "block",
      condition: isPassMatch,
      errorMessages: [!isPassMatch && "Must match with password above"],
      type: "password",
    },
  ];

  const handleChange = (event) => {
    switch (event.target.accept) {
      case "Username":
        dispatch(evaluateUserName(event.target.value));
        break;
      case "Name":
        dispatch(evaluateName(event.target.value));
        break;
      case "Password":
        dispatch(evaluatePassword(event.target.value));
        break;
      case "Confirm Password":
        dispatch(evaluateMatchPassword(event.target.value));
        break;

      default:
        break;
    }
  };

  return (
    <div className="flex justify-center">
      <div className="w-full h-screen">
        <form className="bg-blue-200 flex flex-col m-10 justify-center p-10">
          <h1 className="text-center text-3xl font-bold p-5">Register</h1>

          {inputs.map((input) => {
            return (
              <div className="flex flex-col p-3" key={input.label}>
                <div className="flex justify-between">
                  <label htmlFor="Username">{input.label}</label>
                  <div className={input.icon}>
                    <FontAwesomeIcon
                      icon={faCheckCircle}
                      color="green"
                      className={input.condition ? "block" : "hidden"}
                    />
                    <FontAwesomeIcon
                      icon={faCircleXmark}
                      color="red"
                      className={!input.condition ? "block" : "hidden"}
                    />
                  </div>
                </div>
                <input
                  type={input.type}
                  onChange={handleChange}
                  accept={input.label}
                  className="rounded-md h-10 text-center"
                />
                {!input.condition && (
                  <div className={`bg-gray-900 mx-2 ${input.icon}`}>
                    {input.errorMessages.map((message) => {
                      return (
                        <div
                          className="flex text-white text-xs mx-3 m-1"
                          key={message}
                        >
                          {message && (
                            <FontAwesomeIcon
                              icon={faCircleInfo}
                              color="white"
                              className="mr-2"
                            />
                          )}
                          {message}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
          <button
            className=" mx-auto my-5 w-2/3 h-16 bg-red-300 ring-2 ring-black ring-inset disabled:opacity-20"
            disabled={
              !isEmptyUserName &&
              !isEmptyName &&
              !isEmptyPass &&
              !isEmptyConfPass &&
              isValidUserName &&
              isValidPassword &&
              isPassMatch
                ? false
                : true
            }
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
