// UsersFormComponent.tsx
import React, {useEffect, useState} from 'react';
import axios, {AxiosResponse} from 'axios';
import {UserRepoAlarm} from "../../../../shared/src/db/entity/user.repo.alarm.entity";
import FormControl from "@mui/joy/FormControl";
import FormLabel from '@mui/joy/FormLabel';
import Button from "@mui/joy/Button";
import {MenuItem, Select} from "@mui/joy";
import {Repos} from "../../../../shared/src/db/entity/repo.entity"
import Option from "@mui/joy/Option";
import {Users} from "../../../../shared/src/db/entity/user.entity";
import Typography from '@mui/joy/Typography';
import {ChannelRepoAlarm} from "../../../../shared/src/db/entity/channel.repo.alarm.entity";
import Input from "@mui/joy/Input";

interface ChannelRepoAlarmFormComponentProps {
    setData: React.Dispatch<React.SetStateAction<ChannelRepoAlarm[] | []>>
}

// TODO : axios api들 전부 바꾸기
// TODO : 본 페이지는 새로고침 해야 데이터가 바뀜

export const ChannelRepoAlarmComponent: React.FC<ChannelRepoAlarmFormComponentProps> = ({ setData }) => {
    const [selectedRepo, setSelectedRepo] = useState<string | null>(null);
    const [selectedRepoEntity, setSelectedRepoEntity] = useState<Repos | null>(null);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const channel_id = data.get('channel_id');
        const channel_name = data.get('channel_name');
        console.log(selectedRepoEntity)
        const body = {
            channel_id: channel_id,
            channel_name: channel_name,
            repo_id : selectedRepo,
            repo_name : selectedRepoEntity!.name,
            repo_is_internal : selectedRepoEntity!.is_internal,
            repo_owner : selectedRepoEntity!.owner
        }
        await axios.post(`${process.env.REACT_APP_DB_API_SERVER}/channel-repo-alarm`, body)
            .then((res : AxiosResponse<ChannelRepoAlarm[]>) => {
                console.log(res);
                setData(res.data);
            }).catch((err) => {
                console.log(err);
            });
    }

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
                id="Channel_id"
                required
                size="sm"
                color="primary"
                sx={{ mt: 4, width: 400 }}>
                <FormLabel>
                    Enter Channel ID
                </FormLabel>
                <Input name='channel_id' placeholder="Channel ID"></Input>
            </FormControl>
            <FormControl
                id="Channel_name"
                required
                size="sm"
                color="primary"
                sx={{ mt: 4, width: 400 }}>
                <FormLabel>
                    Enter Channel Name
                </FormLabel>
                <Input name='channel_name' placeholder="Channel Name"></Input>
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
            <Typography variant="plain" color="primary">
                Please refresh the page to see the updated data.
            </Typography>
        </form>
    );
}