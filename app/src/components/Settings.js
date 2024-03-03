'use client'

import styles from './style/Settings.module.css'

import { workspaceIndexAtom, workspacesAtom, settingsIsOpenAtom } from '@/stores/JotaiStores'
import { useAtom, atom } from 'jotai';
import { useEffect } from 'react';

let nameAtom = atom('');
let defaultAtom = atom('');
let backgroundAtom = atom('');
let appsAtom = atom([]);

const Settings = () => {
  const [getSettingsIsOpen, setSettingsIsOpen] = useAtom(settingsIsOpenAtom);
  const [getWorkspaces, setWorkspaces] = useAtom(workspacesAtom);
  const [getWorkspaceIndex, setWorkspaceIndex] = useAtom(workspaceIndexAtom);

  //local
  const [getName, setName] = useAtom(nameAtom)
  const [getDefaultApp, setDefaultApp] = useAtom(defaultAtom)
  const [getColorBackground, setColorBackground] = useAtom(backgroundAtom)
  const [getApps, setApps] = useAtom(appsAtom)

  useEffect(() => {
    setName(getWorkspaces[getWorkspaceIndex].name)
    setDefaultApp(getWorkspaces[getWorkspaceIndex].default)
    setColorBackground(getWorkspaces[getWorkspaceIndex].background)
    setApps(getWorkspaces[getWorkspaceIndex].apps)
  }, [getSettingsIsOpen])

  useEffect(() => {
    // logs: console.log(getApps)
  }, [getApps])

  return <div id={styles.settings} style={{ display: getSettingsIsOpen ? 'flex' : 'none' }}>
    <header>
      <h3>Settings</h3> 
      <button onClick={() => {
        setSettingsIsOpen(false)
      }}><span className="material-icons">close</span></button>
    </header>
    <div>
      <h4>Global</h4>
      <div id={styles.global}>
        <div><span>Name</span><input value={getName == null ? '' : getName} onChange={(e) => { setName(e.target.value); }} /></div>
        <div><span>Color</span><input type="color" value={getColorBackground == null ? '' : getColorBackground} onChange={(e) => { setColorBackground(e.target.value); }} /></div>
        <div><span>Default app</span><input placeholder="URL of a website" value={getDefaultApp == null ? '' : getDefaultApp} onChange={(e) => { setDefaultApp(e.target.value); }} /></div>
      </div>
      <h4>Apps</h4>
      {getApps.map((e, i) => {
        return <div key={i} id={styles.apps}>
          <input placeholder='Name' value={e.name == null ? '' : e.name} onChange={(v) => {
            try {
              let t = Array.from(getApps);
              t[i].name = v.target.value;
              setApps(t)
            } catch {}
          }} />
          <input placeholder="Icon's URL" value={e.icon == null ? '' : e.icon} onChange={(v) => {
            try {
              let t = Array.from(getApps);
              t[i].icon = v.target.value;
              setApps(t)
            } catch {}
          }} />
          <input placeholder="App's URL" value={e.src == null ? '' : e.src} onChange={(v) => {
            try {
              let t = Array.from(getApps);
              t[i].src = v.target.value;
              setApps(t)
            } catch {}
          }} />
          <button onClick={() => {
            let t = Array.from(getApps);
            t.splice(i, 1);
            setApps(t);
          }}><span className="material-icons">delete</span></button>
        </div>
      })}
      <button onClick={() => {
        let t = Array.from(getApps);
        t.push({ name: '', icon: '', src: '' })
        setApps(t)
      }}>Add an app<span className="material-icons">add</span></button>
      <button onClick={() => {
        let t = getWorkspaces;
        t[getWorkspaceIndex].name = getName;
        t[getWorkspaceIndex].background = getColorBackground;
        t[getWorkspaceIndex].default = getDefaultApp;
        t[getWorkspaceIndex].apps = getApps;
        setWorkspaces(t)

        window.electronAPI.sendConfig({
          workspaces: getWorkspaces
        });

        console.log(getWorkspaceIndex)
        setWorkspaceIndex(getWorkspaceIndex);
        console.log('update')
      }}>Save changes<span className="material-icons">save</span></button>
      <button style={{ color: 'red '}} onClick={() => {
        if (getWorkspaces.length <= 1) return;
        let t = Array.from(getWorkspaces);
        t.splice(getWorkspaceIndex, 1);
        setWorkspaces(t);

        window.electronAPI.sendConfig({
          workspaces: getWorkspaces
        });

        setWorkspaceIndex(0);
        console.log('delete')
      }}>DELETE WORKSPACE<span className="material-icons">delete</span></button>
    </div>
  </div>
}

export default Settings;