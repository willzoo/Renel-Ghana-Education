
//------------------------------------------ HELPER FUNCTIONS -----------------
function waitForDefinition(variableName) {
    return new Promise((resolve, reject) => {
        const checkInterval = 200; // Check every 200 milliseconds
        const maxChecks = 10000; // Maximum number of checks before giving up (to avoid infinite loop)
        let checks = 0;

        const intervalId = setInterval(() => {
            checks++;
            if (typeof window[variableName] !== 'undefined') {
                clearInterval(intervalId);
                resolve(window[variableName]);
            } else if (checks >= maxChecks) {
                clearInterval(intervalId);
                reject(new Error('Variable is not defined within the expected time.'));
            }
        }, checkInterval);
    });
}

//------------------------------------------- MODAL -------------------------------------------

const pause = (time) => new Promise(resolve => setTimeout(resolve, time));

export const OpenModal = (id, studentID = "-1") => {    
    let underlay = document.getElementById(`${id}-modal-underlay`);
    underlay.classList.add("blurred-modal-underlay");

    let modal = underlay.querySelector(`#${id}-modal`);
    modal.classList.add("displayed-modal");

    underlay.style.display = "block";
}

export const CloseModal = async (id) => {
    let underlay = document.getElementById(`${id}-modal-underlay`);
    underlay.classList.remove("blurred-modal-underlay");

    let modal = underlay.querySelector(`#${id}-modal`);
    modal.classList.remove("displayed-modal");
    await pause(200);

    try {document.getElementById(`${id}-text-input`).scrollTop = 0;} catch (e) {};

    try {
        let textInputs = Array.from(modal.querySelector(`#${id}-text-input`).children);

        textInputs.forEach((item) => {
            try {
                Array.from(item.children).forEach((input => {
                    input.value = "";
                }));
            } catch (e) { };
        });
    } catch (e) { };

    underlay.style.display = "none";
}