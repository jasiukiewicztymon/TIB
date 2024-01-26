'use client';

import Header from "@/components/Header";
import Organizer from "@/components/Organizer";

import style from './style/Layout.module.css'
import { atom, useAtom } from "jotai";
import config from '@/config/workspaces.json'

const workspacesAtom = atom(config.workspaces);
const workspaceIndexAtom = atom(0);

const Layout = ({ children }) => {
  const [getWorkspaceIndex, setWorkspaceIndex] = useAtom(workspaceIndexAtom);
  const [getWorkspaces, setWorkspaces] = useAtom(workspacesAtom);
  return (
    <div id={style.mainBox}>
      <Header workspaces={[getWorkspaces, setWorkspaces]} workspaceIndex={[getWorkspaceIndex, setWorkspaceIndex]}></Header>

      <div id={style.boxing}>
        <Organizer workspaces={[getWorkspaces, setWorkspaces]} workspaceIndex={[getWorkspaceIndex, setWorkspaceIndex]}>
          test {children}
        </Organizer>
      </div>
    </div>  
  )
}

export default Layout;