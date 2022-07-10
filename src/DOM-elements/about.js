import Modal from "./modal";
import icon from "../functions/icon";

export default () => {
    const modalInner = () => {
        const body = document.createElement('div');
        const h2 = document.createElement('h2');
        body.append(h2);
        h2.textContent = 'About Diddit';
        const p = document.createElement('p');
        body.append(p);
        p.innerHTML = `Diddit is a simple to-do list app. Create projects and lists, write yourself notes, and customize your profile!
        <p>Created by <a href="https://github.com/ginahend94" target="_blank" rel="noreferrer">Gina Henderson</a>.</p>
        <p class="links">
        <a href="https://github.com/ginahend94" title="GitHub" target="_blank" rel="noreferrer"></a>
        <a href="https://twitter.com/ginahend94" title="Twitter" target="_blank" rel="noreferrer"></a>
        </p>`;
        
        p.querySelector('a[title="GitHub"]').append(icon('fa6-brands:github'));
        p.querySelector('a[title="Twitter"]').append(icon('fa6-brands:twitter'));
        return body
    }
    const modal = Modal.create(
        ['about'],
        modalInner(),
        () => Modal.close(modal),
        'Close',
        false,
        true,
        true
    )
    Modal.open(modal);
}