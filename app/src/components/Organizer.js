import "./style/Organizer.css"
import 'material-icons/iconfont/material-icons.css';
import { resolve } from 'path';

console.log(resolve(__dirname))

const Organizer = (props) => {
  const [getWorkspaces, setWorkspaces] = props.workspaces;
  const [getWorkspaceIndex, setWorkspaceIndex] = props.workspaceIndex;

  return <main>
    <div id="menu">
      <h2>{getWorkspaces[getWorkspaceIndex].name}</h2>
      <div id="manager">
        <button>Settings <span class="material-icons">settings</span></button>
        <button>Share <span class="material-icons">ios_share</span></button>
        <button>Export <span class="material-icons">download</span></button>
      </div>
      <h3>Apps</h3>
      <div id="apps">
        {getWorkspaces[getWorkspaceIndex].apps.map(el => {
          return (
            <button><img src={el.icon} height={40} />{el.name}</button>
          )
        })}
      </div>
    </div>
    <div id="workspace">
      <webview src="https://www.github.com/"></webview>
    </div>
  </main>
}

export default Organizer;