const preview = () => {

    const body = document.createElement('span');
    body.classList.add('preview');

    const header = document.createElement('span');
    body.append(header);
    header.classList.add('preview-header');
    header.textContent = 'Diddit';

    const sidebar = document.createElement('span');
    body.append(sidebar);
    sidebar.classList.add('preview-sidebar');
    
    const one = document.createElement('span');
    body.append(one);
    one.classList.add('preview-one');
    const point1 = document.createElement('span');
    one.append(point1, ' ████ ███ ███');

    const two = document.createElement('span');
    body.append(two);
    two.classList.add('preview-two');
    const point2 = document.createElement('span');
    two.append(point2, ' ██ ███████');

    const button = document.createElement('span');
    body.append(button);
    button.classList.add('preview-button');

    // <span class="preview">
    //     <span class="preview-header">Diddit</span>
    //     <span class="preview-sidebar"></span>
    //     <span class="preview-one"><span class="preview-point">▪</span> ████ ███ ███</span>
    //     <span class="preview-two"><span class="preview-point">▪</span> ██ ███████</span>
    //     <span class="preview-button"></span>
    // </span>

    return body;
}

export default preview;