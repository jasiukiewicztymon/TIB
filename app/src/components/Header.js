import "./style/Header.css";
import 'material-icons/iconfont/material-icons.css';

import { atom, useAtom } from 'jotai'
import { useEffect } from "react";

const fullscreenAtom = atom(false);

const Header = (props) => {
  const [getFullscreen, setFullScreen] = useAtom(fullscreenAtom);
  const [getWorkspaces, setWorkspaces] = props.workspaces;
  const [getWorkspaceIndex, setWorkspaceIndex] = props.workspaceIndex;


  const fullscreenWindow = () => {
    window.electronAPI.fullscreenWindow()
    setFullScreen(!getFullscreen)
  };  

  useEffect(() => {
    window.electronAPI.receive("fromSystem", (e, data) => {
      setFullScreen(data);
    });
  }, []);

  useEffect(() => {
    window.electronAPI.closeAllApp();
  }, [getWorkspaceIndex])

  const addWorkspace = () => {
    let i = 0;

    for (let j in getWorkspaces)
      if (getWorkspaces[j].name.startsWith('default')) i++;

    setWorkspaces([...getWorkspaces, {
      "name": `default${i == 0?"": ` ${i}`}`,
      "color": "#210200",
      "background": "#ff1100",
      "default": "https://google.ch/",
      "apps": [
      ]
    }])

    setWorkspaceIndex(getWorkspaces.length - 1)
  }

  return <header>
    <div className="movable">
      <h1><b>CPNE</b><span>/</span><i>Workspaces</i></h1>
    </div>
    <div id="workspaces">
      <div>
        {getWorkspaces.map((el, key) => {
          return <button key={el.name} id={`workspace-${el.name}`} onClick={() => { setWorkspaceIndex(key) }} style={{ color: el.color, backgroundColor: el.background }}>{el.name}</button>
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