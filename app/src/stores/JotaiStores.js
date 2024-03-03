import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils'
import config from '../config/workspaces.json'


const workspacesAtom = atomWithStorage('workspaces', config.workspaces);
const workspaceIndexAtom = atomWithStorage('workspaceIndex', 0);
const fullscreenAtom = atom(false);
const settingsIsOpenAtom = atom(false);
const webviewDisplayAtom = atom(false);

export { workspaceIndexAtom, workspacesAtom, fullscreenAtom, settingsIsOpenAtom, webviewDisplayAtom }