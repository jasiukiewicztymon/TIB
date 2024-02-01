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
        {getWorkspaces[getWorkspaceIndex].apps.map(el => {
          return (
            <button key={el.id}><img src={el.icon} height={40} />{el.name}</button>
          )
        })}
      </div>
    </div>
    <div id={style.workspace} className={getWebviewDisplay ? style.full : null}>
      {!getWebviewDisplay && <div id={style.workspaceHeader}>
        <button>Detach <span className="material-icons">open_in_new</span></button>
      </div>}
      <webview ref={webview} webpreferences="webSecurity=false" src="https://teams.microsoft.com/" allowpopups="true"></webview>
    </div>
  </main>
}

export default Organizer;