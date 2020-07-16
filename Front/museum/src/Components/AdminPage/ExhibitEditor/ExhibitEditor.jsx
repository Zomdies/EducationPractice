import React, { useState, useEffect } from 'react';

import './Css/ExhibitEditor.css'


import DismissOutline from '../../../Icons/dismiss_substract'
import DoneOutline from '../../../Icons/done_substract'
import defImage from '../../../Image/nophoto.png'

const ExhibitEditor = (props) => {
    const { exhibit } = props
    const { setActivePopOut } = props

    const imgSource = exhibit !== undefined ? null + exhibit.Image : null;
    const [exhImage, setExhImage] = useState(imgSource)

    useEffect(() => {
        daragAndDropInit()
    }, [])

    const log = () => {
        console.log("Загружено");
        const inp = document.getElementById("file-input")
        const nameInp = document.getElementById("nameInput")
        nameInp.value = inp.files[0].name.slice(0, -4)
        setExhImage(URL.createObjectURL(inp.files[0]))
    }

    const daragAndDropInit = () => {
        const inp = document.getElementById("file-input")
        const dropZone = document.getElementById("upload-container")
        dropZone.ondrag = ((e) => { e.preventDefault(); e.stopPropagation() })
        dropZone.ondragstart = ((e) => { e.preventDefault(); e.stopPropagation() })
        dropZone.ondragend = ((e) => { e.preventDefault(); e.stopPropagation() })
        dropZone.ondrop = ((e) => {
            e.preventDefault();
            dropZone.classList.remove("dragover");
            setExhImage(URL.createObjectURL(e.dataTransfer.files[0]))
            const nameInp = document.getElementById("nameInput")
            nameInp.value = e.dataTransfer.files[0].name.slice(0, -4)
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
    }

    return (
        <div className="editor-layout">
            <div className="flex-center" style={{ gridArea: "image" }}>
                {exhImage === null ?
                    <div className="safq" id="upload-container">
                        <img id="upload-image" src="https://habrastorage.org/webt/dr/qg/cs/drqgcsoh1mosho2swyk3kk_mtwi.png" />
                        <div>
                            <input id="file-input" type="file" name="file" accept=".jpg,.png" onInput={log} />
                            <label htmlFor="file-input">Выберите файл</label>
                            <span> или перетащите его сюда</span>
                        </div>
                    </div> :
                    <img id="sd" className="exp-image" src={exhImage} />
                }
            </div>
            <div className="icons-container" style={{ gridArea: "icons" }}>
                <DoneOutline onClick={() => { console.log(document.getElementById("file-input")) }} />
                <DismissOutline onClick={() => { setActivePopOut(null) }} />
            </div>
            <div style={{ gridArea: "content", paddingRight: 15 }}>
                <span className="input-label">NAME</span>
                <input id="nameInput" className="input-outline" type="text" value={exhibit != undefined ? exhibit.Name : null} />
                <span className="input-label">STATUS</span>
                <select id="selectStatus" className="input-outline">
                    <option value="1">Is used</option>
                    <option value="2">Transported</option>
                    <option value="3">Not use</option>
                </select >
                <span className="input-label">DISCRIPTION</span>
                <textarea id="discription">

                </textarea>
            </div >
        </div >
    );
};

export default ExhibitEditor;

