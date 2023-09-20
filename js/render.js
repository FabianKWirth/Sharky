/**
 * Changes the image source to a hover state when the mouse hovers over the element.
 * @param {HTMLElement} element - The HTML element to apply the hover effect to.
 */
function hoverStartButton(element) {
    element.setAttribute('src', './img/6.Botones/Start/2.png');
}


/**
 * Reverts the image source to its original state when the mouse is no longer hovering over the element.
 * @param {HTMLElement} element - The HTML element to revert the image source for.
 */
function unhoverStartButton(element) {
    element.setAttribute('src', './img/6.Botones/Start/1.png');
}


/**
 * Changes the image source to a hover state when the mouse hovers over the element.
 * @param {HTMLElement} element - The HTML element to apply the hover effect to.
 */
function hoverFullScreenButton(element) {
    element.setAttribute('src', './img/6.Botones/Full Screen/Mesa de trabajo 7.png');
}


/**
 * Reverts the image source to its original state when the mouse is no longer hovering over the element.
 * @param {HTMLElement} element - The HTML element to revert the image source for.
 */
function unhoverFullScreenButton(element) {
    element.setAttribute('src', './img/6.Botones/Full Screen/Mesa de trabajo 9.png');
}


/**
 * Adds a mobile action menu by removing the 'd-none' class from the menu element.
 */
function addMobileActionMenu() {
    document.getElementById("mobileActionMenu").classList.remove("d-none");
}


/**
 * Removes a mobile action menu by adding the 'd-none' class to the menu element.
 */
function removeMobileActionMenu() {
    document.getElementById("mobileActionMenu").classList.add("d-none");
}


/**
 * Renders a turn notification and sets the 'turnNotificationActive' flag to true.
 * @function
 */
function renderTurnNotification() {
    turnNotificationActive = true;
    let notification = document.createElement("div");
    notification.classList.add('notification-container');
    notification.innerHTML = "Please turn your device";
    notification.id = "turnNotification";
    document.getElementById('fullscreen').appendChild(notification);
}


/**
 * Deletes the turn notification and sets the 'turnNotificationActive' flag to false if it exists.
 * @function
 */
function deleteTurnNotification() {
    if (document.getElementById('turnNotification')) {
        document.getElementById('turnNotification').remove();
        turnNotificationActive = false;
    }
}