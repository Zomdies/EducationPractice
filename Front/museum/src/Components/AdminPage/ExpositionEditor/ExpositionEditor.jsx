import React, { useState, useEffect } from 'react';
import {useDispatch} from 'react-redux'

import {UpdateExposition} from '../../../Redux/actions'
import './ExpositionEditor.css'

import { server_url } from '../../../config'

import DismissOutline from '../../../Icons/dismiss_substract'
import DoneOutline from '../../../Icons/done_substract'
import defImage from '../../../Image/nophoto.png'

const ExpositionEditor = ({ item, setActivePopOut }) => {

    const dispatch = useDispatch();
    const imgSource = item !== undefined ? `${server_url}/${item.Image}` : null;
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
            inp.files = e.dataTransfer.files;
            setExpImage(URL.createObjectURL(inp.files[0]))
            const nameInp = document.getElementById("nameInput")
            // nameInp.value = e.dataTransfer.files[0].name.slice(0, -4)
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
        document.getElementById("date-open").valueAsDate = new Date(item.Date_Open);
        document.getElementById("date-close").valueAsDate = new Date(item.Date_Close);
        document.getElementById("nameInput").value = item.Name;
        document.getElementById("selectStatus").value = item.Status;
    }, [])

    const patchExposition = () => {
        const inp = document.getElementById("file-input");
        let data = new FormData();

        if (inp.files.length !== 0) {
            data.append('expositionImage', inp.files[0]);
        }
        data.append('Date_Open', new Date(document.getElementById("date-open").value).toString());
        data.append('Date_Close', new Date(document.getElementById("date-close").value).toString());
        data.append('Name', document.getElementById("nameInput").value);
        data.append('Status', document.getElementById("selectStatus").value);
        data.append('_id', item._id);
        data.append('token', '123')
        fetch(`${server_url}/exposition`, {
            method: 'PATCH',
            body: data
        })
            .then(res => {
                switch (res.status) {
                    case 200:
                        res.json().then(response => {
                            alert("Exposition Updated");
                            dispatch(UpdateExposition(response.result))
                            setActivePopOut(null);
                        });
                        break;
                    case 404:
                        alert("Porblems with Server")
                        break;
                    case 500:
                        alert("Porblems with Server")
                        break;
                }
            })
            .then(response => {
            }).catch(err => { alert("Porblems with Server") });
    }

    const log = () => {
        const inp = document.getElementById("file-input")
        const nameInp = document.getElementById("nameInput")
        if (!['image/jpeg', 'image/png', 'image/gif', 'image/svg+xml'].includes(inp.files[0].type)) {
            alert('Select only image .png or .jpg');
            return;
        }
        // проверим размер файла (<2 Мб) 
        if (inp.files[0].size > 2 * 1024 * 1024) {
            alert('File is big. Need < 2 mb');
            return;
        }
        // nameInp.value = inp.files[0].name.slice(0, -4)
        setExpImage(URL.createObjectURL(inp.files[0]))
    }

    return (
        <div className="editor-layout">
            <div className="flex-center" style={{ gridArea: "image" }}>
                <div className="safq" id="upload-container">
                    {item.Image !== undefined ? (
                        <img id="sd" className="exp-image" src={expImage} />
                    ) : (
                            <>
                                <img id="upload-image" src={"https://habrastorage.org/webt/dr/qg/cs/drqgcsoh1mosho2swyk3kk_mtwi.png"} />
                            </>
                        )

                    }
                    <div className="add-image">
                        <input id="file-input" type="file" name="file" accept=".jpg,.png" onInput={log} />
                        <label htmlFor="file-input">Выберите файл</label>
                        <span> или перетащите его сюда</span>
                    </div>
                </div>

            </div>
            <div className="icons-container" style={{ gridArea: "icons" }}>
                <DoneOutline onClick={() => { patchExposition(); }} />
                <DismissOutline onClick={() => { setActivePopOut(null) }} />
            </div>
            <div style={{ gridArea: "content", paddingRight: 15 }}>
                <span className="input-label">NAME</span>
                <input id="nameInput" className="input-outline" type="text" />
                <div className="flex-row">
                    <div>
                        <span className="input-label">OPEN DATE</span>
                        <input id="date-open" className="input-outline" type="date" />
                    </div>
                    <div>
                        <span className="input-label">CLOSE DATE</span>
                        <input id="date-close" className="input-outline" type="date" />
                    </div>
                </div>
                <span className="input-label">STATUS</span>
                <select id="selectStatus" className="input-outline">
                    <option value="Used">Used</option>
                    <option value="Transported">Transported</option>
                    <option value="Restored">Restored</option>
                </select >
            </div>
        </div>
    );
};

export default ExpositionEditor;
