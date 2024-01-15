import "./style/Header.css";
import 'material-icons/iconfont/material-icons.css';

import { atom, useAtom } from 'jotai'

const fullscreenAtom = atom(false);
const workspacesAtom = atom([
{
  name: 'default'
}
]);
const Header = () => {
  const [getFullscreen, setFullScreen] = useAtom(fullscreenAtom);
  const [getWorkspaces, setWorkspaces] = useAtom(workspacesAtom);

  const minimizeWindow = window.electronAPI.minimizeWindow;
  const closeWindow = window.electronAPI.closeWindow;
  const fullscreenWindow = () => {
    window.electronAPI.fullscreenWindow()
    setFullScreen(!getFullscreen)
  };  

  return <header>
    <div class="movable">
      <h1><b>CPNE</b><span>/</span><i>Workspaces</i></h1>
    </div>
    <div id="workspaces">
      <div>
        {Array.from(getWorkspaces).forEach(el => {
          <i>p</i>
        })}
        {getWorkspaces.forEach(el => {
          <button>{el.name} o</button>
        })}
      </div>
      <button><span class="material-icons">add</span></button>
    </div>
    <div id="controlButtons">
      <button data-electron-control="control-minimize" onClick={minimizeWindow}>
        <span class="material-icons">minimize</span>
      </button>
      <button data-electron-control="control-fullscreen" onClick={fullscreenWindow}>
        <span class="material-icons">{getFullscreen ? 'fullscreen_exit' : 'fullscreen'}</span>
      </button>
      <button data-electron-control="control-close" onClick={closeWindow}>
        <span class="material-icons">close</span>
      </button>
    </div>
  </header>
}

export default Header;