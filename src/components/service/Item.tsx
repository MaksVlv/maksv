import React, {forwardRef} from 'react';
import styles from "../admin/styles/admin.module.scss";

interface IProps {
    id: string,
    index?: number,
    onDelete?: (index: number) => void
}

export const Item = forwardRef(({id, index, onDelete, ...props}: IProps, ref) => {
    return (
            <div className={"relative"}  style={{ width: (index !== undefined ? "30%" : "100%"), height: "200px" }}>
                {/*@ts-ignore*/}
                <div {...props} ref={ref}>
                    <img style={{ width: "100%", height: "200px", objectFit: "cover" }}
                         src={id}
                         alt="image"
                    />
                </div>
                {index !== undefined &&
                    <div style={{ position: "absolute", bottom: "5px", right: "5px", width: "50px", height: "50px", borderRadius: "50%", backgroundColor: "grey", display: "flex", justifyContent: "center", alignItems: "center" }} >
                        <svg onClick={() => { console.log(1); if (index !== undefined && onDelete) onDelete(index)}} style={{ position: "relative", right: "-0.5px", fill: "black" }} className={styles.delete} xmlns="http://www.w3.org/2000/svg" fill={"none"} width="25" height="25" viewBox="0 0 25 25">
                            <path d="M3 6v18h18v-18h-18zm5 14c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm5 0c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm5 0c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm4-18v2h-20v-2h5.711c.9 0 1.631-1.099 1.631-2h5.315c0 .901.73 2 1.631 2h5.712z"/>
                        </svg>
                    </div>
                }
            </div>
    )
});