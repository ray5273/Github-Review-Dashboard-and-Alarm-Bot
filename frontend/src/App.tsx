import React, {useState, useEffect, useContext, SetStateAction} from 'react';
import axios, {AxiosResponse} from 'axios';
import {Repos} from '../../shared/src/db/entity/repo.entity'
import RepoTableColumnPinning from './components/table/RepoTable';
import CssBaseline from '@mui/joy/CssBaseline';
import {CssVarsProvider, useColorScheme} from "@mui/joy/styles";
import {RepoFormComponent} from "./components/form/RepoFormComponent";
import {TabsComponent} from "./components/TabsComponent";
import {ColorSchemeToggle} from "./components/ColorSchemeToggle";
import {Users} from "../../shared/src/db/entity/user.entity";
import {UsersFormComponent} from "./components/form/UsersFormComponent";
import UserTableColumnPinning from "./components/table/UserTable";
import {UserRepoAlarm} from "../../shared/src/db/entity/user.repo.alarm.entity";
import UserRepoAlarmTableColumnPinning from "./components/table/UserRepoAlarmTable";
import {UserRepoAlarmFormComponent} from "./components/form/UserRepoAlarmFormComponent";

function App() {
  const [repos, setRepos] = useState<Repos[] | null>(null);
  const [users, setUsers] = useState<Users[] | null>(null);
  const [userRepoAlarms, setUserRepoAlarms] = useState<UserRepoAlarm[] | null>(null);
    const [placement, setPlacement] = React.useState<'users' | 'repos' | 'user_repo_alarm'>('users');
  useEffect(() => {
    const fetchData = async () => {
        switch (placement){
            case 'users':
                await axios.get(`${process.env.REACT_APP_DB_API_SERVER}/users`)
                    .then((res : AxiosResponse<Users[]>) => {
                        setUsers(res.data);
                    }).catch((err) => {
                        console.log(err);
                    });
                break;
            case 'repos':
                await axios.get(`${process.env.REACT_APP_DB_API_SERVER}/repos`)
                    .then((res: AxiosResponse<Repos[]>) => {
                        setRepos(res.data);
                    }).catch((err) => {
                        console.log(err);
                    });
                break;
            case 'user_repo_alarm':
                await axios.get(`${process.env.REACT_APP_DB_API_SERVER}/user-repo-alarm`)
                    .then((res: AxiosResponse<UserRepoAlarm[]>) => {
                        setUserRepoAlarms(res.data);
                    }).catch((err) => {
                        console.log(err);
                    });
                break;

        }
    };

    fetchData();

  }, [placement, repos, users, userRepoAlarms?.length]);

    const componentMap = {
        'repos': {
            table: repos ? <RepoTableColumnPinning rows={repos} /> : <div>Loading...</div>,
            form: repos ? <RepoFormComponent setData={setRepos} /> : <div>Loading...</div>
        },
        'users': {
            table: users ? <UserTableColumnPinning rows={users} /> : <div>Loading...</div>,
            form: users ? <UsersFormComponent setData={setUsers} /> : <div>Loading...</div>
        },
        'user_repo_alarm': {
            table: userRepoAlarms? <UserRepoAlarmTableColumnPinning rows={userRepoAlarms}/> : <div>Loading...</div>,
            form: userRepoAlarms? <UserRepoAlarmFormComponent setData={setUserRepoAlarms}/> : <div>Loading...</div>
        },
        // 추가적인 placement 값들을 여기에 추가할 수 있습니다.
    };

    return(
      <>
          <CssVarsProvider >
              <TabsComponent setPlacement={setPlacement} />
              <CssBaseline />
              <ColorSchemeToggle />
              {repos && users && componentMap[placement].table}
              {componentMap[placement].form}
          </CssVarsProvider>
      </>
    )
}

export default App;