import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux'

import './Css/ExhibitEditor.css'

import { UpdateExhibit } from '../../../Redux/actions'
import { server_url } from '../../../config'

import DismissOutline from '../../../Icons/dismiss_substract'
import DoneOutline from '../../../Icons/done_substract'
import defImage from '../../../Image/nophoto.png'

const ExhibitEditor = (props) => {
    const { item } = props
    const { setActivePopOut } = props
    const { token } = props
    
    const dispatch = useDispatch();

    const imgSource = item !== undefined ? `${server_url}/${item.Image}` : null;
    const [exhImage, setExhImage] = useState(imgSource)

    useEffect(() => {
        daragAndDropInit()        
        document.getElementById("nameInput").value = item.Name;
        document.getElementById("ageInput").value = item.Age;
        document.getElementById("discription").value = item.Description;
    }, [])

    const onFileLoaded = () => {
        const inp = document.getElementById("file-input")
        const nameInp = document.getElementById("nameInput")
        // nameInp.value = inp.files[0].name.slice(0, -4)
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
            inp.files = e.dataTransfer.files;
            setExhImage(URL.createObjectURL(inp.files[0]))
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
    }

    const patchExhibit = () => {
        const inp = document.getElementById("file-input");
        let data = new FormData();

        if (inp.files.length !== 0) {
            data.append('expositionImage', inp.files[0]);
        }
        if(document.getElementById("nameInput").value.toString().trim().length !== 0) console.log("ok"); else console.log("kek")
        data.append('Name', document.getElementById("nameInput").value);
        data.append('Age', document.getElementById("ageInput").value);
        data.append('Description', document.getElementById("discription").value);
        data.append('_id', item._id);
        data.append('token', token)
        
        fetch(`${server_url}/exhibit`, {
            method: 'PATCH',
            body: data
        })
            .then(res => {
                switch (res.status) {
                    case 200:
                        res.json().then(response => {
                            alert("Exhibit Updated");
                            dispatch(UpdateExhibit(response.result))
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

    return (
        <div className="editor-layout">
            <div className="flex-center" style={{ gridArea: "image" }}>
                <div id="upload-container">
                    {item.Image !== undefined ? (
                        <img className="exp-image" src={exhImage} />
                    ) : (
                            <>
                                <img id="upload-image" src={"https://habrastorage.org/webt/dr/qg/cs/drqgcsoh1mosho2swyk3kk_mtwi.png"} />
                            </>
                        )

                    }
                    <div className="add-image">
                        <input id="file-input" type="file" name="file" accept=".jpg,.png" onInput={onFileLoaded} />
                        <label htmlFor="file-input">Выберите файл</label>
                        <span> или перетащите его сюда</span>
                    </div>
                </div>
            </div>
            <div className="icons-container" style={{ gridArea: "icons" }}>
                <DoneOutline onClick={() => { patchExhibit() }} />
                <DismissOutline onClick={() => { setActivePopOut(null) }} />
            </div>
            <div style={{ gridArea: "content", paddingRight: 15 }}>
                <span className="input-label">NAME</span>
                <input id="nameInput" className="input-outline" type="text"/>
                <span className="input-label">AGE</span>
                <input id="ageInput" className="input-outline" type="number"/>
                <span className="input-label">DISCRIPTION</span>
                <textarea id="discription">
                </textarea>
            </div >
        </div >
    );
};

export default ExhibitEditor;

