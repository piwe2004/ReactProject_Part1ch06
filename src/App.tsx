import React, {useCallback, useRef, useState} from 'react';
import logo from './logo.svg';
import './App.css';
import ImageBox from "./components/ImageBox";
import {useDropzone} from 'react-dropzone'

function App() {

    const inpRef = useRef<HTMLInputElement>(null);
    const [imageList, setImageList] = useState<string[]>([]);

    const onDrop = useCallback(acceptedFiles => {
        // Do something with the files
        console.log(acceptedFiles);
        if(acceptedFiles.length){
            for (const file of acceptedFiles){
                const reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onloadend = (e) =>{
                    setImageList(prev => [...prev, e.target?.result as string]);
                }
            }
        }
    }, [])

    const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

    return (
    <div className='container'>
        <div className={'gallery-box ' + (imageList.length > 0 && 'row')}>
            {
                imageList.length === 0 &&
                <div className='text-center'>
                    이미지가 없습니다.<br/>
                    이미지를 추가해주세요
                </div>
            }
            {
                imageList.map((el, idx) => <ImageBox key={el + idx} src={el} />)
            }
            <input type="file" ref={inpRef}
                   {...getInputProps()}
                   /*onChange={(e) => {
                       if(e.currentTarget.files?.[0]){
                           let file = e.currentTarget.files[0];
                           const reader = new FileReader();
                           reader.readAsDataURL(file);
                           reader.onloadend = (e) =>{
                               setImageList(prev => [...prev, e.target?.result as string]);

                           }
                       }
                       console.log(imageList);
                   }}*/
            />
            <div className='plus-box'
                 {...getRootProps()}
                 /*onClick={() => {
                    inpRef.current?.click();
                }}*/
            >
                +
            </div>

        </div>
    </div>
  );
}

export default App;
