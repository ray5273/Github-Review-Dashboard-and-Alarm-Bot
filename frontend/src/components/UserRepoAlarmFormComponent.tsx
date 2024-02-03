// UsersFormComponent.tsx
import React, {useEffect, useState} from 'react';
import axios, {AxiosResponse} from 'axios';
import {UserRepoAlarm} from "../../../shared/src/db/entity/user.repo.alarm.entity";
import FormControl from "@mui/joy/FormControl";
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Button from "@mui/joy/Button";
import Radio from "@mui/joy/Radio";
import RadioGroup from "@mui/joy/RadioGroup";
import {MenuItem, Select} from "@mui/joy";
import {Repos} from "../../../shared/src/db/entity/repo.entity"
import Option from "@mui/joy/Option";
import {Users} from "../../../shared/src/db/entity/user.entity";

interface UserRepoAlarmFormComponentProps {
    setData: React.Dispatch<React.SetStateAction<UserRepoAlarm[] | null>>
}


export const UserRepoAlarmFormComponent: React.FC<UserRepoAlarmFormComponentProps> = ({ setData }) => {
    const [selectedRepo, setSelectedRepo] = useState<string | null>(null);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const user_name = data.get('user_name');

        const body = {
            user_name: user_name,
            repo_id : selectedRepo
        }
        await axios.post(`${process.env.REACT_APP_DB_API_SERVER}/user-repo-alarm`, body)
            .then((res : AxiosResponse<UserRepoAlarm[]>) => {
                setData(res.data);
            }).catch((err) => {
                console.log(err);
            });
    }
    const UserDropdownComponent = () => {
        const [users, setUsers] = useState<Users[]>([]);

        useEffect(() => {
            const fetchData = async () => {
                const result = await axios.get(`${process.env.REACT_APP_DB_API_SERVER}/users`);
                setUsers(result.data);
            };

            fetchData();
        }, []);
        const handleChange = (
            event: React.SyntheticEvent | null,
            newValue: string | null,
        ) => {
            setSelectedRepo(newValue)
        };

        return (
            <Select value={selectedRepo} onChange={handleChange} placeholder={"Select User"}>
                {users.map((item, index) => (
                    <Option value={item.name}>
                        {`${item.name}`}
                    </Option>
                ))}
            </Select>
        );
    };

    const RepoDropdownComponent = () => {
        const [repos, setRepos] = useState<Repos[]>([]);
        const [selectedRepo, setSelectedRepo] = useState<string | null>(null);

        useEffect(() => {
            const fetchData = async () => {
                const result = await axios.get(`${process.env.REACT_APP_DB_API_SERVER}/repos`);
                setRepos(result.data);
            };

            fetchData();
        }, []);
        const handleChange = (
            event: React.SyntheticEvent | null,
            newValue: string | null,
        ) => {
            setSelectedRepo(newValue)
        };

        return (
            <Select value={selectedRepo} onChange={handleChange} placeholder={"Select Repository"}>
                {repos.map((item, index) => (
                    <Option value={item.id}>
                        {`${item.owner}/${item.name}`}
                    </Option>
                ))}
            </Select>
        );
    };

    return (
        // TODO : 여기 데이터가 왜 repo table로 들어가는지 모르겠음.
        <form onSubmit={handleSubmit}>
            <FormControl
                id="Id"
                required
                size="sm"
                color="primary"
                sx={{ mt: 4, width: 400 }}>
                <FormLabel>
                    Add User Repo Alarm Data
                </FormLabel>
                <UserDropdownComponent></UserDropdownComponent>
                <RepoDropdownComponent></RepoDropdownComponent>
                <Button variant="solid" type="submit">Create</Button>
            </FormControl>
        </form>
    );
}