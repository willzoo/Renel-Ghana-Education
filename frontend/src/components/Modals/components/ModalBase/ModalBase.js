import React from 'react'
import './ModalBase.css'
import {CloseModal} from '../../../../utils/functions'

function ModalBase(props) {
    const content = props.info.content();

    const closeModal = () => {
        CloseModal(props.info.id);
    };

    const stopModalClick = (e) => {
        e.stopPropagation(); // This will prevent the click from reaching the underlay
    };

    if (props.info.closeable) {
        return (
        <div className="modal-underlay" id={`${props.info.id}-modal-underlay`} onClick={closeModal}>
            <div className="modal" id={`${props.info.id}-modal`} onClick={stopModalClick}>
                <div>
                    <span className="title">{props.info.title}</span>
                    <span className="close" title="Cancel" onClick={closeModal}>&times;</span>
                    <br />
                    <span className="content">{props.info.text}</span>
                </div>
                <div id={`${props.info.id}-modal-root`}>
                    {content}
                </div>

            </div>
        </div>
        );
    }
    else if (props.info.id == "loading") {
        return (
            <div className="modal-underlay blurred-modal-underlay" style={{display:'block'}} id={`${props.info.id}-modal-underlay`}>
                <div className="modal displayed-modal" id={`${props.info.id}-modal`}>
                    <div className="title">{props.info.title}</div>
                    <div className="content" style={{marginTop: '-20px', marginBottom: '10px',}}>{props.info.text}</div>
                </div>
            </div>
        )
    }
    
    else if (props.info.id == "error") {
        return (
            <div className="modal-underlay" id={`${props.info.id}-modal-underlay`}>
                <div className="modal" id={`${props.info.id}-modal`}>
                    <div className="title">{props.info.title}</div>
                    <div className="content" style={{marginTop: '-20px', marginBottom: '10px',}}>{props.info.text}</div>
                </div>
            </div>
        )
    }
}

export default ModalBase;
