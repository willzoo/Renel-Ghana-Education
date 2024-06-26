import React, { useContext } from 'react'
import './ModalBase.css'
import { CloseModal } from '../../../../../utils/functions'
import Loading from '../Loading/Loading';
import TeacherContext from '../../../../../TeacherContext';

function ModalBase(props) { // base for all modals, general construction that is built upon by other modal js files
    const content = props.info.content(); // initialize "content" function, which is just component function
    
    const {isModalWaiting, setModalWaiting} = useContext(TeacherContext).modalWaiting;

    const closeModal = () => { // function reference to close modal
        CloseModal(props.info.id);
    };

    const stopModalClick = (e) => {
        e.stopPropagation(); // This will prevent the click from reaching the underlay
    };

    // three different kinds of modals, closable, then custom loading and error modals
    if (props.info.closeable) { // if general closeable modal
        return (
            <div className="modal-underlay" id={`${props.info.id}-modal-underlay`} onClick={!isModalWaiting ? closeModal : () => {}}> {/* add modal underlay */}
                <div className="modal" id={`${props.info.id}-modal`} onClick={stopModalClick}> {/* add modal base */}
                    <div>
                        <span className="title">{props.info.title}</span> {/* modal title */}
                        <span className="close" title="Cancel" onClick={!isModalWaiting ? closeModal : () => {}}>&times;</span> {/* modal close button */}
                        <br />
                        <span className="content">{props.info.text}</span> {/* modal content */}
                    </div>
                    <div id={`${props.info.id}-modal-root`}> {/* base for modal text input */}
                        {content} {/* run "content" function, which loads other modal js files */}
                    </div>

                </div>
            </div>
        );
    }
    else if (props.info.id == "loading") { // if modal is loading screen
        return (
            <div className="modal-underlay blurred-modal-underlay" style={{ display: 'block' }} id={`${props.info.id}-modal-underlay`}>
                <div className="modal displayed-modal" id={`${props.info.id}-modal`}>
                    <div className="title">{props.info.title}</div>
                    <div className="content" style={{ marginTop: '-20px', marginBottom: '10px', }}>{props.info.text}</div>
                </div>
            </div>
        )
    }

    else if (props.info.id == "error") { // if modal is error
        return (
            <div className="modal-underlay" id={`${props.info.id}-modal-underlay`}>
                <div className="modal" id={`${props.info.id}-modal`}>
                    <div className="title">{props.info.title}</div>
                    <div className="content" style={{ marginTop: '-20px', marginBottom: '10px', }}>{props.info.text}</div>
                </div>
            </div>
        )
    }
}

export default ModalBase;
