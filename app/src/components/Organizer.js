'use client'

import style from "./style/Organizer.module.css"
import 'material-icons/iconfont/material-icons.css';
import { atom, useAtom } from 'jotai'
import Settings from "./Settings";
import { useEffect, useRef } from "react";

// console.log(resolve(__dirname))

import { settingsIsOpenAtom, webviewDisplayAtom, workspacesAtom, workspaceIndexAtom } from '@/stores/JotaiStores'

const Organizer = (props) => {
  const [getWorkspaceIndex, setWorkspaceIndex] = useAtom(workspaceIndexAtom);
  const [getWorkspaces, setWorkspaces] = useAtom(workspacesAtom);
  const [getSettingsIsOpen, setSettingsIsOpen] = useAtom(settingsIsOpenAtom);

  const [getWebviewDisplay, setWebviewDisplay] = useAtom(webviewDisplayAtom);

  const webview = useRef(null);

  useEffect(() => {
    window.electronAPI.sendResizeWebview({
      x: webview.current.getBoundingClientRect().x,
      y: webview.current.getBoundingClientRect().y,
      width: webview.current.getBoundingClientRect().width,
      height: webview.current.getBoundingClientRect().height
    });
    window.onresize = () => {
      console.log(webview.current.getBoundingClientRect())
      window.electronAPI.sendResizeWebview({
        x: webview.current.getBoundingClientRect().x,
        y: webview.current.getBoundingClientRect().y,
        width: webview.current.getBoundingClientRect().width,
        height: webview.current.getBoundingClientRect().height
      });
    }
  })

  return <main id={style.main}>
    <div id={style.menu}>
      <div id={style.manager}>
        <img src="/settings.png" height={55} width={55} onClick={() => { 
          // hide current
          window.electronAPI.closeCurrentApp();
          setWebviewDisplay(false);

          setSettingsIsOpen(true);
        }} />
      </div>
      <div id={style.apps}>
        {getWorkspaces[getWorkspaceIndex] && getWorkspaces[getWorkspaceIndex].apps && getWorkspaces[getWorkspaceIndex].apps.map((el, key) => {
          return (
            <img key={key} src={el.icon} height={55} width={55} onClick={() => {
              // console.log(getWorkspaceIndex, key);
              window.electronAPI.openApp(getWorkspaceIndex, key);
              setWebviewDisplay(true);
            }} />
          )
        })}
      </div>
    </div>
    <div id={style.workspace} className={getWebviewDisplay ? style.full : null}>
      {getWebviewDisplay && <div id={style.workspaceHeader}>
        <button onClick={() => {
          window.electronAPI.detachCurrentApp();
          setWebviewDisplay(false);
        }}>Detach <span className="material-icons">open_in_new</span></button>

        <button onClick={() => {
          window.electronAPI.refreshCurrentApp();
        }}>Reload <span className="material-icons">refresh</span></button>

        <button onClick={() => {
          window.electronAPI.closeCurrentApp();
          setWebviewDisplay(false);
        }}>Close <span className="material-icons">close</span></button>
      </div>}
      <webview ref={webview} webpreferences="webSecurity=false" src={getWorkspaces[getWorkspaceIndex] != null ? getWorkspaces[getWorkspaceIndex].default : null} allowpopups="true"></webview>
      <Settings></Settings>
    </div>
  </main>
}

export default Organizer;