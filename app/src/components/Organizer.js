import style from "./style/Organizer.module.css"
import 'material-icons/iconfont/material-icons.css';
import { resolve } from 'path';
import { useEffect, useRef, useState } from "react";

// console.log(resolve(__dirname))

const Organizer = (props) => {
  const [getWorkspaces, setWorkspaces] = props.workspaces;
  const [getWorkspaceIndex, setWorkspaceIndex] = props.workspaceIndex;

  const [getWebviewDisplay, setWebviewDisply] = useState(false);

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
      <h2>{getWorkspaces[getWorkspaceIndex].name}</h2>
      <div id={style.manager}>
        <button>Settings <span className="material-icons">settings</span></button>
        <button>Share <span className="material-icons">ios_share</span></button>
        <button>Export <span className="material-icons">download</span></button>
      </div>
      <h3>Apps</h3>
      <div id={style.apps}>
        {getWorkspaces[getWorkspaceIndex].apps.map((el, key) => {
          return (
            <button key={key} onClick={() => {
              // console.log(getWorkspaceIndex, key);
              window.electronAPI.openApp(getWorkspaceIndex, key);
              setWebviewDisply(true);
            }}><img src={el.icon} height={40} />{el.name}</button>
          )
        })}
      </div>
    </div>
    <div id={style.workspace} className={getWebviewDisplay ? style.full : null}>
      {getWebviewDisplay && <div id={style.workspaceHeader}>
        <button onClick={() => {
          window.electronAPI.detachCurrentApp();
          setWebviewDisply(false);
        }}>Detach <span className="material-icons">open_in_new</span></button>

        <button onClick={() => {
          window.electronAPI.refreshCurrentApp();
        }}>Reload <span className="material-icons">refresh</span></button>

        <button onClick={() => {
          window.electronAPI.closeCurrentApp();
          setWebviewDisply(false);
        }}>Close <span className="material-icons">close</span></button>
      </div>}
      <webview ref={webview} webpreferences="webSecurity=false" src={getWorkspaces[getWorkspaceIndex].default} allowpopups="true"></webview>
    </div>
  </main>
}

export default Organizer;