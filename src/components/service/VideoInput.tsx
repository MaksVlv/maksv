import styles from "../admin/styles/admin.module.scss";
import React, { ChangeEvent, useRef, useState } from "react";
import { toast } from "react-toastify";

interface Props {
    file?: string,
    onChange: (file: File | null) => void,
}

export const VideoInput = ({ file, onChange }: Props) => {

    const inputRef = useRef<HTMLInputElement>(null);
    const [inputKey, setInputKey] = useState<any>(0);
    const [isFile, setIsFile] = useState<boolean>(!!file);

    const onInputClick = () => {
        inputRef?.current?.click();
    }

    const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0].type !== "video/mp4") {
            toast.error("Video must be in mp4 format");
            return;
        }
        setIsFile(!!e.target.files);
        onChange(e.target.files ? e.target.files[0] : null);
    }

    const removeVideo = () => {
        setIsFile(false);
        setInputKey(Date.now());
        onChange(null);
    }

    return (
        <div className={styles.videoInput + " mt-2"}>
            <input ref={inputRef} key={inputKey} type="file" onChange={e => onInputChange(e)} accept={"video/mp4"} />
            <div className={styles.box}>
                <div className={styles.placeHolder} onClick={() => onInputClick()}>
                    <div className={styles.text}>
                        {!file && !isFile &&
                            "Click here to input video"
                        }
                        {file &&
                            file
                        }
                        {isFile && (inputRef?.current?.files && inputRef.current.files[0]) &&
                            inputRef.current.files[0].name
                        }
                    </div>
                </div>
                {(file || isFile) &&
                    <div className={styles.deleteVideo}>
                        <svg onClick={() => removeVideo()} style={{ fill: "#1E1E1E" }} xmlns="http://www.w3.org/2000/svg" fill={"none"} viewBox="0 0 25 25">
                            <path d="M3 6v18h18v-18h-18zm5 14c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm5 0c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm5 0c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm4-18v2h-20v-2h5.711c.9 0 1.631-1.099 1.631-2h5.315c0 .901.73 2 1.631 2h5.712z"/>
                        </svg>
                    </div>
                }
            </div>
            {(file || (isFile && inputRef?.current?.files && inputRef.current.files[0])) &&
                <div className={styles.preview}>
                    <video src={file ? file : (inputRef?.current?.files && inputRef.current.files[0]) ? window.URL.createObjectURL(inputRef?.current?.files[0]) : ""} controls={true} />
                </div>
            }
        </div>
    )
}