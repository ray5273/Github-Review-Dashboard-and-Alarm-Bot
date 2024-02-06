// UsersFormComponent.tsx
import React, {useEffect, useState} from 'react';
import axios, {AxiosResponse} from 'axios';
import {UserRepoAlarm} from "../../../../shared/src/db/entity/user.repo.alarm.entity";
import FormControl from "@mui/joy/FormControl";
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Button from "@mui/joy/Button";
import Radio from "@mui/joy/Radio";
import RadioGroup from "@mui/joy/RadioGroup";
import {MenuItem, Select} from "@mui/joy";
import {Repos} from "../../../../shared/src/db/entity/repo.entity"
import Option from "@mui/joy/Option";
import {Users} from "../../../../shared/src/db/entity/user.entity";

interface UserRepoAlarmFormComponentProps {
    setData: React.Dispatch<React.SetStateAction<UserRepoAlarm[] | []>>
}

// TODO : axios api들 전부 바꾸기
// TODO : UserRepoAlarm db 바뀐 부분 ui 변경 반영해주기

export const UserRepoAlarmFormComponent: React.FC<UserRepoAlarmFormComponentProps> = ({ setData }) => {
    const [selectedRepo, setSelectedRepo] = useState<string | null>(null);
    const [selectedRepoEntity, setSelectedRepoEntity] = useState<Repos | null>(null);
    const [selectedUser, setSelectedUser] = useState<string | null>(null);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);

        console.log(selectedUser, selectedRepo);
        console.log(selectedRepoEntity)
        const body = {
            user_name: selectedUser,
            repo_id : selectedRepo,
            repo_name : selectedRepoEntity!.name,
            repo_is_internal : selectedRepoEntity!.is_internal,
            repo_owner : selectedRepoEntity!.owner
        }
        await axios.post(`${process.env.REACT_APP_DB_API_SERVER}/user-repo-alarm`, body)
            .then((res : AxiosResponse<UserRepoAlarm[]>) => {
                console.log(res);
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
        }, [users]);
        const handleChange = (
            event: React.SyntheticEvent | null,
            newValue: string | null,
        ) => {
            setSelectedUser(newValue)
        };

        return (
            <Select value={selectedUser} onChange={handleChange} placeholder={"Select User"}>
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

        useEffect(() => {
            const fetchData = async () => {
                const result = await axios.get(`${process.env.REACT_APP_DB_API_SERVER}/repos`);
                setRepos(result.data);
            };

            fetchData();
        }, [repos]);
        const handleChange = (
            event: React.SyntheticEvent | null,
            newValue: string | null,
        ) => {
            setSelectedRepo(newValue)
            console.log(newValue)
            const result = repos.find((repo) => repo.id === Number(newValue));
            setSelectedRepoEntity(result? result : null);
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
        <form onSubmit={handleSubmit}>
            <FormControl
                id="User"
                required
                size="sm"
                color="primary"
                sx={{ mt: 4, width: 400 }}>
                <FormLabel>
                    Select User
                </FormLabel>
                <UserDropdownComponent></UserDropdownComponent>
            </FormControl>
            <FormControl
                id="Repo"
                required
                size="sm"
                color="primary"
                sx={{ width: 400 }}>
                <FormLabel>
                    Select Repository
                </FormLabel>
                <RepoDropdownComponent></RepoDropdownComponent>
            </FormControl>

            <Button variant="solid" type="submit">Create</Button>
        </form>
    );
}