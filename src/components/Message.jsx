import React, { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";
import { format, formatDistanceToNow, isToday } from "date-fns";
import { ko } from "date-fns/locale";

const Message = ({ message }) => {
    const { currentUser } = useContext(AuthContext);
    const { data } = useContext(ChatContext);

    const ref = useRef();
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        ref.current?.scrollIntoView({ behavior: "smooth" });

        // 1분마다 현재 시간을 업데이트
        const intervalId = setInterval(() => {
            setCurrentTime(new Date());
        }, 60000); // 60,000밀리초 = 1분

        return () => {
            clearInterval(intervalId); // 컴포넌트가 언마운트될 때 interval 제거
        };
    }, [message]);

    if (!message.text && !message.img) {
        return null;
    }

    // Ensure that message.date.toDate() is a valid Date object
    const dateObject = message.date.toDate() instanceof Date
        ? message.date.toDate()
        : new Date();

    // Check if the message was sent today
    const isTodayMessage = isToday(dateObject);

    return (
        <div
            ref={ref}
            className={`message ${message.senderId === currentUser.uid && "owner"}`}
        >
            <div className="messageInfo">
                <img
                    src={
                        message.senderId === currentUser.uid
                            ? currentUser.photoURL
                            : data.user.photoURL
                    }
                    alt=""
                />
            </div>
            <div className="messageContent">
                {message.text && <p>{message.text}</p>}
                {message.img && <img src={message.img} alt="" />}
                {isTodayMessage
                    ? (
                        <span className="messageDate">
                            {formatDistanceToNow(dateObject, { addSuffix: true, locale: ko, now: currentTime })
                                .replace("1분 미만 전", "방금")}
                        </span>
                    )
                    : (
                        <span className="messageDate">
                            {format(dateObject, "M월 d일 (E) a h:mm", { locale: ko })}
                        </span>
                    )
                }
            </div>
        </div>
    );
};

export default Message;
