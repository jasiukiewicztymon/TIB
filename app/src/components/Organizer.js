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
    setWebviewDisply(false);
    window.electronAPI.closeAllApp();
  }, [getWorkspaceIndex])

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
        <img src="/settings.png" height={55} width={55} />
      </div>
      <div id={style.apps}>
        {getWorkspaces[getWorkspaceIndex].apps.map((el, key) => {
          return (
            <img key={key} src={el.icon} height={55} width={55} onClick={() => {
              // console.log(getWorkspaceIndex, key);
              window.electronAPI.openApp(getWorkspaceIndex, key);
              setWebviewDisply(true);
            }} />
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