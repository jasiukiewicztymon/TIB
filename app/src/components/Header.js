'use client'

import styles from "./style/Header.module.css";
import 'material-icons/iconfont/material-icons.css';

import { useAtom } from 'jotai'
import { useEffect } from "react";

import { fullscreenAtom, settingsIsOpenAtom, webviewDisplayAtom, workspacesAtom, workspaceIndexAtom } from '@/stores/JotaiStores'

const Header = (props) => {
  const [getFullscreen, setFullScreen] = useAtom(fullscreenAtom);
  const [getsettingsIsOpen, setSettingsIsOpen] = useAtom(settingsIsOpenAtom);
  const [getWebviewDisplay, setWebviewDisplay] = useAtom(webviewDisplayAtom);
  const [getWorkspaceIndex, setWorkspaceIndex] = useAtom(workspaceIndexAtom);
  const [getWorkspaces, setWorkspaces] = useAtom(workspacesAtom);


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
    let s = getWorkspaces.length

    setWorkspaces([...getWorkspaces, {
      "name": `default${s == 0?"": ` ${s}`}`,
      "background": "#8338ec",
      "default": null,
      "apps": [
      ]
    }])

    // close everything
    setSettingsIsOpen(false);
    setWebviewDisplay(false);
    window.electronAPI.closeAllApp();

    window.electronAPI.sendConfig({
      workspaces: getWorkspaces
    });

    setWorkspaceIndex(s)
    console.log('create')
  }

  return <header id={styles.header}>
    <div className={styles.movable}>
      <h1><b>CPNE</b><span>/</span><i>Workspaces</i></h1>
    </div>
    <div id={styles.workspaces}>
      <div>
        {getWorkspaces.map((el, key) => {
          return <button key={el.name} id={styles[`workspace-${el.name}`]} onClick={() => { 
            setSettingsIsOpen(false);
            setWebviewDisplay(false);
            window.electronAPI.closeAllApp();

            setWorkspaceIndex(key)
            console.log('change')

          }} style={{ backgroundColor: el.background }}>{el.name}</button>
        })}
      </div>
      <button><span className="material-icons" onClick={addWorkspace}>add</span></button>
    </div>
    <div id={styles.controlButtons}>
      <button onClick={() => { window.electronAPI.minimizeWindow(); }}>
        <span className="material-icons">minimize</span>
      </button>
      <button onClick={fullscreenWindow}>
        <span className="material-icons">{getFullscreen ? 'fullscreen_exit' : 'fullscreen'}</span>
      </button>
      <button onClick={() => { window.electronAPI.closeWindow(); }}>
        <span className="material-icons">close</span>
      </button>
    </div>
  </header>
}

export default Header;