import React from "react";
import ClassItem from '../ClassItem/ClassItem'
import './ClassesList.css'

function ClassesList(props) {
    let items = [];
    for (let i = 0; i < props.info.classes.length; i++) {
        items.push((<ClassItem data={props.info.classes[i]} />));
    }

    const classList = items;

    if (items.length == 0) {
        return (
            <section>
                <ul className="nobullet">
                    <li><div className="list-issue">There are no classes associated with this teacher.</div></li>
                </ul>
            </section>
        );
    }

    return (
        <section>
            <ul className="nobullet">
                {classList}
            </ul>
        </section>
    );
}

export default ClassesList;