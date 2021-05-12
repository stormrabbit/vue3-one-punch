import { get } from './http';
export const redirectToLoginPage = () => {
    window.location.assign('/')
}

export const requestDemo = async () => await get('events')