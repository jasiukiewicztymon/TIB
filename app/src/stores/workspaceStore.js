import { atom } from 'jotai';
import config from '../config/workspaces.json'


const workspacesAtom = atom(config.workspaces);
const workspaceIndexAtom = atom(0);

export { workspaceIndexAtom, workspacesAtom }