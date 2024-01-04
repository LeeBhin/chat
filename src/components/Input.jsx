import React, { useContext, useState } from "react";
import Img from "../img/img.png";
import Attach from "../img/attach.png";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";
import {
    arrayUnion,
    doc,
    serverTimestamp,
    Timestamp,
    updateDoc,
} from "firebase/firestore";
import { db, storage } from "../firebase";
import { v4 as uuid } from "uuid";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

const Input = () => {
    const [text, setText] = useState("");
    const [img, setImg] = useState(null);
    const [uploading, setUploading] = useState(false);

    const { currentUser } = useContext(AuthContext);
    const { data } = useContext(ChatContext);

    const handleSend = async () => {
        if (uploading) {
            // 이미 업로드가 진행 중이면 아무것도 하지 않음
            return;
        }

        try {
            setUploading(true); // 이미지 업로드 상태를 true로 설정

            if (img) {
                const storageRef = ref(storage, uuid());

                const uploadTask = uploadBytesResumable(storageRef, img);

                uploadTask.on(
                    (error) => {
                        // TODO: 에러 처리
                        console.error("이미지 업로드 중 에러:", error);
                    },
                    async () => {
                        try {
                            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);

                            await updateDoc(doc(db, "chats", data.chatId), {
                                messages: arrayUnion({
                                    id: uuid(),
                                    text,
                                    senderId: currentUser.uid,
                                    date: Timestamp.now(),
                                    img: downloadURL,
                                }),
                            });
                        } catch (error) {
                            // TODO: 에러 처리
                            console.error("문서 업데이트 중 에러:", error);
                        } finally {
                            setUploading(false); // 완료 후 이미지 업로드 상태를 재설정
                        }
                    }
                );
            } else {
                await updateDoc(doc(db, "chats", data.chatId), {
                    messages: arrayUnion({
                        id: uuid(),
                        text,
                        senderId: currentUser.uid,
                        date: Timestamp.now(),
                    }),
                });
            }

            await updateDoc(doc(db, "userChats", currentUser.uid), {
                [data.chatId + ".lastMessage"]: {
                    text,
                },
                [data.chatId + ".date"]: serverTimestamp(),
            });

            await updateDoc(doc(db, "userChats", data.user.uid), {
                [data.chatId + ".lastMessage"]: {
                    text,
                },
                [data.chatId + ".date"]: serverTimestamp(),
            });

            setText("");
            setImg(null);
        } finally {
            setUploading(false); // 에러가 발생하더라도 이미지 업로드 상태를 재설정
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleSend();
        }
    };

    return (
        <div className="input">
            <input
                type="text"
                placeholder="메시지를 입력하세요..."
                onChange={(e) => setText(e.target.value)}
                onKeyDown={handleKeyDown}
                value={text}
            />
            <div className="send">
                <img src={Attach} alt="" />
                <input
                    type="file"
                    style={{ display: "none" }}
                    id="file"
                    onChange={(e) => setImg(e.target.files[0])}
                />
                <label htmlFor="file">
                    <img src={Img} alt="" />
                </label>
                <button onClick={handleSend}>Send</button>
            </div>
        </div>
    );
};

export default Input;
