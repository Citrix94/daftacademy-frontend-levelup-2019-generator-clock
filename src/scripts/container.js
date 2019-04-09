export default () => {
    const { body } = document;
    const div = document.createElement('div');
    body.appendChild(div);
    div.classList.add('main-container');
};