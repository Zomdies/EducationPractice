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

    //#region Validation
    const validate = require("validate.js");

    const constraints =
    {
        name: {
            presence: { allowEmpty: false },
            length: {
                minimum: 6,
                tooShort: "name needs to have 6 chars or more",
            }
        },
        Age: { presence: { allowEmpty: false } },
        image: { presence: true },
        discription: {
            presence: true,
            length: {
                minimum: 10,
                tooShort: "discription needs to have 30 chars or more",
            }
        },
    }
    //#endregion

    const dispatch = useDispatch();

    const imgSource = item !== undefined ? `${server_url}/${item.Image}` : null;
    const [exhImage, setExhImage] = useState(imgSource)

    useEffect(() => {
        daragAndDropInit()
        document.getElementById("nameInput").value = item.Name;
        document.getElementById("ageInput").value = item.Age;
        document.getElementById("discription").value = item.Description;
        console.log(document.getElementById("file-input").files)
        // document.getElementById("file-input").files = new FileList(item.Image);
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

        const Name = document.getElementById("nameInput").value;
        const Age = document.getElementById("ageInput").value;
        const Discription = document.getElementById("discription").value;
        
        const valRes =validate({
            name: Name,
            Age: Age,
            image: inp.files[0],
            discription: Discription
        }, constraints);
        // if (valRes) {
        //     alert(createAleretFromValidation(valRes))
        //     return;
        // }
        data.append('expositionImage', inp.files[0]);
        data.append('Name', Name);
        data.append('Age', Age);
        data.append('Description', Discription);
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
                <input id="nameInput" className="input-outline" type="text" autoComplete="off"/>
                <span className="input-label">AGE</span>
                <input id="ageInput" className="input-outline" type="number" autoComplete="off"/>
                <span className="input-label">DISCRIPTION</span>
                <textarea id="discription">
                </textarea>
            </div >
        </div >
    );
};

export default ExhibitEditor;

const createAleretFromValidation = (validation) => {
    let output = ""
    for (let atr in validation) {
        output += `${validation[atr]}` + "\n\r"
    }
    return output
}