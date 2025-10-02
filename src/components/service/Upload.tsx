import React, {useEffect, useState} from "react";
import FileUpload from 'react-drag-n-drop-image';
import styles from "../admin/styles/admin.module.scss";
import {toast} from "react-toastify";
import imageCompression from 'browser-image-compression';
import {
    closestCenter,
    DndContext,
    DragOverlay,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
} from '@dnd-kit/core';
import {
    arrayMove,
    SortableContext,
    sortableKeyboardCoordinates,
    verticalListSortingStrategy,
    rectSortingStrategy
} from '@dnd-kit/sortable';
import { SortableItem } from "./SortableItem";
import { Item } from "./Item";

interface Image {
    file: File,
    preview: string
}

interface UploadProps {
    onFileChange: (files: Image[], length?: number) => void,
    one?: boolean,
    filesOld?: string[],
    deleteImg?: boolean,
    onDeleteImg?: (files: Image[], url: string) => void,
    loading?: (state: boolean) => void
}

const Upload = ({ onFileChange, one = false, filesOld = [], deleteImg = true, onDeleteImg, loading }: UploadProps) => {
    const [files, setFiles] = useState<Image[]>([]);

    const [activeId, setActiveId] = useState(null);
    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    const compressImage = async (file: File) => {
        try {

            const options = {
                maxSizeMB: 4.5,
                useWebWorker: true
            };

            const compressedBlob = await imageCompression(file, options);

            const compressedFile = new File([compressedBlob], file.name, {
                type: compressedBlob.type,
                lastModified: file.lastModified
            });

            const preview = URL.createObjectURL(compressedBlob);

            return {
                file: compressedFile,
                preview: preview
            };
        } catch (error) {
            console.error('Error compressing image:', error);
            throw error;
        }
    };

    const compressFiles = async (images: Image[]): Promise<Image[]> => {
        const res: Image[] = [];

        for (let i = 0; i < images.length; i++) {
            res.push(await compressImage(images[i].file));
        }

        return res;
    }

    const onChange = async (file: Image[]) => {

        if (one && file.length > 2) {
            toast.error("Please upload only one image")
            return;
        }

        toast.warn("Compressing images")

        if (loading) {
            loading(true);
        }
        // const compressedFiles = await Promise.all(file.slice(files.length - file.length).map((f: Image) => compressImage(f.file)));
        const compressedFiles = await compressFiles(file.slice(files.length - file.length));
        if (loading)
            loading(false);

        const existedFiles = file.slice(0, files.length)

        file = [...existedFiles, ...compressedFiles as Image[]]

        file = file.filter((f) => {
            if (f.file.size > 4.5 * 1024 * 1024) {
                toast.error(f.file.name + " is too big (>4.5)");
                return false;
            }
            return true;
        });

        if (file.length === 0)
            return;

        if (one && file.length === 2) {
            const newFiles = [...file];
            newFiles.splice(0, 1);
            setFiles(newFiles);
            onFileChange(newFiles);
            return;
        }
        if (typeof onDeleteImg === 'function')
            onFileChange(file, file.length - files.length);
        else
            onFileChange(file);
        setFiles(file);
    };

    const onError = () => {
        toast.error("Error with loading images!");
    };

    const onDelete = (index: number) => {
        if (!one && files.length === 1) {
            toast.error("Please add second image and then delete this one")
            return;
        }
        const url = files[index].preview
        const newFiles = [...files];
        newFiles.splice(index, 1);
        setFiles(newFiles);
        if (typeof onDeleteImg === 'function') {
            onDeleteImg(newFiles, url);
        }
    };

    useEffect(() => {
        if (filesOld)
            //@ts-ignore
            setFiles(filesOld.map(str => ({file: {}, preview: str})))
    }, [])

    const handleDragStart = (event: any) => {
        const { active } = event;

        setActiveId(active.id);
    }

    const handleDragEnd = (event: any) => {
        const { active, over } = event;

        if (active.id !== over.id) {
            const oldIndex = files.findIndex((image: Image) => active.id === image.preview);
            const newIndex = files.findIndex((image: Image) => over.id === image.preview);
            const newArr = arrayMove(files, oldIndex, newIndex);
            setFiles((items) => {
                return arrayMove(items, oldIndex, newIndex);
            });
            onFileChange(newArr);
        }

        setActiveId(null);
    }

    return (
        <div className={one ? "flex gap-8 items-center" : ""}>
            <div className={"w-full border-dashed border-2 border-gray-400 bg-gray-100 mt-2"} style={{ width: (one ? "40%" : "100%") }}>
                <FileUpload
                    onError={onError}
                    // @ts-ignore
                    body={<CustomBody one={one}/>}
                    overlap={false}
                    fileValue={files}
                    onChange={onChange}
                    maxSize={50}
                />
            </div>
            <div className={"w-full flex gap-3 mt-5"} style={{ flexWrap: "wrap", width: (one ? "50%" : "100%") }}>
                <DndContext
                    sensors={sensors}
                    collisionDetection={closestCenter}
                    onDragStart={handleDragStart}
                    onDragEnd={handleDragEnd}
                >
                    <SortableContext
                        //@ts-ignore
                        items={files}
                        strategy={rectSortingStrategy}
                    >
                        {files.map((file: Image, index: number) => <SortableItem
                            key={file.preview}
                            id={file.preview}
                            index={index}
                            onDelete={(i: number) => onDelete(i)}
                        />)}
                    </SortableContext>
                    <DragOverlay>
                        {activeId ? <Item id={activeId} /> : null}
                    </DragOverlay>
                </DndContext>
                {/*{*/}
                {/*    files.map((file, i) => (*/}
                {/*        <div className={"relative"} style={{ width: (one ? "100%" : "30%"), height: "200px" }} key={i}>*/}
                {/*            <img style={{ width: "100%", height: "100%", objectFit: "cover" }}*/}
                {/*                 src={file.preview}*/}
                {/*                 alt="image"*/}
                {/*            />*/}
                {/*            {deleteImg &&*/}
                {/*                <div style={{ position: "absolute", bottom: "5px", right: "5px", width: "50px", height: "50px", borderRadius: "50%", backgroundColor: "grey", display: "flex", justifyContent: "center", alignItems: "center" }} >*/}
                {/*                    <svg onClick={() => onDelete(i)} style={{ position: "relative", right: "-0.5px", fill: "#1E1E1E" }} className={styles.delete} xmlns="http://www.w3.org/2000/svg" fill={"none"} width="25" height="25" viewBox="0 0 25 25">*/}
                {/*                        <path d="M3 6v18h18v-18h-18zm5 14c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm5 0c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm5 0c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm4-18v2h-20v-2h5.711c.9 0 1.631-1.099 1.631-2h5.315c0 .901.73 2 1.631 2h5.712z"/>*/}
                {/*                    </svg>*/}
                {/*                </div>*/}
                {/*            }*/}
                {/*        </div>*/}
                {/*    ))*/}
                {/*}*/}
            </div>
        </div>
    );
};

export default Upload;


function CustomBody(one: boolean) {
    return (
        <div className="w-full flex flex-col justify-center items-center">
            <div className="text-gray-500 p-8">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto mb-4" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 19c-4.97 0-9-4.03-9-9s4.03-9 9-9 9 4.03 9 9-4.03 9-9 9zm0-1.8c3.872 0 7-3.127 7-7s-3.128-7-7-7-7 3.127-7 7 3.128 7 7 7zm0-4.12c-.621 0-1.122-.501-1.122-1.121s.501-1.122 1.122-1.122c.62 0 1.121.501 1.121 1.122s-.5 1.121-1.121 1.121zm0-6.66c-.198 0-.359.16-.359.358v3.722c0 .197.16.358.359.358s.358-.16.358-.358V8.358c0-.198-.16-.358-.358-.358z" clipRule="evenodd" />
                </svg>
                {one ?
                    <p>Drag and drop file here or click</p>
                    :
                    <p>Drag and drop files here or click to select files</p>
                }
            </div>
        </div>
    );
}
