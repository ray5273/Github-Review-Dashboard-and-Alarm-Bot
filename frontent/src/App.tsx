import React, {useState, useEffect, useContext, SetStateAction} from 'react';
import axios, {AxiosResponse} from 'axios';
import {Repos} from '../../shared/src/db/entity/repo.entity'
import TableColumnPinning from './RepoTable';
import DarkModeRoundedIcon from '@mui/icons-material/DarkModeRounded';
import LightModeRoundedIcon from '@mui/icons-material/LightModeRounded';
import CssBaseline from '@mui/joy/CssBaseline';
import IconButton from '@mui/joy/IconButton';
import {CssVarsProvider, useColorScheme} from "@mui/joy/styles";
import Tabs from '@mui/joy/Tabs';
import TabList from '@mui/joy/TabList';
import Tab from '@mui/joy/Tab';
import TabPanel from '@mui/joy/TabPanel';
import FormControl from "@mui/joy/FormControl";
import FormLabel from '@mui/joy/FormLabel';
import FormHelperText from '@mui/joy/FormHelperText';
import Input from '@mui/joy/Input';
import Button from "@mui/joy/Button";


function ColorSchemeToggle() {
    const { mode, setMode } = useColorScheme();
    const [mounted, setMounted] = React.useState(false);
    React.useEffect(() => {
        setMounted(true);
    }, []);
    if (!mounted) {
        return null;
    }
    return (
        <IconButton
            id="toggle-mode"
            size="lg"
            variant="soft"
            color="neutral"
            onClick={() => {
                if (mode === 'light') {
                    setMode('dark');
                } else {
                    setMode('light');
                }
            }}
            sx={{
                position: 'fixed',
                zIndex: 999,
                top: '1rem',
                right: '1rem',
                borderRadius: '50%',
                boxShadow: 'sm',
            }}
        >
            {mode === 'light' ? <DarkModeRoundedIcon /> : <LightModeRoundedIcon />}
        </IconButton>
    );
}
function App() {
  const [data, setData] = useState<Repos[] | null>(null);
    const [placement, setPlacement] = React.useState<
        'users' | 'repos'
    >('repos');

  useEffect(() => {
    const fetchData = async () => {
      await axios.get(`http://localhost:8080/${placement}`)
          .then((res : AxiosResponse<Repos[]>) => {
            setData(res.data);
          }).catch((err) => {
            console.log(err);
          });
    };

    fetchData();
    const intervalId = setInterval(fetchData, 5000); // 5초마다 데이터를 새로고침합니다.

    return () => clearInterval(intervalId); // 컴포넌트가 언마운트될 때 인터벌을 정리합니다.
  }, [placement]);

  if (!data) return <div>Loading...</div>;
    return(
      <>
          <CssVarsProvider >
              <Tabs defaultValue="top" onChange={(e, value ) => {
                  if (value === 'users' || value === 'repos') {
                      setPlacement(value)
                  }
              }}>
                  <TabList underlinePlacement="bottom">
                      <Tab value="users" indicatorPlacement="top">
                          유저 테이블
                      </Tab>
                      <Tab value="repos" indicatorPlacement="top">
                          리포지토리 테이블
                      </Tab>
                  </TabList>
                  <TabPanel value="users">
                      유저 데이터 변경 테이블 입니다.
                  </TabPanel>
                  <TabPanel value="repos">
                      리포지토리 데이터 변경 테이블 입니다.
                  </TabPanel>
              </Tabs>
              <CssBaseline />
              <ColorSchemeToggle />
              <TableColumnPinning rows={data} />;
              <FormControl
                id="Id"
                required
                size="sm"
                color="primary">
                <FormLabel>
                  Create Repository
                </FormLabel>
                <Input placeholder="Owner"></Input>
                <Input placeholder="Repository Name"></Input>
                <Input placeholder="Internal"></Input>
                <Button variant="solid">Create</Button>
              </FormControl>
          </CssVarsProvider>
      </>
    )
}

export default App;