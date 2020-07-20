import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { AddExposition } from '../../../Redux/actions'
import './ExpositionAdd.css'

import { server_url } from '../../../config'

import DismissOutline from '../../../Icons/dismiss_substract'
import DoneOutline from '../../../Icons/done_substract'
import defImage from '../../../Image/nophoto.png'

const ExpositionAdd = ({ setActivePopOut, token }) => {

    const validate = require("validate.js");

    validate.extend(validate.validators.datetime, {
        // The value is guaranteed not to be null or undefined but otherwise it
        // could be anything.
        parse: function (value, options) {
            return value;
        },
        // Input is a unix timestamp
        format: function (value, options) {
            return value;
        }
    });

    const toDay = new Date();

    const constraints =
    {
        name: {
            presence: { allowEmpty: false },
            length: {
                minimum: 6,
                tooShort: "name needs to have 6 chars or more",
            }
        },
        status: { presence: { allowEmpty: false } },
        date_open: {
            presence: true,
            exclusion: {
                within: new Date("das"),
                message: "^We don't support %{value} right now, sorry"
            },
            date: {
                earliest: toDay,
                message: " can't be early than today",
            }
        },
        date_close: {
            presence: true,
            date: {
                earliest: toDay,
                message: " can't be early than today",
            },
            equality: {
                attribute: "date_open",
                message: " can't be same date as open date",
                comparator: (d1, d2) => {
                    return JSON.stringify(d1) !== JSON.stringify(d2);
                }
            }
        },
        image: { presence: true },
    }

    const dispatch = useDispatch();
    const [expImage, setExpImage] = useState(null);
    const [badDate, setBadDate] = useState(null);

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
        const today = new Date();
        document.getElementById("selectStatus").value = null;
        document.getElementById("date-open").value = toInputDate(today);
        document.getElementById("date-close").value = toInputDate(today);
    }, [])

    const postExposition = () => {
        const inp = document.getElementById("file-input");
        let data = new FormData();
        let Date_Open = new Date(document.getElementById("date-open").value)
        let Date_Close = new Date(document.getElementById("date-close").value)
        let Name = document.getElementById("nameInput").value;
        let Status = document.getElementById("selectStatus").value;

        const valRes = validate({
            name: Name,
            status: Status,
            date_open: Date_Open,
            date_close: Date_Close,
            image: inp.files[0],
        }, constraints)

        console.log(valRes)

        console.log(createAleretFromValidation(valRes))

        if (valRes !== undefined) { alert(createAleretFromValidation(valRes)); return; }

        data.append('expositionImage', inp.files[0]);
        data.append('Date_Open', Date_Open.toString());
        data.append('Date_Close', Date_Close.toString());
        data.append('Name', Name);
        data.append('Status', Status);
        // if (inp.files.length !== 0) {
        //     data.append('expositionImage', inp.files[0]);
        //     console.log(inp.files);
        // } else {
        //     alert("Choose Image")
        //     return;
        // }
        // if (Date_Open < Date_Close || Date_Open < Date.now()) {
        //     data.append('Date_Open', Date_Open.toString());
        //     data.append('Date_Close', Date_Close.toString());
        // } else {
        //     alert("Bad Date")
        //     return;
        // }
        // if (Name !== '') {
        //     data.append('Name', Name);
        // } else {
        //     alert("Bad Name")
        //     return;
        // }
        // if (Status !== '') {
        //     data.append('Status', Status);
        // } else {
        //     alert("Bad Status")
        //     return;
        // }
        data.append('token', token)
        fetch(`${server_url}/exposition`, {
            method: 'POST',
            body: data
        })
            .then(res => {
                switch (res.status) {
                    case 200:
                        res.json().then(response => {
                            alert("Exposition Add");
                            // console.log(response);
                            dispatch(AddExposition(response.result));
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
                console.log(response);
            }).catch(err => { console.log(err) });
    }

    const onFileLoaded = () => {
        const inp = document.getElementById("file-input")
        const nameInp = document.getElementById("nameInput")
        if (!['image/jpeg', 'image/png', 'image/gif', 'image/svg+xml'].includes(inp.files[0].type)) {
            alert('Select only image .png or .jpg');
            return;
        }
        // проверим размер файла (<2 Мб) 
        if (inp.files[0].size > 2 * 1024 * 1024) {
            alert('File is too big. Needs to be smaller then 2 mb');
            return;
        }
        nameInp.value = inp.files[0].name.slice(0, -4)
        setExpImage(URL.createObjectURL(inp.files[0]))
    }

    return (
        <div className="editor-layout">
            <div className="flex-center" style={{ gridArea: "image" }}>
                <div className="safq" id="upload-container">
                    <img id="sd" className="exp-image" src={expImage !== null ? (expImage) : (defImage)} />
                    <div className="add-image">
                        <input id="file-input" type="file" name="file" accept=".jpg,.png" onInput={onFileLoaded} />
                        <label htmlFor="file-input">Выберите файл</label>
                        <span> или перетащите его сюда</span>
                    </div>
                </div>

            </div>
            <div className="icons-container" style={{ gridArea: "icons" }}>
                <DoneOutline onClick={() => { postExposition(); }} />
                <DismissOutline onClick={() => { setActivePopOut(null) }} />
            </div>
            <div style={{ gridArea: "content", paddingRight: 15 }}>
                <span className="input-label">NAME</span>
                <input id="nameInput" className="input-outline" type="text" placeholder="Write name here" />
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


const toInputDate = (date) => {
    return `${date.getFullYear()}-${(date.getMonth() + 1) < 10 ? "0" + (date.getMonth() + 1) : (date.getMonth() + 1)}-${date.getDate()}`
}

const createAleretFromValidation = (validation) => {
    let output = ""
    for (let atr in validation) {
        output += `${validation[atr]}` + "\n\r"
    }
    return output
}

export default ExpositionAdd;
