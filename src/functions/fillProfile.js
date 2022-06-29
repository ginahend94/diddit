import { gina } from './profile';
import render from './render';
import save from './save';
import Modal from '../DOM-elements/modal';

export default () => {
    const modal = Modal.create(
        [],
        'Fill profile?',
        () => { Modal.close(modal); save('profile', gina); render() },
        'OK',
        true,
        true,
        true
    )
    Modal.open(modal);
}