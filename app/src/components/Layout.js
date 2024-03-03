'use client';

import Header from "@/components/Header";
import Organizer from "@/components/Organizer";

import style from './style/Layout.module.css'
import { atom, useAtom } from "jotai";
import { useEffect } from "react";

import { workspacesAtom, workspaceIndexAtom } from "@/stores/JotaiStores"; 

const Layout = ({ children }) => {
  const [getWorkspaceIndex, setWorkspaceIndex] = useAtom(workspaceIndexAtom);
  const [getWorkspaces, setWorkspaces] = useAtom(workspacesAtom);

  useEffect(() => {
    console.log(getWorkspaceIndex)
  }, [getWorkspaceIndex])

  useEffect(() => {
    console.log(getWorkspaces)
  }, [getWorkspaces])

  return (
    <div id={style.mainBox}>
      <Header></Header>

      <div id={style.boxing}>
        <Organizer>
          {children}
        </Organizer>
      </div>
    </div>  
  )
}

export default Layout;