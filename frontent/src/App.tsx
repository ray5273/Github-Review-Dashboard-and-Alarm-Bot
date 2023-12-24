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
import Radio from '@mui/joy/Radio';
import RadioGroup from '@mui/joy/RadioGroup';



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
  const [placement, setPlacement] = React.useState<'users' | 'repos'>('repos');
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const owner = data.get('owner');
        const repo = data.get('repo');
        const internal = data.get('internal');
        var is_internal = false;
        if (internal === 'true') {
            is_internal = true;
        }
        const body = {
            owner: owner,
            name: repo,
            is_internal: is_internal
        }
        await axios.post(`http://localhost:8080/repos`, body)
            .then((res : AxiosResponse<Repos[]>) => {
                setData(res.data);
            }).catch((err) => {
                console.log(err);
            });
    }

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
              <TableColumnPinning rows={data} />
              <form onSubmit={handleSubmit}>
                  <FormControl
                    id="Id"
                    required
                    size="sm"
                    color="primary"
                    sx={{ mt: 4, width: 400 }}>
                    <FormLabel>
                      Create Repository
                    </FormLabel>
                    <Input name='owner' placeholder="Owner"></Input>
                    <Input name='repo' placeholder="Repository Name"></Input>
                    <RadioGroup name='internal' defaultValue="true">
                        <Radio value='true' label={'Internal Repository'} />
                        <Radio value='false' label={'External Repository'} />
                    </RadioGroup>
                    <Button variant="solid" type="submit">Create</Button>
                  </FormControl>
              </form>
          </CssVarsProvider>
      </>
    )
}

export default App;