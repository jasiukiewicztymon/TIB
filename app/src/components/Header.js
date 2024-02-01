import "./style/Header.css";
import 'material-icons/iconfont/material-icons.css';

import { atom, useAtom } from 'jotai'
import { useEffect } from "react";

const fullscreenAtom = atom(false);

const Header = (props) => {
  const [getFullscreen, setFullScreen] = useAtom(fullscreenAtom);
  const [getWorkspaces, setWorkspaces] = props.workspaces;

  const fullscreenWindow = () => {
    window.electronAPI.fullscreenWindow()
    setFullScreen(!getFullscreen)
  };  

  useEffect(() => {
    window.electronAPI.receive("fromSystem", (e, data) => {
      setFullScreen(data);
    });
  }, []);

  const addWorkspace = () => {
    setWorkspaces([...getWorkspaces, {
      "name": "default",
      "color": "#210200",
      "background": "#ff1100"
    }])
  }

  return <header>
    <div className="movable">
      <h1><b>CPNE</b><span>/</span><i>Workspaces</i></h1>
    </div>
    <div id="workspaces">
      <div>
        {getWorkspaces.map(el => {
          return <button key={el.name} id={`workspace-${el.name}`} style={{ color: el.color, backgroundColor: el.background }}>{el.name}</button>
        })}
      </div>
      <button><span className="material-icons" onClick={addWorkspace}>add</span></button>
    </div>
    <div id="controlButtons">
      <button data-electron-control="control-minimize" onClick={() => { window.electronAPI.minimizeWindow(); }}>
        <span className="material-icons">minimize</span>
      </button>
      <button data-electron-control="control-fullscreen" onClick={fullscreenWindow}>
        <span className="material-icons">{getFullscreen ? 'fullscreen_exit' : 'fullscreen'}</span>
      </button>
      <button data-electron-control="control-close" onClick={() => { window.electronAPI.closeWindow(); }}>
        <span className="material-icons">close</span>
      </button>
    </div>
  </header>
}

export default Header;