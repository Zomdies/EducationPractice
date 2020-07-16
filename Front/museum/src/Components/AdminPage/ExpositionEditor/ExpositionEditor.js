import React, { useState, useEffect } from 'react';

import './ExpositionEditor.css'

import { server_url } from '../../../config'

import DismissOutline from '../../../Icons/dismiss_substract'
import DoneOutline from '../../../Icons/done_substract'
import defImage from '../../../Image/nophoto.png'

const ExpositionEditor = (props) => {
    const { exposition } = props
    const { setActivePopOut } = props

    const imgSource = exposition !== undefined ? server_url + exposition.Image : null;
    const [expImage, setExpImage] = useState(imgSource)

    useEffect(() => {
        const inp = document.getElementById("file-input")
        const dropZone = document.getElementById("upload-container")
        dropZone.ondrag = ((e) => { e.preventDefault(); e.stopPropagation() })
        dropZone.ondragstart = ((e) => { e.preventDefault(); e.stopPropagation() })
        dropZone.ondragend = ((e) => { e.preventDefault(); e.stopPropagation() })
        dropZone.ondrop = ((e) => {
            e.preventDefault();
            dropZone.classList.remove("dragover");
            setExpImage(URL.createObjectURL(e.dataTransfer.files[0]))
        })
        dropZone.ondragenter = ((e) => {
            e.preventDefault();
            e.stopPropagation();
            dropZone.classList.add("dragover");
        })
        dropZone.ondragover = ((e) => {
            e.preventDefault();
            e.stopPropagation();
            dropZone.classList.add("dragover")
        })
        dropZone.ondragleave = ((e) => {
            e.preventDefault();
            e.stopPropagation();
            let dx = e.pageX - dropZone.offsetLeft;
            let dy = e.pageY - dropZone.offsetTop;
            if ((dx < 0) || (dx > dropZone.offsetWidth) || (dy < 0) || (dy > dropZone.offsetHeight)) {
                dropZone.classList.remove("dragover")
            };
        })

    }, [])

    const log = () => {
        console.log("Загружено");
        const inp = document.getElementById("file-input")
        console.log(inp.files);
        console.log(inp.files[0]);
        setExpImage(URL.createObjectURL(inp.files[0]))
    }

    return (
        <div className="editor-layout">
            <div className="flex-center" style={{ gridArea: "image" }}>
                {expImage === null ?
                    <div className="safq" id="upload-container">
                        <img id="upload-image" src="https://habrastorage.org/webt/dr/qg/cs/drqgcsoh1mosho2swyk3kk_mtwi.png" />
                        <div>
                            <input id="file-input" type="file" name="file" accept=".jpg,.png" onInput={log} />
                            <label htmlFor="file-input">Выберите файл</label>
                            <span> или перетащите его сюда</span>
                        </div>
                    </div> :
                    <img id="sd" className="exp-image" src={expImage} />
                }
            </div>
            <div className="icons-container" style={{ gridArea: "icons" }}>
                <DoneOutline onClick={() => { console.log(document.getElementById("file-input")) }} />
                <DismissOutline onClick={() => { setActivePopOut(null) }} />
            </div>
            <div style={{ gridArea: "content", paddingRight:15 }}>
                <span className="input-label">NAME</span>
                <input className="input-outline" type="text" value={exposition != undefined ? exposition.Name : null} />
                <div className="flex-row">
                    <div>
                        <span className="input-label">OPEN DATE</span>
                        <input className="input-outline" type="date" value={exposition != undefined ? exposition.Name : null} />
                    </div>
                    <div>
                        <span className="input-label">CLOSE DATE</span>
                        <input className="input-outline" type="date" value={exposition != undefined ? exposition.Name : null} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ExpositionEditor;
