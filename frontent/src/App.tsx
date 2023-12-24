import React, {useState, useEffect, useContext, SetStateAction} from 'react';
import axios, {AxiosResponse} from 'axios';
import {Repos} from '../../shared/src/db/entity/repo.entity'
import RepoTableColumnPinning from './components/RepoTable';
import CssBaseline from '@mui/joy/CssBaseline';
import {CssVarsProvider, useColorScheme} from "@mui/joy/styles";
import {RepoFormComponent} from "./components/RepoFormComponent";
import {TabsComponent} from "./components/TabsComponent";
import {ColorSchemeToggle} from "./components/ColorSchemeToggle";
import {Users} from "../../shared/src/db/entity/user.entity";
import {UsersFormComponent} from "./components/UsersFormComponent";
import UserTableColumnPinning from "./components/UserTable";

function App() {
  const [repos, setRepos] = useState<Repos[] | null>(null);
  const [users, setUsers] = useState<Users[] | null>(null);
  const [placement, setPlacement] = React.useState<'users' | 'repos'>('users');
  useEffect(() => {
    const fetchData = async () => {
      if (placement === 'users') {
        await axios.get(`${process.env.REACT_APP_DB_API_SERVER}/users`)
            .then((res : AxiosResponse<Users[]>) => {
              setUsers(res.data);
            }).catch((err) => {
              console.log(err);
            });
      }else if (placement === 'repos') {
          await axios.get(`${process.env.REACT_APP_DB_API_SERVER}/repos`)
              .then((res: AxiosResponse<Repos[]>) => {
                  setRepos(res.data);
              }).catch((err) => {
                  console.log(err);
              });
      }
    };

    fetchData();
    const intervalId = setInterval(fetchData, 1000); // 5초마다 데이터를 새로고침합니다.

    return () => clearInterval(intervalId); // 컴포넌트가 언마운트될 때 인터벌을 정리합니다.
  }, [placement]);

  if (!repos && !users) return <div>Loading...</div>;
    return(
      <>
          <CssVarsProvider >
              <TabsComponent setPlacement={setPlacement} />
              <CssBaseline />
              <ColorSchemeToggle />
              {placement === 'repos' ? repos && <RepoTableColumnPinning rows={repos} /> :  users && <UserTableColumnPinning rows={users} />}
              {placement === 'repos' ? <RepoFormComponent setData={setRepos} /> : <UsersFormComponent setData={setUsers} />}
          </CssVarsProvider>
      </>
    )
}

export default App;