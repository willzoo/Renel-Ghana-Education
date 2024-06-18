import React from 'react'
import './ModalBase.css'

function ModalBase(props) {
    if (props.info.closeable) {
        return (
        <div className="modal-underlay" id={`${props.info.id}-modal-underlay`} onClick={`CloseModal('${props.info.id}')`}>
            <div className="modal" id={`${props.info.id}-modal`} onClick="event.stopPropagation()">
                <div>
                    <span className="title">{props.info.title}</span>
                    <span className="close" title="Cancel" onClick={`CloseModal('${props.info.id}')`}>&times;</span>
                    <br />
                    <span className="content">{props.info.text}</span>
                </div>
                <br />
                <div id={`${props.info.id}-modal-root`}>
                    {props.content}
                </div>

            </div>
        </div>
        );
    }
    else {
        return (
            <div class="modal-underlay blurred-modal-underlay" style={{display:'block'}} id={`${props.info.id}-modal-underlay`}>
                <div class="modal displayed-modal" id={`${props.info.id}-modal`}>
                    <div class="title">{props.info.title}</div>
                    <div class="content" style={{marginTop: '-20px', marginBottom: '10px',}}>{props.info.text}</div>
                </div>
            </div>
        )
    }
}

export default ModalBase;
