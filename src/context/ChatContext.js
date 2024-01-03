import { createContext, useContext, useReducer } from "react";
import { auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { AuthContext } from "./AuthContext";

export const ChatContext = createContext();

export const ChatContextProvider = ({ children }) => {
    const { currentUser } = useContext(AuthContext)
    const INITAL_STATE = {
        chatId: "null",
        user: {}
    }

    const ChatReducer = (state, action) => {
        switch (action.type) {
            case "CHANGE_USER":
                return {
                    user: action.playload,
                    chatId:
                        currentUser.uid > action.playload.uid
                            ? currentUser.uid + action.playload.uid
                            : action.playload.uid + currentUser.uid
                }

            default:
                return state;
        }
    };

    const [state, dispatch] = useReducer(ChatReducer, INITAL_STATE);

    return (
        < ChatContext.Provider value={{ data: state, dispatch }} >
            {children}
        </ChatContext.Provider >
    )
};